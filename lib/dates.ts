/*
 * Calendar dates are "YYYY-MM-DD" strings in Austin local time, so nothing
 * depends on the server's or visitor's time zone.
 */

export const TIME_ZONE = "America/Chicago";

export function todayInAustin(): string {
  // en-CA formats as YYYY-MM-DD
  return new Date().toLocaleDateString("en-CA", { timeZone: TIME_ZONE });
}

const asUtcNoon = (date: string) => new Date(`${date}T12:00:00Z`);

export const weekday = (date: string) => asUtcNoon(date).getUTCDay();

const format = (date: string, options: Intl.DateTimeFormatOptions) =>
  asUtcNoon(date).toLocaleDateString("en-US", { ...options, timeZone: "UTC" });

/** "2026-11-01" → { weekday: "Sun", month: "Nov", day: "1" } */
export function dateParts(date: string) {
  return {
    weekday: format(date, { weekday: "short" }),
    month: format(date, { month: "short" }),
    day: format(date, { day: "numeric" }),
  };
}
