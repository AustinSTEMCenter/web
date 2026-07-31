import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageIntro, Stamp } from "@/components/notebook";
import { camps, getCamp } from "@/lib/data/camps";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return camps.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const camp = getCamp((await params).slug);
  if (!camp) return {};
  return { title: `${camp.name} — Summer Camp`, description: camp.pitch };
}

export default async function CampPage({ params }: Props) {
  const camp = getCamp((await params).slug);
  if (!camp) notFound();

  return (
    <>
      <Stamp className="absolute top-[46px] right-5 z-10 rotate-[7deg] max-md:static max-md:mt-5 max-md:-rotate-2 max-md:px-2 max-md:py-1 max-md:text-[10px]">
        {camp.season} · logged
      </Stamp>

      <PageIntro note={`field notes — camps / ${camp.season.toLowerCase()}`} title={camp.name} />

      {/* description beside the banner image */}
      <div className="mt-8 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1">
        <p className="max-w-[54ch] text-[17px] text-ink-soft">{camp.pitch}</p>
        <figure className="photo max-w-[400px] rotate-[0.9deg]">
          <Image
            src={camp.image}
            alt={`${camp.name} camp artwork`}
            width={800}
            height={600}
            className="w-full object-cover"
          />
        </figure>
      </div>

      {/* "what to expect" beside the at-a-glance card */}
      <div className="mt-12 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            What to expect
          </h2>
          <ul className="mt-3 max-w-[62ch] list-disc pl-5 text-[16px] leading-[1.9]">
            {camp.expect.map((item) => (
              <li key={item.slice(0, 32)}>{item}</li>
            ))}
          </ul>

          <div className="tape relative mt-12 max-w-[480px] -rotate-[0.5deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
            <h3 className="text-[16px] font-bold">
              {camp.season} has concluded
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              This page shows what we ran — registration for this season is
              closed. Want to hear about the next one before anyone else?{" "}
              <Link href="/contact" className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]">
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="max-w-[400px] border border-ink/18 bg-card px-6 py-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
          <h3 className="text-[15px] font-semibold italic">At a glance</h3>
          <dl className="mt-3 space-y-2 text-[15px]">
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Ages</dt>
              <dd className="font-semibold">{camp.ageRange.replace("Ages ", "")}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Daily schedule</dt>
              <dd className="font-semibold">{camp.schedule}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-ink-soft">Cost</dt>
              <dd className="font-semibold">{camp.price}</dd>
            </div>
          </dl>
          <h4 className="mt-4 text-[13px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            {camp.season} sessions
          </h4>
          <ul className="mt-2 space-y-1 text-[15px]">
            {camp.sessions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="mt-4 font-hand text-[16px] text-brand-blue">
            payment plans, sibling & multi-camp discounts, and scholarships
            were available — same goes next season!
          </p>
        </div>
      </div>
    </>
  );
}
