import type { Metadata } from "next";
import { site } from "@/lib/data/site";

const defaultDescription =
  "A nonprofit STEM center in Austin, TX, with hands-on labs, clubs, field trips, and summer camps for students, schools, and families.";

/**
 * Open Graph fields every page shares. A page that sets its own `openGraph`
 * replaces the layout's whole object, so spread this in first.
 */
export const sharedOpenGraph = {
  siteName: site.name,
  locale: "en_US",
  type: "website",
  images: [
    {
      url: "/images/og-default.jpg",
      width: 1200,
      height: 630,
      alt: "A student building with aluminum rails at Austin STEM Center",
    },
  ],
} satisfies Metadata["openGraph"];

/** Root metadata. Each page sets its own `title`, `description`, and `alternates.canonical`;
 * Next.js copies each page's title and description into the share tags. */
export const rootMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: defaultDescription,
  openGraph: sharedOpenGraph,
  twitter: { card: "summary_large_image" },
};

/** schema.org data for the organization, rendered once in the root layout. */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "NGO"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: "ASC",
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/images/brand/asc-logo-horizontal.png`,
  image: `${site.url}/images/og-default.jpg`,
  description: defaultDescription,
  taxID: site.ein,
  nonprofitStatus: "https://schema.org/Nonprofit501c3",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
};

/** Serialize JSON-LD for a <script> tag, escaping `<` so content can't close it. */
export function jsonLd(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
