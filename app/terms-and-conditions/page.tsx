import type { Metadata } from "next";
import { PageIntro } from "@/components/notebook";
import { getLegalPage } from "@/lib/data/posts";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and conditions for the Austin STEM Center website.",
};

export default function TermsPage() {
  const page = getLegalPage("terms-and-conditions");
  return (
    <>
      <PageIntro note="field notes — the fine print" title="Terms and conditions." />
      <div className="prose-note mt-8" dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  );
}
