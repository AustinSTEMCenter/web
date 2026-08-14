import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Heart } from "@/components/doodles";
import { PageIntro } from "@/components/notebook";
import { stripe } from "@/lib/stripe";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false },
};

export default async function DonateThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  if (!session_id) redirect("/donate");

  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.status !== "complete") redirect("/donate");

  const amount =
    session.amount_total != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: session.currency ?? "usd",
        }).format(session.amount_total / 100)
      : null;
  const email = session.customer_details?.email;

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
          {amount ? (
            <>
              Your donation of <strong>{amount}</strong> went through.
            </>
          ) : (
            <>Your donation went through.</>
          )}{" "}
          {email ? (
            <>
              A receipt is on its way to <strong>{email}</strong>.
            </>
          ) : null}
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
