import type { Metadata } from "next";
import { Suspense } from "react";
import { GrandOpeningDashboard } from "./dashboard";

export const metadata: Metadata = {
  title: "Grand Opening — Live Board",
  robots: { index: false, follow: false },
};

export default function GrandOpeningPage() {
  return (
    <Suspense>
      <GrandOpeningDashboard />
    </Suspense>
  );
}
