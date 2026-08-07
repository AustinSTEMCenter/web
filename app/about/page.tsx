import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Lightbulb } from "@/components/doodles";
import { Annotation, PageIntro, SectionHeading } from "@/components/notebook";
import { teamGroups } from "@/lib/data/team";

export const metadata: Metadata = {
  title: "About",
  description:
    "Austin STEM Center is a nonprofit innovation hub partnered with ATX Robotics Inc., bringing schools, companies, and communities together to grow real talent and solve real problems.",
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
        <div className="prose-note mt-6">
          <p>
            Austin STEM Center (ASC) is a nonprofit STEM education and innovation hub 
            dedicated to making STEM accessible, exciting, and hands-on for learners of all ages.
          </p>
          <p>
            We believe the most meaningful learning happens through experience.
            When people are given the opportunity to explore, build,
            experiment, and solve real-world challenges, they don&rsquo;t
            just gain technical skills &mdash; they develop confidence,
            creativity, curiosity, and the ability to think critically.
          </p>
          <p>
            That&rsquo;s why everything we do is designed to move beyond
            traditional instruction and into authentic, hands-on learning
            experiences that inspire lifelong learning.
          </p>
          <p>
            Working alongside educators, schools, families, industry partners,
            and our robotics affiliate ATX Robotics Inc., we&rsquo;re building a
            community where learners discover their passions, develop practical
            skills, and prepare for the opportunities of tomorrow.
          </p>
          <p>
            From robotics and engineering to manufacturing, digital
            fabrication, and emerging technologies, Austin STEM Center provides
            access to professional learning environments where ideas become
            reality and curiosity becomes capability.
          </p>
          <p>
            Together, we&rsquo;re creating a future where more people have the
            confidence to build, innovate, and shape the world around them.
          </p>
        </div>
      </PageIntro>

      <figure className="photo mt-10 max-w-[480px] -rotate-[0.8deg]">
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

      {/* team */}
      <section className="pt-20">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">the crew</p>
        <SectionHeading>Meet the team.</SectionHeading>
        {teamGroups.map(({ group, members }) => (
          <div key={group} className="pt-10">
            <h3 className="text-[15px] font-semibold italic text-ink-soft">
              {group}
            </h3>
            {members.some((m) => m.image) ? (
              <div className="mt-5 flex flex-wrap justify-evenly gap-x-6 gap-y-8">
                {members.map((m) => (
                  <div key={m.name} className="w-[150px]">
                    {m.image && (
                      <Image
                        src={m.image}
                        alt={m.name}
                        width={270}
                        height={300}
                        className="h-auto w-full border border-ink/10 [filter:grayscale(1)_sepia(0.22)_brightness(1.03)]"
                      />
                    )}
                    <p className="mt-2 text-[16px] leading-tight font-bold">
                      {m.name}
                    </p>
                    <p className="mt-0.5 text-[13px] leading-snug italic text-ink-soft">
                      {m.title}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 flex flex-wrap gap-x-8 gap-y-1.5 text-[16px]">
                {members.map((m) => (
                  <span key={m.name}>
                    <b className="font-bold">{m.name}</b>
                    <span className="italic text-ink-soft"> · {m.title}</span>
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* history */}
      <section className="pt-20">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          how it started
        </p>
        <SectionHeading>The history of the Austin STEM Center.</SectionHeading>
        <div className="prose-note mt-6">
          <p>
            In 2025, Peter Wang, Evan Marchman, and Ken Hawthorn came
            together with a shared vision: to create a place where students
            could truly experience STEM through hands-on learning, innovation,
            and real-world opportunity. Each founder brought different
            skills, experience, and perspective to the table, along with
            foundational support and investment from Peter Wang.
          </p>
          <p>
            Within just a few short months, a building was secured, an
            incredible team was assembled, and Austin STEM Center began
            building programs designed to ignite curiosity, creativity, and
            confidence in students of all backgrounds.
          </p>
          <p>
            Today, Austin STEM Center exists to inspire the next generation of
            innovators, problem-solvers, engineers, and leaders by making STEM
            education accessible, engaging, and impactful for the community.
          </p>
        </div>
        <Annotation className="mt-4">
          ↳ zero to open doors in a few short months!
        </Annotation>
      </section>

      {/* donate */}
      <section className="pt-20 pb-4">
        <div className="tape relative max-w-[560px] rotate-[0.6deg] border border-ink/18 bg-card px-7 pt-8 pb-7 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
          <h2 className="text-[21px] font-bold">Support this work</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            If our mission resonates with you, we&rsquo;d love your support.
            Your donation expands access to hands-on STEM learning and gives
            more learners the chance to explore, build, and discover
            what&rsquo;s possible.
          </p>
          <Link
            href="/donate"
            className="mt-5 inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Donate here →
          </Link>
        </div>
      </section>
    </>
  );
}
