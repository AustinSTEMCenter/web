import type { Metadata } from "next";
import { SectionHeading } from "@/components/notebook";
import { ProgramPage } from "@/components/program-page";
import { getProgram } from "@/lib/data/programs";

export const metadata: Metadata = {
  title: "Howdy Bots",
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
      <section className="mt-16 max-w-[680px] border border-ink/18 bg-card px-6 py-5 shadow-[2px_3px_0_rgba(56,52,42,0.1)] max-sm:px-4">
        <SectionHeading>Follow the team.</SectionHeading>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-[17px]">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-brand-blue/50 underline-offset-[3px] hover:decoration-rust/70"
              >
                {label} →
              </a>
            </li>
          ))}
        </ul>
      </section>
    </ProgramPage>
  );
}
