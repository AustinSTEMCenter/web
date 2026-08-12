import type { NextConfig } from "next";

// 301 map from the old WordPress URLs — see plans/website-plan-02.md §9.2.
// WP-cruft catch-alls (/tag/*, /wp-content/*, feeds, …) get added at cutover.
const wpRedirects = [
  { source: "/about-us", destination: "/about" },
  { source: "/programs/fieldtrips", destination: "/programs/field-trips" },
  { source: "/programs/pre-apprentice-program", destination: "/programs/pre-apprentice" },
  { source: "/view-camps", destination: "/programs/summer-camps" },
  { source: "/register-for-camps", destination: "/programs/summer-camps" },
  { source: "/words-and-actions", destination: "/blog" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/privacy-policy-2", destination: "/privacy-policy" },
  // old blog posts lived at the site root
  {
    source: "/something-big-just-opened-in-central-texas-and-its-about-to-change-how-your-kids-learn",
    destination: "/blog/something-big-just-opened-in-central-texas-and-its-about-to-change-how-your-kids-learn",
  },
  { source: "/painting-stem-into-history", destination: "/blog/painting-stem-into-history" },
  { source: "/1259-2", destination: "/blog/discussing-backside-power-with-middle-school-students" },
  { source: "/1257-2", destination: "/blog/ascs-first-outbound-field-trip-lands-in-taylor-texas" },
  {
    source: "/from-first-first-to-second-third-and-beyond",
    destination: "/blog/from-first-first-to-second-third-and-beyond",
  },
  { source: "/1247-2", destination: "/blog/everyone-needs-a-first-first-experience" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...wpRedirects.map((r) => ({ ...r, permanent: true })),
      // Grand-opening RSVPs live on Luma now; temporary so /rsvp can be
      // repurposed or dropped after the event.
      { source: "/rsvp", destination: "https://luma.com/w5ay1e1w", permanent: false },
    ];
  },
};

export default nextConfig;
