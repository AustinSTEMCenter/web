import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/notebook";
import { ProgramPage } from "@/components/program-page";
import { classes } from "@/lib/data/classes";
import { getProgram } from "@/lib/data/programs";
import { dateParts, todayInAustin } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Hands-on, three-hour Sunday STEM classes in the shops and labs at the Austin STEM Center.",
};

// drop classes from the list once they've happened
export const revalidate = 3600;

export default function ClassesPage() {
  const today = todayInAustin();
  const upcoming = classes.filter((c) => c.date >= today);

  return (
    <ProgramPage program={getProgram("classes")!}>
      <section id="upcoming" className="mt-16">
        <SectionHeading>Upcoming classes</SectionHeading>
        {upcoming.length > 0 ? (
          <div className="mt-6 max-w-[760px] space-y-5">
            {upcoming.map((c) => {
              const { weekday, month, day } = dateParts(c.date);
              return (
                <article
                  key={c.slug}
                  className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-6 border border-ink/18 bg-card px-6 py-5 shadow-[2px_3px_0_rgba(56,52,42,0.1)] max-sm:gap-x-4 max-sm:px-4"
                >
                  <time
                    dateTime={c.date}
                    className="flex flex-col items-center self-start border border-ink/18 bg-card py-2 shadow-[2px_2px_0_rgba(56,52,42,0.1)]"
                  >
                    <span className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-soft">
                      {weekday}
                    </span>
                    <span className="text-[26px] leading-tight font-bold">
                      {day}
                    </span>
                    <span className="font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-rust">
                      {month}
                    </span>
                  </time>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                      <h3 className="text-[19px] font-bold">{c.name}</h3>
                      <p className="font-hand text-[23px] text-rust">
                        {c.price}
                      </p>
                    </div>
                    <p className="text-[14.5px] italic text-ink-soft">
                      {c.ages} · {c.time} · up to {c.capacity} students
                    </p>
                    <p className="mt-2 text-[15.5px] leading-relaxed">
                      {c.description}
                    </p>
                    {c.registerUrl ? (
                      <a
                        href={c.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block rounded-[3px] bg-rust px-5 py-2.5 text-[15px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        Register →
                      </a>
                    ) : (
                      <p className="mt-3 font-hand text-[20px] text-ink-soft">
                        registration opens soon
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-3 max-w-[60ch] text-[17px] text-ink-soft">
            New classes are on the way. Get in touch and we&rsquo;ll let you
            know when the next ones are scheduled.
          </p>
        )}
        <p className="mt-6 text-[16px]">
          Registration and payment happen on Givebutter. Questions first?{" "}
          <Link
            href="/contact"
            className="italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            Get in touch →
          </Link>
        </p>
      </section>
    </ProgramPage>
  );
}
