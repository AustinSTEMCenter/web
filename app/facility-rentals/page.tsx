import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Atom } from "@/components/doodles";
import {
  Annotation,
  PageIntro,
  SectionHeading,
  Stamp,
} from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facility Rentals",
  description:
    "Rent event space and classrooms at the Austin STEM Center, home to a FIRST Robotics arena, wood shop with a 4×8 CNC router, machine shop, electronics lab, makerspace, and teaching kitchen.",
};

// TODO(content): add capacity, rates, and what's included once leadership
// confirms rental details.
const rentals = [
  {
    name: "Event Space Rental",
    blurb:
      "Ideal for corporate events, meetings, networking events, workshops, and community gatherings.",
  },
  {
    name: "Classroom Rental",
    blurb:
      "Ideal for trainings, classes, tutoring, homeschool groups, meetings, team-building, executive development, and educational programming.",
  },
];

export default function FacilityRentalsPage() {
  return (
    <>
      <PageIntro
        note="field notes — rent our space"
        title={
          <>
            Space to meet, teach, <span className="hl-purple">and build.</span>
          </>
        }
        doodle={<Atom className="h-14 rotate-12 text-ring-teal/60" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          Austin STEM Center offers unique spaces for meetings, trainings,
          educational events, and community gatherings, all inside a working
          center for robotics, engineering, fabrication, and design.
        </p>
      </PageIntro>

      {/* the spaces */}
      <section className="pt-14">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          the building
        </p>
        <SectionHeading>
          Where learning <span className="hl-purple">comes to life.</span>
        </SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          Austin STEM Center was designed to inspire curiosity through
          hands-on experiences. Under one roof, learners can explore
          robotics, engineering, fabrication, design, electronics, and more in
          purpose-built spaces that encourage them to create, experiment,
          and learn by doing.
        </p>

        <div className="mt-14 space-y-16">
          {facilities.map((f, i) => (
            <section
              key={f.slug}
              id={f.slug}
              className={`relative grid items-start gap-x-10 gap-y-5 max-md:grid-cols-1 ${i % 2 ? "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"}`}
            >
              {f.legacySlug && (
                <span
                  id={f.legacySlug}
                  aria-hidden
                  className="absolute top-0"
                />
              )}
              <figure
                className={`photo max-w-[420px] ${i % 2 ? "rotate-[0.8deg] md:order-2 md:justify-self-end" : "-rotate-[0.7deg]"}`}
              >
                <Image
                  src={f.image}
                  alt={f.name}
                  width={840}
                  height={560}
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="pt-2 text-center font-hand text-[19px] text-brand-blue">
                  {f.note}
                </figcaption>
              </figure>
              <div className={i % 2 ? "md:order-1" : ""}>
                <h3 className="text-[24px] font-bold">{f.name}</h3>
                <div className="prose-note mt-3 text-[16px]">
                  {f.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* rental options */}
      <section id="rentals" className="pt-24">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          rent our space
        </p>
        <SectionHeading>
          Host your event <span className="hl-purple">at ASC.</span>
        </SectionHeading>
        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
          {rentals.map((r, i) => (
            <div
              key={r.name}
              className={`tape relative border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] ${i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.5deg]"}`}
            >
              <h3 className="text-[19px] font-bold">{r.name}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                {r.blurb}
              </p>
              <Stamp className="mt-4 -rotate-2">rates coming soon</Stamp>
            </div>
          ))}
        </div>

        <div className="mt-10 max-w-[62ch] text-[16px] leading-[1.75]">
          <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            How booking works
          </h2>
          <p className="mt-3">
            We&rsquo;re putting the finishing touches on rental rates and
            booking details. In the meantime, tell us about your event: the
            date, group size, and the space you have in mind. We&rsquo;ll
            follow up with availability and pricing.
          </p>
        </div>

        <Link
          href="/contact"
          className="mt-8 inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Request a rental →
        </Link>
      </section>

      <div className="pt-12 pb-4">
        <Annotation>
          ↳{" "}
          <Link href="/machines" className="underline">
            meet the machines
          </Link>{" "}
          one by one, or{" "}
          <Link href="/tours" className="underline">
            book a tour
          </Link>{" "}
          and see it all for yourself!
        </Annotation>
      </div>
    </>
  );
}
