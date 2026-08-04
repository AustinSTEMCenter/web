"use client";

import { useState } from "react";
import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { Annotation } from "@/components/notebook";
import { site } from "@/lib/data/site";

/* Temporary design lab (2026-08-04): three hero variants behind index tabs
   so we can pick one before launch. Once decided, inline the winner and
   delete the tabs + losing variants. */

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?" +
  new URLSearchParams({
    action: "TEMPLATE",
    text: "Grand Opening — Austin STEM Center",
    dates: "20260822T130000/20260822T180000",
    ctz: "America/Chicago",
    location: `${site.address.street}, ${site.address.cityStateZip}`,
    details:
      "Officially celebrate the Grand Opening of Austin STEM Center — explore makerspaces and workshops, tour the facility, enjoy hands-on STEM activities, live demos, and local food trucks. Admission is free; please register in advance at https://austinstemcenter.org/rsvp",
  }).toString();

const flyerAlt =
  "Grand opening flyer — be a part of making something new. Saturday, August 22, 1–6 PM";

const infoLinkClass =
  "italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]";

/* shared copy + CTAs so all variants stay in sync */

function EventDescription({ className }: { className: string }) {
  return (
    <p className={className}>
      Join us as we celebrate the grand opening of Austin STEM Center &mdash;
      explore our makerspaces and workshops, tour the facility, try hands-on
      STEM activities and live demos, enjoy local food trucks, and connect
      with educators, students, and families. Admission is free &mdash; just
      register in advance so we can plan for everyone.
    </p>
  );
}

function DateStamp() {
  return (
    <p className="inline-block -rotate-[1.5deg] rounded-[3px] bg-ring-purple px-4 py-2 text-center text-[16.5px] font-bold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.2)]">
      Sat, August 22 · 1–6 PM
    </p>
  );
}

function RsvpButton() {
  return (
    <Link
      href="/rsvp"
      className="inline-block rounded-[3px] bg-rust px-7 py-3.5 text-center text-[16.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
    >
      RSVP — save your spot →
    </Link>
  );
}

function InfoLinks({ className }: { className: string }) {
  return (
    <p className={className}>
      <a href={site.mapUrl} target="_blank" rel="noreferrer" className={infoLinkClass}>
        get directions
      </a>{" "}
      ·{" "}
      <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className={infoLinkClass}>
        add to calendar
      </a>
    </p>
  );
}

/* 01 — portrait flyer left, event details right; stacked below md */
function HeroSideBySide() {
  return (
    <div className="tape-corners relative -rotate-[0.4deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
      <div className="text-center">
        <h1 className="text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-bold tracking-[-0.01em] text-balance">
          Be a part of making <span className="hl">something new.</span>
        </h1>
      </div>

      <div className="mt-4 md:mt-6 md:flex md:items-center md:gap-9">
        <Link
          href="/rsvp"
          title="RSVP for the grand opening"
          className="mx-auto block w-fit transition-opacity duration-150 hover:opacity-95 md:mx-0 md:w-[38%] md:shrink-0"
        >
          <Image
            src="/images/grand-opening-flyer.jpg"
            alt={flyerAlt}
            width={1350}
            height={1800}
            priority
            sizes="(min-width: 768px) 380px, 100vw"
            className="mx-auto h-auto max-h-[max(calc(100svh-470px),300px)] w-auto max-w-full border border-ink/10 md:max-h-none md:w-full"
          />
        </Link>

        <div className="text-center md:min-w-0 md:flex-1 md:text-left max-md:mt-5 max-md:border-t max-md:border-dashed max-md:border-ink/30 max-md:pt-4">
          <EventDescription className="mx-auto max-w-[64ch] text-[15.5px] leading-snug text-ink-soft md:mx-0 md:text-[16.5px] md:leading-relaxed" />
          <p className="mt-1.5 text-[14.5px] text-ink-soft md:mt-3.5">
            {site.address.street} · {site.address.cityStateZip}
          </p>
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-4 max-md:flex-col max-md:items-stretch md:mt-6 md:justify-start">
            <DateStamp />
            <RsvpButton />
          </div>
          <InfoLinks className="mt-2.5 text-[14px] text-ink-soft md:mt-3.5" />
        </div>
      </div>
    </div>
  );
}

/* 02 — the previous design: wide flyer centered under the masthead title,
   compact RSVP strip below a dashed perforation */
function HeroStacked() {
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
    <div className="tape-corners relative -rotate-[0.4deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
      <div className="text-center">
        <h1 className="text-[clamp(24px,2.6vw,32px)] leading-[1.15] font-bold tracking-[-0.01em] text-balance">
          Be a part of making <span className="hl">something new.</span>
        </h1>
      </div>

      <Link
        href="/rsvp"
        title="RSVP for the grand opening"
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
            className="mx-auto h-auto max-h-[max(calc(100svh-470px),300px)] w-auto max-w-full border border-ink/10"
          />
        </picture>
      </Link>

      <div className="mt-5 border-t border-dashed border-ink/30 pt-4 text-center">
        <EventDescription className="mx-auto max-w-[64ch] text-[15.5px] leading-snug text-ink-soft" />
        <p className="mt-1.5 text-[14.5px] text-ink-soft">
          {site.address.street} · {site.address.cityStateZip}
        </p>
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-4 max-md:flex-col max-md:items-stretch">
          <DateStamp />
          <RsvpButton />
        </div>
        <InfoLinks className="mt-2.5 text-[14px] text-ink-soft" />
      </div>
    </div>
  );
}

/* 03 — marquee: text-led invitation with a small taped-on flyer at right */
function HeroMarquee() {
  return (
    <div className="tape-corners relative rotate-[0.3deg] border border-ink/18 bg-card px-8 py-7 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-4">
      <div className="md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:items-center md:gap-10">
        <div className="max-md:text-center">
          <p className="font-hand text-[19px] text-brand-blue">
            grand opening — saturday, august 22
          </p>
          <h1 className="mt-2 text-[clamp(28px,3.2vw,42px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
            Come see what <span className="hl">we&rsquo;re building.</span>
          </h1>
          <EventDescription className="mt-4 max-w-[52ch] text-[16.5px] leading-relaxed text-ink-soft max-md:mx-auto" />
          <p className="mt-3 text-[15px] text-ink-soft">
            <strong>1&ndash;6 PM</strong> · {site.address.street} ·{" "}
            {site.address.cityStateZip}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 max-md:justify-center">
            <RsvpButton />
            <InfoLinks className="text-[14px] text-ink-soft" />
          </div>
        </div>

        <Link
          href="/rsvp"
          title="RSVP for the grand opening"
          className="mx-auto mt-7 block w-fit rotate-[1.6deg] transition-transform duration-200 hover:rotate-0 md:mt-0"
        >
          <span className="tape block border border-ink/15 bg-paper p-2 shadow-[3px_4px_0_rgba(56,52,42,0.14)]">
            <Image
              src="/images/grand-opening-flyer.jpg"
              alt={flyerAlt}
              width={1350}
              height={1800}
              priority
              sizes="(min-width: 768px) 300px, 80vw"
              className="h-auto w-full max-w-[300px] border border-ink/10"
            />
          </span>
        </Link>
      </div>
    </div>
  );
}

const variants = [
  { key: "side-by-side", label: "01 side-by-side", View: HeroSideBySide },
  { key: "stacked", label: "02 stacked", View: HeroStacked },
  { key: "marquee", label: "03 marquee", View: HeroMarquee },
];

export function GrandOpeningHero() {
  const [active, setActive] = useState(0);
  const ActiveView = variants[active].View;

  return (
    <section className="pt-5">
      <div
        role="tablist"
        aria-label="Grand opening design variants"
        className="mb-1.5 flex justify-center gap-1.5"
      >
        {variants.map((v, i) => (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={`rounded-t-[5px] border border-b-0 border-ink/25 px-3.5 pt-1 pb-1.5 font-hand text-[16px] transition-colors ${
              i === active
                ? "bg-card text-rust"
                : "bg-paper/60 text-ink-soft hover:text-ink"
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <ActiveView />

      <div className="mt-4 text-center">
        <Annotation>
          ↳ can&rsquo;t make it? <Link href="/contact" className="underline">drop us a line</Link> — we&rsquo;ll save you a tour.
        </Annotation>
      </div>
    </section>
  );
}
