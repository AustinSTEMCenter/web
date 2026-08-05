import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "@/components/doodles";
import { PageIntro } from "@/components/notebook";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support the Austin STEM Center. Your donation expands access to hands-on STEM learning experiences.",
};

export default function DonatePage() {
  return (
    <>
      <PageIntro
        note="field notes — support the work"
        title={
          <>
            Help more learners{" "}
            <span className="hl-green">build real things.</span>
          </>
        }
        doodle={<Heart className="h-12 -rotate-6 text-rust/50" />}
      >
        <div className="prose-note mt-6">
          <p>
            If our mission resonates with you, we&rsquo;d love your support.
            Your donation expands access to hands-on STEM learning and gives
            more learners the chance to explore, build, and discover
            what&rsquo;s possible.
          </p>
          <p>
            Gifts fund things you can walk in and touch: scholarship seats at
            camps, fully-funded field trips for Title I schools, and the tools
            and materials that keep the shops running.
          </p>
        </div>
      </PageIntro>

      <div className="tape relative mt-10 max-w-[520px] -rotate-[0.5deg] border border-ink/18 bg-card px-7 pt-7 pb-6 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
        <h2 className="text-[17px] font-bold">How to give right now</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
          Online giving is on its way. In the meantime, the fastest way to
          support ASC is to{" "}
          <Link href="/contact" className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]">
            reach out directly
          </Link>{" "}
          or call{" "}
          <a href={site.phoneHref} className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]">
            {site.phone}
          </a>{" "}
          and we&rsquo;ll help you direct your gift where it matters most.
        </p>
        <p className="mt-4 font-hand text-[17px] text-brand-blue">
          every gift puts real tools in real hands. thank you!
        </p>
      </div>
    </>
  );
}
