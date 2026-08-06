import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Annotation, PageIntro, Stamp } from "@/components/notebook";
import { camps } from "@/lib/data/camps";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Summer Camps",
  description:
    "Immersive, multi-day STEM summer camps at the Austin STEM Center. Summer 2026 has concluded. Join the list to hear about fall programming.",
};

export default function SummerCampsPage() {
  const program = getProgram("summer-camps")!;

  return (
    <>
      <Stamp className="absolute top-[46px] right-5 z-10 rotate-[7deg] max-md:static max-md:mt-5 max-md:-rotate-2 max-md:px-2 max-md:py-1 max-md:text-[10px]">
        Summer 2026 · logged
      </Stamp>

      <PageIntro
        note="field notes — camps"
        title={
          <>
            Camps where <span className="hl-green">real things</span> get
            built.
          </>
        }
      >
        <p className="mt-5 max-w-[54ch] text-[17px] text-ink-soft">
          {program.about[0]}
        </p>
        <p className="mt-4 max-w-[54ch] text-[17px] text-ink-soft">
          {program.about[1]}
        </p>
      </PageIntro>

      <div className="tape relative mx-auto mt-10 max-w-[560px] -rotate-[0.5deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
        <h2 className="text-[17px] font-bold">
          Summer 2026 is a wrap. Thanks for an amazing first season!
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          The camps below are what we ran this summer. Fall programming is in
          the works, so{" "}
          <Link href="/contact" className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]">
            get in touch
          </Link>{" "}
          and we&rsquo;ll make sure you hear about it first.
        </p>
      </div>

      <div className="mt-16 space-y-16">
        {camps.map((camp, i) => (
          <section
            key={camp.slug}
            className={`grid items-start gap-x-10 gap-y-5 max-md:grid-cols-1 ${i % 2 ? "grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"}`}
          >
            <figure
              className={`photo max-w-[380px] transition-transform duration-200 ease-out hover:rotate-0 ${i % 2 ? "rotate-[0.9deg] md:order-2 md:justify-self-end" : "-rotate-[0.8deg]"}`}
            >
              <Link href={`/camps/${camp.slug}`} className="block">
                <Image
                  src={camp.image}
                  alt={`${camp.name} camp artwork`}
                  width={760}
                  height={570}
                  className="w-full object-cover"
                />
              </Link>
              <figcaption className="pt-2 text-center font-hand text-[19px] text-brand-blue">
                {camp.ageRange.toLowerCase()} · {camp.schedule}
              </figcaption>
            </figure>
            <div className={i % 2 ? "md:order-1" : ""}>
              <h2 className="text-[24px] font-bold">
                <Link href={`/camps/${camp.slug}`} className="hover:underline">
                  {camp.name}
                </Link>
              </h2>
              <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.75]">
                {camp.pitch}
              </p>
              <p className="mt-4">
                <Link
                  href={`/camps/${camp.slug}`}
                  className="text-[15px] italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
                >
                  camp details →
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="pt-16 pb-4">
        <Annotation>
          ↳ questions about camps?{" "}
          <Link href="/contact" className="underline">
            contact us
          </Link>{" "}
          anytime, we&rsquo;re happy to help
        </Annotation>
      </div>
    </>
  );
}
