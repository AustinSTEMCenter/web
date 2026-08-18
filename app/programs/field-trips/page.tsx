import type { Metadata } from "next";
import { ProgramPage } from "@/components/program-page";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Field Trips",
  description:
    "Immersive, hands-on STEM field trips for elementary, middle, and high school groups at the Austin STEM Center.",
};

export default function FieldTripsPage() {
  return <ProgramPage program={getProgram("field-trips")!} />;
}
