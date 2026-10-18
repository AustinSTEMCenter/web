import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { navLinks, site } from "@/lib/data/site";

function DonateLink() {
  return (
    <a
      href={site.donateUrl}
      className="rounded border-2 border-rust/75 px-2.5 py-0.5 font-sans text-[11px] font-bold tracking-[0.14em] uppercase not-italic text-rust/85 no-underline transition-colors duration-150 hover:bg-rust/10 active:translate-y-[1px]"
    >
      Donate
    </a>
  );
}

export function SiteHeader() {
  return (
    <nav className="relative flex items-center justify-between gap-4 text-sm italic md:justify-start md:gap-x-6">
      <Link href="/" className="shrink-0 not-italic no-underline">
        <Image
          src="/images/brand/asc-logo-horizontal.png"
          alt="Austin STEM Center"
          width={7811}
          height={2280}
          priority
          sizes="180px"
          className="h-11 w-auto"
        />
      </Link>
      <span className="hidden flex-wrap items-baseline gap-x-6 gap-y-2.5 md:flex">
        {navLinks.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className="underline decoration-brand-blue/50 underline-offset-[3px] hover:decoration-rust/70"
          >
            {label}
          </Link>
        ))}
        <DonateLink />
      </span>
      <span className="flex items-center gap-3 md:hidden">
        <DonateLink />
        <MobileNav />
      </span>
    </nav>
  );
}
