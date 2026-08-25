import Image from "next/image";
import Link from "next/link";
import { Gear } from "@/components/doodles";
import { Annotation, SectionHeading } from "@/components/notebook";
import { camps } from "@/lib/data/camps";
import { facilities } from "@/lib/data/facilities";
import { programs } from "@/lib/data/programs";

/* one logo-ring color per facility chip, in facilities-data order */
const chipAccents = [
  "border-l-rust/70",
  "border-l-gold",
  "border-l-brand-blue/70",
  "border-l-ring-teal",
  "border-l-ring-purple/80",
  "border-l-ring-green",
];

const photoAlt =
  "A student drives a FIRST Robotics robot through a field of yellow balls while a crowd watches at the Austin STEM Center grand opening";

const infoLinkClass =
  "italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]";

export default function Home() {
  return (
    <>
      <section className="pt-5">
        <div className="tape-corners relative rotate-[0.3deg] border border-ink/18 bg-card px-8 py-7 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
          <div className="md:grid md:grid-cols-2 md:items-center md:gap-9">
            <div className="max-md:text-center">
              <p className="font-hand text-[22px] text-brand-blue">
                grand opening — saturday, august&nbsp;22&nbsp;✓
              </p>
              <h1 className="mt-2 text-[clamp(27px,2.9vw,38px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
                Thank you for an{" "}
                <span className="hl">incredible</span> grand opening.
              </h1>
              <div className="mt-3.5 max-w-[52ch] space-y-2.5 text-[15px] leading-relaxed text-ink-soft max-md:mx-auto">
                <p>
                  What a day! We had just over <strong>1,200 people</strong> come
                  through our doors, and together we raised around{" "}
                  <strong>$20,000</strong> that will go toward our STEM
                  education programs.
                </p>
                <p>
                  It was amazing to see so many people and families come
                  experience the center, try out the activities, and get a
                  look at what we&rsquo;re bringing to the community. We are so grateful 
                  to everyone who came out and made it an amazing day!
                </p>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 max-md:justify-center">
                <Link
                  href="/programs"
                  className="inline-block rounded-[3px] bg-rust px-7 py-3.5 text-center text-[16.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                >
                  Explore our programs →
                </Link>
                <Link href="/donate" className={`text-[14px] ${infoLinkClass}`}>
                  support our mission
                </Link>
              </div>
            </div>

            <div className="mx-auto mt-7 max-w-[520px] rotate-[1.6deg] transition-transform duration-200 hover:rotate-0 md:mt-0">
              <span className="tape block border border-ink/15 bg-paper p-2 shadow-[3px_4px_0_rgba(56,52,42,0.14)]">
                <Image
                  src="/images/grand-opening-photo.jpg"
                  alt={photoAlt}
                  width={1600}
                  height={1066}
                  priority
                  sizes="(min-width: 768px) 520px, 92vw"
                  className="h-auto w-full border border-ink/10"
                />
              </span>
              <p className="mt-2 text-center font-hand text-[19px] text-ink-soft">
                one for the scrapbook
              </p>
            </div>
          </div>
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
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
          field notes — Stonehollow Dr., Austin, TX
        </p>
        <SectionHeading>
          Turning questions into <span className="hl">joyful discovery.</span>
        </SectionHeading>
        <p className="mt-4 max-w-[56ch] text-[17px] text-ink-soft">
          Hands-on experiences in science, art, engineering, and creative
          exploration: a nonprofit innovation hub where students, educators,
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
          ↳ ask about the <Link href="/facilities" className="underline">FIRST Arena</Link>, it&rsquo;s the good stuff!
        </Annotation>
      </section>
      */}

      {/* programs */}
      <section className="relative pt-24">
        <p className="mb-2 font-hand text-[21px] text-brand-blue">what we do</p>
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
                  <span className="font-hand text-[20px] text-rust">
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
        <p className="mb-2 font-hand text-[21px] text-brand-blue">the space</p>
        <SectionHeading>Where Learning Comes to Life</SectionHeading>
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
                href={`/facilities#${slug}`}
                className={`inline-block rounded-[3px] border border-ink/25 border-l-[3px] bg-card px-3 py-1.5 text-[14px] italic shadow-[2px_2px_0_rgba(56,52,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${chipAccents[i % chipAccents.length]}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <Annotation className="mt-6">
          ↳ {camps.length} summer camps ran here this year · <Link href="/programs/summer-camps" className="underline">see what we ran</Link>
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
        <p className="mb-2 font-hand text-[21px] text-brand-blue">
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
              <p className="font-hand text-[19px] text-brand-blue">
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
