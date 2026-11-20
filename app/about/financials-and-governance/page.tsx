import type { Metadata } from "next";
import Link from "next/link";
import { Gear } from "@/components/doodles";
import { NoteCard, PageIntro, SectionHeading } from "@/components/notebook";
import { publishedDocuments, site } from "@/lib/data/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about/financials-and-governance" },
  title: "Financials and Governance",
  description: `Austin STEM Center is operated by ${site.legalName}, a Texas nonprofit corporation and 501(c)(3) organization (EIN ${site.ein}). Legal structure, tax documents, and governance.`,
};

const programAreas = [
  {
    name: "Austin STEM Center (ASC)",
    description:
      "A STEM education and innovation hub dedicated to making STEM accessible, exciting, and hands-on for learners of all ages.",
  },
  {
    name: "Howdy Bots - FRC 6377",
    description:
      "Our FIRST Robotics Competition team, providing students ages 13–18 with hands-on engineering and business experience.",
  },
  {
    name: "North Austin Science Alliance (NASA)",
    description:
      "A weekly science program for students ages 6–18, offering hands-on exploration, guest speakers, and participation in nationally recognized competitions.",
  },
];

export default function FinancialsAndGovernancePage() {
  return (
    <div className="pb-4">
      <PageIntro
        note="field notes — the nonprofit"
        title={
          <>
            Financials and <span className="hl">governance.</span>
          </>
        }
        doodle={<Gear className="h-16 -rotate-12 text-gold/70" />}
      />

      {/* legal structure */}
      <section className="pt-12">
        <NoteCard id="legal-structure" className="max-w-[680px] rotate-[0.3deg]">
          <SectionHeading>Our legal structure.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              Austin STEM Center is operated by {site.legalName}, a Texas
              nonprofit corporation and federally recognized 501(c)(3)
              tax-exempt organization. Donations are tax-deductible to the
              extent allowed by law.
            </p>
            <p>
              To serve our communities effectively through specialized
              initiatives, our organization legally operates under the following
              registered Assumed Names (DBAs) in the State of Texas:
            </p>
            <ul>
              <li>Howdy Bots</li>
              <li>Austin STEM Center (ASC)</li>
            </ul>
          </div>
          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 border-t border-ink/15 pt-5 text-[15px]">
            <dt className="italic text-ink-soft">Legal name</dt>
            <dd className="font-bold">{site.legalName}</dd>
            <dt className="italic text-ink-soft">EIN</dt>
            <dd className="font-bold">{site.ein}</dd>
            <dt className="italic text-ink-soft">Status</dt>
            <dd className="font-bold">501(c)(3) tax-exempt</dd>
          </dl>
        </NoteCard>
      </section>

      {/* documents: stays hidden until a PDF is listed in lib/data/site.ts */}
      {publishedDocuments.length > 0 && (
        <section className="pt-20">
          <NoteCard id="documents" className="max-w-[680px] -rotate-[0.3deg]">
            <SectionHeading>Documents.</SectionHeading>
            <ul className="mt-5 divide-y divide-ink/15">
              {publishedDocuments.map(({ id, label, files }) => (
                <li key={id} id={id} className="py-4">
                  <h3 className="text-[17px] leading-snug font-bold">{label}</h3>
                  <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[15px]">
                    {files.map((file) => (
                      <a
                        key={file.href}
                        href={file.href}
                        download
                        className="text-link"
                      >
                        {file.label} ↓
                      </a>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </NoteCard>
        </section>
      )}

      {/* mission */}
      <section className="pt-20">
        <NoteCard id="mission" className="max-w-[680px] rotate-[0.4deg]">
          <SectionHeading>Our mission.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              The mission of ATX Robotics is to expand access to hands-on
              robotics and STEAM education, inspiring learners of all ages to
              explore, create, and develop skills for the future.
            </p>
            <p>
              While ATX Robotics started as a high school-age team competing in
              the FIRST Robotics Competition, we have always had a bigger
              vision: expanding robotics and STEAM education for children of all
              ages. Today, Howdy Bots and ASC unite to deliver high-quality
              STEAM programs to youth in the Austin area. We open doors to
              competitive robotics for students regardless of their educational
              status or ability, including those who are homeschooled,
              non-traditionally enrolled, or attend schools without a team. With
              volunteer professional engineers and business mentors, our
              students work on hands-on challenges designed to build interest
              and spark a lifelong passion for science, technology, engineering,
              art, and mathematics (STEAM).
            </p>
          </div>
        </NoteCard>
      </section>

      {/* program areas */}
      <section className="pt-20">
        <NoteCard id="program-areas" className="-rotate-[0.3deg]">
          <SectionHeading>Our program areas.</SectionHeading>
          <p className="mt-4 text-[17px] text-ink-soft">
            ATX Robotics delivers its mission through three program areas:
          </p>
          <ul className="mt-6 grid grid-cols-3 gap-x-8 gap-y-6 max-md:grid-cols-1">
            {programAreas.map(({ name, description }) => (
              <li key={name}>
                <h3 className="text-[19px] leading-snug font-bold">{name}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </NoteCard>
      </section>

      {/* board lives on /about now; keep the governance link for funders */}
      <section className="pt-20">
        <NoteCard id="board-of-directors" className="max-w-[680px] rotate-[0.3deg]">
          <SectionHeading>Board of directors.</SectionHeading>
          <div className="prose-note mt-6">
            <p>
              ATX Robotics is overseen by a Board of Directors that is actively
              engaged in strategic planning for the growth of Howdy Bots and the
              addition of more teams, in relationship development, and in
              community involvement with the aim of promoting STEAM. All of the
              board members are leaders in their respective fields and
              organizations, representing engineering, business, and education.
            </p>
          </div>
          <Link href="/about#board" className="text-link mt-4 inline-block">
            meet the board →
          </Link>
        </NoteCard>
      </section>
    </div>
  );
}
