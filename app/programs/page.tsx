import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "@/components/doodles";
import { NoteCard, PageIntro, SectionHeading } from "@/components/notebook";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  alternates: { canonical: "/programs" },
  title: "STEM Programs for Kids in Austin",
  description:
    "Labs, summer camps, STEM clubs, field trips, and the Howdy Bots robotics team at the Austin STEM Center.",
};

const cardClass =
  "tape relative flex flex-col border border-ink/18 bg-card p-4 pb-3.5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0";

const tilts = ["-rotate-[0.8deg]", "rotate-[0.7deg]", "-rotate-[0.5deg]", "rotate-[0.6deg]"];

export default function ProgramsPage() {
  return (
    <>
      <PageIntro
        note="field notes — what we run"
        title={
          <>
            Hands-on learning,{" "}
            <span className="hl-teal">real-world impact.</span>
          </>
        }
        doodle={<Rocket className="h-16 -rotate-12 text-rust/45" />}
        centered
      >
        <p className="text-[17px] text-ink-soft">
          Every program at Austin STEM Center is designed around one simple
          belief: people learn best by doing.
        </p>
      </PageIntro>

      {/* the cards come first: this is what people arrive here to compare */}
      <div className="mt-12 grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-y-10">
        {programs.map((p, i) => (
          <Link
            key={p.slug}
            id={p.slug}
            href={p.href}
            className={`${cardClass} ${tilts[i % tilts.length]}`}
          >
            <Image
              src={p.image}
              alt={p.imageAlt}
              width={640}
              height={400}
              className="aspect-[8/5] w-full border border-ink/10 object-cover"
            />
            <h2 className="mt-3.5 text-[18px] leading-snug font-bold">
              {p.title}
            </h2>
            <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
              {p.teaser}
            </p>
            <div className="mt-auto flex flex-wrap items-baseline justify-between gap-x-3 pt-3.5">
              <span className="text-[14px] italic text-brand-blue">
                read more →
              </span>
              {p.pricing && (
                <span className="font-hand text-[20px] text-rust">
                  from {p.pricing.rows[0].price}
                </span>
              )}
            </div>
          </Link>
        ))}

        {/* fills the sixth slot of the grid and gives undecided visitors a
            next step that isn't a program */}
        <Link
          href="/tours"
          className={`${cardClass} ${tilts[programs.length % tilts.length]}`}
        >
          <Image
            src="/images/facilities/machine-shop.jpg"
            alt="Students and a mentor at the CNC mill in the machine shop"
            width={640}
            height={400}
            className="aspect-[8/5] w-full border border-ink/10 object-cover"
          />
          <p className="mt-3.5 font-hand text-[19px] leading-none text-brand-blue">
            not sure where to start?
          </p>
          <h2 className="mt-1.5 text-[18px] leading-snug font-bold">
            Come see the space.
          </h2>
          <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
            Walk through the shops, labs, and FIRST Arena with the people who
            run them, then pick the program that fits.
          </p>
          <span className="mt-auto pt-3.5 text-[14px] italic text-brand-blue">
            book a tour →
          </span>
        </Link>
      </div>

      {/* why hands-on */}
      <section className="pt-20">
        <NoteCard className="mx-auto max-w-[680px] rotate-[0.3deg] text-center">
          <p className="mb-2 font-hand text-[21px] text-brand-blue">
            why we teach this way
          </p>
          <SectionHeading>More than technical skills.</SectionHeading>
          <div className="prose-note mx-auto mt-6">
            <p>
              Whether they&rsquo;re building a robot, designing a prototype,
              programming electronics, or tackling an engineering challenge,
              participants gain more than technical skills. They build
              confidence, strengthen problem-solving abilities, spark
              curiosity, and discover what&rsquo;s possible when they&rsquo;re
              given the opportunity to create.
            </p>
            <p>
              Our programs don&rsquo;t just teach STEM. They prepare people to
              think critically, collaborate, and solve the challenges of
              tomorrow.
            </p>
          </div>
        </NoteCard>
      </section>

      {/* partnerships */}
      <section className="grid items-start gap-x-10 gap-y-5 pt-20 pb-4 max-md:grid-cols-1 grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <figure className="photo max-w-[380px] rotate-[0.8deg] md:order-2 md:justify-self-end">
          <Image
            src="/images/programs/partnership.jpg"
            alt="Partners collaborating at the Austin STEM Center"
            width={760}
            height={570}
            className="aspect-[4/3] w-full object-cover"
          />
          {/* <figcaption className="pt-2 text-center font-hand text-[19px] text-brand-blue">
            lego donation from GASE
          </figcaption> */}
        </figure>
        <NoteCard className="-rotate-[0.3deg] md:order-1">
          <p className="mb-2 font-hand text-[21px] text-brand-blue">
            want to team up?
          </p>
          <SectionHeading>Partnership &amp; collaboration opportunities.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              Austin STEM Center welcomes educators, industry professionals,
              nonprofits, clubs, and organizations interested in bringing
              high-quality STEM experiences to our community. If you have a
              program, workshop, club, camp, or class you&rsquo;d like to offer,
              we&rsquo;d love to explore partnering with you.
            </p>
            <p>
              Contact us to discuss collaborative programming, facility use,
              revenue-sharing opportunities, or custom partnership
              agreements.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn btn-blue mt-6"
          >
            Contact us →
          </Link>
        </NoteCard>
      </section>
    </>
  );
}
