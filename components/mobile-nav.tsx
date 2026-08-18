"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data/site";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded border-2 border-ink/30 bg-card text-ink shadow-[2px_2px_0_rgba(56,52,42,0.12)]"
      >
        <span className="flex h-4 w-5 flex-col justify-between" aria-hidden>
          <span
            className={`h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-[2px] w-full rounded-full bg-current transition-opacity duration-150 ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-full rounded-full bg-current transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div
            id="mobile-menu"
            className="tape absolute inset-x-0 top-full z-50 mt-4 -rotate-[0.4deg] animate-[menu-in_160ms_ease-out] border border-ink/18 bg-card px-6 pt-5 pb-4 shadow-[3px_4px_0_rgba(56,52,42,0.18)]"
          >
            <ul className="divide-y divide-ink/10">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-[17px] italic underline decoration-brand-blue/50 underline-offset-[3px]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="block py-3.5 font-sans text-[12px] font-bold tracking-[0.14em] uppercase not-italic text-rust/85 no-underline"
                >
                  Donate →
                </Link>
              </li>
            </ul>
            <p className="pt-2 pb-1 text-right font-hand text-[19px] text-brand-blue">
              — see you at the center
            </p>
          </div>
        </>
      )}
    </>
  );
}
