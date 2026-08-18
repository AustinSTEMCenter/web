/*
 * Grand-opening dashboard data sources.
 *
 * Checked-in guests come from the door counter (two integers in Upstash
 * Redis, tapped by greeters in the admin app — see
 * web/admin/lib/checkin-counter.ts). Donations come from Stripe. Each source
 * is optional and reports its own status so the board can tell "not set up"
 * apart from "set up but currently failing".
 *
 * Env:
 *   KV_REST_API_URL              Upstash REST endpoint (Vercel ↔ Upstash integration)
 *   KV_REST_API_READ_ONLY_TOKEN  preferred — this site only ever reads
 *   KV_REST_API_TOKEN            fallback if the read-only token isn't set
 *   STRIPE_SECRET_KEY            restricted key with charges:read is enough
 *   GRAND_OPENING_DONATIONS_SINCE  optional ISO date; only charges after this
 *                                count (unset = all charges on the account)
 *
 * Scope note: the Stripe total is every succeeded USD charge on the account
 * (optionally since the cutoff), net of refunds. Today the account only takes donations
 * via the /donate Buy Button, so that equals "donations raised"; if the
 * account ever takes other payments (camp registrations, Phase 2), narrow
 * this to Checkout Sessions filtered by the donation payment link.
 */

export type SourceResult<T> =
  | ({ status: "ok" } & T)
  | { status: "unconfigured" }
  | { status: "error" };

export type GuestStats = { checkedIn: number };
export type DonationStats = { totalCents: number; count: number };

export type GrandOpeningStats = {
  guests: SourceResult<GuestStats>;
  donations: SourceResult<DonationStats>;
  updatedAt: string;
};

const CACHE_MS = 10_000;
const MAX_PAGES = 50; // 100 per page → 5k charges, far above need
const TIMEOUT = () => AbortSignal.timeout(8000);

// Door counter. Key name must match web/admin/lib/checkin-counter.ts.
const ARRIVALS_KEY = "go:arrivals";

async function fetchCheckedIn(): Promise<GuestStats | null> {
  const url = process.env.KV_REST_API_URL;
  const token =
    process.env.KV_REST_API_READ_ONLY_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/get/${ARRIVALS_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    signal: TIMEOUT(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`upstash responded ${res.status}`);
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(`upstash: ${data.error}`);

  // Unset key → null → nobody counted yet.
  const checkedIn = data.result == null ? 0 : Number(data.result);
  if (!Number.isInteger(checkedIn)) {
    throw new Error(`unexpected counter value: ${String(data.result)}`);
  }
  return { checkedIn };
}

type StripeCharge = {
  id: string;
  amount: number;
  amount_refunded: number;
  currency: string;
  paid: boolean;
  status: string;
};
type StripeList = { data: StripeCharge[]; has_more: boolean };

function donationsSince(): number | null {
  const raw = process.env.GRAND_OPENING_DONATIONS_SINCE;
  if (!raw) return null;
  const ms = new Date(raw).getTime();
  if (Number.isNaN(ms)) {
    throw new Error(`GRAND_OPENING_DONATIONS_SINCE is not a valid date: ${raw}`);
  }
  return Math.floor(ms / 1000);
}

async function fetchStripeDonations(): Promise<DonationStats | null> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;

  const since = donationsSince();
  let totalCents = 0;
  let count = 0;
  let startingAfter: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL("https://api.stripe.com/v1/charges");
    if (since !== null) url.searchParams.set("created[gte]", String(since));
    url.searchParams.set("limit", "100");
    if (startingAfter) url.searchParams.set("starting_after", startingAfter);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${key}` },
      signal: TIMEOUT(),
    });
    if (!res.ok) throw new Error(`stripe responded ${res.status}`);
    const data = (await res.json()) as StripeList;

    for (const c of data.data) {
      if (!c.paid || c.status !== "succeeded" || c.currency !== "usd") continue;
      totalCents += c.amount - c.amount_refunded;
      count += 1;
    }
    const last = data.data.at(-1);
    if (!data.has_more || !last) break;
    startingAfter = last.id;
  }

  return { totalCents, count };
}

async function source<T>(
  name: string,
  fetcher: () => Promise<T | null>,
): Promise<SourceResult<T>> {
  try {
    const value = await fetcher();
    return value ? { status: "ok", ...value } : { status: "unconfigured" };
  } catch (err) {
    console.error(`grand-opening: ${name} fetch failed`, err);
    return { status: "error" };
  }
}

async function computeStats(): Promise<GrandOpeningStats> {
  const [guests, donations] = await Promise.all([
    source("counter", fetchCheckedIn),
    source("stripe", fetchStripeDonations),
  ]);
  return { guests, donations, updatedAt: new Date().toISOString() };
}

// Short in-memory cache + single-flight so a burst of dashboard polls (or a
// stray crawler) turns into at most one upstream sweep per CACHE_MS per
// server instance.
let cached: { at: number; stats: GrandOpeningStats } | null = null;
let inFlight: Promise<GrandOpeningStats> | null = null;

export function getGrandOpeningStats(): Promise<GrandOpeningStats> {
  if (cached && Date.now() - cached.at < CACHE_MS) {
    return Promise.resolve(cached.stats);
  }
  inFlight ??= computeStats()
    .then((stats) => {
      cached = { at: Date.now(), stats };
      return stats;
    })
    .finally(() => {
      inFlight = null;
    });
  return inFlight;
}
