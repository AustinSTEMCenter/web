import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PaperPlane } from "@/components/doodles";
import { Annotation, PageIntro } from "@/components/notebook";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the Austin STEM Center about programs, partnerships, parent questions, and everything else.",
};

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
          Drop us a note below and we&rsquo;ll get back to you.
        </p>
      </PageIntro>

      <div className="mt-12">
        <ContactForm />
      </div>

      <div className="mt-12 max-w-[520px] border-t border-ink/15 pt-6">
        <p className="text-[15px] leading-relaxed text-ink-soft">
          Prefer to talk? Call{" "}
          <a
            href={site.phoneHref}
            className="font-bold text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            {site.phone}
          </a>{" "}
          — or just come by:{" "}
          <a
            href={site.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            {site.address.street}, {site.address.cityStateZip}
          </a>
          .
        </p>
      </div>

      <div className="pt-10 pb-4">
        <Annotation>
          ↳ come see the FIRST Arena in person, it&rsquo;s worth the trip
        </Annotation>
      </div>
    </>
  );
}
