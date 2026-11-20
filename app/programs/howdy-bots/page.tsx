import type { Metadata } from "next";
import { NoteCard, SectionHeading } from "@/components/notebook";
import { ProgramPage } from "@/components/program-page";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  alternates: { canonical: "/programs/howdy-bots" },
  title: "Howdy Bots FIRST Robotics Team",
  description:
    "Howdy Bots FRC 6377 is a co-ed community robotics team for 13 to 18-year-olds from Austin, TX, competing in the FIRST Robotics Competition.",
};

const links = [
  { label: "Visit the Howdy Bots website", href: "https://howdybots.org/" },
  {
    label: "Join the team",
    href: "https://howdybots.org/join/become-a-howdy-bot/",
  },
];

export default function HowdyBotsPage() {
  return (
    <ProgramPage program={getProgram("howdy-bots")!}>
      <NoteCard flat className="mt-16 max-w-[760px]">
        <SectionHeading>Follow the team.</SectionHeading>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                {label} →
              </a>
            </li>
          ))}
        </ul>
      </NoteCard>
    </ProgramPage>
  );
}
