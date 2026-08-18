"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { Stamp } from "@/components/notebook";
import type {
  DonationStats,
  GrandOpeningStats,
  GuestStats,
} from "@/lib/grand-opening/stats";

const POLL_MS = 15_000;

const DEMO: GrandOpeningStats = {
  guests: { status: "ok", checkedIn: 137 },
  donations: { status: "ok", totalCents: 482_500, count: 23 },
  updatedAt: "",
};

// What the board shows per source: the latest good numbers (kept across a
// failed poll, flagged stale) or why there are none.
type Shown<T> =
  | { kind: "value"; value: T; stale: boolean }
  | { kind: "unconfigured" }
  | { kind: "error" };

function merge<T>(
  prev: Shown<T> | undefined,
  next: GrandOpeningStats["guests"] | GrandOpeningStats["donations"],
): Shown<T> {
  if (next.status === "ok") {
    return { kind: "value", value: next as T, stale: false };
  }
  if (next.status === "error" && prev?.kind === "value") {
    return { ...prev, stale: true };
  }
  return { kind: next.status };
}

type Board = {
  guests: Shown<GuestStats>;
  donations: Shown<DonationStats>;
  updatedAt: string;
  reachable: boolean;
};

function toBoard(prev: Board | null, stats: GrandOpeningStats): Board {
  return {
    guests: merge(prev?.guests, stats.guests),
    donations: merge(prev?.donations, stats.donations),
    updatedAt: stats.updatedAt,
    reachable:
      stats.guests.status !== "error" && stats.donations.status !== "error",
  };
}

const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const money = (cents: number) =>
  (cents % 100 === 0 ? usdWhole : usdCents).format(cents / 100);
const n = (v: number) => v.toLocaleString("en-US");

export function GrandOpeningDashboard() {
  const demo = useSearchParams().get("demo") !== null;
  const [live, setLive] = useState<Board | null>(null);
  const [offline, setOffline] = useState(false);
  const board = demo ? toBoard(null, DEMO) : live;

  useEffect(() => {
    if (demo) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function poll() {
      try {
        const res = await fetch("/api/grand-opening", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as GrandOpeningStats;
        if (cancelled) return;
        setLive((prev) => toBoard(prev, data));
        setOffline(false);
      } catch {
        if (!cancelled) setOffline(true);
      }
      // schedule the next poll only after this one settles — no overlap
      if (!cancelled) timer = setTimeout(poll, POLL_MS);
    }

    poll();
    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [demo]);

  const stamp = demo
    ? "demo"
    : offline || (board && !board.reachable)
      ? "offline"
      : "live";

  const guests = board?.guests;
  const donations = board?.donations;

  return (
    <div className="pt-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 font-hand text-[21px] text-brand-blue">
            grand opening — saturday, august 22
          </p>
          <h1 className="text-[clamp(30px,4.2vw,46px)] leading-[1.1] font-bold tracking-[-0.01em]">
            Live board
          </h1>
        </div>
        <Stamp>{stamp}</Stamp>
      </header>

      <div className="mt-10 grid gap-8 md:grid-cols-2" aria-live="polite">
        <Tile
          label="Guests checked in"
          value={guests?.kind === "value" ? n(guests.value.checkedIn) : "—"}
          rotate="-rotate-[0.6deg]"
          accent="text-brand-blue"
          note={
            guests?.kind === "value"
              ? guests.stale
                ? "last good count — counter unreachable, retrying"
                : "counted at the door tonight"
              : guests?.kind === "error"
                ? "door counter isn't answering — retrying"
                : "door counter not connected yet"
          }
        />
        <Tile
          label="Donations raised"
          value={
            donations?.kind === "value" ? money(donations.value.totalCents) : "—"
          }
          rotate="rotate-[0.5deg]"
          accent="text-rust"
          note={
            donations?.kind === "value"
              ? `${n(donations.value.count)} ${
                  donations.value.count === 1 ? "gift" : "gifts"
                } so far${
                  donations.stale
                    ? " · last good total, Stripe unreachable"
                    : ""
                }`
              : donations?.kind === "error"
                ? "Stripe isn't answering — retrying"
                : "connect Stripe to total gifts"
          }
        />
      </div>

      <p className="mt-8 font-hand text-[19px] text-ink-soft">
        {demo
          ? "demo numbers — nothing is connected"
          : board
            ? `updated ${new Date(board.updatedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })} · refreshes every ${POLL_MS / 1000}s`
            : offline
              ? "can't reach the site — retrying"
              : "loading…"}
      </p>
    </div>
  );
}

function Tile({
  label,
  value,
  note,
  accent,
  rotate,
}: {
  label: string;
  value: ReactNode;
  note: string;
  accent: string;
  rotate: string;
}) {
  return (
    <section
      className={`tape relative ${rotate} border border-ink/18 bg-card px-8 pt-9 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)]`}
    >
      <h2 className="font-sans text-xs font-extrabold tracking-[0.22em] uppercase text-ink-soft">
        {label}
      </h2>
      <p
        className={`mt-3 text-[clamp(56px,9vw,112px)] leading-none font-bold tabular-nums tracking-[-0.03em] ${accent}`}
      >
        {value}
      </p>
      <p className="mt-4 font-hand text-[22px] text-ink-soft">{note}</p>
    </section>
  );
}
