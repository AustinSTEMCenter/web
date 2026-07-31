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
            Learning that <span className="hl">leaves the classroom.</span>
          </>
        }
        doodle={<Lightbulb className="h-16 rotate-6 text-gold/70" />}
      >
        <div className="prose-note mt-6">
          <p>
            At the Austin STEM Center (ASC), we create the space and
            opportunity for learning to leave the classroom and come to life in
            the real world. We believe that when learning is hands-on, applied,
            and connected to real challenges, that is where true impact is
            made. ASC is innovating how STEM is taught by making learning
            active, accessible, and grounded in real tools, systems, and
            problem-solving.
          </p>
          <p>
            As a nonprofit innovation hub partnered with ATX Robotics Inc., ASC
            brings together schools, companies, and communities to grow real
            talent and solve real problems. Our facilities and programs support
            a wide range of learning experiences, including robotics,
            engineering, manufacturing, and emerging technologies. With spaces
            like our in-house FIRST Robotics arena alongside fabrication labs
            and learning environments, ASC functions as a support community
            where learners can explore interests, build skills, and discover
            pathways connected to real-world applications.
          </p>
        </div>
      </PageIntro>

      <figure className="photo mt-10 max-w-[560px] -rotate-[0.8deg]">
        <Image
          src="/images/about/workshop.jpg"
          alt="Hands-on learning at the Austin STEM Center"
          width={1200}
          height={900}
          className="w-full"
        />
        <figcaption className="pt-2 text-center font-hand text-[16px] text-brand-blue">
          real tools, real problems
        </figcaption>
      </figure>

      {/* team */}
      <section className="pt-20">
        <p className="mb-2 font-hand text-[18px] text-brand-blue">the crew</p>
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
                        width={300}
                        height={300}
                        className="w-full border border-ink/10 [filter:grayscale(1)_sepia(0.22)_brightness(1.03)]"
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
                    <span className="italic text-ink-soft"> — {m.title}</span>
                  </span>
                ))}
              </p>
            )}
          </div>
        ))}
      </section>

      {/* history */}
      <section className="pt-20">
        <p className="mb-2 font-hand text-[18px] text-brand-blue">
          how it started
        </p>
        <SectionHeading>The history of the Austin STEM Center.</SectionHeading>
        <div className="prose-note mt-6">
          <p>
            In 2025, Peter Wang, Evan Marchman, and Ken Hawthorn came
            together with a shared vision: to create a place where students
            could truly experience STEM through hands-on learning, innovation,
            and real-world opportunity. Each founder brought a unique set of
            skills, experience, and perspective to the table, alongside the
            foundational support and investment provided by Peter Wang.
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
            If our mission resonates with you, we invite you to support this
            work. Your donation helps expand access to high-impact STEM
            learning experiences and ensures that more learners have the
            opportunity to explore, build, and discover what is possible.
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
