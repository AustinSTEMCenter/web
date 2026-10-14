import type { Metadata } from "next";
import Link from "next/link";
import { Gear } from "@/components/doodles";
import { PageIntro, SectionHeading } from "@/components/notebook";

export const metadata: Metadata = {
  title: "About ATX Robotics",
  description:
    "ATX Robotics sponsors Howdy Bots FRC 6377 and the North Austin Science Alliance, providing hands-on STEAM programs to Austin-area youth of all ages.",
};

export default function AtxRoboticsPage() {
  return (
    <>
      <PageIntro
        title={
          <>
            About <span className="hl">ATX Robotics.</span>
          </>
        }
        doodle={<Gear className="h-16 -rotate-12 text-gold/70" />}
      >
        <div className="prose-note mt-6">
          <p>
            ATX Robotics sponsors Howdy Bots FRC 6377, a 501(c)(3) nonprofit in
            the State of Texas.
          </p>
          <p>
            We provide quality STEAM programs to youth of all ages in the Austin
            area, regardless of their educational status or ability. Our
            organization focuses on providing access to robotics competitions to
            students who are otherwise ineligible to participate because they
            are not enrolled in a traditional school or lack access to a team at
            their school. We provide students the opportunity to work
            shoulder-to-shoulder with volunteer professional engineers and
            business people to collaborate in hands-on activities designed to
            foster interest and to promote education in science, technology,
            engineering, art, and mathematics (STEAM). Though we started as a
            high school-age robotics team competing in the FIRST Robotics
            Competition, we have a much bigger vision of expanding robotics and
            STEAM education to children of all ages.
          </p>
        </div>
      </PageIntro>

      {/* NASA */}
      <section className="pt-16">
        <SectionHeading>North Austin Science Alliance (NASA).</SectionHeading>
        <div className="prose-note mt-6">
          <p>
            In addition to the Howdy Bots 6377, ATX Robotics currently sponsors
            a second program, the North Austin Science Alliance (NASA). Added in
            2017, NASA is a weekly program that allows kids from age 6 through
            18 to explore a wide range of hands-on science topics, including
            visits from guest speakers. Additionally, NASA offers kids the
            chance to participate in 3 different nationally recognized
            competitions: Science Bowl, Science Fest, and Science Olympiad.
          </p>
        </div>
      </section>

      <p className="pt-16 pb-4 text-[15px] italic text-ink-soft">
        ATX Robotics, Inc. does business as Austin STEM Center.{" "}
        <Link
          href="/about"
          className="underline decoration-brand-blue/50 underline-offset-[3px]"
        >
          Read the full story →
        </Link>
      </p>
    </>
  );
}
