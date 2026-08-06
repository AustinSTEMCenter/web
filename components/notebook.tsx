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

export function PageIntro({
  note,
  title,
  doodle,
  children,
}: {
  note: string;
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
      <p className="mb-2.5 font-hand text-[21px] text-brand-blue">{note}</p>
      <h1 className="text-[clamp(30px,4.2vw,46px)] leading-[1.1] font-bold tracking-[-0.01em] text-balance">
        {title}
      </h1>
      {children}
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
