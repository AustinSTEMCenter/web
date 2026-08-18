import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "@/components/doodles";
import { PageIntro, SectionHeading } from "@/components/notebook";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description: "Field trips, summer camps, and after-school STEM clubs at the Austin STEM Center.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageIntro
        note="field notes — what we run"
        title={
          <>
            Hands-on learning, <span className="hl-teal">real-world impact.</span>
          </>
        }
        doodle={<Rocket className="h-16 -rotate-12 text-rust/45" />}
      >
        <div className="prose-note mt-6 max-w-[56ch] text-[17px] text-ink-soft">
          <p>
            Every program at Austin STEM Center is designed around one simple belief: people learn
            best by doing.
          </p>
          <p>
            Whether they&rsquo;re building a robot, designing a prototype, programming electronics,
            or tackling an engineering challenge, participants gain more than technical skills. They
            build confidence, strengthen problem-solving abilities, spark curiosity, and discover
            what&rsquo;s possible when they&rsquo;re given the opportunity to create.
          </p>
          <p>
            Our programs don&rsquo;t just teach STEM. They prepare people to think critically,
            collaborate, and solve the challenges of tomorrow.
          </p>
        </div>
      </PageIntro>

      <div className="mt-14 space-y-14">
        {programs.map((p, i) => (
          <section
            key={p.slug}
            className={`grid items-start gap-x-10 gap-y-5 max-md:grid-cols-1 ${i % 2 ? "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"}`}
          >
            <figure
              className={`photo max-w-[380px] transition-transform duration-200 ease-out hover:rotate-0 ${i % 2 ? "rotate-[0.8deg] md:order-2 md:justify-self-end" : "-rotate-[0.7deg]"}`}
            >
              <Link href={p.href} className="block">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={760}
                  height={475}
                  className="aspect-[8/5] w-full object-cover"
                />
              </Link>
            </figure>
            <div className={i % 2 ? "md:order-1" : ""}>
              <h2 className="text-[24px] font-bold">
                <Link href={p.href} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.75]">{p.about[0]}</p>
              <p className="mt-4">
                <Link
                  href={p.href}
                  className="text-[15px] italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
                >
                  read more →
                </Link>
              </p>
            </div>
          </section>
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
          <p className="mb-2 font-hand text-[21px] text-brand-blue">want to team up?</p>
          <SectionHeading>Partnership &amp; collaboration opportunities.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              Austin STEM Center welcomes educators, industry professionals, nonprofits, clubs, and
              organizations interested in bringing high-quality STEM experiences to our community.
              If you have a program, workshop, club, camp, or class you&rsquo;d like to offer,
              we&rsquo;d love to explore partnering with you.
            </p>
            <p>
              Contact us to discuss collaborative programming, facility use, revenue-sharing
              opportunities, or custom partnership agreements.
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
