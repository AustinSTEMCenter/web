import type { Metadata } from "next";
import Link from "next/link";
import { PaperPlane } from "@/components/doodles";
import { PageIntro } from "@/components/notebook";
import { todayInAustin } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Tours & Open House",
  description:
    "Visit the Austin STEM Center: book a guided tour of our shops, labs, and FIRST Robotics arena, or drop in at our next open house.",
};

// re-render hourly so the open house drops off once it has passed
export const revalidate = 3600;

// TODO(content): add the start/end time once leadership confirms it.
const openHouse = { date: "2026-10-23", label: "Friday, October 23" };

export default function ToursPage() {
  const openHouseUpcoming = openHouse.date >= todayInAustin();

  return (
    <>
      <PageIntro
        note="field notes — come see it"
        title={
          <>
            Tours &amp; <span className="hl-teal">open house.</span>
          </>
        }
        doodle={<PaperPlane className="h-11 -rotate-6 text-brand-blue/50" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          The best way to understand Austin STEM Center is to walk through
          it. See the FIRST Robotics arena, the wood and machine shops, the
          electronics lab, and the makerspace, and meet the people who run
          them.
        </p>
      </PageIntro>

      <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
        <section
          id="tours"
          className="tape relative -rotate-[0.5deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]"
        >
          <h2 className="text-[19px] font-bold">Guided tours</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            A walk-through of the center for families, schools, companies,
            and community groups curious about what we do.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
            Tours are arranged by request. Tell us when you&rsquo;d like to
            visit and how many people are coming, and we&rsquo;ll find a time
            that works.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block rounded-[3px] bg-brand-blue px-5 py-2.5 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)]"
          >
            Book a tour →
          </Link>
        </section>

        <section
          id="open-house"
          className="tape relative rotate-[0.6deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]"
        >
          <h2 className="text-[19px] font-bold">Open house</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Discover what STEM learning can look like at Austin STEM Center.
            Explore the center and learn about opportunities for your child
            to build curiosity, creativity, and problem-solving skills.
          </p>
          {openHouseUpcoming ? (
            <p className="mt-4 font-hand text-[23px] leading-tight text-rust">
              {openHouse.label} · free
            </p>
          ) : (
            <p className="mt-4 font-hand text-[21px] text-rust">
              next open house date coming soon
            </p>
          )}
        </section>
      </div>
    </>
  );
}
