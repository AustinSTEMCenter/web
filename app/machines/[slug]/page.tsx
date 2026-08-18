import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Annotation, PageIntro, Stamp } from "@/components/notebook";
import { facilities } from "@/lib/data/facilities";
import { getMachine, machines } from "@/lib/data/machines";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return machines.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const machine = getMachine((await params).slug);
  if (!machine) return {};
  return { title: machine.name, description: machine.whatItIs };
}

export default async function MachinePage({ params }: Props) {
  const machine = getMachine((await params).slug);
  if (!machine) notFound();

  const room = facilities.find((f) => f.slug === machine.facility);
  const hero = machine.images?.[0];
  const related = (machine.related ?? [])
    .map((slug) => getMachine(slug))
    .filter((m) => m !== undefined);

  return (
    <>
      <Stamp className="absolute top-[46px] right-5 z-10 rotate-[7deg] max-md:static max-md:mt-5 max-md:-rotate-2 max-md:px-2 max-md:py-1 max-md:text-[10px]">
        {machine.kind}
      </Stamp>

      <PageIntro
        note={`field notes — the shop / ${room ? room.name.toLowerCase() : "machines"}`}
        title={machine.name}
      />

      {/* what it is, beside the photo (or the tagline while photos are pending) */}
      <div className="mt-8 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1">
        <p className="max-w-[54ch] text-[17px] text-ink-soft">{machine.whatItIs}</p>
        {hero ? (
          <figure className="photo max-w-[400px] rotate-[0.9deg]">
            <Image
              src={hero.src}
              alt={hero.alt}
              width={1600}
              height={1067}
              className="aspect-[3/2] w-full object-cover"
              priority
            />
            <figcaption className="pt-2 text-center font-hand text-[19px] text-brand-blue">
              {machine.tagline}
            </figcaption>
          </figure>
        ) : (
          <Annotation className="justify-self-start md:mt-4 md:justify-self-center">
            {machine.tagline}
          </Annotation>
        )}
      </div>

      {/* what it does, beside the at-a-glance card */}
      <div className="mt-12 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start gap-x-12 gap-y-8 max-md:grid-cols-1">
        <div>
          <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            What it does
          </h2>
          <div className="prose-note mt-3 max-w-[62ch] text-[16px]">
            {machine.whatItDoes.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
          </div>

          {machine.tools && (
            <>
              <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
                What&apos;s inside
              </h2>
              <ul className="mt-3 max-w-[62ch] space-y-2 text-[16px] leading-relaxed">
                {machine.tools.map((tool) => (
                  <li key={tool.name}>
                    <span className="font-semibold">{tool.name}</span>{" "}
                    <span className="text-ink-soft">— {tool.blurb}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <h2 className="mt-10 text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            Things you can make
          </h2>
          <ul className="mt-3 max-w-[62ch] list-disc pl-5 text-[16px] leading-[1.9]">
            {machine.youCanMake.map((item) => (
              <li key={item.slice(0, 32)}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          {machine.facts && (
            <div className="max-w-[400px] border border-ink/18 bg-card px-6 py-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
              <h3 className="text-[15px] font-semibold italic">At a glance</h3>
              <dl className="mt-3 space-y-2 text-[15px]">
                {machine.facts.map((fact) => (
                  <div key={fact.label} className="flex justify-between gap-4">
                    <dt className="shrink-0 text-ink-soft">{fact.label}</dt>
                    <dd className="text-right font-semibold">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              {room && (
                <p className="mt-4 font-hand text-[19px] text-brand-blue">
                  you&apos;ll find it in the{" "}
                  <Link href={`/facilities#${room.slug}`} className="underline">
                    {room.name.toLowerCase()}
                  </Link>
                </p>
              )}
            </div>
          )}

          <div className="tape relative max-w-[400px] -rotate-[0.5deg] border border-ink/18 bg-card px-6 pt-6 pb-5 shadow-[3px_4px_0_rgba(56,52,42,0.12)]">
            <h3 className="text-[16px] font-bold">Want to run it, not just read about it?</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
              Machines like this come alive during our{" "}
              <Link
                href="/programs"
                className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
              >
                camps, clubs, and field trips
              </Link>{" "}
              — or{" "}
              <Link
                href="/contact"
                className="text-brand-blue underline decoration-brand-blue/50 underline-offset-[3px]"
              >
                book a tour
              </Link>{" "}
              and see the whole shop.
            </p>
          </div>
        </div>
      </div>

      {/* extra photos, once they're taped in */}
      {machine.images && machine.images.length > 1 && (
        <section className="mt-16">
          <h2 className="text-[15px] font-semibold tracking-[0.08em] uppercase text-ink-soft">
            From the shop floor
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-12 max-md:grid-cols-1">
            {machine.images.slice(1).map((photo, i) => (
              <figure
                key={photo.src}
                className={`photo ${i % 2 === 0 ? "rotate-[0.7deg]" : "-rotate-[0.6deg]"}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={1600}
                  height={1067}
                  className="aspect-[3/2] w-full object-cover"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <div className="pt-12 pb-4">
          <Annotation>
            ↳ next stop:{" "}
            {related.map((m, i) => (
              <span key={m.slug}>
                {i > 0 && " · "}
                <Link href={`/machines/${m.slug}`} className="underline">
                  {m.name}
                </Link>
              </span>
            ))}
          </Annotation>
        </div>
      )}
    </>
  );
}
