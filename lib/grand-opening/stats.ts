/*
 * Grand-opening dashboard data sources.
 *
 * Checked-in guests come from the Luma event (RSVPs live there — see the
 * /rsvp redirect in next.config.ts). Donations come from Stripe. Each source
 * is optional and reports its own status so the board can tell "not set up"
 * apart from "set up but currently failing".
 *
 * Env:
 *   LUMA_API_KEY                 Luma Plus API key
 *   LUMA_EVENT_ID                event id (evt-…) — from the Luma manage URL
 *   STRIPE_SECRET_KEY            restricted key with charges:read is enough
 *   GRAND_OPENING_DONATIONS_SINCE  ISO date; only charges after this count
 *                                (defaults to the day of the event)
 *
 * Scope note: the Stripe total is every succeeded USD charge on the account
 * since the cutoff (net of refunds). Today the account only takes donations
 * via the /donate Buy Button, so that equals "donations raised"; if the
 * account ever takes other payments (camp registrations, Phase 2), narrow
 * this to Checkout Sessions filtered by the donation payment link.
 */

export type SourceResult<T> =
  | ({ status: "ok" } & T)
  | { status: "unconfigured" }
  | { status: "error" };

export type GuestStats = { checkedIn: number; registered: number };
export type DonationStats = { totalCents: number; count: number };

export type GrandOpeningStats = {
  guests: SourceResult<GuestStats>;
  donations: SourceResult<DonationStats>;
  updatedAt: string;
};

const EVENT_DATE = "2026-08-22T00:00:00-05:00";
const CACHE_MS = 10_000;
const MAX_PAGES = 50; // 100 per page → 5k guests / charges, far above need
const TIMEOUT = () => AbortSignal.timeout(8000);

// https://public-api.luma.com/openapi.json — GET /v1/events/guests/list
type LumaGuest = {
  approval_status: string;
  event_tickets: { checked_in_at: string | null }[];
};
type LumaGuestsPage = {
  entries: LumaGuest[];
  has_more: boolean;
  next_cursor?: string | null;
};

async function fetchLumaGuests(): Promise<GuestStats | null> {
  const key = process.env.LUMA_API_KEY;
  const eventId = process.env.LUMA_EVENT_ID;
  if (!key || !eventId) return null;

  let registered = 0;
  let checkedIn = 0;
  let cursor: string | undefined;

  for (let page = 0; page < MAX_PAGES; page++) {
    const url = new URL("https://public-api.luma.com/v1/events/guests/list");
    url.searchParams.set("event_id", eventId);
    url.searchParams.set("approval_status", "approved");
    url.searchParams.set("pagination_limit", "100");
    if (cursor) url.searchParams.set("pagination_cursor", cursor);

    const res = await fetch(url, {
      headers: { "x-luma-api-key": key },
      signal: TIMEOUT(),
    });
    if (!res.ok) throw new Error(`luma responded ${res.status}`);
    const data = (await res.json()) as LumaGuestsPage;

    for (const guest of data.entries) {
      registered += 1;
      if (guest.event_tickets.some((t) => t.checked_in_at)) checkedIn += 1;
    }
    if (!data.has_more || !data.next_cursor) break;
    cursor = data.next_cursor;
  }

  return { checkedIn, registered };
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

function donationsSince(): number {
  const raw = process.env.GRAND_OPENING_DONATIONS_SINCE ?? EVENT_DATE;
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
    url.searchParams.set("created[gte]", String(since));
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
    source("luma", fetchLumaGuests),
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
