# ArDrive Public Site — The Plan

Porting ardrive.io from Framer to a custom Next.js 15 static site.
Source: `.temp/framer-exports/` | Target: this repo | Deploy: Arweave + GitHub Pages

---

## Status Legend
- ✅ Done
- 🔄 In progress
- ⬜ Not started
- ❌ Blocked

---

## Phase 1 — Brand Foundation ✅

- ✅ Wavehaus font wired up (replaces Besley + Plus Jakarta Sans)
- ✅ Color tokens updated — Onyx `#121212`, Alabaster `#FAFAFA`, Ruddy `#FE0230`
- ✅ Secondary colors added — Success `#18A957`, Info `#3142C4`
- ✅ Dark theme set as sole default (no light mode)
- ✅ Global CSS updated — prose, code blocks, blockquotes all use red accents
- ✅ `layout.tsx` — ArDrive metadata, removed Ask Arie + ar.io tracking scripts
- ✅ `site-header.tsx` — minimal ArDrive header (logo, Pricing, Developers, Get Started CTA)
- ✅ `site-footer.tsx` — minimal footer (copyright + ToS link)
- ✅ AGENTS.md rewritten for ArDrive design system
- ✅ CLAUDE.md updated

---

## Phase 2 — Cleanup (ar.io → ArDrive) ✅

- ✅ Removed components: cloudmap, continuum, ecosystem, institutions, platforms, provenance, technology, token, trust
- ✅ Removed app routes: same as above
- ✅ Removed lib files: cloudmap.ts, cloudmap-config.ts, continuum.ts, ecosystem.ts, ecosystem-config.ts, ecosystem-content.ts
- ✅ Removed FeaturedLogosRow component (ecosystem-dependent)
- ✅ HomePage stubbed (placeholder until Phase 3)
- ✅ EnterprisePage cleaned of ecosystem references
- ✅ Build passes clean

---

## Phase 3 — Homepage ← YOU ARE HERE

### 3a — Asset Download
- ⬜ Write `scripts/download-framer-assets.mjs`
- ⬜ Download ~33 homepage images from framerusercontent.com → `public/home/`

### 3b — Homepage Sections (match Framer export)
Reference: `.temp/framer-exports/ardrive.io/index.html`
Reference screenshots: `.temp/framer-exports/screenshots/homepage.png`

- ⬜ **Hero** — "Pay Once. Store Forever." + dashboard screenshot + "200K+" badge + Get Started CTA
- ⬜ **Rotating text** — "Seamless access... no [privacy breaches / vendor lock-in / etc.]"
- ⬜ **Features** — "Cloud storage, evolved." — 3 numbered features + CLI code block
- ⬜ **Product showcase** — "Access, upload, own." — app UI + 4 feature cards
- ⬜ **Stats** — "18,000,000+ files stored"
- ⬜ **Testimonials** — 3 quotes (Myna Accountants, RTFKT, BT Grammy DJ)
- ⬜ **Comparison** — "See the difference." — ArDrive vs Traditional Cloud table
- ⬜ **More features** — "Do more with your data." — File Licensing, Site Hosting, Streaming, Metadata
- ⬜ **Audience** — "Permanent data for everyone." — tag cloud + 3 benefit cards
- ⬜ **Red blob CTA** — signature rounded red section (required on all pages)

---

## Phase 4 — Core Pages

Reference: `.temp/framer-exports/ardrive.io/`

- ⬜ `/pricing` — pay-once model, price calculator widget, comparison table
- ⬜ `/developers` — "Powering the permanent cloud" + SDK/API features
- ⬜ `/learn` — article listing page (dark card grid)
- ⬜ `/enterprise` — rework existing EnterprisePage for ArDrive brand
- ⬜ `/contact` — contact form / links
- ⬜ `/about` — team / mission
- ⬜ `/tos-and-privacy` — legal (MDX)
- ⬜ `/start` — get started / onboarding
- ⬜ `/faq` — frequently asked questions
- ⬜ `/mobile` — ArDrive mobile app page

---

## Phase 5 — Content Import

- ⬜ Fix `scripts/import-framer-articles.mjs` CSV path (already done, needs deps)
- ⬜ Add script deps: `papaparse`, `turndown`, `cheerio` to package.json
- ⬜ Run import — Blog.csv (~300 articles) → `content/articles/`
- ⬜ Article page template — dark theme, hero image, prose styles
- ⬜ `/learn` listing page — article cards with hero thumbnails

---

## Phase 6 — Secondary Pages

From sitemap — lower priority:

- ⬜ `/nfts` — NFT use case page
- ⬜ `/arcast` — ArCast podcast/content
- ⬜ `/turbo-launchpad` — Turbo product page
- ⬜ `/turbo-bundler` — Turbo bundler page
- ⬜ `/compare` — detailed comparison page
- ⬜ `/ar-io` — ar.io relationship page
- ⬜ `/manifests` — Arweave manifests explainer
- ⬜ `/arfs` — ARFS spec page
- ⬜ `/pins` — pins feature page
- ⬜ `/ardrive-difference` — ArDrive differentiator
- ⬜ `/universal-data-license` — UDL page
- ⬜ `/subscribe` — newsletter/subscribe

---

## Phase 7 — Polish & Deploy

- ⬜ SEO — metadata for all pages, OG images, sitemap.xml
- ⬜ Performance — image optimization, font loading
- ⬜ Responsive — mobile review of all pages
- ⬜ Analytics — swap in ArDrive tracking IDs
- ⬜ GitHub Pages workflow — update BASE_PATH / SITE_URL env vars
- ⬜ Arweave deploy — test `yarn deploy` pipeline
- ⬜ Domain — point ardrive.io

---

## Assets & Source Files

| File | Purpose |
|---|---|
| `.temp/framer-exports/ardrive.io/` | Framer HTML exports (visual reference) |
| `.temp/framer-exports/screenshots/` | Page screenshots |
| `.temp/framer-exports/cms/Blog.csv` | ~300 blog articles |
| `.temp/framer-exports/cms/Doc Articles.csv` | Doc articles (placeholder content — skip) |
| `.temp/framer-exports/sitemap.xml` | Full URL list to replicate |
| `public/brand/ArDrive Styleguide.png` | Official design system reference |
| `public/brand/` | Logos, favicon |
| `src/fonts/Wavehaus-Sans-Typeface/` | All Wavehaus weights |

---

## Key Decisions Made

- **Ask Arie widget**: Files kept (`src/components/ask-arie/`), removed from layout. Add back later with ArDrive-specific API endpoint.
- **Use-cases section**: Kept in codebase for now — may repurpose or remove in Phase 6.
- **Doc Articles CSV**: Appears to be Framer placeholder content, not real ArDrive docs. Skipping.
- **Dark theme only**: No light mode. Ever.
- **Font**: Wavehaus only (Besley and Plus Jakarta Sans removed).
- **Image strategy**: Download from framerusercontent.com into `public/` — don't hotlink.
