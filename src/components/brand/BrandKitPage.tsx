import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { Download } from "lucide-react";

interface LogoAsset {
  name: string;
  description: string;
  previewBg: string;
  png: string;
  svg?: string;
  wide?: boolean;
}

const LOGO_ASSETS: LogoAsset[] = [
  {
    name: "Icon, dark background",
    description: "Preferred version. Use on dark or black surfaces.",
    previewBg: "#121212",
    png: "/brand/ArDrive-Logo-Dark.png",
    // The vector mark has its own light outline, so one SVG serves both
    // backgrounds.
    svg: "/brand/ArDrive-Logo.svg",
  },
  {
    name: "Icon, light background",
    description: "Use on white or light-colored surfaces.",
    previewBg: "#FAFAFA",
    png: "/brand/ArDrive-Logo-Light.png",
    svg: "/brand/ArDrive-Logo.svg",
  },
  {
    name: "Wordmark, dark background",
    description: "Full logo with logotype. Use on dark surfaces.",
    previewBg: "#121212",
    png: "/brand/ArDrive-Logo-Wordmark-Light.png",
    svg: "/brand/ArDrive-Logo-Light.svg",
    wide: true,
  },
  {
    name: "Wordmark, light background",
    description: "Full logo with logotype. Use on white or light surfaces.",
    previewBg: "#FAFAFA",
    png: "/brand/ArDrive-Logo-Wordmark-Dark.png",
    svg: "/brand/ArDrive-Logo-Dark.svg",
    wide: true,
  },
];

interface BrandColor {
  name: string;
  hex: string;
  role: string;
  textDark?: boolean;
}

const COLORS: BrandColor[] = [
  { name: "Onyx", hex: "#121212", role: "Primary background" },
  { name: "Alabaster", hex: "#FAFAFA", role: "Primary text / foreground", textDark: true },
  { name: "Primary", hex: "#D31721", role: "CTAs, buttons, key accents" },
  { name: "Ruddy", hex: "#FE0230", role: "Decorative highlights, glows" },
  { name: "Success", hex: "#18A957", role: "Success states, positive indicators" },
  { name: "Info", hex: "#3142C4", role: "Info states, secondary accents" },
];

// The Wavehaus cuts, heaviest first, at the CSS weight each is declared at.
const TYPE_WEIGHTS = [
  {
    cut: "ExtraBold",
    weight: 800,
    use: "Website headlines only",
    sample: "Pay once. Store forever.",
    size: "text-3xl",
    family: "var(--font-heading)",
  },
  {
    cut: "Bold",
    weight: 700,
    use: "Titles in the apps",
    sample: "Upload files",
    size: "text-2xl",
    family: "var(--font-heading)",
  },
  {
    cut: "SemiBold",
    weight: 600,
    use: "Labels, buttons, emphasis",
    sample: "Turbo Credits",
    size: "text-lg",
    family: "var(--font-body)",
  },
  {
    cut: "Book",
    weight: 400,
    use: "Body text, the default",
    sample: "Permanent, private and user-owned.",
    size: "text-base",
    family: "var(--font-body)",
  },
  {
    cut: "Light",
    weight: 300,
    use: "Large figures only",
    sample: "2.4 GB",
    size: "text-4xl",
    family: "var(--font-body)",
  },
];

function DownloadButton({
  href,
  label,
  primary,
}: {
  href: string;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      download
      className="inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
      style={
        primary
          ? { background: "#D31721", color: "#FAFAFA" }
          : { background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.75)", border: "1px solid rgba(255,255,255,0.1)" }
      }
    >
      <Download className="size-3.5 shrink-0" />
      {label}
    </a>
  );
}

export function BrandKitPage() {
  return (
    <main style={{ background: "#080808", color: "#FAFAFA" }}>

      {/* Hero */}
      <section
        className="px-4 pt-20 pb-14"
        style={{ background: "radial-gradient(55% 40% at 50% 0%, rgba(46,5,8,0.8) 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "rgba(211,23,33,0.7)" }}
          >
            Resources
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Brand <span style={{ color: "#D31721" }}>Kit</span>
          </h1>
          <p className="mt-4 max-w-xl text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            Official ArDrive logos, color tokens, and typography. Use these assets when
            referencing or building on ArDrive.
          </p>
        </div>
      </section>

      {/* For agents and developers */}
      <section className="px-4 pt-4 pb-2">
        <div className={SITE_CONTAINER_CLASS}>
          <div
            className="rounded-2xl p-6 sm:p-7"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <h2
              className="text-2xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              For agents and developers
            </h2>
            <p className="mt-2 max-w-2xl text-sm" style={{ color: "rgba(250,250,250,0.6)" }}>
              Building an ArDrive app or screen? Follow the design system: theme
              tokens for dark and light, type scale, spacing, components and copy
              rules. Agents can read the brand kit as JSON.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { href: "/brand-kit/design-system.md", label: "Design system" },
                { href: "/brand-kit/agents.json", label: "agents.json" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.85)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <h2
            className="mb-8 text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Logos
          </h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {LOGO_ASSETS.map((asset) => (
              <div
                key={asset.name}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Preview */}
                <div
                  className="flex items-center justify-center p-10"
                  style={{ background: asset.previewBg, minHeight: "180px" }}
                >
                  <BaseImage
                    src={asset.png}
                    alt={asset.name}
                    width={asset.wide ? 320 : 160}
                    height={asset.wide ? 80 : 160}
                    className="object-contain max-h-[120px]"
                  />
                </div>

                {/* Info + downloads */}
                <div
                  className="p-5"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <p className="font-semibold text-sm" style={{ color: "#FAFAFA" }}>
                    {asset.name}
                  </p>
                  <p className="mt-1 text-xs mb-4" style={{ color: "rgba(250,250,250,0.45)" }}>
                    {asset.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <DownloadButton href={asset.png} label="PNG" primary />
                    {asset.svg && <DownloadButton href={asset.svg} label="SVG" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colors */}
      <section
        className="px-4 py-16"
        style={{ background: "rgba(255,255,255,0.015)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <h2
            className="mb-8 text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Colors
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map((color) => (
              <div
                key={color.hex}
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="h-20 w-full"
                  style={{ background: color.hex }}
                />
                <div className="p-4" style={{ background: "rgba(255,255,255,0.03)" }}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-sm">{color.name}</span>
                    <code
                      className="text-xs font-mono"
                      style={{ color: "rgba(250,250,250,0.4)" }}
                    >
                      {color.hex}
                    </code>
                  </div>
                  <p className="mt-1 text-xs" style={{ color: "rgba(250,250,250,0.45)" }}>
                    {color.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <h2
            className="mb-3 text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Typography
          </h2>
          <p className="mb-8 max-w-2xl text-sm" style={{ color: "rgba(250,250,250,0.6)" }}>
            Two faces: Wavehaus for everything people read, Roboto Mono for the
            strings they check character by character.
          </p>
          <div className="grid gap-5 lg:grid-cols-[3fr_2fr]">

            {/* Wavehaus */}
            <div
              className="min-w-0 rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="mb-2 flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">Wavehaus</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.45)" }}>
                    Headings, body and UI · Licensed face
                  </p>
                </div>
                <code className="shrink-0 whitespace-nowrap text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.5)" }}>
                  var(--font-body)
                </code>
              </div>
              <div>
                {TYPE_WEIGHTS.map((w) => (
                  <div
                    key={w.cut}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-6"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="shrink-0 sm:w-44">
                      <p className="text-sm font-semibold">
                        {w.cut} <span style={{ color: "rgba(250,250,250,0.45)" }}>{w.weight}</span>
                      </p>
                      <p className="text-xs" style={{ color: "rgba(250,250,250,0.45)" }}>{w.use}</p>
                    </div>
                    <p
                      className={`min-w-0 leading-tight ${w.size}`}
                      style={{ fontFamily: w.family, fontWeight: w.weight }}
                    >
                      {w.sample}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-5">
              {/* Roboto Mono */}
              <div
                className="rounded-2xl p-7"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-sm">Roboto Mono</p>
                    <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.45)" }}>
                      Regular 400 · OFL
                    </p>
                  </div>
                  <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.5)" }}>
                    font-mono
                  </code>
                </div>
                <div className="space-y-3 text-sm">
                  <p>
                    Owner <span className="font-mono text-[13px]">7xKpQa...q2Fd</span>
                  </p>
                  <p className="break-all font-mono text-[13px]" style={{ color: "rgba(250,250,250,0.75)" }}>
                    kQJt49W-uYw_E7YSqQqkUARNZPg4H38hFnOMP4hf9MA
                  </p>
                  <p style={{ color: "rgba(250,250,250,0.55)" }}>
                    Transaction, file and drive IDs, wallet addresses, keys and
                    code. A name like phil.ar.io stays in Wavehaus. Set it a step
                    smaller than the text beside it.
                  </p>
                </div>
              </div>

              {/* Rules */}
              <div
                className="rounded-2xl p-7 text-sm space-y-3"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(250,250,250,0.65)" }}
              >
                <p>
                  <span className="font-semibold" style={{ color: "#FAFAFA" }}>Text with no weight set is Book.</span>{" "}
                  The files call Light 400, so declare the weights above in
                  @font-face.
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "#FAFAFA" }}>Light is for figures.</span>{" "}
                  Only at heading sizes, beside a label in a heavier weight.
                </p>
                <p>
                  <span className="font-semibold" style={{ color: "#FAFAFA" }}>Line numbers up.</span>{" "}
                  Wavehaus figures vary in width. Right-align number columns and
                  give a figure that changes a fixed width.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Usage guidelines */}
      <section className="px-4 pb-20">
        <div className={`${SITE_CONTAINER_CLASS} max-w-3xl`}>
          <h2
            className="mb-6 text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Usage guidelines
          </h2>
          <div
            className="rounded-2xl p-6 text-sm space-y-3"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(250,250,250,0.6)" }}
          >
            <p>Do not alter the logo colors, proportions, or orientation.</p>
            <p>Keep clear space around every logo variant of at least the height of the icon.</p>
            <p>Do not place the logo on backgrounds with insufficient contrast.</p>
            <p>
              Questions?{" "}
              <a href="/contact" className="text-fd-primary hover:underline">
                Contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
