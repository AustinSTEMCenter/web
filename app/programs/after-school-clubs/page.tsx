import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "After-School STEM Clubs",
  description:
    "Flexible after-school STEM enrichment at the Austin STEM Center, with hands-on club days by the session or an unlimited monthly membership.",
};

export default function AfterSchoolClubsPage() {
  return <ProgramPage program={getProgram("after-school-clubs")!} />;
}
