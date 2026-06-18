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
    name: "Icon — Dark background",
    description: "Preferred version. Use on dark or black surfaces.",
    previewBg: "#121212",
    png: "/brand/ArDrive-Logo-Dark.png",
    svg: "/brand/ArDrive-Logo-Dark.svg",
  },
  {
    name: "Icon — Light background",
    description: "Use on white or light-colored surfaces.",
    previewBg: "#FAFAFA",
    png: "/brand/ArDrive-Logo-Light.png",
    svg: "/brand/ArDrive-Logo-Light.svg",
  },
  {
    name: "Wordmark — Dark background",
    description: "Full logo with logotype. Use on dark surfaces.",
    previewBg: "#121212",
    png: "/brand/ArDrive-Logo-Wordmark-Light.png",
    wide: true,
  },
  {
    name: "Wordmark — Light background",
    description: "Full logo with logotype. Use on white or light surfaces.",
    previewBg: "#FAFAFA",
    png: "/brand/ArDrive-Logo-Wordmark-Dark.png",
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
            className="mb-8 text-3xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Typography
          </h2>
          <div className="grid gap-5 md:grid-cols-2">

            {/* Heading */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="font-semibold text-sm">Wavehaus Sans</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.45)" }}>
                    Headings · Weight 800
                  </p>
                </div>
                <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.5)" }}>
                  var(--font-heading)
                </code>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
                <p className="text-5xl leading-tight">Aa</p>
                <p className="mt-3 text-2xl leading-tight">Pay Once.</p>
                <p className="text-2xl leading-tight" style={{ color: "#D31721" }}>Store Forever.</p>
              </div>
            </div>

            {/* Body */}
            <div
              className="rounded-2xl p-7"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="font-semibold text-sm">Wavehaus Sans</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(250,250,250,0.45)" }}>
                    Body / UI · Weights 400 – 600
                  </p>
                </div>
                <code className="text-xs font-mono px-2 py-1 rounded" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.5)" }}>
                  var(--font-body)
                </code>
              </div>
              <div className="space-y-2">
                <p className="text-base font-normal">
                  Permanent, private, and powerful.
                </p>
                <p className="text-base font-semibold">
                  No subscriptions, no data caps.
                </p>
                <p className="text-sm" style={{ color: "rgba(250,250,250,0.55)" }}>
                  ArDrive uses Arweave — a blockchain protocol that stores your data
                  across hundreds of nodes worldwide.
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
            <p>Maintain adequate clear space — at minimum equal to the height of the icon — around all logo variants.</p>
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
