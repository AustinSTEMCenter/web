import type { Metadata } from "next";
import { Annotation, PageIntro } from "@/components/notebook";

export const metadata: Metadata = {
  title: "FRC Kickoff",
  description:
    "Join us for the 2027 Austin area FRC Kickoff on January 9 at Austin STEM Center. More details coming soon.",
};

export default function FrcKickoffPage() {
  return (
    <>
      <PageIntro note="field notes — coming soon" title="FRC Kickoff.">
        <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-ink-soft">
          Join us for the 2027 Austin area FRC Kickoff on January 9!
        </p>
        <p className="mt-4 max-w-[62ch] text-[17px] leading-[1.7] text-ink-soft">
          More details will be posted here as they are available.
        </p>
      </PageIntro>

      <p className="mt-10">
        <Annotation>— more to come</Annotation>
      </p>
    </>
  );
}
