import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/notebook";
import type { Program } from "@/lib/data/programs";

export function ProgramPage({ program }: { program: Program }) {
  return (
    <>
      <PageIntro note="field notes — programs" title={program.title}>
        <p className="mt-5 max-w-[52ch] text-[17px] text-ink-soft">
          {program.teaser}
        </p>
      </PageIntro>

      <div className="mt-12 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            About this program
          </h2>
          <div className="prose-note mt-3">
            {program.about.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            {program.experienceHeading}
          </h2>
          <ul className="mt-3 max-w-[62ch] list-disc pl-5 text-[16px] leading-[1.9]">
            {program.experience.map((item) => (
              <li key={item.slice(0, 32)}>{item}</li>
            ))}
          </ul>

          {program.pricing && (
            <>
              <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
                {program.pricing.heading}
              </h2>
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
                      <p className="font-hand text-[20px] text-rust">
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
              <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
                Why ASC
              </h2>
              <div className="prose-note mt-3">
                <p>{program.why}</p>
              </div>
            </>
          )}
        </div>

        <div className="max-md:order-first">
          <figure className="photo max-w-[420px] rotate-[0.9deg]">
            <Image
              src={program.image}
              alt={program.title}
              width={840}
              height={560}
              className="aspect-[3/2] w-full object-cover"
            />
          </figure>
          {program.inquiry && (
            <div className="tape relative mt-12 max-w-[380px] -rotate-[0.7deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
              <h3 className="text-[17px] font-bold">{program.inquiry}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                Tell us about your group and what you&rsquo;re hoping to do —
                we&rsquo;ll take it from there.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-block rounded-[3px] bg-brand-blue px-5 py-2.5 text-[15px] text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)]"
              >
                Get in touch →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
