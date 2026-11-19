"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { programLinks } from "@/lib/data/site";

const tabs = [{ label: "All programs", href: "/programs" }, ...programLinks];

/** Index tabs shared by every /programs page, so you can hop between them. */
export function ProgramsNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Programs"
      className="grid grid-cols-6 gap-2.5 pt-7 max-md:grid-cols-3 max-sm:grid-cols-2"
    >
      {tabs.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`rounded-[3px] border px-3 py-2 text-center text-[14px] italic lowercase shadow-[2px_2px_0_rgba(56,52,42,0.08)] transition-transform duration-150 hover:-translate-y-0.5 ${
              active
                ? "border-rust bg-rust text-paper"
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
