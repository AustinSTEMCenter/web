import type { Metadata } from "next";
import { Rocket } from "@/components/doodles";
import { Annotation, PageIntro } from "@/components/notebook";
import { RsvpForm } from "@/components/rsvp-form";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Grand Opening RSVP",
  description:
    "RSVP for the Austin STEM Center grand opening on Saturday, August 22, 1–6 PM at 11525 Stonehollow Dr., Suite A100, Austin, TX. Free and open to everyone.",
};

export default function RsvpPage() {
  return (
    <>
      <PageIntro
        note="field notes — grand opening"
        title={
          <>
            Tell us <span className="hl">you&rsquo;re coming.</span>
          </>
        }
        doodle={<Rocket className="h-12 rotate-6 text-rust/60" />}
      >
        <p className="mt-5 max-w-[54ch] text-[17px] text-ink-soft">
          We&rsquo;re opening the doors{" "}
          <strong>Saturday, August 22, 1&ndash;6 PM</strong> at{" "}
          {site.address.street}, {site.address.cityStateZip}. It&rsquo;s free
          and open to everyone. Drop your info below so we know to expect you
          and can keep you in the loop as ASC grows.
        </p>
      </PageIntro>

      <div className="mt-12">
        <RsvpForm />
      </div>

      <div className="pt-10 pb-4">
        <Annotation>
          ↳ no ticket, no cost. this just helps us plan (and say hi properly!)
        </Annotation>
      </div>
    </>
  );
}
