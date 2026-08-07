"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { Stamp } from "@/components/notebook";

const inputClass =
  "mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue";

const initialState: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div className="tape relative max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-7 pt-8 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
        <Stamp>Message received</Stamp>
        <h2 className="mt-5 text-[21px] font-bold">
          Thanks{state.firstName && `, ${state.firstName}`}!
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          Your note is in our inbox — we read every one. Expect to hear back
          within a day or two.
        </p>
        <p className="mt-4 font-hand text-[22px] text-rust">talk soon!</p>
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
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">What&rsquo;s this about?</span>
        <select name="topic" defaultValue="" className={inputClass}>
          <option value="">pick one…</option>
          <option>Programs (field trips, camps, or after-school clubs)</option>
          <option>Facility rentals (event space or classrooms)</option>
          <option>Partnerships</option>
          <option>Interested parent</option>
          <option>Something else</option>
        </select>
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">
          How&rsquo;d you hear about the Austin STEM Center?
        </span>
        <select name="source" defaultValue="" className={inputClass}>
          <option value="">pick one…</option>
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
        <span className="font-semibold">Your message *</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Questions, ideas, a program you're curious about — anything at all"
          className={inputClass}
        />
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
        {pending ? "Sending…" : "Send it →"}
      </button>
    </form>
  );
}
