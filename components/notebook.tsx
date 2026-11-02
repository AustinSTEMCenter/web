import type { ReactNode } from "react";

export function Stamp({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded border-[3px] border-rust/75 px-[13px] py-[7px] font-sans text-xs font-extrabold tracking-[0.22em] uppercase text-rust/85 ${className}`}
    >
      {children}
    </span>
  );
}

export function Annotation({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-block -rotate-3 font-hand text-[22px] text-rust ${className}`}
    >
      {children}
    </span>
  );
}

/**
 * Card that keeps body text readable against the graph paper. Taped by default;
 * use `flat` for repeated rows, where a strip of tape on each gets too busy.
 */
export function NoteCard({
  children,
  className = "",
  id,
  flat = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  flat?: boolean;
}) {
  const variant = flat
    ? "px-6 py-5 shadow-[2px_3px_0_rgba(56,52,42,0.1)] max-sm:px-4"
    : "tape px-8 py-7 shadow-[4px_5px_0_rgba(56,52,42,0.12)] max-md:px-5";
  return (
    <div
      id={id}
      className={`relative border border-ink/18 bg-card [&_.prose-note>:first-child]:mt-0! [&_.prose-note>:last-child]:mb-0! ${variant} ${className}`}
    >
      {children}
    </div>
  );
}

export function PageIntro({
  note,
  title,
  doodle,
  children,
}: {
  note?: string;
  title: ReactNode;
  doodle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative pt-12">
      {doodle && (
        <span
          aria-hidden
          className="pointer-events-none absolute top-16 right-8 hidden md:block"
        >
          {doodle}
        </span>
      )}
      {note && (
        <p className="mb-2.5 font-hand text-[21px] text-brand-blue">{note}</p>
      )}
      <h1 className="text-[clamp(30px,4.2vw,46px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
        {title}
      </h1>
      {children && (
        <NoteCard className="mt-7 max-w-[680px] -rotate-[0.3deg]">
          {children}
        </NoteCard>
      )}
    </header>
  );
}

export function SectionHeading({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(24px,3vw,30px)] leading-tight font-bold text-balance ${className}`}
    >
      {children}
    </h2>
  );
}

/** Visible placeholder for copy we don't have yet — grep `<Tbd` before launch. */
export function Tbd({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[3px] border border-dashed border-rust/60 bg-rust/5 px-1.5 font-sans text-[0.85em] not-italic text-rust">
      TBD: {children}
    </span>
  );
}
