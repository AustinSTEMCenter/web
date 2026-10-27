import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "@/components/doodles";
import { PageIntro, SectionHeading } from "@/components/notebook";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Labs, summer camps, STEM clubs, and field trips at the Austin STEM Center.",
};

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
      >
        <div className="prose-note mt-6 max-w-[56ch] text-[17px] text-ink-soft">
          <p>
            Every program at Austin STEM Center is designed around one simple
            belief: people learn best by doing.
          </p>
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
      </PageIntro>

      <div className="mt-14 grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-y-10">
        {programs.map((p, i) => (
          <Link
            key={p.slug}
            id={p.slug}
            href={p.href}
            className={`tape relative flex flex-col border border-ink/18 bg-card p-4 pb-3.5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0 ${
              ["-rotate-[0.8deg]", "rotate-[0.7deg]", "-rotate-[0.5deg]", "rotate-[0.6deg]"][i % 4]
            }`}
          >
            <Image
              src={p.image}
              alt=""
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
      </div>

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
        <div className="md:order-1">
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
            className="mt-6 inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Contact us →
          </Link>
        </div>
      </section>
    </>
  );
}
