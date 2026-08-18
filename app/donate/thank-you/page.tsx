import type { Metadata } from "next";
import Link from "next/link";
import { Heart } from "@/components/doodles";
import { PageIntro } from "@/components/notebook";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default function DonateThanksPage() {
  return (
    <PageIntro
      note="field notes — gratitude"
      title={
        <>
          Thank you. Your gift puts{" "}
          <span className="hl-green">real tools in real hands.</span>
        </>
      }
      doodle={<Heart className="h-12 -rotate-6 text-rust/50" />}
    >
      <div className="prose-note mt-6">
        <p>
          Thank you for giving. If you completed checkout, a receipt from Stripe
          is on its way to your inbox.
        </p>
        <p>
          Your support expands access to hands-on STEM learning — scholarships,
          field trips, and the tools and materials that bring it all to life.
        </p>
        <p>
          <Link
            href="/"
            className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
          >
            Back to the homepage
          </Link>
        </p>
      </div>
    </PageIntro>
  );
}
