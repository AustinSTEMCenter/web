import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PageIntro } from "@/components/notebook";
import type { Program } from "@/lib/data/programs";

const subheadClass =
  "text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft";

export function ProgramPage({
  program,
  children,
}: {
  program: Program;
  /**
   * Featured booking area. When present it follows the "About this program"
   * intro, and the pricing list and inquiry card are left out since the
   * booking covers both.
   */
  children?: ReactNode;
}) {
  const about = (
    <>
      <h2 className={subheadClass}>About this program</h2>
      <div className="prose-note mt-3 [&>p:last-child]:mb-0!">
        {program.about.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </div>
    </>
  );

  const details = (
    <>
      <h2 className={subheadClass}>{program.experienceHeading}</h2>
      <ul className="mt-3 max-w-[62ch] list-disc pl-5 text-[16px] leading-[1.9]">
        {program.experience.map((item) => (
          <li key={item.slice(0, 32)}>{item}</li>
        ))}
      </ul>

      {program.pricing && !children && (
        <>
          <h2 className={`mt-10 ${subheadClass}`}>{program.pricing.heading}</h2>
          <div className="mt-2 max-w-[62ch]">
            {program.pricing.rows.map((row) => (
              <div key={row.option} className="border-b border-ink/20 py-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6">
                  <h3 className="text-[17px] font-bold">
                    {row.option}{" "}
                    {row.duration && (
                      <span className="ml-2 text-[14px] font-normal italic text-ink-soft">
                        {row.duration}
                      </span>
                    )}
                  </h3>
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

      {program.why && (
        <>
          <h2 className={`mt-10 ${subheadClass}`}>Why ASC</h2>
          <div className="prose-note mt-3 [&>p:last-child]:mb-0!">
            <p>{program.why}</p>
          </div>
        </>
      )}
    </>
  );

  const photo = (
    <figure className="photo max-w-[420px] rotate-[0.9deg]">
      <Image
        src={program.image}
        alt={program.title}
        width={840}
        height={560}
        className="aspect-[3/2] w-full object-cover"
      />
    </figure>
  );

  const inquiryCard = program.inquiry && (
    <div className="tape relative max-w-[380px] -rotate-[0.7deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
      <h3 className="text-[17px] font-bold">{program.inquiry}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
        Tell us about your group and what you&rsquo;re hoping to do, and
        we&rsquo;ll take it from there.
      </p>
      <Link
        href="/contact"
        className="mt-4 inline-block rounded-[3px] bg-brand-blue px-5 py-2.5 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)]"
      >
        Get in touch →
      </Link>
    </div>
  );

  const gridClass =
    "grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1";

  return (
    <>
      <PageIntro title={program.title}>
        <p className="mt-5 max-w-[52ch] text-[17px] text-ink-soft">
          {program.teaser}
        </p>
      </PageIntro>

      {children ? (
        <>
          <div className={`mt-12 ${gridClass}`}>
            <div>{about}</div>
            <div className="max-md:order-first">{photo}</div>
          </div>
          {children}
          <div className="mt-16 max-w-[760px] border border-ink/18 bg-card shadow-[2px_3px_0_rgba(56,52,42,0.1)] px-7 pt-6 pb-7 max-sm:px-4">
            {details}
          </div>
        </>
      ) : (
        <div className={`mt-12 ${gridClass}`}>
          <div>
            {about}
            <div className="mt-10">{details}</div>
          </div>
          <div className="max-md:order-first">
            {photo}
            {inquiryCard && <div className="mt-12">{inquiryCard}</div>}
          </div>
        </div>
      )}
    </>
  );
}
