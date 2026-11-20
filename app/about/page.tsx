import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb } from "@/components/doodles";
import {
  Annotation,
  NoteCard,
  PageIntro,
  SectionHeading,
} from "@/components/notebook";
import { programs } from "@/lib/data/programs";
import { site } from "@/lib/data/site";
import { boardOfDirectors, teamGroups, type TeamMember } from "@/lib/data/team";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Austin STEM Center is a nonprofit innovation hub and a program of ATX Robotics, Inc., bringing schools, companies, and communities together to grow real talent and solve real problems.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro
        note="field notes — who we are"
        title={
          <>
            Preparing today&rsquo;s learners for{" "}
            <span className="hl">tomorrow&rsquo;s challenges.</span>
          </>
        }
        doodle={<Lightbulb className="h-16 rotate-6 text-gold/70" />}
      >
        <div className="prose-note">
          <p>
            Austin STEM Center (ASC) is a nonprofit STEM education and innovation hub
            dedicated to making STEM accessible, exciting, and hands-on for learners of all ages.
          </p>
          <p>
            Together, we&rsquo;re creating a future where everyone has the confidence
            to build, innovate, and shape the world around them.
          </p>
        </div>
        {/* the way onward: most visitors read this page before picking a
            program or a visit, so give them both without scrolling to donate */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Link
            href="/programs"
            className="btn btn-blue"
          >
            Explore our programs →
          </Link>
          <Link href="/tours" className="text-link">
            book a tour →
          </Link>
        </div>
      </PageIntro>

      <figure className="photo mt-7 max-w-[480px] -rotate-[0.8deg]">
        <Image
          src="/images/about/team.jpg"
          alt="The Austin STEM Center team"
          width={1246}
          height={1188}
          className="w-full"
        />
        <figcaption className="pt-2 text-center font-hand text-[19px] text-brand-blue">
          the people who make it happen
        </figcaption>
      </figure>

      {/* what we believe */}
      <section className="pt-20">
        <NoteCard className="max-w-[680px] -rotate-[0.3deg]">
          <p className="mb-2 font-hand text-[21px] text-brand-blue">
            what we believe
          </p>
          <SectionHeading>Meaningful learning happens through experience.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              We adamantly believe meaningful learning happens through experience. When people are
              given the opportunity to launch curiosity through fearless exploration, they not only
              gain technical skills, but also become empowered to think critically, solve problems creatively,
              and shape their future. We break down barriers to help every learner discover that STEM is a
              mindset that applies to the things they already love.
            </p>
            <p>
              Working alongside educators, schools, families, and industry partners, Austin STEM Center is
              building a community where learners discover their passions, develop their skills, and prepare
              for the rapidly evolving future of technology and robotics. As the leading robotics hub in Central
              Texas, we connect students with competitive robotics, engineering, and hands-on experiences that
              inspire innovation and lifelong learning.
            </p>
          </div>
        </NoteCard>
      </section>

      {/* programs */}
      <section className="pt-20">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">what we run</p>
        <SectionHeading>Our programs.</SectionHeading>
        <ul className="mt-8 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {programs.map((p) => (
            <li key={p.slug}>
              <Link
                href={p.href}
                className="block h-full border border-ink/18 bg-card px-5 pt-4 pb-4 shadow-[2px_3px_0_rgba(56,52,42,0.1)] transition-transform duration-150 hover:-translate-y-0.5"
              >
                <h3 className="text-[18px] leading-snug font-bold">{p.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                  {p.teaser}
                </p>
                <span className="text-link mt-2 inline-block">read more →</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* board */}
      <section id="board" className="scroll-mt-24 pt-20">
        <NoteCard>
          <p className="mb-2 font-hand text-[21px] text-brand-blue">who we answer to</p>
          <SectionHeading>Board of directors.</SectionHeading>
          <p className="mt-4 max-w-[60ch] text-[16px] leading-relaxed text-ink-soft">
            Leaders in engineering, business, and education who oversee{" "}
            {site.legalName}, the nonprofit that operates Austin STEM Center.
          </p>
          <PeopleGrid members={boardOfDirectors} />
        </NoteCard>
      </section>

      {/* team */}
      <section className="pt-20">
        <NoteCard>
          <p className="mb-2 font-hand text-[21px] text-brand-blue">the crew</p>
          <SectionHeading>Meet the team.</SectionHeading>
          {teamGroups.map(({ group, members }) => (
            <div key={group} className="mx-auto max-w-[920px] pt-14 text-center">
              <h3 className="text-[15px] font-semibold italic text-ink-soft">
                {group}
              </h3>
              <PeopleGrid members={members} />
            </div>
          ))}
        </NoteCard>
      </section>

      {/* history */}
      <section className="pt-20">
        <NoteCard className="max-w-[680px] rotate-[0.3deg]">
          <p className="mb-2 font-hand text-[21px] text-brand-blue">
            how it started
          </p>
          <SectionHeading>The history of the Austin STEM Center.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
            Austin STEM Center&rsquo;s history began with ATX Robotics, Inc., a nonprofit organization
            founded by Evan Marchman to expand access to robotics, engineering, and hands-on STEAM
            education. In 2025, Evan met Peter Wang and Ken Hawthorn, who shared a vision: to create
            a place where students could truly experience STEM through hands-on learning, innovation,
            and real-world opportunity. Each founder brought different skills, experience, and perspective
            to the table, along with foundational support and investment from Peter Wang.
            </p>
            <p>
            Within just a few short months, ATX Robotics, Inc., d/b/a Austin STEM Center was created.
            A building was secured, an incredible team was assembled, and ASC began building programs
            designed to ignite curiosity, creativity, and confidence in students of all backgrounds.
            </p>
            <p>
            Today, Austin STEM Center exists to inspire the next generation of innovators, problem-solvers,
            engineers, and leaders by making STEM education accessible, engaging, and impactful for the community.
            </p>
          </div>
          <Annotation className="mt-4">
            ↳ zero to open doors in a few short months!
          </Annotation>
        </NoteCard>
      </section>

      {/* governance: funders get sent here directly, so keep it short */}
      <section className="pt-20">
        <NoteCard flat className="max-w-[680px]">
          <h2 className="text-[19px] font-bold">Financials and governance.</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Austin STEM Center is operated by {site.legalName}, a 501(c)(3)
            nonprofit (EIN {site.ein}). Our legal structure, tax documents, and
            governance details are all in one place.
          </p>
          <Link href="/about/financials-and-governance" className="text-link mt-3 inline-block">
            financials &amp; governance →
          </Link>
        </NoteCard>
      </section>

      {/* donate */}
      <section className="pt-20 pb-4">
        <div className="tape relative max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
          <h2 className="text-[19px] font-bold">Support this work.</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            If our mission resonates with you, we&rsquo;d love your support.
            Your donation expands access to hands-on STEM learning and gives
            more learners the chance to explore, build, and discover
            what&rsquo;s possible.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href={site.donateUrl}
              className="btn btn-blue"
            >
              Donate here →
            </a>
            <Link href="/contact" className="text-link">
              or get in touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/** Portrait grid when anyone has a photo, otherwise a name list. */
function PeopleGrid({ members }: { members: TeamMember[] }) {
  if (!members.some((m) => m.image)) {
    return (
      <p className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-1.5 text-[16px]">
        {members.map((m) => (
          <span key={m.name}>
            <b className="font-bold">{m.name}</b>
            <span className="italic text-ink-soft"> · {m.title}</span>
          </span>
        ))}
      </p>
    );
  }
  /* four 180px portraits plus three 48px gaps fit in 920px, so a four-person
     group stays on one row instead of orphaning one */
  return (
    <div className="mx-auto mt-6 flex max-w-[920px] flex-wrap justify-center gap-x-5 gap-y-9 text-center sm:gap-x-12 sm:gap-y-12">
      {members.map((m) => (
        <div
          key={m.name}
          className="w-[calc(50%-11px)] max-w-[140px] sm:w-[180px] sm:max-w-none"
        >
          {m.image && (
            <Image
              src={m.image}
              alt={m.name}
              width={270}
              height={300}
              className="aspect-[9/10] w-full border border-ink/10 object-cover object-top"
            />
          )}
          <p className="mt-3 text-[16px] leading-tight font-bold">{m.name}</p>
          <p className="mt-1 text-[13px] leading-snug italic text-ink-soft">
            {m.title}
          </p>
        </div>
      ))}
    </div>
  );
}
