import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Post = {
  title: string;
  slug: string;
  oldSlug?: string;
  date: string;
  author: string;
  excerpt: string;
  cover?: string;
  /** Describes the cover photo for screen readers and search. */
  coverAlt?: string;
  /** "event" marks a recap of something we hosted, so the log of events can be picked out of the notebook. */
  kind?: "event";
  html: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const PAGES_DIR = path.join(process.cwd(), "content/pages");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    }
    meta[key] = value;
  }
  return { meta, body: match[2] };
}

function loadPost(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return {
    title: meta.title ?? "",
    slug: meta.slug ?? file.replace(/\.md$/, ""),
    oldSlug: meta.oldSlug,
    date: meta.date ?? "",
    author: meta.author ?? "Austin STEM Center",
    excerpt: meta.excerpt ?? "",
    cover: meta.cover,
    coverAlt: meta.coverAlt,
    kind: meta.kind === "event" ? "event" : undefined,
    html: marked.parse(body, { async: false }),
  };
}

export function getPublishedPosts(): Post[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(loadPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getLegalPage(slug: string): { title: string; html: string } {
  const raw = fs.readFileSync(path.join(PAGES_DIR, `${slug}.md`), "utf8");
  const { meta, body } = parseFrontmatter(raw);
  return { title: meta.title ?? slug, html: marked.parse(body, { async: false }) };
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
