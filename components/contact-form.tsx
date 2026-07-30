/*
 * Not rendered yet — the contact page shows a "reach us by phone" card until
 * this form is wired to the form store + Resend notification after the CMS
 * bake-off lands (website-plan-02.md §4.1). Swap it back in on /contact then.
 */
export function ContactForm() {
  return (
    <form className="max-w-[520px]">
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <label className="block text-[15px]">
          <span className="font-semibold">First name</span>
          <input
            type="text"
            name="firstName"
            className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
          />
        </label>
        <label className="block text-[15px]">
          <span className="font-semibold">Last name</span>
          <input
            type="text"
            name="lastName"
            className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
          />
        </label>
      </div>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">Email</span>
        <input
          type="email"
          name="email"
          className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
        />
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">
          What are you requesting information about?
        </span>
        <select
          name="topic"
          className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
        >
          <option>Programs — field trips, camps, or after-school clubs</option>
          <option>Facility rentals — event space or classrooms</option>
          <option>Partnerships</option>
          <option>Interested Parent</option>
          <option>Other (please leave more information below)</option>
        </select>
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">
          How did you hear about the Austin STEM Center?
        </span>
        <input
          type="text"
          name="source"
          className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
        />
      </label>
      <label className="mt-4 block text-[15px]">
        <span className="font-semibold">Comment or message</span>
        <textarea
          name="message"
          rows={5}
          className="mt-1.5 w-full border border-ink/25 bg-card px-3 py-2.5 shadow-[2px_2px_0_rgba(56,52,42,0.08)] outline-none focus:border-brand-blue"
        />
      </label>
      <button
        type="submit"
        className="mt-6 inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)]"
      >
        Submit
      </button>
    </form>
  );
}
