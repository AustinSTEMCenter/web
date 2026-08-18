import type { Metadata } from "next";
import Link from "next/link";
import { DonationCheckout } from "@/components/donation-checkout";
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
            Austin STEM Center exists because every person deserves the
            opportunity to{" "}
            <span className="hl-green">
              discover what they&rsquo;re capable of.
            </span>
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
            Your gift funds impact you can see and experiences you can feel.
            From scholarship opportunities and fully funded field trips to the
            tools, materials, and equipment that bring hands-on STEM
            learning to life every day.
          </p>
        </div>
      </PageIntro>

      <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        <section className="w-full max-w-[440px] flex-none">
          <div className="tape relative border border-ink/18 bg-card px-3 pt-8 pb-6 shadow-[3px_4px_0_rgba(56,52,42,0.12)] sm:px-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 px-2 sm:px-0">
              <h2 className="text-[17px] font-bold">Donate to ATX Robotics d/b/a Austin STEM Center</h2>
              <span className="-rotate-1 font-hand text-[20px] text-rust">
                $10 minimum
              </span>
            </div>
            <div className="mt-4 flex justify-center">
              <DonationCheckout />
            </div>
          </div>
        </section>

        <aside className="tape relative max-w-[520px] rotate-[0.8deg] border border-ink/18 bg-card px-7 pt-7 pb-6 shadow-[3px_4px_0_rgba(56,52,42,0.12)] lg:mt-14 lg:max-w-[340px]">
          <h2 className="text-[17px] font-bold">Other ways to give</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            Prefer to give another way? The fastest way to
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
          <p className="mt-4 font-hand text-[20px] text-brand-blue">
            every gift puts real tools in real hands. thank you!
          </p>
        </aside>
      </div>
    </>
  );
}
