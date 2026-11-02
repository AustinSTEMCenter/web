export const site = {
  name: "Austin STEM Center",
  tagline: "We're redesigning how the world learns.",
  phone: "(512) 220-1698",
  phoneHref: "tel:+15122201698",
  address: {
    street: "11525 Stonehollow Dr., Suite A100",
    cityStateZip: "Austin, TX 78758",
  },
  mapUrl: "https://maps.app.goo.gl/jPFUhc7qek9uUA2cA",
  donateUrl: "https://givebutter.com/austin-stem-center",
  newsletterUrl: "https://austinstemcenter.subscribepage.io/",
  scholarshipFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScxH5eiP_jgKMv51MsGVG7Oz_f-mNBaxzIr7iaBlu6Hkjo_hQ/viewform",
  footerBlurb:
    "Austin STEM Center (ASC) is a nonprofit innovation hub where schools, companies, and communities come together to solve real problems and grow real talent.",
};

export type GovernanceDocument = {
  id: string;
  label: string;
  files: { label: string; href: string }[];
};

// To publish a document, add the PDF to public/documents/ and list it in
// `files`. It then appears on the page and in the nav automatically.
export const governanceDocuments: GovernanceDocument[] = [
  { id: "irs-form-990", label: "IRS Form 990", files: [] },
  {
    id: "irs-determination-letter",
    label: "IRS Determination Letter",
    files: [
      {
        label: "Download PDF",
        href: "/documents/atx-robotics-irs-determination-letter.pdf",
      },
    ],
  },
  {
    id: "texas-tax-exemption",
    label: "Texas State Tax Exemption",
    files: [
      {
        label: "Download PDF",
        href: "/documents/atx-robotics-texas-tax-exemption-letter.pdf",
      },
    ],
  },
  { id: "bylaws", label: "Current Bylaws", files: [] },
];

export const publishedDocuments = governanceDocuments.filter(
  (document) => document.files.length > 0,
);

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const atxRoboticsHref = "/about/atx-robotics";

export const navLinks: NavLink[] = [
  { label: "about", href: "/about" },
  { label: "programs", href: "/programs" },
  { label: "facility rentals", href: "/facility-rentals" },
  // { label: "volunteer", href: "/volunteer" }, // hidden until roles are confirmed (app/_volunteer)
  { label: "tours", href: "/tours" },
  { label: "contact", href: "/contact" },
  {
    label: "ATX Robotics",
    href: atxRoboticsHref,
    children: [
      { label: "Our Legal Structure", href: `${atxRoboticsHref}#legal-structure` },
      { label: "Our Mission", href: `${atxRoboticsHref}#mission` },
      { label: "Our Program Areas", href: `${atxRoboticsHref}#program-areas` },
      {
        label: "Board of Directors",
        href: `${atxRoboticsHref}#board-of-directors`,
      },
      ...publishedDocuments.map(({ id, label }) => ({
        label,
        href: `${atxRoboticsHref}#${id}`,
      })),
    ],
  },
];
