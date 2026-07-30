import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "@/components/doodles";
import { PageIntro } from "@/components/notebook";
import { programs } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Field trips, summer camps, and after-school STEM clubs — hands-on STEM programs at the Austin STEM Center.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageIntro
        note="field notes — what we run"
        title={
          <>
            Hands-on programs,{" "}
            <span className="hl-teal">real-world problems.</span>
          </>
        }
        doodle={<Rocket className="h-16 -rotate-12 text-rust/45" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          Every ASC program is built around the same idea: put real tools in
          people&rsquo;s hands and let them make something that matters.
        </p>
      </PageIntro>

      <div className="mt-14 space-y-14">
        {programs.map((p, i) => (
          <section
            key={p.slug}
            className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] items-start gap-x-10 gap-y-5 max-md:grid-cols-1"
          >
            <figure
              className={`photo max-w-[380px] transition-transform duration-200 ease-out hover:rotate-0 ${i % 2 ? "rotate-[0.8deg] md:order-2 md:justify-self-end" : "-rotate-[0.7deg]"}`}
            >
              <Link href={p.href} className="block">
                <Image
                  src={p.image}
                  alt={p.title}
                  width={760}
                  height={475}
                  className="aspect-[8/5] w-full object-cover"
                />
              </Link>
            </figure>
            <div className={i % 2 ? "md:order-1" : ""}>
              <h2 className="text-[24px] font-bold">
                <Link href={p.href} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.75]">
                {p.about[0]}
              </p>
              <p className="mt-4">
                <Link
                  href={p.href}
                  className="text-[15px] italic text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
                >
                  read more →
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
