// Generates plaque-ready QR code SVGs for every machine page.
// Usage: node scripts/generate-qr-plaques.mjs
// Output: design/plaques/qr-<slug>.svg

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const BASE_URL = "https://www.austinstemcenter.org";
const OUT_DIR = path.join(import.meta.dirname, "../design/plaques");

const data = await readFile(path.join(import.meta.dirname, "../lib/data/machines.ts"), "utf8");
const slugs = [...data.matchAll(/^\s*slug: "([a-z0-9-]+)",$/gm)].map((m) => m[1]);
if (slugs.length === 0) throw new Error("no machine slugs found");

await mkdir(OUT_DIR, { recursive: true });
for (const slug of slugs) {
  const url = `${BASE_URL}/machines/${slug}`;
  const svg = await QRCode.toString(url, {
    type: "svg",
    // high error correction — plaques live on shop machines and take abuse
    errorCorrectionLevel: "H",
    margin: 4,
    color: { dark: "#000000", light: "#ffffff" },
  });
  const file = path.join(OUT_DIR, `qr-${slug}.svg`);
  await writeFile(file, svg);
  console.log(`${file}  →  ${url}`);
}
