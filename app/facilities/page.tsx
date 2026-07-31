import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Atom } from "@/components/doodles";
import { Annotation, PageIntro, SectionHeading } from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";

export const metadata: Metadata = {
  title: "Facilities",
  description:
    "Six real spaces under one roof: FIRST Robotics arena, wood shop with a 4×8 CNC router, metal shop, electronics lab, makerspace, and teaching kitchen — plus event space and classrooms for rent.",
};

export default function FacilitiesPage() {
  return (
    <>
      <PageIntro
        note="field notes — the building"
        title={
          <>
            Six real spaces, one{" "}
            <span className="hl-purple">connected ecosystem.</span>
          </>
        }
        doodle={<Atom className="h-14 rotate-12 text-ring-teal/60" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          The ASC facility is a connected learning ecosystem designed to
          support robotics, engineering, and hands-on learning at every stage.
        </p>
      </PageIntro>

      <div className="mt-14 space-y-16">
        {facilities.map((f, i) => (
          <section
            key={f.slug}
            id={f.slug}
            className={`grid items-start gap-x-10 gap-y-5 max-md:grid-cols-1 ${i % 2 ? "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"}`}
          >
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
              <figcaption className="pt-2 text-center font-hand text-[16px] text-brand-blue">
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
        <p className="mb-2 font-hand text-[18px] text-brand-blue">
          rent the space
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
        <Annotation className="mt-8">
          ↳ planning something?{" "}
          <Link href="/contact" className="underline">
            tell us about it
          </Link>{" "}
          — we&rsquo;ll help you find the right room.
        </Annotation>
      </section>

      <div className="pt-6 pb-4">
        <Annotation>
          ↳ want to see it in person?{" "}
          <Link href="/programs/field-trips" className="underline">
            book a field trip
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="underline">
            come say hi
          </Link>
        </Annotation>
      </div>
    </>
  );
}
