/*
 * Field-trip availability. Dates are "YYYY-MM-DD" and times "HH:MM", both in
 * Austin local time, so nothing here depends on the server's or visitor's
 * time zone.
 *
 * Today the open windows come from a placeholder weekly schedule. To connect
 * the company calendar, fill in `getBusyIntervals` (e.g. Google Calendar's
 * freebusy API) — everything downstream already subtracts busy time.
 */

import { getProgram } from "@/lib/data/programs";
import { todayInAustin, weekday } from "@/lib/dates";

export type Window = { start: string; end: string };
export type DayAvailability = { date: string; windows: Window[] };
export type BusyInterval = { date: string; start: string; end: string };

// TODO(content): placeholder schedule — confirm real field-trip hours,
// booking lead time, and how far ahead schools can book.
const OPEN_HOURS: Record<number, Window[]> = {
  1: [{ start: "09:00", end: "15:00" }], // Mon
  2: [{ start: "09:00", end: "15:00" }], // Tue
  3: [{ start: "09:00", end: "15:00" }], // Wed
  4: [{ start: "09:00", end: "15:00" }], // Thu
  5: [{ start: "09:00", end: "15:00" }], // Fri
};
const LEAD_DAYS = 14;

// Whole days that can't be requested: holidays and days already booked.
// Add to this until the company calendar is connected below.
const CLOSED_DATES = new Set([
  "2026-11-17", // field trip already booked (see the clubs schedule)
  "2026-11-26", // Thanksgiving
  "2026-11-27",
  "2026-12-24", // Christmas
  "2026-12-25",
  "2026-12-31", // New Year
  "2027-01-01",
  "2027-01-18", // MLK Day
  "2027-02-15", // Presidents' Day
]);
const HORIZON_DAYS = 120;

// TODO(calendar): take (from, to) and return the company calendar's booked
// time in that range. Nothing is blocked off until then.
async function getBusyIntervals(): Promise<BusyInterval[]> {
  return [];
}

export async function getFieldTripAvailability(): Promise<DayAvailability[]> {
  const today = todayInAustin();
  const from = addDays(today, LEAD_DAYS);
  const to = addDays(today, HORIZON_DAYS);
  const busy = await getBusyIntervals();

  const days: DayAvailability[] = [];
  for (let date = from; date <= to; date = addDays(date, 1)) {
    if (CLOSED_DATES.has(date)) continue;
    const open = OPEN_HOURS[weekday(date)] ?? [];
    const taken = busy.filter((b) => b.date === date);
    const windows = open.flatMap((w) => subtract(w, taken));
    if (windows.length > 0) days.push({ date, windows });
  }
  return days;
}

/** Hourly start times that fit a trip of `hours` inside the open windows. */
export function startTimes(windows: Window[], hours: number): string[] {
  const length = hours * 60;
  return windows.flatMap((w) => {
    const starts: string[] = [];
    for (let t = toMinutes(w.start); t + length <= toMinutes(w.end); t += 60) {
      starts.push(fromMinutes(t));
    }
    return starts;
  });
}

export function addMinutes(time: string, minutes: number): string {
  return fromMinutes(toMinutes(time) + minutes);
}

/** "09:00" → "9:00 am" */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** "2026-10-20" → "Tuesday, October 20" */
export function formatDate(date: string): string {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function subtract(window: Window, busy: BusyInterval[]): Window[] {
  let pieces = [window];
  for (const b of busy) {
    pieces = pieces.flatMap((p) => {
      if (b.end <= p.start || b.start >= p.end) return [p];
      return [
        { start: p.start, end: b.start },
        { start: b.end, end: p.end },
      ].filter((piece) => piece.start < piece.end);
    });
  }
  return pieces;
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const fromMinutes = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** Bookable experiences, from the Field Trips pricing table in programs.ts. */
export const fieldTripExperiences = (
  getProgram("field-trips")?.pricing?.rows ?? []
).map((row) => ({
  name: row.option,
  price: row.price,
  description: row.description,
  duration: row.duration ?? "",
  hours: parseFloat(row.duration ?? "") || 2,
}));
