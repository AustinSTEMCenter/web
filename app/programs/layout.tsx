import type { ReactNode } from "react";
import { ProgramsNav } from "@/components/programs-nav";

export default function ProgramsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ProgramsNav />
      {/* `relative` keeps absolutely-placed stamps (summer camps) anchored to
          the page content rather than overlapping the tabs */}
      <div className="relative">{children}</div>
    </>
  );
}
