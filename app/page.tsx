import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Gear } from "@/components/doodles";
import { Annotation, SectionHeading } from "@/components/notebook";
import { camps } from "@/lib/data/camps";
import { facilities } from "@/lib/data/facilities";
import { programs } from "@/lib/data/programs";
import { site } from "@/lib/data/site";

/* one logo-ring color per facility chip, in facilities-data order */
const chipAccents = [
  "border-l-rust/70",
  "border-l-gold",
  "border-l-brand-blue/70",
  "border-l-ring-teal",
  "border-l-ring-purple/80",
  "border-l-ring-green",
];

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: "Grand Opening — Austin STEM Center",
    dates: "20260822T130000/20260822T180000",
    ctz: "America/Chicago",
    location: `${site.address.street}, ${site.address.cityStateZip}`,
    details:
      "Be a part of making something new. Tour all six spaces, meet the crew, and see where STEM education meets the moment. https://austinstemcenter.org",
  }).toString();

const flyerAlt =
  "Grand opening flyer — be a part of making something new. Saturday, August 22, 1–6 PM";

export default function Home() {
  /* art-directed flyer: landscape on md+ screens, portrait below */
  const {
    props: { srcSet: flyerWideSrcSet },
  } = getImageProps({
    src: "/images/grand-opening-flyer-wide.jpg",
    alt: flyerAlt,
    width: 1800,
    height: 1350,
    priority: true,
    sizes: "992px",
  });
  const { props: flyerPortraitProps } = getImageProps({
    src: "/images/grand-opening-flyer.jpg",
    alt: flyerAlt,
    width: 1350,
    height: 1800,
    priority: true,
    sizes: "100vw",
  });

  return (
    <>
      {/* grand-opening hero — one taped-in flyer, sized to fit the first
          screen: masthead title on top, poster in the middle, and a compact
          RSVP strip below a dashed perforation */}
      <section className="pt-5">
        <div className="tape-corners relative -rotate-[0.4deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
          <div className="text-center">
            <p className="font-hand text-[18px] text-brand-blue">
              save the date — you&rsquo;re invited!
            </p>
            <h1 className="mt-1 text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-bold tracking-[-0.01em] text-balance">
              Be a part of making <span className="hl">something new.</span>
            </h1>
          </div>

          <a
            href="/images/grand-opening-flyer.jpg"
            target="_blank"
            rel="noreferrer"
            title="Open the full-size flyer"
            className="mx-auto mt-4 block w-fit transition-opacity duration-150 hover:opacity-95"
          >
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={flyerWideSrcSet}
                sizes="992px"
                width={1800}
                height={1350}
              />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes via getImageProps */}
              <img
                {...flyerPortraitProps}
                className="mx-auto h-auto max-h-[max(calc(100svh-435px),300px)] w-auto max-w-full border border-ink/10"
              />
            </picture>
          </a>

          {/* the RSVP strip, below the perforation */}
          <div className="mt-5 border-t border-dashed border-ink/30 pt-4 text-center">
            <p className="text-[15.5px] leading-snug text-ink-soft">
              Tour all six spaces, meet the crew, and see where STEM education
              meets the moment.
            </p>
            <p className="mt-1 text-[14.5px] text-ink-soft">
              {site.address.street} · {site.address.cityStateZip}
            </p>
            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-4 max-md:flex-col max-md:items-stretch">
              <p className="inline-block -rotate-[1.5deg] rounded-[3px] bg-ring-purple px-4 py-2 text-center text-[16.5px] font-bold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.2)]">
                Sat, August 22 · 1–6 PM
              </p>
              <Link
                href="/rsvp"
                className="inline-block rounded-[3px] bg-rust px-7 py-3.5 text-center text-[16.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                RSVP — save your spot →
              </Link>
            </div>
            <p className="mt-2.5 text-[14px] text-ink-soft">
              <a
                href={site.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
              >
                get directions
              </a>{" "}
              ·{" "}
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
              >
                add to calendar
              </a>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Annotation>
            ↳ can&rsquo;t make it? <Link href="/contact" className="underline">drop us a line</Link> — we&rsquo;ll save you a tour.
          </Annotation>
        </div>
      </section>

      {/* "who we are" — original tagline copy, parked until after the grand
          opening. To restore, uncomment and re-add PaperPlane to the doodles
          import above.

      <section className="relative pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute top-20 right-6 hidden md:block"
        >
          <PaperPlane className="h-11 -rotate-6 text-brand-blue/50" />
        </span>
        <p className="mb-2 font-hand text-[18px] text-brand-blue">
          field notes — Stonehollow Dr., Austin, TX
        </p>
        <SectionHeading>
          Turning questions into <span className="hl">joyful discovery.</span>
        </SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          Hands-on experiences in science, art, engineering, and creative
          exploration — a nonprofit innovation hub where students, educators,
          and professionals all learn by making real things.
        </p>
        <Link
          href="/programs/field-trips"
          className="mt-6 inline-block rounded-[3px] bg-brand-blue px-[22px] py-3 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Book a field trip →
        </Link>
        <br />
        <Annotation className="mt-6">
          ↳ ask about the <Link href="/facilities" className="underline">FIRST Arena</Link> — it&rsquo;s the good stuff!
        </Annotation>
      </section>
      */}

      {/* programs */}
      <section className="relative pt-24">
        <p className="mb-2 font-hand text-[18px] text-brand-blue">what we do</p>
        <SectionHeading>
          Programs for students, schools, and&nbsp;families.
        </SectionHeading>
        <div className="mt-10 grid grid-cols-3 gap-7 max-md:grid-cols-1 max-md:gap-y-10">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              href={p.href}
              className={`tape relative flex flex-col border border-ink/18 bg-card p-4 pb-3.5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform duration-200 ease-out hover:-translate-y-1 hover:rotate-0 ${
                ["-rotate-[0.8deg]", "rotate-[0.7deg]", "-rotate-[0.5deg]"][
                  i % 3
                ]
              }`}
            >
              <Image
                src={p.image}
                alt=""
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
                  <span className="font-hand text-[17px] text-rust">
                    from {p.pricing.rows[0].price}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* facilities */}
      <section className="relative pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute top-24 right-10 hidden md:block"
        >
          <Gear className="h-12 rotate-12 text-ink/25" />
        </span>
        <p className="mb-2 font-hand text-[18px] text-brand-blue">the space</p>
        <SectionHeading>A connected learning ecosystem.</SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          The ASC facility is designed to support robotics, engineering, and
          hands-on learning at every stage — six real spaces under one roof.
        </p>
        <ul className="mt-6 flex flex-wrap gap-x-2.5 gap-y-3">
          {facilities.map(({ name, slug }, i) => (
            <li key={slug}>
              <Link
                href={`/facilities#${slug}`}
                className={`inline-block rounded-[3px] border border-ink/25 border-l-[3px] bg-card px-3 py-1.5 text-[14px] italic shadow-[2px_2px_0_rgba(56,52,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${chipAccents[i % chipAccents.length]}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <Annotation className="mt-6">
          ↳ {camps.length} summer camps ran here this year — <Link href="/programs/summer-camps" className="underline">see what we run</Link>
        </Annotation>
      </section>

      {/* blog — removed for now (2026-07-30). To restore: git-restore app/blog/,
          re-add the "blog" navLink in lib/data/site.ts, re-add Bolt to the
          doodles import, `formatDate, getPublishedPosts` from lib/data/posts,
          and `const posts = getPublishedPosts().slice(0, 3)` above, then
          uncomment this section.

      <section className="relative pt-24">
        <span
          aria-hidden
          className="pointer-events-none absolute top-[88px] right-14 hidden md:block"
        >
          <Bolt className="h-11 rotate-6 text-gold/80" />
        </span>
        <p className="mb-2 font-hand text-[18px] text-brand-blue">
          from the notebook
        </p>
        <SectionHeading>Field notes.</SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          Practical insights, bold ideas, and behind-the-scenes stories from
          ASC&rsquo;s work with students, educators, and industry leaders.
        </p>
        <div className="mt-8 space-y-7">
          {posts.map((post) => (
            <article key={post.slug} className="max-w-[64ch]">
              <p className="font-hand text-[16px] text-brand-blue">
                {formatDate(post.date)} · {post.author}
              </p>
              <h3 className="mt-1 text-[19px] leading-snug font-bold">
                <Link href={`/blog/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h3>
            </article>
          ))}
        </div>
        <p className="mt-7">
          <Link href="/blog" className="text-[15px] italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]">
            all field notes →
          </Link>
        </p>
      </section>
      */}
    </>
  );
}
