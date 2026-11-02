"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/lib/data/site";

const linkClass =
  "underline decoration-brand-blue/50 underline-offset-[3px] hover:decoration-rust/70";

/**
 * Desktop nav link that reveals its sub-links on mouse hover or keyboard focus.
 * Touch taps just follow the link, since the page holds everything in the menu.
 */
export function NavDropdown({
  link,
}: {
  link: NavLink & { children: NonNullable<NavLink["children"]> };
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // set by Escape or a click; cleared when the mouse or focus comes back
  const [dismissed, setDismissed] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const open = (hovered || focused) && !dismissed;

  // Clears hover and focus too: a sub-link that unmounts under the cursor or
  // while focused never fires leave or blur, which would leave the menu stuck
  // open the next time it reopens.
  const dismiss = () => {
    setDismissed(true);
    setHovered(false);
    setFocused(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // the focused sub-link is about to unmount, so hand focus to the parent
      if (wrapper.current?.contains(document.activeElement)) {
        trigger.current?.focus();
      }
      dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        setHovered(true);
        setDismissed(false);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setHovered(false);
      }}
      onFocus={(e) => {
        setFocused(true);
        if (!e.currentTarget.contains(e.relatedTarget)) setDismissed(false);
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <Link
        ref={trigger}
        href={link.href}
        aria-expanded={open}
        onClick={dismiss}
        className={linkClass}
      >
        {link.label}
      </Link>
      {open && (
        // top padding, not margin, so the cursor can cross the gap to the menu
        <div className="absolute top-full left-0 z-50 pt-2">
          <ul className="w-56 border border-ink/18 bg-card px-4 py-2 shadow-[3px_4px_0_rgba(56,52,42,0.18)]">
            {link.children.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={dismiss}
                  className={`block py-1.5 ${linkClass}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
