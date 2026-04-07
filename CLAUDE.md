# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 static marketing site for ArDrive — permanent, decentralized storage on Arweave. Uses MDX content, TypeScript, Tailwind CSS v4, and React 19. Built for static export and GitHub Pages/Arweave deployment.

Always refer to AGENTS.md, which generally takes priority on site components and brand design guidelines.

## Commands

```bash
# Install dependencies (uses yarn)
yarn install

# Development server with Turbopack
yarn dev

# Production build (outputs to /out)
yarn build

# GitHub Pages build (with base path)
BASE_PATH=/public-site yarn build

# Arweave/Permaweb deployment
yarn deploy
```

**Node version:** v22.14.0 (see `.nvmrc`)
**No test suite** — ESLint is configured but ignored during builds. Use your judgment on code quality.

## Architecture

### Content System
- **MDX files** in `content/` directory (articles, case-studies, use-cases, ecosystem, legal)
- **Loader functions** in `src/lib/` fetch and compile MDX at build time
- **Config files** (`*-config.ts`) define display order, labels, and metadata
- Images stored in `public/<content-type>/<slug>/`

### Key Directories
- `src/app/` — Thin page wrappers using App Router
- `src/components/` — UI components organized by feature/domain
- `src/lib/` — Utilities, content loaders, config files
- `content/` — MDX content only (no code)
- `public/` — Static assets, images, logos

### Critical Patterns

**Images:** Always use `BaseImage` from `@/components/base-image` (not `next/image` directly). Handles basePath for GitHub Pages.

**Path Handling:**
- Next.js `Link`: Use plain paths (`/use-cases/ai`) — auto-handles basePath
- MDX images: Use plain paths — custom components handle basePath
- Metadata icons/favicons: Use `withBasePath()` from `@/lib/base-path`
- OpenGraph/Twitter images: Use plain paths — Next.js resolves against `metadataBase` automatically

**Client Components:** Must include `"use client"` directive at top.

**Config Files:** Use `*-config.ts` files for display order and labels (single source of truth):
- `use-case-config.ts` — Navigation order, metadata
- `ecosystem-config.ts` — Category labels and order
- `cloudmap-config.ts` — Status and theme order

**Metadata:** Use `buildMetadata()` from `@/lib/metadata` for page metadata. Handles title, description, OpenGraph, and Twitter cards consistently.

### Static Export Constraints
- No server-side features (API routes, middleware)
- All dynamic routes must use `generateStaticParams()`
- Images use `unoptimized: true`
- `trailingSlash: true` for Arweave gateway compatibility
- Also works on Arweave gateways — `base-path.ts` auto-detects TXID path prefixes at runtime

## Styling

- Tailwind CSS v4 with design tokens (`fd-*` classes)
- Colors: Onyx `#121212` (background), Alabaster `#FAFAFA` (text), Primary/CTA `#D31721`, Accent/Ruddy `#FE0230` (highlights only)
- Dark theme only — no light mode
- Font: Wavehaus (all weights, local) — headings use `var(--font-heading)`, body uses `var(--font-body)`
- Width constants exported from `@/components/site-container`

## Adding Content

1. Create `.mdx` file in `content/<type>/<slug>.mdx`
2. Add required frontmatter (title, description, date)
3. Place images in `public/<type>/<slug>/`
4. Reference images as `/<type>/<slug>/image.jpg`

See `AGENTS.md` for detailed frontmatter requirements per content type.

## Common Mistakes to Avoid

- Don't use `next/image` directly — use `BaseImage`
- Don't use `withBasePath()` with Next.js `Link` (causes double prefixing)
- Don't use `withBasePath()` for OpenGraph/Twitter images (Next.js resolves against `metadataBase` automatically)
- Don't hardcode display order — use `*-config.ts` files
- Don't add server-side features (static export only)
- Don't forget `"use client"` for client components
- "ardrive" is always lowercase in body text; "ArDrive" is correct in headings/titles
