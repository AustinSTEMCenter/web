import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gear, PaperPlane } from "@/components/doodles";
import {
  Annotation,
  NoteCard,
  SectionHeading,
  Stamp,
} from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";
import { getProgram, programs } from "@/lib/data/programs";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* one logo-ring color per facility chip, in facilities-data order */
const chipAccents = [
  "border-l-rust/70",
  "border-l-gold",
  "border-l-brand-blue/70",
  "border-l-ring-teal",
  "border-l-ring-purple/80",
  "border-l-ring-green",
];

const albumUrl =
  "https://juliannajphotography.pic-time.com/client/asc-grand-opening/gallery";

export default function Home() {
  const fieldTrips = getProgram("field-trips");

  return (
    <>
      {/* hero — programs and field trips lead */}
      <section className="pt-5">
        <div className="tape-corners relative rotate-[0.3deg] border border-ink/18 bg-card px-8 py-7 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-9">
            <div className="max-md:text-center">
              <p className="font-hand text-[22px] text-brand-blue">
                field notes — Stonehollow Dr., Austin, TX
              </p>
              <h1 className="mt-2 text-[clamp(27px,2.9vw,38px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
                Hands-on STEM programs for{" "}
                <span className="hl">students, schools, and families.</span>
              </h1>
              <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft max-md:mx-auto">
                Sunday labs, after-school clubs, summer camps, and school
                field trips, all in real shops, labs, and a FIRST Robotics
                arena. A nonprofit where everyone learns by making real
                things.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 max-md:justify-center">
                <Link href="/programs" className="btn btn-rust btn-lg">
                  Explore our programs →
                </Link>
                <Link href="/programs/field-trips#book" className="btn btn-blue">
                  Book a field trip →
                </Link>
              </div>
            </div>

            {/* hover on the still outer div, rotate the inner one — see the
                program cards below */}
            <div className="group mx-auto mt-7 max-w-[520px] md:mt-0">
              <div className="origin-top rotate-[1.6deg] transition-transform duration-200 group-hover:rotate-0">
                <div className="tape relative border border-ink/15 bg-paper p-2 shadow-[3px_4px_0_rgba(56,52,42,0.14)]">
                  <Image
                    src="/images/camps/build-a-synth-1.jpg"
                    alt="Two students wearing headphones build and test synthesizer circuits at a bench in the electronics lab"
                    width={1600}
                    height={1066}
                    priority
                    sizes="(min-width: 768px) 520px, 92vw"
                    className="h-auto w-full border border-ink/10"
                  />
                </div>
                <p className="mt-2 text-center font-hand text-[19px] text-ink-soft">
                  real tools, real projects — every program, every age
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* programs */}
      <section className="relative pt-24">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">what we run</p>
        <SectionHeading>Pick a program.</SectionHeading>
        {/* the Link stays still as the hover target and only the inner card
            moves, so the card can't slide out from under the cursor and
            flicker; origin-top pivots it around the tape */}
        <div className="mt-10 grid grid-cols-2 gap-7 max-md:grid-cols-1 max-md:gap-y-10">
          {/* Howdy Bots stays on /programs so this grid keeps its even rows */}
          {programs.filter((p) => p.slug !== "howdy-bots").map((p, i) => (
            <Link key={p.slug} href={p.href} className="group block">
              <div
                className={`tape relative flex h-full origin-top flex-col border border-ink/18 bg-card p-4 pb-3.5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:rotate-0 ${
                  ["-rotate-[0.8deg]", "rotate-[0.7deg]", "-rotate-[0.5deg]"][
                    i % 3
                  ]
                }`}
              >
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  width={640}
                  height={400}
                  className="aspect-[8/5] w-full border border-ink/10 object-cover"
                />
                <h3 className="mt-3.5 text-[18px] leading-snug font-bold">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-relaxed text-ink-soft">
                  {p.teaser}
                </p>
                <div className="mt-auto flex items-baseline justify-between gap-3 pt-3.5">
                  <span className="text-[14px] italic text-brand-blue">
                    read more →
                  </span>
                  {p.pricing && (
                    <span className="font-hand text-[20px] text-rust">
                      from {p.pricing.rows[0].price}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-7">
          <Link
            href="/programs"
            className="text-link"
          >
            all programs, including Howdy Bots →
          </Link>
        </p>
      </section>

      {/* field trips — the school-facing offer gets its own spread */}
      {fieldTrips && (
        <section className="pt-24">
          <NoteCard className="max-w-[680px] -rotate-[0.3deg]">
            <p className="mb-2 font-hand text-[21px] text-brand-blue">
              for schools &amp; groups
            </p>
            <SectionHeading>Bring your class to the center.</SectionHeading>
            <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
              {fieldTrips.teaser}
            </p>
            {fieldTrips.why && (
              <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-ink-soft">
                {fieldTrips.why}
              </p>
            )}
            {fieldTrips.pricing && (
              <ul className="mt-6 max-w-[56ch] border-t border-ink/20">
                {fieldTrips.pricing.rows.map((row) => (
                  <li
                    key={row.option}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 border-b border-ink/20 py-2.5"
                  >
                    <span className="text-[15px] font-bold">
                      {row.option}
                      {row.duration && (
                        <span className="ml-2 text-[13px] font-normal italic text-ink-soft">
                          {row.duration}
                        </span>
                      )}
                    </span>
                    <span className="font-hand text-[21px] text-rust">
                      {row.price}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Link href="/programs/field-trips#book" className="btn btn-rust">
                Book a field trip →
              </Link>
              <Link
                href="/tours"
                className="text-link"
              >
                or book a tour first →
              </Link>
            </div>
          </NoteCard>
        </section>
      )}

      {/* facilities */}
      <section className="pt-24">
        <NoteCard className="-rotate-[0.3deg]">
          <span
            aria-hidden
            className="pointer-events-none absolute top-6 right-8 hidden md:block"
          >
            <Gear className="h-12 rotate-12 text-ink/25" />
          </span>
          <p className="mb-2 font-hand text-[21px] text-brand-blue">the space</p>
          <SectionHeading>Where learning comes to life.</SectionHeading>
          <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
            Austin STEM Center was designed to inspire curiosity through
            hands-on experiences. Under one roof, learners can explore
            robotics, engineering, fabrication, design, electronics, and more in
            purpose-built spaces that encourage them to create, experiment,
            and learn by doing.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-3">
            {facilities.map(({ name, slug }, i) => (
              <li key={slug}>
                <Link
                  href={`/facility-rentals#${slug}`}
                  className={`inline-block rounded-[3px] border border-ink/25 border-l-[3px] bg-card px-3 py-1.5 text-[14px] italic shadow-[2px_2px_0_rgba(56,52,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${chipAccents[i % chipAccents.length]}`}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
          <Annotation className="mt-6">
            ↳ not sure where to start? <Link href="/tours" className="underline">book a tour</Link>
          </Annotation>
        </NoteCard>
      </section>

      {/* scrapbook — the grand opening, kept small; the full recap is the
          grand-opening-2026 post in content/posts */}
      <section className="pt-24">
        <div className="grid items-center gap-x-10 gap-y-5 max-md:grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <a
            href={albumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="photo block max-w-[360px] -rotate-[1.2deg] transition-transform duration-200 hover:rotate-0"
          >
            <Image
              src="/images/grand-opening-photo.jpg"
              alt="A student drives a FIRST Robotics robot through a field of yellow balls while a crowd watches at the Austin STEM Center grand opening"
              width={1600}
              height={1066}
              sizes="(min-width: 768px) 360px, 92vw"
              className="aspect-[3/2] w-full object-cover"
            />
          </a>
          <div>
            <p className="mb-2 font-hand text-[21px] text-brand-blue">
              one for the scrapbook
            </p>
            <SectionHeading>Grand opening, August 22.</SectionHeading>
            <div className="mt-4 flex flex-wrap gap-3">
              <Stamp className="-rotate-2">1,200+ visitors</Stamp>
              <Stamp className="rotate-[1.5deg]">$20K raised</Stamp>
            </div>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-ink-soft">
              Thank you to every family who came out, tried the activities,
              and explored the center. Every dollar raised goes straight to
              our STEM education programs.
            </p>
            <p className="mt-3">
              <a
                href={albumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                flip through the whole album →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* field notes — parked until the blog gets another pass. To restore:
          re-add `Bolt` to the doodles import, `formatDate, getPublishedPosts`
          from lib/data/posts, `const posts = getPublishedPosts().slice(0, 3)`
          above, the "blog" navLink in lib/data/site.ts, and uncomment.

      <section className="relative pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute top-[88px] right-14 hidden md:block"
        >
          <Bolt className="h-11 rotate-6 text-gold/80" />
        </span>
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          from the notebook
        </p>
        <SectionHeading>Field notes and event recaps.</SectionHeading>
        <div className="mt-10 grid grid-cols-3 gap-7 max-md:grid-cols-1 max-md:gap-y-10">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div
                className={`tape relative flex h-full origin-top flex-col border border-ink/18 bg-card p-4 pb-3.5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:rotate-0 ${
                  ["rotate-[0.6deg]", "-rotate-[0.7deg]", "rotate-[0.5deg]"][i % 3]
                }`}
              >
                {post.cover && (
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? ""}
                    width={640}
                    height={400}
                    className="aspect-[8/5] w-full border border-ink/10 object-cover"
                  />
                )}
                <p className="mt-3.5 flex flex-wrap items-center gap-x-3 gap-y-2 font-hand text-[17px] text-brand-blue">
                  {formatDate(post.date)}
                  {post.kind === "event" && (
                    <Stamp className="-rotate-2 text-[10px]">event recap</Stamp>
                  )}
                </p>
                <h3 className="mt-1 text-[18px] leading-snug font-bold">{post.title}</h3>
                <span className="mt-auto pt-3.5 text-[14px] italic text-brand-blue">
                  read the note →
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-7">
          <Link
            href="/blog"
            className="text-link"
          >
            all field notes →
          </Link>
        </p>
      </section>
      */}

      {/* newsletter */}
      <section className="pt-24">
        <div className="tape relative -rotate-[0.4deg] border border-ink/18 bg-card px-8 py-7 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-5">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-5 right-8 hidden md:block"
          >
            <PaperPlane className="h-11 -rotate-6 text-brand-blue/50" />
          </span>
          <div className="md:flex md:items-center md:justify-between md:gap-10">
            <div>
              <p className="mb-2 font-hand text-[21px] text-brand-blue">
                stay in the loop
              </p>
              <SectionHeading>
                Get <span className="hl">center news</span> in your inbox.
              </SectionHeading>
              <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed text-pretty text-ink-soft">
                Camp registration dates, new programs, upcoming events, and
                stories from the center, straight from us.
              </p>
            </div>
            <a
              href={site.newsletterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-rust mt-5 shrink-0 md:mt-0"
            >
              Join our newsletter →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
