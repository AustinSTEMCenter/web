import type { Metadata } from "next";
import Link from "next/link";
import { Gear } from "@/components/doodles";
import { PageIntro, SectionHeading } from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";
import { machines } from "@/lib/data/machines";

export const metadata: Metadata = {
  title: "Machines",
  description:
    "A field guide to the machines in our shop: CO₂ lasers, a fiber laser that cuts steel, a 4×8 CNC router, laser welding, and a full wood shop — what each one is, what it does, and what you can make with it.",
};

export default function MachinesPage() {
  const rooms = facilities.filter((f) => machines.some((m) => m.facility === f.slug));

  return (
    <>
      <PageIntro
        note="field notes — the shop"
        title={
          <>
            Meet the <span className="hl-purple">machines.</span>
          </>
        }
        doodle={<Gear className="h-14 rotate-12 text-ring-teal/60" />}
      >
        <p className="mt-5 max-w-[56ch] text-[17px] text-ink-soft">
          Every machine in our shop has a story: what it is, how it works, and what you can make
          with it. Scan the plaque next to any machine and it lands you right here — or browse the
          whole lineup below.
        </p>
      </PageIntro>

      <div className="mt-14 space-y-16">
        {rooms.map((room) => (
          <section key={room.slug}>
            <p className="mb-2 font-hand text-[21px] text-brand-blue">
              in the {room.name.toLowerCase()}
            </p>
            <SectionHeading>{room.name}.</SectionHeading>
            <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-10 max-md:grid-cols-1">
              {machines
                .filter((m) => m.facility === room.slug)
                .map((m, i) => (
                  <Link
                    key={m.slug}
                    href={`/machines/${m.slug}`}
                    className={`tape group relative block border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)] transition-transform hover:-translate-y-0.5 ${i % 2 ? "rotate-[0.6deg]" : "-rotate-[0.5deg]"}`}
                  >
                    <p className="text-[12px] font-semibold tracking-[0.14em] uppercase text-ink-soft">
                      {m.kind}
                    </p>
                    <h3 className="mt-1 text-[19px] font-bold group-hover:underline">{m.name}</h3>
                    <p className="mt-1 font-hand text-[20px] text-brand-blue">{m.tagline}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{m.whatItIs}</p>
                    <p className="mt-3 text-[14px] font-semibold text-brand-blue">
                      read the field notes →
                    </p>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
