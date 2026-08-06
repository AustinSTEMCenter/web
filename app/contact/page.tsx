import type { Metadata } from "next";
import { PaperPlane } from "@/components/doodles";
import { Annotation, PageIntro } from "@/components/notebook";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Austin STEM Center about programs, partnerships, parent questions, and everything else.",
};

/*
 * The contact form (components/contact-form.tsx) is intentionally not
 * rendered until it's wired to the form store + Resend notification
 * (website-plan-02.md §4.1) — a fillable form that can't submit is a trap.
 */
export default function ContactPage() {
  return (
    <>
      <PageIntro
        note="field notes — say hello"
        title="Contact us."
        doodle={<PaperPlane className="h-12 -rotate-6 text-brand-blue/55" />}
      >
        <p className="mt-5 max-w-[52ch] text-[17px] text-ink-soft">
          Questions about programs, partnerships, or visiting the center?
          We&rsquo;d love to hear from you.
        </p>
      </PageIntro>

      <div className="tape relative mt-12 max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-7 pt-8 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
        <h2 className="text-[21px] font-bold">How to reach us right now</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
          A contact form is on its way. In the meantime, the fastest way to
          reach us is by phone, or just come by and say hi.
        </p>
        <p className="mt-4 text-[17px]">
          <a
            href={site.phoneHref}
            className="font-bold text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            {site.phone}
          </a>
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            {site.address.street}
            <br />
            {site.address.cityStateZip}
          </a>
        </p>
        <p className="mt-4 font-hand text-[20px] text-brand-blue">
          come by and see the FIRST Arena, it&rsquo;s worth the trip
        </p>
      </div>

      <div className="pt-10 pb-4">
        <Annotation>
          ↳ until the form&rsquo;s wired up, the phone works great!
        </Annotation>
      </div>
    </>
  );
}
