"use client";

import { useActionState } from "react";
import { submitRsvp, type RsvpState } from "@/app/rsvp/actions";
import { Stamp } from "@/components/notebook";

const inputClass =
  "mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue";

const initialState: RsvpState = { status: "idle" };

export function RsvpForm() {
  const [state, formAction, pending] = useActionState(
    submitRsvp,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="tape relative max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-7 pt-8 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
        <Stamp>RSVP received</Stamp>
        <h2 className="mt-5 text-[21px] font-bold">
          You&rsquo;re on the list{state.firstName && `, ${state.firstName}`}!
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Saturday, August 22, 1&ndash;6 PM. Tour all six spaces, meet the
          crew, and see the place for yourself &mdash; no ticket needed, just
          show up.
        </p>
        <p className="mt-4 font-hand text-[19px] text-rust">
          see you there — bring a friend, too!
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="relative max-w-[520px]">
      {/* honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="block text-[15px]">
          <span className="font-semibold">First name *</span>
          <input
            type="text"
            name="firstName"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </label>
        <label className="block text-[15px]">
          <span className="font-semibold">Last name</span>
          <input
            type="text"
            name="lastName"
            autoComplete="family-name"
            className={inputClass}
          />
        </label>
      </div>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">Email *</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className={inputClass}
        />
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">Phone</span>
        <input
          type="tel"
          name="phone"
          autoComplete="tel"
          className={inputClass}
        />
      </label>
      <div className="mt-4 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="block text-[15px]">
          <span className="font-semibold">How many of you, total?</span>
          <select name="partySize" defaultValue="2" className={inputClass}>
            <option value="1">Just me</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6+">6 or more</option>
          </select>
        </label>
        <label className="block text-[15px]">
          <span className="font-semibold">Kids&rsquo; ages, if any</span>
          <input
            type="text"
            name="kidsAges"
            placeholder="e.g. 8 and 11"
            className={inputClass}
          />
        </label>
      </div>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">
          How&rsquo;d you hear about the Austin STEM Center?
        </span>
        <select name="source" defaultValue="" className={inputClass}>
          <option value="">— pick one —</option>
          <option>Friend or family</option>
          <option>My kid&rsquo;s school or teacher</option>
          <option>Social media</option>
          <option>Google / search</option>
          <option>Flyer or poster</option>
          <option>Local news or event</option>
          <option>Other</option>
        </select>
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">Anything else we should know?</span>
        <textarea
          name="note"
          rows={3}
          placeholder="Questions, a program you're curious about, anything at all"
          className={inputClass}
        />
      </label>
      <label className="mt-5 flex items-start gap-2.5 text-[15px]">
        <input
          type="checkbox"
          name="mailingList"
          defaultChecked
          className="mt-1 h-4 w-4 accent-rust"
        />
        <span>Keep me posted on camps, clubs, and events at ASC.</span>
      </label>

      {state.status === "error" && (
        <p className="mt-5 border-l-[3px] border-rust bg-rust/5 px-3 py-2.5 text-[15px] text-rust">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-block rounded-[3px] bg-rust px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-60"
      >
        {pending ? "Sending…" : "Count us in →"}
      </button>
    </form>
  );
}
