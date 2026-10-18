import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "@/components/doodles";
import {
  Annotation,
  PageIntro,
  SectionHeading,
} from "@/components/notebook";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "Volunteer at the Austin STEM Center: mentor students, help run events, support our shops, or share your professional expertise.",
};

// TODO(content): placeholder copy — replace with real volunteer roles.
const roles = [
  {
    title: "Program mentor",
    blurb:
      "Work alongside ASC staff during classes, camps, and clubs, helping students troubleshoot, iterate, and finish what they start.",
  },
  {
    title: "Event volunteer",
    blurb:
      "Help with open houses, competitions, and community events: greeting guests, running activity stations, and keeping things moving.",
  },
  {
    title: "Shop & facility help",
    blurb:
      "Lend a hand keeping our shops, labs, and makerspace organized, maintained, and ready for the next group of makers.",
  },
  {
    title: "Industry expert",
    blurb:
      "Share your field with students through talks, demos, or project reviews, and show them what a career in STEM really looks like.",
  },
];

export default function VolunteerPage() {
  return (
    <>
      <PageIntro
        note="field notes — lend a hand"
        title={
          <>
            Help us build <span className="hl-green">what&rsquo;s next.</span>
          </>
        }
        doodle={<Heart className="h-14 -rotate-6 text-rust/45" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          Austin STEM Center runs on people who love to make things and want
          to pass that on. Whether you have an afternoon a month or deep
          expertise in your field, there&rsquo;s a place for you here.
        </p>
      </PageIntro>

      <section className="pt-14">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          ways to help
        </p>
        <SectionHeading>Find your fit.</SectionHeading>
        <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
          {roles.map((r, i) => (
            <div
              key={r.title}
              className={`tape relative border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] ${i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.5deg]"}`}
            >
              <h3 className="text-[19px] font-bold">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {r.blurb}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="pt-12">
        <Link
          href="/contact"
          className="inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Reach out about volunteering →
        </Link>
      </div>

      <div className="pt-12 pb-4">
        <Annotation>
          ↳ not sure where you fit?{" "}
          <Link href="/contact" className="underline">
            reach out
          </Link>{" "}
          and we&rsquo;ll find a spot for you
        </Annotation>
      </div>
    </>
  );
}
