import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Atom } from "@/components/doodles";
import { Annotation, PageIntro, SectionHeading } from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Six real spaces under one roof: FIRST Robotics arena, wood shop with a 4×8 CNC router, machine shop, electronics lab, makerspace, and teaching kitchen, plus event space and classrooms for rent.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageIntro
        note="field notes — the building"
        title={
          <>
            Where learning <span className="hl-purple">comes to life.</span>
          </>
        }
        doodle={<Atom className="h-14 rotate-12 text-ring-teal/60" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          Austin STEM Center was designed to inspire curiosity through
          hands-on experiences. Under one roof, learners can explore
          robotics, engineering, fabrication, design, electronics, and more in
          purpose-built spaces that encourage them to create, experiment,
          and learn by doing.
        </p>
      </PageIntro>

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
              <h2 className="text-[24px] font-bold">{f.name}</h2>
              <div className="prose-note mt-3 text-[16px]">
                {f.paragraphs.map((p) => (
                  <p key={p.slice(0, 32)}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* facility rentals */}
      <section id="rentals" className="pt-20">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          rent our space
        </p>
        <SectionHeading>Facility rentals.</SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          Austin STEM Center offers unique spaces for meetings, trainings,
          educational events, and community gatherings.
        </p>
        <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
          <div className="tape relative border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] -rotate-[0.5deg]">
            <h3 className="text-[19px] font-bold">Event Space Rental</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Ideal for corporate events, meetings, networking events,
              workshops, and community gatherings.
            </p>
          </div>
          <div className="tape relative border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] rotate-[0.6deg]">
            <h3 className="text-[19px] font-bold">Classroom Rental</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Ideal for trainings, classes, tutoring, homeschool groups,
              meetings, team-building, executive development, and educational
              programming.
            </p>
          </div>
        </div>
      </section>

      <div className="pt-10 pb-4">
        <Annotation>
          ↳{" "}
          <Link href="/contact" className="underline">
            book a tour
          </Link>{" "}
          with us and see it for yourself!
        </Annotation>
      </div>
    </>
  );
}
