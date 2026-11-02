"use client";

import { startTransition, useActionState, useMemo, useState } from "react";
import {
  requestFieldTrip,
  type FieldTripState,
} from "@/app/programs/field-trips/actions";
import { Annotation, Stamp } from "@/components/notebook";
import {
  addMinutes,
  fieldTripExperiences,
  formatDate,
  formatTime,
  startTimes,
  type DayAvailability,
} from "@/lib/data/field-trip-availability";

const inputClass =
  "mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue";
const labelClass = "block text-[15px]";
const stepClass =
  "text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft";

const initialState: FieldTripState = { status: "idle" };
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function FieldTripBooking({
  availability,
}: {
  availability: DayAvailability[];
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [experienceName, setExperienceName] = useState("");
  const [state, formAction, pending] = useActionState(
    async (prev: FieldTripState, formData: FormData) => {
      const result = await requestFieldTrip(prev, formData);
      if (result.status === "error" && result.slotUnavailable) setTime("");
      return result;
    },
    initialState,
  );
  const [month, setMonth] = useState(availability[0]?.date.slice(0, 7) ?? "");
  const [missingSlot, setMissingSlot] = useState(false);

  const experience = fieldTripExperiences.find(
    (e) => e.name === experienceName,
  );
  const shortest = Math.min(...fieldTripExperiences.map((e) => e.hours));

  // a date is open if at least the shortest session fits
  const openDays = useMemo(
    () =>
      new Map(
        availability
          .filter((day) => startTimes(day.windows, shortest).length > 0)
          .map((day) => [day.date, day.windows]),
      ),
    [availability, shortest],
  );

  const firstMonth = availability[0]?.date.slice(0, 7) ?? "";
  const lastMonth = availability.at(-1)?.date.slice(0, 7) ?? "";
  const windows = openDays.get(date);

  if (state.status === "success") {
    return (
      <div
        ref={(el) => el?.focus()}
        tabIndex={-1}
        role="status"
        className="tape relative mt-10 max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-7 pt-8 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)] outline-none"
      >
        <Stamp>Request received</Stamp>
        <h3 className="mt-5 text-[21px] font-bold">
          Thanks{state.firstName && `, ${state.firstName}`}!
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          We&rsquo;ve got your request for <strong>{state.when}</strong>.
          Someone from our team will email you to confirm availability and
          the details.
        </p>
        <p className="mt-4 font-hand text-[22px] text-rust">see you soon!</p>
      </div>
    );
  }

  return (
    <form
      // submitted by hand rather than via `action` so React doesn't reset
      // the fields when a request comes back with an error
      onSubmit={(e) => {
        e.preventDefault();
        if (!date || !time || !experience) {
          setMissingSlot(true);
          return;
        }
        const formData = new FormData(e.currentTarget);
        startTransition(() => formAction(formData));
      }}
      className="relative mt-10 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-14 gap-y-12 max-md:grid-cols-1"
    >
      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="date" value={date} />
      <input type="hidden" name="experience" value={experienceName} />

      {/* calendar, then the picked day's sessions */}
      <fieldset className="min-w-0">
        <legend className={stepClass}>Pick a date &amp; session</legend>
        <div className="tape relative mt-6 -rotate-[0.4deg] border border-ink/18 bg-card px-5 pt-7 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] max-sm:px-3">
          <div className="flex items-center justify-between">
            <MonthButton
              label="Previous month"
              disabled={month <= firstMonth}
              onClick={() => setMonth(shiftMonth(month, -1))}
            >
              ←
            </MonthButton>
            <p className="text-[19px] font-bold" aria-live="polite">
              {monthLabel(month)}
            </p>
            <MonthButton
              label="Next month"
              disabled={month >= lastMonth}
              onClick={() => setMonth(shiftMonth(month, 1))}
            >
              →
            </MonthButton>
          </div>

          <div className="mt-4 grid grid-cols-7 border-b border-ink/15 pb-2 text-center font-sans text-[12px] font-semibold tracking-[0.08em] text-ink-soft">
            {WEEKDAYS.map((d, i) => (
              <span key={i} aria-hidden>
                {d}
              </span>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-y-1 text-center">
            {monthCells(month).map((cell, i) =>
              cell === null ? (
                <span key={`blank-${i}`} />
              ) : (
                <DayButton
                  key={cell}
                  date={cell}
                  open={openDays.has(cell)}
                  selected={cell === date}
                  onPick={() => {
                    setDate(cell);
                    setTime("");
                    setExperienceName("");
                    setMissingSlot(false);
                  }}
                />
              ),
            )}
          </div>
        </div>

        <div className="mt-8">
          {windows ? (
            <p className="font-hand text-[24px] leading-none text-brand-blue">
              {formatDate(date)}
            </p>
          ) : (
            <Annotation className="rotate-[-2deg]">
              ↑ highlighted dates are open — pick one to see times
            </Annotation>
          )}
          <div
            role="radiogroup"
            aria-label="Session and start time"
            className="mt-3 space-y-3"
          >
            {fieldTripExperiences.map((e) => (
              <Session
                key={e.name}
                experience={e}
                times={windows ? startTimes(windows, e.hours) : null}
                selectedTime={e.name === experienceName ? time : ""}
                onPick={(t) => {
                  setExperienceName(e.name);
                  setTime(t);
                  setMissingSlot(false);
                }}
              />
            ))}
          </div>
        </div>
      </fieldset>

      {/* group details and submit — sticks beside the sessions on desktop */}
      <div className="border border-ink/18 bg-card shadow-[2px_3px_0_rgba(56,52,42,0.1)] px-6 pt-5 pb-6 md:sticky md:top-24 max-sm:px-4">
        <fieldset className="min-w-0">
          <legend className={stepClass}>About your group</legend>
          <label className={`${labelClass} mt-6`}>
            <span className="font-semibold">School or organization *</span>
            <input
              type="text"
              name="school"
              required
              autoComplete="organization"
              className={inputClass}
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <label className={labelClass}>
              <span className="font-semibold">Students *</span>
              <input
                type="number"
                name="students"
                min={1}
                required
                inputMode="numeric"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              <span className="font-semibold">Chaperones</span>
              <input
                type="number"
                name="chaperones"
                min={0}
                inputMode="numeric"
                className={inputClass}
              />
            </label>
          </div>
          <label className={`${labelClass} mt-4`}>
            <span className="font-semibold">Grade level(s)</span>
            <input
              type="text"
              name="grades"
              placeholder="e.g. 5th, or 9th–10th"
              className={inputClass}
            />
          </label>
          <label className={`${labelClass} mt-4`}>
            <span className="font-semibold">Your name *</span>
            <input
              type="text"
              name="contactName"
              required
              autoComplete="name"
              className={inputClass}
            />
          </label>
          <div className="mt-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <label className={labelClass}>
              <span className="font-semibold">Email *</span>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                className={inputClass}
              />
            </label>
            <label className={labelClass}>
              <span className="font-semibold">Phone</span>
              <input
                type="tel"
                name="phone"
                autoComplete="tel"
                className={inputClass}
              />
            </label>
          </div>
          <label className={`${labelClass} mt-4`}>
            <span className="font-semibold">Anything we should know?</span>
            <textarea
              name="notes"
              rows={4}
              placeholder="Learning goals, accessibility needs, lunch plans, questions…"
              className={inputClass}
            />
          </label>
        </fieldset>

        <div className="mt-8">
          <p className="font-hand text-[22px] leading-snug text-brand-blue">
            {date && time && experience
              ? `${experience.name} · ${formatDate(date)} · ${formatTime(time)}`
              : "no session picked yet"}
          </p>
          {(missingSlot || state.status === "error") && (
            <p
              role="alert"
              className="mt-3 border-l-[3px] border-rust bg-rust/5 px-3 py-2.5 text-[15px] text-rust"
            >
              {missingSlot
                ? "Pick a date and a session time on the calendar first."
                : state.status === "error" && state.message}
            </p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="mt-4 inline-block rounded-[3px] bg-rust px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
          >
            {pending ? "Sending…" : "Request this date →"}
          </button>
          <p className="mt-3 text-[14px] text-ink-soft">
            This sends a request, not a confirmed booking — we&rsquo;ll email
            you to finalize.
          </p>
        </div>
      </div>
    </form>
  );
}

/** One session: name, length, price, description, and — once a day is
 *  picked (`times` non-null) — its open start times that day. */
function Session({
  experience,
  times,
  selectedTime,
  onPick,
}: {
  experience: (typeof fieldTripExperiences)[number];
  times: string[] | null;
  selectedTime: string;
  onPick: (time: string) => void;
}) {
  return (
    <div className="border border-ink/18 bg-card shadow-[2px_3px_0_rgba(56,52,42,0.1)] px-5 py-4 max-sm:px-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6">
        <h3 className="text-[17px] font-bold">
          {experience.name}{" "}
          <span className="ml-1 text-[14px] font-normal italic text-ink-soft">
            {experience.duration}
          </span>
        </h3>
        <p className="font-hand text-[22px] text-rust">{experience.price}</p>
      </div>
      <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
        {experience.description}
      </p>
      {times === null ? null : times.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {times.map((t) => (
            <label key={t} className="cursor-pointer">
              <input
                type="radio"
                name="time"
                value={t}
                aria-label={`${experience.name}, ${formatTime(t)} to ${formatTime(addMinutes(t, experience.hours * 60))}`}
                checked={t === selectedTime}
                onChange={() => onPick(t)}
                className="peer sr-only"
              />
              <span className="block rounded-[3px] border border-ink/25 bg-card px-3 py-1.5 text-[14px] transition-colors hover:border-brand-blue peer-checked:border-brand-blue peer-checked:bg-brand-blue peer-checked:text-paper peer-checked:shadow-[2px_2px_0_rgba(56,52,42,0.65)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue">
                {formatTime(t)} –{" "}
                {formatTime(addMinutes(t, experience.hours * 60))}
              </span>
            </label>
          ))}
        </div>
      ) : (
        <p className="mt-2 text-[14px] italic text-ink-soft">
          Not enough open time this day.
        </p>
      )}
    </div>
  );
}

function MonthButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-[3px] border border-ink/25 text-[17px] hover:border-brand-blue disabled:opacity-30 disabled:hover:border-ink/25"
    >
      {children}
    </button>
  );
}

function DayButton({
  date,
  open,
  selected,
  onPick,
}: {
  date: string;
  open: boolean;
  selected: boolean;
  onPick: () => void;
}) {
  const day = Number(date.slice(8));
  if (!open) {
    return (
      <span className="mx-auto grid aspect-square w-full max-w-11 place-items-center text-[15px] text-ink/25">
        {day}
      </span>
    );
  }
  return (
    <button
      type="button"
      aria-label={formatDate(date)}
      aria-pressed={selected}
      onClick={onPick}
      className={`mx-auto grid aspect-square w-full max-w-11 place-items-center rounded-full text-[15px] font-bold transition-colors ${
        selected
          ? "-rotate-6 border-2 border-rust bg-rust/10 text-rust"
          : "border-2 border-transparent bg-ring-teal/15 hover:bg-ring-teal/35"
      }`}
    >
      {day}
    </button>
  );
}

/** "2026-10" → ["2026-10-01", …] padded with nulls to start on Sunday. */
function monthCells(month: string): (string | null)[] {
  if (!month) return [];
  const [y, m] = month.split("-").map(Number);
  const first = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
  const count = new Date(Date.UTC(y, m, 0)).getUTCDate();
  return [
    ...Array<null>(first).fill(null),
    ...Array.from(
      { length: count },
      (_, i) => `${month}-${String(i + 1).padStart(2, "0")}`,
    ),
  ];
}

function shiftMonth(month: string, delta: number): string {
  const [y, m] = month.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1 + delta, 1)).toISOString().slice(0, 7);
}

function monthLabel(month: string): string {
  if (!month) return "";
  return new Date(`${month}-01T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
