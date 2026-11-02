"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  { label: "all programs", href: "/programs" },
  { label: "labs", href: "/programs/labs" },
  { label: "clubs", href: "/programs/after-school-clubs" },
  { label: "field trips", href: "/programs/field-trips" },
  { label: "camps", href: "/programs/summer-camps" },
];

/** Index tabs shared by every /programs page, so you can hop between them. */
export function ProgramsNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Programs"
      className="flex flex-wrap items-center gap-x-2.5 gap-y-2.5 pt-7"
    >
      <span className="mr-1 font-hand text-[20px] leading-none text-brand-blue">
        jump to →
      </span>
      {tabs.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`inline-block rounded-[3px] border px-3 py-1.5 text-[14px] italic shadow-[2px_2px_0_rgba(56,52,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${
              active
                ? "border-ink bg-ink text-paper"
                : "border-ink/25 bg-card hover:border-ink/50"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
