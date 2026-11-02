import type { Metadata } from "next";
import { NoteCard, PageIntro } from "@/components/notebook";
import { getLegalPage } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Austin STEM Center website.",
};

export default function PrivacyPolicyPage() {
  const page = getLegalPage("privacy-policy");
  return (
    <>
      <PageIntro note="field notes — the fine print" title="Privacy policy." />
      <NoteCard className="mt-8 max-w-[760px]">
        <div
          className="prose-note"
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </NoteCard>
    </>
  );
}
