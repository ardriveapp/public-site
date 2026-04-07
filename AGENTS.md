# ar.io Public Site - Agent Rules

## Project Overview
Next.js 15 static marketing site with MDX-powered content (articles, case studies, use cases, legal pages). Uses TypeScript, Tailwind CSS v4, and React 19. Built for static export and GitHub Pages deployment.

## TypeScript & Code Style
- Strict mode enabled - always use explicit types
- Use path aliases: `@/*` maps to `./src/*` (configured in tsconfig.json)
- Prefer named exports for components and utilities
- Use functional components with TypeScript interfaces for props
- Avoid `any` - use proper types or `unknown` if needed

## Component Patterns
- **Images**: Always use `BaseImage` component from `@/components/base-image` instead of `next/image` directly
- **Client Components**: Must include `"use client"` directive at the top
- **Page Components**: Keep thin - move UI logic to dedicated components in `src/components/`
- **Event Handlers**: Use `useCallback` for event handlers in client components to prevent unnecessary re-renders

## Project Structure
- `content/` - MDX content files (articles, case studies, use cases, legal) - DO NOT put code here
- `public/` - Static assets served at site root - use organized subdirectories
- `src/app/` - Next.js App Router pages (thin wrappers that import components)
- `src/components/` - React components organized by feature/domain
- `src/lib/` - Utility functions, content loaders, and helpers
  - `*-config.ts` files contain display order, labels, and metadata (single source of truth)
  - `*-content.ts` files load MDX content from `content/` directories
  - Data files (e.g., `cloudmap.ts`) contain the actual data/content

## Styling Guidelines
- Use Tailwind CSS v4 with design tokens (fd-* classes like `fd-background`, `fd-foreground`, `fd-primary`)
- Prefer Tailwind utility classes over custom CSS
- Use semantic color tokens from the design system
- Follow existing patterns for spacing, typography, and component styling

### Color Palette
- **Base Colors:**
  - Black: `#23232D`
  - White: `#FFFFFF`
  - Card surface: `#F0F0F0` (use for cards only)
- **Primary Brand Color:**
  - Primary: `#5427C8` (with tints as needed)
  - Lavender: `#DFD6F7`

### Background vs Card Surfaces (Design Pattern)
- **Page background**: Use `bg-fd-background` (tokenized to `#FFFFFF`). Avoid using `#F0F0F0` for full-page backgrounds.
- **Card background**: Use `bg-fd-card` (tokenized to `#F0F0F0`) for card surfaces, stats badges, and other elevated/contained UI.
- **Gradients**: If a section uses the lavender wash, keep the *page* starting color at white and reserve `#F0F0F0` for card gradients/surfaces.
- **Exception**: The Ask Arie widget/panel should stay **white** (use `bg-fd-background`) for a cleaner chat surface.

### Gradient Card Pattern (Lists/Indexes)
For index/listing cards (e.g. `/articles`, `/case-studies`, `/ecosystem`, `/cloudmap`), use the standard “card gradient + overlay” pattern:
- **Base**: `style={{ background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))" }}`
- **Overlay**: `<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/18" />`
- **Layering**: ensure content wrappers are `relative` so text renders above the overlay

### Typography
- **Headline Font:** Besley (Extra Bold / weight 800)
- **Body Text Font:** Plus Jakarta Sans

## Layout & Width Standards

Use standard width constants from `@/components/site-container` for consistent page layouts:

### Standard Widths
- **Site Container**: 1400px (`SITE_CONTAINER_CLASS`)
- **Problem Cards**: 1200px (`PROBLEM_CARD_WIDTH_CLASS` + `PROBLEM_CARD_RAIL_CLASS`)
- **How It Works**: 1200px (`HOW_IT_WORKS_WIDTH_CLASS`)
- **Case Studies**: 1100px (`CASE_STUDY_WIDTH_CLASS`)
- **What You Get**: 1000px (`WHAT_YOU_GET_WIDTH_CLASS`)
- **Final CTAs**: 900px (`FINAL_CTA_WIDTH_CLASS`)
- **Text-only sections**: 768px (use `max-w-3xl`)

### Visual Hierarchy
Sections should use widths that create a visual hierarchy from wide (informational) to narrow (focused):
- **Full width (1400px)**: Hero sections, feature grids, service models (3-column)
- **Large (1200px)**: Problem cards (2-column), How It Works (5-column steps)
- **Medium (1100px)**: Case studies, Meta sections (2-column)
- **Small (1000px)**: What You Get benefit cards (2-column)
- **Focused (900px)**: Final CTA sections

### Vertical Spacing
- **Standard sections**: `py-10` (most content sections)
- **Tight sections**: `py-8` (problem cards, case studies)
- **Hero sections**: `pb-12 pt-10`
- **Final CTAs**: `pb-20 pt-8` (extra bottom margin for page end)

### Problem Card Pattern
Enterprise/Institutions problem cards use a centered two-column rail:
- Text column: 520px (left)
- Image column: 640px (right, aligns to bottom)
- Grid: `PROBLEM_CARD_RAIL_CLASS` with images using `object-contain object-right-bottom`
- Images sit flush to card edges (no padding on image column)

## Content (MDX) Patterns
- **Articles**: 
  - File naming: `content/articles/<slug>.mdx` (use URL-safe kebab-case slugs like `my-article-title.mdx`)
  - Required frontmatter: `title`, `description`, `date`
  - Optional: `authors`, `tags`, `heroImage`, `ogImage`, `archived`
  - Archived content: Set `archived: true` to exclude from listing pages/nav surfaces while keeping the page statically generated and accessible via direct URL
  - Use `getArticle()` and `getAllArticles()` from `@/lib/articles.ts`
  - Images: Place in `public/articles/<slug>/` and reference as `/articles/<slug>/<filename>`
- **Use Cases**:
  - File naming: `content/use-cases/slug.mdx`
  - Required frontmatter: `title`, `description`
  - Optional: `heroImage`
  - Use `getUseCase()` and `getAllUseCases()` from `@/lib/use-cases.ts`
  - Images: Place in `public/use-cases/<slug>/` directories
- **Case Studies**:
  - File naming: `content/case-studies/slug.mdx`
  - Required frontmatter: `title`, `description`
  - Optional: `heroImage`, `ogImage`, `archived`
  - Archived content: Set `archived: true` to exclude from listing pages/nav surfaces while keeping the page statically generated and accessible via direct URL
  - Use `getCaseStudy()` and `getAllCaseStudies()` from `@/lib/case-studies.ts`
  - Images: Place in `public/case-studies/<slug>/` directories
- **Ecosystem**:
  - File naming: `content/ecosystem/<slug>.mdx` (filename becomes the project slug)
  - Required frontmatter: `title`, `description`, `categories` (use existing category IDs from `ecosystem-config.ts`)
  - Optional: `logoPath`, `websiteUrl`, `developer`, `goip`, `archived`, `featured`
  - Archived projects: Set `archived: true` to exclude from `/ecosystem` listing while keeping data accessible
  - Featured projects: Set `featured: true` to include logo in featured logo rows on main pages (requires `logoPath`)
  - Template: Copy `content/ecosystem/_template.mdx` to start new project files
  - Use `getAllEcosystemItems()` or `getFeaturedEcosystemItems()` from `@/lib/ecosystem-content.ts`
  - Logos: Place in `public/ecosystem-logos/` and reference as `/ecosystem-logos/logo-name.svg`

## Configuration Files - Single Source of Truth

The project uses `*-config.ts` files to centralize display order, labels, and metadata. Always use these config files instead of hardcoding values:

- **Use Cases**: `@/lib/use-case-config.ts`
  - Display metadata (icons and short descriptions only)
  - Titles come from MDX frontmatter in `content/use-cases/`
  - Use cases are sorted alphabetically by title (what users see)
  - Navigation data comes from `getUseCasesForNav()` in `@/lib/use-cases.ts` and is passed from `RootLayout` to client components
  
- **Ecosystem**: `@/lib/ecosystem-config.ts`
  - Category labels (`ECOSYSTEM_CATEGORY_LABELS`)
  - Category display order (`ECOSYSTEM_CATEGORY_ORDER`)
  - Use `getCategoryLabel()` helper for consistent labeling
  
- **Cloudmap**: `@/lib/cloudmap-config.ts`
  - Status display order (`CLOUDMAP_STATUS_ORDER`)
  - Theme display order (`CLOUDMAP_THEME_ORDER`)
  - Type exports for `Status` and `Theme`

When adding new features with filters, categories, or display order, create a corresponding `*-config.ts` file to maintain consistency.
  
- **Partner Logos**: All partner/company logos are stored in `public/ecosystem-logos/`
  - Reference them in MDX as `/ecosystem-logos/logo-name.svg` (or `.png`)
  - Keep all logos in this common directory, not per-use-case folders
  - Logo file naming: `logo-company-name.svg` (kebab-case)
  
- **Partner Card Styling Pattern**: Use case partner cards follow the homepage card style:
  - Base gradient: `linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))`
  - Overlay gradient: `bg-gradient-to-br from-transparent via-transparent to-fd-primary/18`
  - Card styles: `rounded-2xl border border-fd-border p-3 shadow-sm hover:shadow-md transition-shadow`
  - Logo container: `h-16 w-16 shrink-0 object-contain rounded-lg border border-fd-border`
  - Remove underlines with inline style: `style={{ textDecoration: 'none' }}`
  - Typography: `text-base` for titles, `text-xs` for descriptions

## Static Export Constraints
- Production builds use static export (`output: "export"` in next.config.mjs)
- Images must use `unoptimized: true` (already configured)
- Support GitHub Pages basePath via `BASE_PATH` environment variable
- No server-side features (API routes, middleware, etc.) - this is a static site

### BasePath Handling - Single Source of Truth

The `BASE_PATH` environment variable controls all path prefixing for GitHub Pages deployment:

- **Next.js Links**: Use plain paths like `/use-cases/ai` - Next.js `Link` component automatically handles `basePath`
- **MDX Images**: Use plain paths like `/ecosystem-logos/logo.svg` - custom MDX components in `src/lib/mdx.tsx` automatically add basePath
- **MDX Links**: Use plain paths - custom MDX `<a>` component automatically handles basePath for internal links
- **Metadata/Icons**: Use `withBasePath()` utility from `@/lib/base-path` for paths in `<meta>` tags or non-React contexts

**Key Rules:**
- ✅ MDX: `<img src="/ecosystem-logos/logo.svg" />` - automatically prefixed
- ✅ React: `<Link href="/use-cases/ai">` - automatically prefixed by Next.js
- ✅ Metadata: `withBasePath("/icon.png")` - manually prefix for meta tags
- ❌ Don't use `withBasePath()` for Next.js `Link` components - causes double prefixing
- ❌ Don't hardcode `BASE_PATH` - always use the utilities

## Social Share Cards (OpenGraph/Twitter)

All pages should include OpenGraph and Twitter Card metadata for proper social sharing. The system uses absolute URLs that work in both production and GitHub Pages deployments.

### Preview Images Location

Social share card images are stored in `public/previews/`:
- `home-og.jpg` - Homepage (1200×630px)
- `enterprise-og.jpg` - Enterprise page (1200×630px)
- `institutions-og.jpg` - Institutions page (1200×630px)
- `general-og.jpg` - Generic fallback for other pages (1200×630px)

**Naming Convention:** Use `<page-name>-og.jpg` for page-specific images. All images should be 1200×630px (OpenGraph standard).

### Metadata Base URL

The `metadataBase` in `src/app/layout.tsx` dynamically adapts to deployment context:

```typescript
const getMetadataBase = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ar.io";
  const basePath = process.env.BASE_PATH || "";
  return new URL(siteUrl + basePath);
};
```

- **Production:** Uses defaults → `https://ar.io`
- **GitHub Pages:** Uses env vars from workflow → `https://ar-io.github.io/public-site`

### Standard Metadata Pattern

For all pages, prefer the `buildMetadata()` helper in `src/lib/metadata.ts` to avoid repeating the same title/description across HTML, OpenGraph, and Twitter metadata. For OpenGraph/Twitter images, pass **plain paths** like `/previews/home-og.jpg`—Next.js resolves them against `metadataBase` (which includes `basePath`) automatically.

**Recommended pattern (static pages):**

```typescript
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Page Title",
  description: "Page description",
  canonical: "/page-path",
  ogImage: "/previews/page-og.jpg",
  // Optional overrides:
  // ogTitle: "Page Title - ar.io",
  // twitterCard: "summary_large_image",
});
```

### Dynamic Content (Articles/Case Studies)

For content with optional custom OG images via frontmatter, compute the image first and then pass it into `buildMetadata()` (plain path; no `withBasePath()`):

```typescript
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";

export async function generateMetadata(/* ... */): Promise<Metadata> {
  const ogImage = article.ogImage || article.heroImage || "/previews/general-og.jpg";

  return buildMetadata({
    title: article.title,
    description: article.description,
    canonical: `/articles/${slug}`,
    ogType: "article",
    ogImage,
    ogAlt: article.title,
    openGraphExtras: {
      publishedTime: article.date,
      authors: article.authors,
    },
  });
}
```

This allows articles/case studies to:
1. Use a custom `ogImage` if specified in frontmatter
2. Fall back to `heroImage` if available
3. Default to `/previews/general-og.jpg` otherwise

### Deployment Configuration

The GitHub Pages workflow (`.github/workflows/deploy-to-pages.yml`) should set:

```yaml
env:
  NEXT_PUBLIC_SITE_URL: https://ar-io.github.io
  BASE_PATH: /${{ steps.base_path.outputs.base_path }}
```

Production deployments omit these variables to use the defaults.

### Testing Social Cards

After deployment, test share cards with:
- **Facebook:** [Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter:** [Card Validator](https://cards-dev.twitter.com/validator)
- **LinkedIn:** [Post Inspector](https://www.linkedin.com/post-inspector/)

**Key Points:**
- **Do NOT use `withBasePath()` for OpenGraph/Twitter images** when `metadataBase` is configured (it's already included in the base URL)
- Use plain paths like `/previews/home-og.jpg` in metadata—Next.js automatically resolves them against `metadataBase`
- **Do use `withBasePath()`** for icons/favicons in `layout.tsx` (they don't use `metadataBase` resolution)
- The `buildMetadata()` helper handles this correctly—just pass plain image paths
- Images must be accessible at the full absolute URL (e.g., `https://ar.io/previews/home-og.jpg`)

**Common mistake to avoid:**
```typescript
// ❌ WRONG - causes double basePath (/public-site/public-site/...)
images: [{ url: withBasePath("/previews/home-og.jpg") }]

// ✅ CORRECT - Next.js resolves against metadataBase automatically
images: [{ url: "/previews/home-og.jpg" }]
```

## Next.js App Router
- Use App Router conventions (not Pages Router)
- Use `generateStaticParams` for dynamic routes
- Metadata should be exported from page components
- Use proper TypeScript types for route params and search params

## Dependencies

Core stack (optimized for static generation):
- **Next.js 15.5.9** with React 19 - App Router with static export
- **@mdx-js/mdx** - Runtime MDX compilation with custom plugins
- **gray-matter** - Frontmatter parsing for MDX files
- **Tailwind CSS v4** - Modern CSS with @theme directive and design tokens
- **lucide-react** - Icon library
- **TypeScript 5.9.2** - Type safety

Removed dependencies (no longer needed):
- ~~cheerio, papaparse, turndown~~ - One-time migration scripts removed (saves ~30-40MB)

## When Generating Code
- Always check existing patterns before creating new components
- Reuse existing utilities from `src/lib/` when possible
- Follow the established component structure and naming conventions
- Ensure all imports use the `@/*` path alias
- For client components, remember to add `"use client"` directive
- Use TypeScript interfaces for all component props
- Always consider solutions for requests and problems using the current stack before introducing new dependencies

## Common Mistakes to Avoid
- ❌ Whenever the text 'ar.io' is used, it should always be lowercase with the exception of if it starts a sentence then 'Ar.io' is acceptable
- ❌ Don't use `next/image` directly - use `BaseImage`
- ❌ Don't add server-side features (API routes, middleware)
- ❌ Don't use `withBasePath()` for Next.js `Link` components - causes double prefixing (Next.js handles it automatically)
- ❌ Don't hardcode `BASE_PATH` in multiple places - MDX and Next.js handle it automatically
- ❌ Don't forget `"use client"` directive for client components
- ❌ Don't hardcode display order or labels - use `*-config.ts` files (e.g., `use-case-config.ts`, `ecosystem-config.ts`, `cloudmap-config.ts`)
- ❌ Don't create per-use-case logo folders - use `public/ecosystem-logos/` for all logos

## When in Doubt
- Check existing components in `src/components/` for patterns
- Verify static export compatibility before adding features
- Use `BaseImage` for all images, `withBasePath()` for asset paths
