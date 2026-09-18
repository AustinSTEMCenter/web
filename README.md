# Austin STEM Center — public website

The code behind **https://www.austinstemcenter.org**. This is the marketing
and information site for Austin STEM Center (ASC): programs, facilities,
machines, team, contact form, donations, and a few event pages.

This README is the team guide. It covers how the site is set up, how it works,
and how to make edits safely. If something here is out of date, fix it in the
same pull request as the change that made it stale.

- **GitHub:** https://github.com/AustinSTEMCenter/web
- **Hosting:** Vercel (project `web`). Every push to `main` deploys to production automatically.
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- **Package manager:** pnpm (the lockfile is `pnpm-lock.yaml`; do not use npm or yarn here)

---

## Contents

1. [Quick start](#quick-start)
2. [How the site is built](#how-the-site-is-built)
3. [Repo map](#repo-map)
4. [Pages and where their content lives](#pages-and-where-their-content-lives)
5. [How to make common edits](#how-to-make-common-edits)
6. [Integrations and services](#integrations-and-services)
7. [Environment variables](#environment-variables)
8. [Making changes and deploying](#making-changes-and-deploying)
9. [Design system](#design-system)
10. [Gotchas and things to know](#gotchas-and-things-to-know)

---

## Quick start

You need **Node.js 20 or newer** (24 is what we develop on) and **pnpm**.
If you don't have pnpm: `corepack enable` (ships with Node) or `npm i -g pnpm`.

```bash
git clone git@github.com:AustinSTEMCenter/web.git
cd web
pnpm install
pnpm dev
```

Open http://localhost:3000. Pages hot-reload as you edit.

Useful commands:

| Command        | What it does                                                   |
| -------------- | -------------------------------------------------------------- |
| `pnpm dev`     | Run the site locally with hot reload                           |
| `pnpm lint`    | Run ESLint (Next.js + TypeScript rules). Run before opening a PR |
| `pnpm build`   | Production build. Vercel runs this on deploy; run it locally if you touched config or data loading |
| `pnpm start`   | Serve the production build locally (after `pnpm build`)        |
| `pnpm exec tsc --noEmit` | Type-check without building                          |

No environment variables are required just to run the site. The contact form,
donation counter, and grand-opening board degrade gracefully when their
variables are missing (see [Environment variables](#environment-variables)).

---

## How the site is built

**It is a static-first Next.js site with almost no backend.** Nearly every
page is rendered at build time from content that lives in this repo. There is
no CMS, no database, and no admin UI for the public site. Editing content
means editing a file and opening a pull request.

The three layers:

1. **Content and data** — plain TypeScript arrays in `lib/data/` (camps,
   machines, facilities, programs, team, site-wide info) and Markdown files in
   `content/` (legal pages, archived blog posts). This is where most edits happen.
2. **Pages** — one folder per URL under `app/`. A page file imports the data
   it needs and lays it out. Pages with a `[slug]` folder (camps, machines)
   generate one page per entry in the matching data file automatically.
3. **Shared components and styles** — `components/` holds the header, footer,
   contact form, and the "notebook" building blocks (page intros, stamps,
   handwritten annotations, doodles). `app/globals.css` defines the theme
   tokens (colors, fonts) and the graph-paper page styling.

Three things run on the server at request time:

- The **contact form** submits through a Next.js Server Action that forwards
  the submission to a Google Apps Script webhook (writes to a Google Sheet and emails Joseph).
- The **grand-opening live board** (`/grand-opening`) polls `/api/grand-opening`,
  which reads a door-counter value from Upstash Redis and a donation total from Stripe.
- **Redirects** from old WordPress URLs are handled by Next.js config (`next.config.ts`).

Donations use a hosted **Stripe Buy Button**, so no payment code runs here.

---

## Repo map

```
app/                    Routes. Each folder = a URL. page.tsx is the page.
  layout.tsx            Root layout: header, footer, fonts, Vercel Analytics, <title> template
  globals.css           Theme tokens (@theme) + notebook/graph-paper styles
  page.tsx              Homepage
  not-found.tsx         404 page
  api/grand-opening/    JSON endpoint for the live board
  camps/[slug]/         One page per camp in lib/data/camps.ts
  machines/             Machine index + one page per machine ([slug])
  programs/             Programs index + field-trips, after-school-clubs, summer-camps
  contact/              Contact page + actions.ts (server action that sends the form)
  donate/               Donate page (Stripe Buy Button) + thank-you page
  grand-opening/        Live event board (not indexed by search engines)
  waivers/              Links to the liability waiver + media release PDFs
  privacy-policy/       Rendered from content/pages/privacy-policy.md
  terms-and-conditions/ Rendered from content/pages/terms-and-conditions.md
components/             Shared UI (see "Design system" below)
content/
  pages/                Markdown for legal pages
  posts/                Archived blog posts (blog is currently switched off, see Gotchas)
lib/
  data/                 THE CONTENT. camps, machines, facilities, programs, team, site
  forms-webhook.ts      Sends form submissions to the Google Apps Script webhook
  grand-opening/        Fetches + caches counter and Stripe stats for the live board
public/
  images/               All images, organized by section (about, camps, facilities, team, ...)
  forms/                Waiver + media release PDFs
docs/                   Setup notes (currently: the contact-form webhook)
scripts/                One-off tooling (QR plaque generator for machine pages)
next.config.ts          Redirects from the old WordPress site
```

Folders you may see locally that are **not** in git: `design/`, `plans/`,
`reviews/`, `.claude/`, `CLAUDE.md`. They are personal scratch space and are gitignored.

---

## Pages and where their content lives

| URL                        | Page file                              | Content comes from                                  |
| -------------------------- | -------------------------------------- | --------------------------------------------------- |
| `/`                        | `app/page.tsx`                         | Copy is inline in the file                          |
| `/about`                   | `app/about/page.tsx`                   | Copy inline; team grid from `lib/data/team.ts`      |
| `/facilities`              | `app/facilities/page.tsx`              | `lib/data/facilities.ts`                            |
| `/machines`                | `app/machines/page.tsx`                | `lib/data/machines.ts` (+ facilities for grouping)  |
| `/machines/<slug>`         | `app/machines/[slug]/page.tsx`         | One entry in `lib/data/machines.ts`                 |
| `/programs`                | `app/programs/page.tsx`                | `lib/data/programs.ts`                              |
| `/programs/field-trips`    | `app/programs/field-trips/page.tsx`    | `lib/data/programs.ts` via the shared `ProgramPage` component |
| `/programs/after-school-clubs` | `app/programs/after-school-clubs/page.tsx` | Same as above                               |
| `/programs/summer-camps`   | `app/programs/summer-camps/page.tsx`   | `lib/data/programs.ts` + camp cards from `lib/data/camps.ts` |
| `/camps/<slug>`            | `app/camps/[slug]/page.tsx`            | One entry in `lib/data/camps.ts`                    |
| `/contact`                 | `app/contact/page.tsx`                 | Form in `components/contact-form.tsx`; sending logic in `app/contact/actions.ts` |
| `/donate`                  | `app/donate/page.tsx`                  | Copy inline; button in `components/donation-checkout.tsx` |
| `/donate/thank-you`        | `app/donate/thank-you/page.tsx`        | Copy inline (Stripe redirects here after payment)   |
| `/waivers`                 | `app/waivers/page.tsx`                 | PDFs in `public/forms/`                             |
| `/privacy-policy`          | `app/privacy-policy/page.tsx`          | `content/pages/privacy-policy.md`                   |
| `/terms-and-conditions`    | `app/terms-and-conditions/page.tsx`    | `content/pages/terms-and-conditions.md`             |
| `/grand-opening`           | `app/grand-opening/page.tsx`           | Live data from `/api/grand-opening`                 |
| `/rsvp`                    | `next.config.ts`                       | Temporary redirect to the Luma event                |

Site-wide details (phone, address, map link, newsletter URL, scholarship form
URL, footer blurb, and the **header navigation links**) live in `lib/data/site.ts`.

---

## How to make common edits

Every edit follows the same loop: make a branch, change the file, check it at
http://localhost:3000, run `pnpm lint`, open a PR, merge. See
[Making changes and deploying](#making-changes-and-deploying) for the branch rules.

### Change wording on a page

Find the page in the table above. If the copy is inline, edit the JSX in that
`page.tsx`. Apostrophes and quotes inside JSX text use HTML entities
(`&rsquo;`, `&ldquo;`) to keep the linter happy. Highlighted phrases use
`<span className="hl-green">…</span>`. The available marks are `hl-teal`,
`hl-green`, and `hl-purple`, defined in `globals.css`.

### Add or update a team member

Edit `lib/data/team.ts`. Each person is `{ name, title, image }` inside a
group (Leadership, Programming, Steering Committee). Drop the headshot in
`public/images/team/` and reference it as `/images/team/<file>.jpg`. Order
within a group is the order on the page.

### Add or edit a camp

Edit `lib/data/camps.ts`. Each camp has a `slug` (becomes the URL
`/camps/<slug>`), an illustrated `image` for the card, `photos` for the detail
page, plus season, age range, schedule, sessions, price, pitch, and an
"expect" list. Images go in `public/images/camps/`. Adding an entry
automatically creates its page and its card on `/programs/summer-camps`.

### Add or edit a machine

Edit `lib/data/machines.ts`. The `facility` field must match a `slug` in
`lib/data/facilities.ts`; that is how the machine index groups machines by
room. The `related` list holds other machine slugs. Adding an entry creates
`/machines/<slug>`. If the machine will get a physical QR plaque, run
`node scripts/generate-qr-plaques.mjs` to produce the SVGs (output goes to
`design/plaques/`, which is local-only).

### Add or edit a facility (room)

Edit `lib/data/facilities.ts`. Photos live in `public/images/facilities/`.
Facility sections on `/facilities` are anchor-linkable, for example
`/facilities#wood-shop`.

### Change a program (field trips, after-school clubs, summer camps)

Edit `lib/data/programs.ts`. Field trips and after-school clubs render
through the shared `components/program-page.tsx`, so changing the data is
enough. The summer camps page has its own layout in
`app/programs/summer-camps/page.tsx` because it also lists the camps.

### Edit the privacy policy or terms

Edit the Markdown in `content/pages/`. Keep the `title` line in the
frontmatter at the top. Standard Markdown works (headings, bold, lists, links).

### Change the phone number, address, footer text, or nav links

Edit `lib/data/site.ts`. The header nav is the `navLinks` array. The footer
also links to privacy, terms, waivers, donate, and the newsletter.

### Replace the waiver or media release PDF

Overwrite the file in `public/forms/` with the same filename. If you rename
it, update the link in `app/waivers/page.tsx`.

### Add a redirect (old URL to new URL)

Add a line to the list in `next.config.ts`. Use `permanent: true` for URLs
that are gone for good and `permanent: false` for temporary ones (like `/rsvp`).

### Add a brand-new page

1. Create `app/<url>/page.tsx`.
2. Export a `metadata` object with `title` and `description` (the title is
   suffixed with "· Austin STEM Center" automatically).
3. Wrap the top of the page in `PageIntro` from `components/notebook.tsx` so
   it matches the rest of the site. Look at `app/waivers/page.tsx` for a
   minimal example.
4. If it should appear in the header, add it to `navLinks` in `lib/data/site.ts`.

### Add images

Put files under `public/images/<section>/` and reference them with a
root-relative path like `/images/camps/race-lab-1.jpg`. Use `next/image`
(`<Image>`) for photos so they are resized and optimized. Keep file sizes
sensible (a few hundred KB, not multi-megabyte originals).

---

## Integrations and services

| Service                | Used for                                | Where it is wired up                                   |
| ---------------------- | --------------------------------------- | ------------------------------------------------------ |
| **Vercel**             | Hosting, preview deployments, analytics | Vercel project `web`; `<Analytics />` in `app/layout.tsx` |
| **Google Apps Script → Google Sheet** | Contact form submissions (interim CRM) plus an email notification per submission | `lib/forms-webhook.ts`, setup steps in `docs/forms-webhook-setup.md` |
| **Stripe Buy Button**  | Donations on `/donate`                  | `components/donation-checkout.tsx` (button ID + publishable key). Amounts and the thank-you redirect are configured in the Stripe dashboard, not in code |
| **Stripe API**         | Donation total on the grand-opening board | `lib/grand-opening/stats.ts` (read-only key)         |
| **Upstash Redis**      | Door-counter tally for the grand-opening board. The count is incremented by the separate admin app (`web/admin`) | `lib/grand-opening/stats.ts` |
| **Luma**               | Event RSVPs                             | `/rsvp` redirect in `next.config.ts`                   |
| **Google Fonts**       | Caveat (handwriting font)               | `app/layout.tsx` via `next/font`                       |
| **MailerLite (subscribepage)** | Newsletter signup                | `newsletterUrl` in `lib/data/site.ts`                  |

The contact form is intentionally simple: it has a hidden honeypot field to
catch bots, validates first name, email, and message, then POSTs JSON to the
webhook. If the webhook is not configured or fails, the visitor sees a "call
us" message and the submission is logged in Vercel's function logs.

---

## Environment variables

Set these in the Vercel project (Settings → Environment Variables) for
production, and in a local `.env.local` file for development. `.env*` files
are gitignored; never commit them.

| Variable                        | Required? | Purpose                                                            |
| ------------------------------- | --------- | ------------------------------------------------------------------ |
| `FORMS_WEBHOOK_URL`             | For the contact form | Google Apps Script web-app URL that receives submissions   |
| `RSVP_WEBHOOK_URL`              | Legacy    | Older name for the same thing; used as a fallback if the above is unset |
| `KV_REST_API_URL`               | Grand-opening board | Upstash REST endpoint (added automatically by the Vercel ↔ Upstash integration) |
| `KV_REST_API_READ_ONLY_TOKEN`   | Grand-opening board | Preferred token; this site only reads the counter        |
| `KV_REST_API_TOKEN`             | Grand-opening board | Fallback if the read-only token is not set               |
| `STRIPE_SECRET_KEY`             | Grand-opening board | A **restricted** key with `charges:read` is enough       |
| `GRAND_OPENING_DONATIONS_SINCE` | Optional  | ISO date; only count Stripe charges after this date                |

Nothing else needs secrets. The Stripe publishable key in the donate button is
public by design.

To pull production values into a local `.env.local`, install the Vercel CLI,
run `vercel link` once, then `vercel env pull`.

---

## Making changes and deploying

**The site is live and `main` deploys to production on every push.** So:

1. **Never commit directly to `main`.** Start from an up-to-date `main` and
   create a branch named for the change (`about-team-photos`, `waivers`,
   `fix-404-page`).
2. Make your edits and check them locally with `pnpm dev`.
3. Run `pnpm lint` (and `pnpm build` if you touched config, data loading, or
   dependencies). A broken build means a failed deploy.
4. Push the branch and open a pull request on GitHub. Vercel posts a
   **preview URL** on the PR. Open it and click through the pages you changed.
   Share the preview link with whoever needs to sign off on copy or images.
5. Merge the PR. Vercel builds and deploys `main` within a couple of minutes.
6. Check the live site. If something is wrong, either open a quick follow-up
   PR or roll back from the Vercel dashboard (Deployments → previous
   deployment → "Promote to Production").

Commit under your ASC GitHub account, and write commit messages that say what
changed and why in plain language ("Add waivers page with liability waiver
and media release PDFs").

Dependencies: use `pnpm add <package>` / `pnpm remove <package>` so the
lockfile stays consistent. Avoid adding packages for things a few lines of
code can do; the site is deliberately small.

---

## Design system

The look is a **field notebook**: white graph-paper canvas, a red margin rule
down the left, warm dark-brown ink, serif body text (Iowan Old Style stack),
Caveat for handwritten annotations, taped-on cards, and rust-colored stamp
accents. Light theme only. It is the light counterpart to the dark admin dashboard.

**Tokens** are defined once in the `@theme` block at the top of
`app/globals.css` and used as Tailwind utilities:

| Token            | Value     | Tailwind usage                        |
| ---------------- | --------- | ------------------------------------- |
| `paper` / `card` | `#ffffff` | `bg-paper`, `bg-card`                 |
| `ink`            | `#38342a` | `text-ink`, `border-ink/15`           |
| `ink-soft`       | `#5c564a` | `text-ink-soft` (secondary copy)      |
| `brand-blue`     | `#435c7e` | `text-brand-blue` (links)             |
| `rust`           | `#e64519` | `text-rust` (stamps, emphasis)        |
| `gold`           | `#ddb13a` | tape, highlights                      |
| `ring-teal/green/purple/orange` | brand palette | accent rings and highlights |
| `font-serif`     | Iowan Old Style stack | default body font           |
| `font-hand`      | Caveat    | `font-hand` for handwritten notes     |

**Building blocks** in `components/`:

- `notebook.tsx` — `PageIntro` (the standard page opener: small note, big
  title, optional doodle), `SectionHeading`, `Stamp`, `Annotation`
  (handwritten aside).
- `doodles.tsx` — small line-art icons (`Rocket`, `Gear`, `Atom`,
  `PaperPlane`, `Lightbulb`, `Bolt`, `Heart`) used as page decorations.
- `site-header.tsx`, `mobile-nav.tsx`, `site-footer.tsx` — chrome.
- `program-page.tsx` — the shared layout for program pages.
- `contact-form.tsx`, `donation-checkout.tsx` — the two interactive pieces.

CSS helper classes worth knowing (all in `globals.css`): `tape` and
`tape-corners` (the taped-on card effect), `hl-*` (highlighter marks behind
text), `prose-note` (readable long-form text), `notebook-rule` (the red margin).

Brand colors, typography, and logo files are kept in the ASC branding folder
(`branding/branding_info/BRANDING.md` and `branding/logos/` in the ASC
workspace, outside this repo). The horizontal logo used on the site is
`public/images/brand/asc-logo-horizontal.png`.

---

## Gotchas and things to know

- **The blog is switched off** (since 2026-07-30). The posts still exist in
  `content/posts/` and the loader in `lib/data/posts.ts` still works. The
  homepage has a commented-out block with exact restore instructions. The old
  `app/blog/` pages were removed in commit `8b4a698`; recover them with
  `git checkout 8b4a698^ -- app/blog`. The WordPress-era
  blog URLs in `next.config.ts` still redirect to `/blog/...`, so they will 404
  until the blog is restored.
- **`/grand-opening` is an event-day live board.** It is hidden from search
  engines and polls the API every 15 seconds. It can be deleted after the
  event along with `app/api/grand-opening/` and `lib/grand-opening/`.
- **`/rsvp` is a temporary redirect** to Luma. Repurpose or remove it when the
  event is over.
- **Camps are shown as information only.** There is no registration flow on
  the site yet; camp pages describe the sessions and link to contact.
- **The contact form's Google Sheet is an interim CRM.** The plan is to move
  form storage and email notifications to a proper backend later. When that
  happens, the only file to change is `lib/forms-webhook.ts`.
- **Legacy facility slugs.** `facilities.ts` supports a `legacySlug` so old
  anchor links (for example `#metal-shop`) keep working. Do not remove those.
- **Fonts.** Iowan Old Style is a system font on macOS and iOS; other
  platforms fall back to Palatino/Georgia. That is expected.
- **Sibling project.** The door-counter admin app lives in a separate
  `web/admin` project and shares the Upstash Redis store with this site. The
  Redis key name (`go:arrivals`) must match in both.
