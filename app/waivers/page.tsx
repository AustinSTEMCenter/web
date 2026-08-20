import type { Metadata } from "next";
import Link from "next/link";
import { Annotation, PageIntro } from "@/components/notebook";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Waivers & Forms",
  description:
    "Download the Austin STEM Center liability waiver and media release. Print, sign, and bring them with you, or sign at the front desk.",
};

const forms = [
  {
    title: "Assumption of Risk — Waiver and Release of Liability",
    file: "/forms/asc-liability-waiver.pdf",
    pages: "3 pages",
    who: "Every participant. A parent or legal guardian must also sign for anyone under 18.",
    summary:
      "Our workshops and makerspaces involve real tools — power tools, machinery, and heavy or sharp materials. This form confirms you understand those risks, lets us provide first aid in an emergency, and releases the center from liability for injuries that may result from participating.",
  },
  {
    title: "Media Release",
    file: "/forms/asc-media-release.pdf",
    pages: "1 page",
    who: "Every participant, signed by a parent or guardian for minors. Optional — you can still take part if you'd rather not be photographed; just let us know at the desk.",
    summary:
      "We take photos and video during programs and events to share what happens here in newsletters, grant applications, and on social media. This form gives us permission to use your (or your child's) image and likeness for those purposes.",
  },
];

export default function WaiversPage() {
  return (
    <>
      <PageIntro note="field notes — before you build" title="Waivers and forms.">
        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-ink-soft">
          Anyone taking part in hands-on activities at the center needs two
          signed forms on file. Download them below, print and sign ahead of
          time, and bring them along — or fill out a paper copy at the front
          desk when you arrive. Either works.
        </p>
      </PageIntro>

      <ul className="mt-10 grid gap-8 md:grid-cols-2">
        {forms.map((form, i) => (
          <li
            key={form.file}
            className={`tape relative border border-ink/15 bg-paper p-6 shadow-[3px_4px_0_rgba(56,52,42,0.14)] ${
              i % 2 ? "md:rotate-[0.6deg]" : "md:-rotate-[0.6deg]"
            }`}
          >
            <p className="font-sans text-xs font-extrabold tracking-[0.18em] uppercase text-ink-soft">
              PDF · {form.pages}
            </p>
            <h2 className="mt-2 text-[22px] leading-tight font-bold text-balance">
              {form.title}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.65]">{form.summary}</p>
            <p className="mt-3 text-[15px] leading-[1.6] text-ink-soft">
              <strong className="text-ink">Who signs:</strong> {form.who}
            </p>
            <a
              href={form.file}
              download
              className="mt-5 inline-block rounded-[3px] bg-rust px-6 py-3 text-[15.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Download PDF ↓
            </a>
          </li>
        ))}
      </ul>

      <div className="prose-note mt-12">
        <h2>A few notes</h2>
        <ul>
          <li>
            Austin STEM Center is a program of ATX Robotics, Inc., so both forms
            name ATX Robotics as the legal entity.
          </li>
          <li>
            Forms stay on file, so you only need to sign once per participant
            — not every visit.
          </li>
          <li>
            Questions about either form? <Link href="/contact">Send us a note</Link>{" "}
            or call <a href={site.phoneHref}>{site.phone}</a>.
          </li>
        </ul>
        <p className="mt-8">
          <Annotation>— sign once, build all year</Annotation>
        </p>
      </div>
    </>
  );
}
