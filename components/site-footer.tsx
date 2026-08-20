import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/25">
      <div className="mx-auto grid w-full max-w-[1100px] gap-8 pt-8 pb-10 pr-5 pl-[88px] max-sm:pl-[52px] md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/brand/asc-logo-horizontal.png"
              alt={site.name}
              width={7811}
              height={2280}
              sizes="180px"
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-2 max-w-[52ch] text-[15px] text-ink-soft">
            {site.footerBlurb}
          </p>
          <p className="mt-4 font-hand text-[20px] text-brand-blue">
            — see you at the center
          </p>
        </div>
        <div className="text-[15px]">
          <p>
            <a href={site.phoneHref} className="underline decoration-brand-blue/50 underline-offset-[3px]">
              {site.phone}
            </a>
          </p>
          <p className="mt-1 text-ink-soft">
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-blue/50 underline-offset-[3px]"
            >
              {site.address.street}
              <br />
              {site.address.cityStateZip}
            </a>
          </p>
          <p className="mt-4 flex gap-4 italic">
            <Link href="/privacy-policy" className="underline decoration-brand-blue/50 underline-offset-[3px]">
              privacy
            </Link>
            <Link href="/terms-and-conditions" className="underline decoration-brand-blue/50 underline-offset-[3px]">
              terms
            </Link>
            <Link href="/waivers" className="underline decoration-brand-blue/50 underline-offset-[3px]">
              waivers
            </Link>
            <Link href="/donate" className="underline decoration-brand-blue/50 underline-offset-[3px]">
              donate
            </Link>
            <a
              href={site.newsletterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-brand-blue/50 underline-offset-[3px]"
            >
              newsletter
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
