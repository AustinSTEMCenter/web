import type { Metadata } from "next";
import { FieldTripBooking } from "@/components/field-trip-booking";
import { NoteCard, SectionHeading } from "@/components/notebook";
import { ProgramPage } from "@/components/program-page";
import { getFieldTripAvailability } from "@/lib/data/field-trip-availability";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Field Trips",
  description:
    "Immersive, hands-on STEM field trips for elementary, middle, and high school groups at the Austin STEM Center.",
};

// refresh open dates hourly (and pick up the company calendar once connected)
export const revalidate = 3600;

export default async function FieldTripsPage() {
  const availability = await getFieldTripAvailability();

  return (
    <ProgramPage program={getProgram("field-trips")!}>
      <section id="book" className="mt-16">
        <NoteCard flat className="max-w-[680px]">
          <SectionHeading>Plan a field trip</SectionHeading>
          <p className="mt-3 text-[17px] text-ink-soft">
            Pick an open date, choose a session and start time, and tell us
            about your group. We&rsquo;ll follow up by email to confirm.
          </p>
        </NoteCard>
        <FieldTripBooking availability={availability} />
      </section>
    </ProgramPage>
  );
}
