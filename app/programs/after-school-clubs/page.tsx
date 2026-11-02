import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageIntro, SectionHeading } from "@/components/notebook";
import {
  audiences,
  CLUB_CAPACITY,
  type ClubAudience,
  clubs,
} from "@/lib/data/clubs";
import { getProgram } from "@/lib/data/programs";
import { dateParts, todayInAustin, weekday } from "@/lib/dates";

export const metadata: Metadata = {
  title: "STEM Clubs",
  description:
    "STEM Clubs at the Austin STEM Center: Design & Build and Spark & Motion, meeting after school and during the day for homeschool students. $50 a session or $150 for four.",
};

// drop past club dates as the season goes on
export const revalidate = 3600;

const labelClass =
  "font-sans text-[11px] font-semibold tracking-[0.12em] uppercase text-ink-soft";

// after-school is blue, homeschool is purple, everywhere a meeting shows up
const audienceStyle: Record<
  ClubAudience,
  { badge: string; top: string; side: string }
> = {
  "after-school": {
    badge: "bg-brand-blue",
    top: "border-t-brand-blue",
    side: "border-l-brand-blue",
  },
  homeschool: {
    badge: "bg-ring-purple",
    top: "border-t-ring-purple",
    side: "border-l-ring-purple",
  },
};

function AudienceBadge({ audience }: { audience: ClubAudience }) {
  return (
    <span
      className={`inline-block rounded-[3px] px-2.5 py-1 font-sans text-[12px] leading-none font-semibold tracking-[0.1em] text-paper uppercase ${audienceStyle[audience].badge}`}
    >
      {audiences[audience].label}
    </span>
  );
}

export default function AfterSchoolClubsPage() {
  const program = getProgram("after-school-clubs")!;
  const today = todayInAustin();

  // upcoming weekly meetings split by audience, in weekday order, for the
  // at-a-glance strip
  const week = (Object.keys(audiences) as ClubAudience[])
    .map((audience) => ({
      audience,
      meetings: clubs
        .flatMap((club) =>
          club.meetings
            .filter(
              (m) =>
                m.audience === audience && m.dates.some((d) => d >= today),
            )
            .map((m) => ({ club, meeting: m })),
        )
        .sort((a, b) => a.meeting.weekday - b.meeting.weekday),
    }))
    .filter((group) => group.meetings.length > 0);

  return (
    <>
      <PageIntro
        title={<span className="hl-green">STEM clubs.</span>}
      >
        {program.about.map((p, i) => (
          <p
            key={p.slice(0, 32)}
            className={`${i ? "mt-4" : "mt-5"} max-w-[56ch] text-[17px] text-ink-soft`}
          >
            {p}
          </p>
        ))}
      </PageIntro>

      <section className="pt-14">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          fall 2026 schedule
        </p>
        <SectionHeading>Pick your club.</SectionHeading>
        <p className="mt-3 max-w-[60ch] text-[17px] text-ink-soft">
          Two clubs, each running the same projects on two schedules: after
          school, and during the day for homeschool students. Groups are capped at{" "}
          {CLUB_CAPACITY} students, so register at least a week before each
          session.
        </p>

        {/* week at a glance */}
        {week.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10 max-lg:grid-cols-1">
            {week.map(({ audience, meetings }) => (
              <div key={audience}>
                <h3>
                  <AudienceBadge audience={audience} />
                </h3>
                <p className="mt-2 text-[15px] italic text-ink-soft">
                  {audiences[audience].who}
                </p>
                <ol className="mt-3 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  {meetings.map(({ club, meeting }) => (
                    <li key={`${club.slug}-${meeting.weekday}`}>
                      <Link
                        href={`#${club.slug}`}
                        className={`block h-full border border-ink/18 border-t-[3px] bg-card px-4 pt-3 pb-3.5 shadow-[2px_3px_0_rgba(56,52,42,0.1)] transition-transform duration-150 hover:-translate-y-0.5 ${audienceStyle[audience].top}`}
                      >
                        <p className={labelClass}>{meeting.day}</p>
                        <p className="mt-1 text-[18px] leading-tight font-bold">
                          {club.name}
                        </p>
                        <p className="mt-2 text-[14.5px] leading-snug text-ink-soft">
                          {meeting.time}
                          <br />
                          {meeting.ages}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}

        <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-14 max-md:grid-cols-1">
          {clubs.map((club) => (
            <article
              key={club.slug}
              id={club.slug}
              className="mx-auto w-full max-w-[440px] border border-ink/18 bg-card shadow-[2px_3px_0_rgba(56,52,42,0.1)]"
            >
              <Image
                src={club.image}
                alt={`STEM Club: ${club.name} poster`}
                width={880}
                height={880}
                sizes="(max-width: 768px) 100vw, 440px"
                loading="eager"
                className="aspect-square w-full border-b border-ink/18 object-cover"
              />
              <div className="px-6 pt-5 pb-6 max-sm:px-4">
                <h3 className="text-[24px] font-bold">{club.name}</h3>
                <p className="mt-2 text-[16px] leading-[1.75]">
                  {club.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {club.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-[3px] border border-ink/25 bg-card px-2.5 py-1 text-[13.5px] italic"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 space-y-6 border-t border-ink/20 pt-6">
                  {club.meetings.every((m) =>
                    m.dates.every((d) => d < today),
                  ) && (
                    <p className="text-[15px] italic text-ink-soft">
                      New dates are on the way. Get in touch to hear when
                      they&rsquo;re scheduled.
                    </p>
                  )}
                  {club.meetings.map((meeting) => {
                    const upcoming = meeting.dates.filter((d) => d >= today);
                    return (
                      upcoming.length > 0 && (
                        <div
                          key={meeting.audience}
                          className={`border-l-[3px] pl-4 ${audienceStyle[meeting.audience].side}`}
                        >
                          <h4>
                            <AudienceBadge audience={meeting.audience} />
                          </h4>
                          <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 gap-y-2 text-[15.5px]">
                            <dt className={`${labelClass} pt-[3px]`}>When</dt>
                            <dd className="font-bold">
                              {meeting.day}, {meeting.time}
                            </dd>
                            <dt className={`${labelClass} pt-[3px]`}>Ages</dt>
                            <dd>{meeting.ages.replace(/^Ages /, "")}</dd>
                            <dt className={`${labelClass} pt-[3px]`}>Room</dt>
                            <dd>{meeting.room}</dd>
                            <dt className={`${labelClass} pt-[5px]`}>Dates</dt>
                            <dd>
                              <ul className="flex flex-wrap gap-1.5">
                                {upcoming.map((date) => {
                                  const offDay =
                                    weekday(date) !== meeting.weekday;
                                  const { weekday: wd, month, day } =
                                    dateParts(date);
                                  return (
                                    <li
                                      key={date}
                                      className={`rounded-[3px] border px-2 py-0.5 text-[13.5px] ${
                                        offDay
                                          ? "border-rust/60 bg-rust/5 text-rust"
                                          : "border-ink/20 bg-card"
                                      }`}
                                    >
                                      {offDay && `${wd} `}
                                      {month} {day}
                                    </li>
                                  );
                                })}
                              </ul>
                            </dd>
                          </dl>
                        </div>
                      )
                    );
                  })}
                  {club.registerUrl &&
                    club.meetings.some((m) =>
                      m.dates.some((d) => d >= today),
                    ) && (
                      <a
                        href={club.registerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-[3px] bg-rust px-6 py-3 text-[15.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                      >
                        Register for {club.name} →
                      </a>
                    )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-20 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-12 max-md:grid-cols-1">
        <div>
          {program.pricing && (
            <>
              <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
                {program.pricing.heading}
              </h2>
              <div className="mt-2 max-w-[62ch]">
                {program.pricing.rows.map((row) => (
                  <div key={row.option} className="border-b border-ink/20 py-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                      <h3 className="text-[17px] font-bold">{row.option}</h3>
                      <p className="font-hand text-[23px] text-rust">
                        {row.price}
                      </p>
                    </div>
                    <p className="mt-1 text-[15px] leading-relaxed text-ink-soft">
                      {row.description}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            {program.experienceHeading}
          </h2>
          <ul className="mt-3 max-w-[62ch] list-disc pl-5 text-[16px] leading-[1.9]">
            {program.experience.map((item) => (
              <li key={item.slice(0, 32)}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="tape relative max-w-[380px] -rotate-[0.7deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] max-md:mx-auto">
          <h3 className="text-[17px] font-bold">{program.inquiry}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Register above for the dates you want; each club&rsquo;s page on
            Givebutter has a ticket for every session. Not sure which club
            fits? We&rsquo;re happy to help.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-[3px] bg-brand-blue px-5 py-2.5 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)]"
          >
            Get in touch →
          </Link>
        </div>
      </div>
    </>
  );
}
