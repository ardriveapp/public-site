# ArDrive Public Site - Agent Rules

## Project Overview
Next.js 15 static marketing site for ArDrive — permanent, decentralized storage on Arweave. Uses MDX content, TypeScript, Tailwind CSS v4, and React 19. Built for static export deployable to GitHub Pages and Arweave/Permaweb.

## TypeScript & Code Style
- Strict mode enabled — always use explicit types
- Use path aliases: `@/*` maps to `./src/*` (configured in tsconfig.json)
- Prefer named exports for components and utilities
- Use functional components with TypeScript interfaces for props
- Avoid `any` — use proper types or `unknown` if needed

## Component Patterns
- **Images**: Always use `BaseImage` from `@/components/base-image` instead of `next/image` directly
- **Client Components**: Must include `"use client"` directive at the top
- **Page Components**: Keep thin — move UI logic to dedicated components in `src/components/`
- **Event Handlers**: Use `useCallback` for event handlers in client components

## Project Structure
- `content/` — MDX content files (articles, case-studies, legal) — DO NOT put code here
- `public/` — Static assets served at site root — use organized subdirectories
- `src/app/` — Next.js App Router pages (thin wrappers)
- `src/components/` — React components organized by feature/domain
- `src/lib/` — Utilities, content loaders, config files

---

## Design System

### Color Palette

**Base Colors (always use these, never hardcode hex):**
| Token | Hex | Name | Use |
|---|---|---|---|
| `bg-fd-background` | `#121212` | Onyx | Page background (dark by default) |
| `text-fd-foreground` | `#FAFAFA` | Alabaster | Primary text |
| `bg-fd-card` | `#1E1E1E` | — | Elevated card surfaces |
| `bg-fd-muted` | `#2A2A2A` | — | Subtle fills, dividers |
| `text-fd-muted-foreground` | ~`#A0A0A0` | — | Secondary/dimmed text |
| `border-fd-border` | `#FAFAFA/10` | — | Subtle borders (always with low opacity) |

**Brand Colors:**
| Token | Hex | Name | Use |
|---|---|---|---|
| `bg-fd-primary` / `text-fd-primary` | `#D31721` | ArDrive Red | CTAs, buttons, interactive elements |
| `bg-fd-accent` / `text-fd-accent` | `#FE0230` | Ruddy | Accent highlights, decorative tints, ambient glows |
| `text-fd-foreground` | `#FAFAFA` | Alabaster | Headings, body text |
| `bg-fd-background` | `#121212` | Onyx | Backgrounds |

**Semantic Colors (raw CSS variables — use sparingly for status indicators):**
- Success: `rgb(var(--color-ardrive-success))` — `#18A957`
- Info: `rgb(var(--color-ardrive-info))` — `#3142C4`

### Dark Theme — Always On
ArDrive uses a dark theme as the **sole default**. There is no light mode toggle. Do not introduce light-mode variants or conditionals.

- Page background: always `bg-fd-background` (`#121212`)
- Cards/surfaces: `bg-fd-card` (`#1E1E1E`)
- Text on dark: `text-fd-foreground` (`#FAFAFA`) or `text-fd-foreground/70` for secondary
- Borders: `border-fd-border/10` or `border-fd-border/15` (very subtle on dark)

### Card Surface Pattern
```tsx
// Standard card on dark background
<div className="rounded-2xl bg-fd-card border border-fd-border/10 p-6">
```

For listing/index cards, a subtle red gradient is appropriate:
```tsx
<div
  className="relative rounded-2xl border border-fd-border/10 overflow-hidden"
  style={{ background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(30 10 15))" }}
>
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
  {/* content */}
</div>
```

### Typography

**Font: Wavehaus** (local, loaded via `src/lib/fonts.ts`)

All weights are available. Match weight to role:
| Weight | File | Use |
|---|---|---|
| 300 — Light | `Wavehaus-42Light` | Large, airy display text |
| 400 — Book | `Wavehaus-66Book` | Body copy, UI labels |
| 600 — SemiBold | `Wavehaus-95SemiBold` | Subheadings, emphasis |
| 700 — Bold | `Wavehaus-128Bold` | Section headings |
| 800 — ExtraBold | `Wavehaus-158ExtraBold` | Hero headlines |

CSS variables exposed via Next.js font loader:
- `var(--font-heading)` — headings (600–800 range)
- `var(--font-body)` — body/UI (300–600 range)

Both map to Wavehaus. Headings automatically use `var(--font-heading)` via global CSS. For inline overrides:
```tsx
<h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>...</h1>
```

**Red accent words in headlines** — a key ArDrive brand pattern:
```tsx
<h1>Pay once, store <span className="text-fd-primary">forever.</span></h1>
```

### Buttons & CTAs

**Primary CTA** (red pill):
```tsx
<a className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
  Get Started
</a>
```

**Secondary CTA** (outlined):
```tsx
<a className="inline-flex items-center gap-2 rounded-full border border-fd-border/20 px-6 py-2.5 text-sm font-semibold text-fd-foreground hover:bg-fd-card transition-colors">
  Learn More
</a>
```

**Get Started button** (nav variant — red with white dot indicator):
```tsx
<a className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity">
  <span className="size-2 rounded-full bg-white/70 shrink-0" />
  Get Started
</a>
```

### Signature Red Blob CTA Section
Every page ends with a large rounded-corner red section. This is a core ArDrive brand pattern:
```tsx
<section className="px-4 pb-8">
  <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-fd-primary px-8 py-16 text-center text-white">
    <h2 className="text-3xl font-bold mb-4">Ready to store forever?</h2>
    <p className="mb-8 opacity-80">Pay once. No subscriptions.</p>
    <a href="https://app.ardrive.io" className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity">
      Get Started
    </a>
  </div>
</section>
```

### Forms & Inputs (dark theme)
```tsx
<input className="w-full rounded-lg bg-fd-card border border-fd-border/15 px-4 py-3 text-fd-foreground placeholder:text-fd-muted-foreground focus:outline-none focus:border-fd-primary/60" />
```

---

## Layout & Width Standards

Use constants from `@/components/site-container`:

| Constant | Width | Use |
|---|---|---|
| `SITE_CONTAINER_CLASS` | 1400px | Max site width wrapper |
| `PROBLEM_CARD_WIDTH_CLASS` | 1200px | Two-column content cards |
| `CASE_STUDY_WIDTH_CLASS` | 1100px | Case study/article body |
| `WHAT_YOU_GET_WIDTH_CLASS` | 1000px | Feature/benefit cards |
| `FINAL_CTA_WIDTH_CLASS` | 900px | CTA sections |
| `max-w-3xl` | 768px | Text-only/prose sections |

### Vertical Spacing
- Standard sections: `py-10`
- Hero sections: `pb-12 pt-10`
- Final CTA (red blob): `pb-8` (blob has its own internal padding)

---

## Content (MDX) Patterns

### Articles (`content/articles/`)
- Filename: `<slug>.mdx` (kebab-case)
- Required frontmatter: `title`, `description`
- Optional: `date`, `tags`, `heroImage`, `heroImageAlt`, `ogImage`, `archived`
- `archived: true` hides from listing but keeps the URL live
- Images: `public/articles/<slug>/` → reference as `/articles/<slug>/filename.jpg`

### Case Studies (`content/case-studies/`)
- Filename: `<slug>.mdx`
- Required: `title`, `description`
- Optional: `heroImage`, `ogImage`, `archived`

### Help (`content/help/`)
- Filename: `<slug>.mdx` (kebab-case)
- Required frontmatter: `title`, `description`, `category`, `section`
- Optional: `date`, `archived`
- `archived: true` hides articles from generated agent indexes
- Help content automatically generates `/llms.txt`, `/llms-full.txt`, and `/help/index.json`
- Run `yarn generate-agent-indexes` after changing help content if you need to refresh those files without a full build

### Legal (`content/legal/`)
- Filename: `<slug>.mdx`
- Required: `title`

---

## Static Export Constraints
- `output: "export"` — no server-side features, API routes, or middleware
- All dynamic routes need `generateStaticParams()`
- Images use `unoptimized: true`
- `trailingSlash: true` for Arweave gateway compatibility
- `BASE_PATH` env var for GitHub Pages deployment

### Path Handling
- `<Link href="/pricing">` — Next.js handles basePath automatically ✅
- `withBasePath("/brand/favicon.png")` — use for metadata icons only ✅
- OpenGraph images: plain paths, Next.js resolves against `metadataBase` ✅
- ❌ Don't use `withBasePath()` with `<Link>` — causes double prefixing

---

## Social Share Cards

Store in `public/previews/` at 1200×630px. Use `buildMetadata()` from `@/lib/metadata`:

```typescript
export const metadata = buildMetadata({
  title: "Page Title",
  description: "Description",
  canonical: "/page-path",
  ogImage: "/previews/page-og.jpg",
});
```

Default fallback: `/previews/general-og.jpg`

---

## Common Mistakes to Avoid
- ❌ Don't use `next/image` directly — always use `BaseImage`
- ❌ Don't add light mode — ArDrive is dark-only
- ❌ Don't hardcode hex colors — use `fd-*` tokens
- ❌ Don't add server-side features (static export only)
- ❌ Don't use `withBasePath()` with `<Link>` — causes double prefixing
- ❌ Don't forget `"use client"` for client components
- ❌ Don't use ar.io branding, colors (#5427C8), or content — this is ArDrive
