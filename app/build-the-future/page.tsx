import type { Metadata } from "next";
import Image from "next/image";
import { PageIntro } from "@/components/notebook";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Build the Future",
  description:
    "Build the Future: a family day at Austin STEM Center. Sunday, October 18, 3–7 pm.",
};

export default function BuildTheFuturePage() {
  return (
    <>
      <PageIntro
        note="field notes — a family day"
        title={
          <>
            Build the <span className="hl-teal">future.</span>
          </>
        }
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          A family day at Austin STEM Center.
        </p>
      </PageIntro>

      <section className="tape relative mt-12 grid grid-cols-[minmax(0,360px)_minmax(0,1fr)] items-center gap-x-10 gap-y-6 border border-ink/18 bg-card p-6 shadow-[3px_4px_0_rgba(56,52,42,0.12)] max-md:grid-cols-1">
        <Image
          src="/images/events/build-the-future.jpg"
          alt="Build the Future: A Family Day at Austin STEM Center. Sunday, October 18th, 3 pm to 7 pm. Learn, create, explore, imagine, inspire. Keep Austin curious."
          width={720}
          height={720}
          sizes="(max-width: 768px) 100vw, 360px"
          priority
          className="aspect-square w-full border border-ink/10 object-cover max-md:mx-auto max-md:max-w-[400px]"
        />
        <div>
          <p className="text-[19px] font-bold">Sunday, October 18 · 3–7 pm</p>
          <p className="text-[15.5px] text-ink-soft">
            {site.address.street}, {site.address.cityStateZip}
          </p>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed">
            If our mission resonates with you, we&rsquo;d love your support.
            Your donation expands access to hands-on STEM learning and gives
            more learners the chance to explore, build, and discover
            what&rsquo;s possible.
          </p>
          <p className="mt-3 max-w-[52ch] text-[16px] leading-relaxed">
            Your gift funds impact you can see and experiences you can feel.
            From scholarship opportunities and fully funded field trips to the
            tools, materials, and equipment that bring hands-on STEM learning
            to life every day.
          </p>
          <a
            href="https://givebutter.com/build-the-future"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-[3px] bg-rust px-7 py-3.5 text-[16.5px] font-semibold text-paper shadow-[2px_2px_0_rgba(56,52,42,0.65)] transition-[transform,box-shadow] duration-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Donate →
          </a>
        </div>
      </section>
    </>
  );
}
