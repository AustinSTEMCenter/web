import type { MetadataRoute } from "next";
import { camps } from "@/lib/data/camps";
import { machines } from "@/lib/data/machines";
import { getPublishedPosts } from "@/lib/data/posts";
import { site } from "@/lib/data/site";

const pages = [
  "/",
  "/about",
  "/about/financials-and-governance",
  "/programs",
  "/programs/labs",
  "/programs/after-school-clubs",
  "/programs/field-trips",
  "/programs/summer-camps",
  "/programs/howdy-bots",
  "/machines",
  "/facility-rentals",
  "/tours",
  "/contact",
  "/blog",
  "/frckickoff",
  "/waivers",
  "/privacy-policy",
  "/terms-and-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  return [
    ...pages.map((path) => ({ url: url(path) })),
    ...camps.map(({ slug }) => ({ url: url(`/camps/${slug}`) })),
    ...machines.map(({ slug }) => ({ url: url(`/machines/${slug}`) })),
    ...getPublishedPosts().map(({ slug, date }) => ({
      url: url(`/blog/${slug}`),
      lastModified: date,
    })),
  ];
}
