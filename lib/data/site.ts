export const site = {
  name: "Austin STEM Center",
  url: "https://www.austinstemcenter.org",
  /** The 501(c)(3) that operates Austin STEM Center (ASC is a DBA). */
  legalName: "ATX Robotics, Inc.",
  ein: "81-3604667",
  tagline: "We're redesigning how the world learns.",
  phone: "(512) 220-1698",
  phoneHref: "tel:+15122201698",
  address: {
    street: "11525 Stonehollow Dr., Suite A100",
    city: "Austin",
    state: "TX",
    zip: "78758",
  },
  mapUrl: "https://maps.app.goo.gl/jPFUhc7qek9uUA2cA",
  donateUrl: "https://givebutter.com/austin-stem-center",
  newsletterUrl: "https://austinstemcenter.subscribepage.io/",
  scholarshipFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLScxH5eiP_jgKMv51MsGVG7Oz_f-mNBaxzIr7iaBlu6Hkjo_hQ/viewform",
  footerBlurb:
    "Austin STEM Center is a nonprofit in North Austin where kids and teens learn STEM by building real projects in labs, clubs, camps, and school field trips.",
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

// One list feeds both the header dropdown and the tab row on /programs.
export const programLinks = [
  { label: "Labs", href: "/programs/labs" },
  { label: "STEM Clubs", href: "/programs/after-school-clubs" },
  { label: "Field Trips", href: "/programs/field-trips" },
  { label: "Summer Camps", href: "/programs/summer-camps" },
  { label: "Howdy Bots", href: "/programs/howdy-bots" },
];

export const navLinks: NavLink[] = [
  { label: "about", href: "/about" },
  { label: "programs", href: "/programs", children: programLinks },
  { label: "facility rentals", href: "/facility-rentals" },
  // { label: "volunteer", href: "/volunteer" }, // hidden until roles are confirmed (app/_volunteer)
  { label: "tours", href: "/tours" },
  // { label: "blog", href: "/blog" }, // parked until the blog gets another pass (app/blog still serves)
  { label: "contact", href: "/contact" },
];
