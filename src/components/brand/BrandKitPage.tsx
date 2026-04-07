import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { Download } from "lucide-react";
import Link from "next/link";

interface LogoAsset {
  name: string;
  svg: string;
  png?: string;
  description: string;
  previewBackground: "light" | "dark" | "transparent";
  kind: "icon" | "full";
  /** Square variant of the same asset (same card, extra download buttons) */
  squarePng?: string;
  squareSvg?: string;
}

const logoAssets: LogoAsset[] = [
  {
    name: "Icon (Dark)",
    svg: "/brand/ario-black.svg",
    png: "/brand/ario-black-transparent.png",
    description: "Icon only, black, for light backgrounds",
    previewBackground: "light",
    kind: "icon",
  },
  {
    name: "Icon (Light)",
    svg: "/brand/ario-white.svg",
    png: "/brand/ario-white-transparent.png",
    description: "Icon only, white, for dark backgrounds",
    previewBackground: "dark",
    kind: "icon",
  },
  {
    name: "Full Logo (Dark)",
    svg: "/brand/ario-full-black.svg",
    png: "/brand/ario-full-black-transparent.png",
    description: "Full logo with text, black, for light backgrounds",
    previewBackground: "light",
    kind: "full",
  },
  {
    name: "Full Logo (Light)",
    svg: "/brand/ario-full-white.svg",
    png: "/brand/ario-full-white-transparent.png",
    description: "Full logo with text, white, for dark backgrounds",
    previewBackground: "dark",
    kind: "full",
  },
  {
    name: "Icon (Black on White)",
    svg: "/brand/ario-black-on-white-round.svg",
    png: "/brand/ario-black-on-white-round.png",
    description: "Round + Square variants",
    previewBackground: "transparent",
    kind: "icon",
    squarePng: "/brand/ario-black-on-white-square.png",
    squareSvg: "/brand/ario-black-on-white-square.svg",
  },
  {
    name: "Icon (White on Black)",
    svg: "/brand/ario-white-on-black-round.svg",
    png: "/brand/ario-white-on-black-round.png",
    description: "Round + Square variants",
    previewBackground: "transparent",
    kind: "icon",
    squarePng: "/brand/ario-white-on-black-square.png",
    squareSvg: "/brand/ario-white-on-black-square.svg",
  },
];

interface Color {
  name: string;
  hex: string;
  usage: string;
}

const colors: Color[] = [
  {
    name: "Primary",
    hex: "#5427C8",
    usage: "Primary brand color for CTAs, links, and accents",
  },
  {
    name: "Lavender",
    hex: "#DFD6F7",
    usage: "Secondary color for gradients and backgrounds",
  },
  {
    name: "Black",
    hex: "#23232D",
    usage: "Primary text color and dark elements",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    usage: "Background and light text on dark surfaces",
  },
  {
    name: "Card Surface",
    hex: "#F0F0F0",
    usage: "Card backgrounds and elevated surfaces",
  },
];

export function BrandKitPage() {
  return (
    <main className="bg-fd-background">
      {/* Hero Section */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fd-foreground mb-4">
              Brand Kit
            </h1>
            <p className="text-xl text-fd-foreground/75">
              Download ar.io brand assets including logos, color palette, and typography guidelines for use in your projects.
            </p>
          </div>
          <div className="mt-6 max-w-3xl rounded-2xl border border-fd-border bg-fd-card p-5 shadow-sm">
            <h2 className="text-lg font-bold tracking-tight text-fd-foreground">
              AI Agent Integration
            </h2>
            <p className="mt-2 text-sm text-fd-foreground/75">
              For machine-readable brand guidance, point your agent at{" "}
              <Link
                href="/brand-kit/agents.json"
                className="font-medium text-fd-primary hover:underline"
              >
                /brand-kit/agents.json
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Logo Assets Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground mb-8">
          Logo Assets
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {logoAssets.map((asset) => {
            const hasSquare = Boolean(asset.squarePng || asset.squareSvg);

            const previewBoxClass = `flex items-center justify-center rounded-lg p-3 sm:p-4 min-h-[96px] sm:min-h-[100px] ${
              asset.previewBackground === "dark"
                ? "bg-[#23232D]"
                : asset.previewBackground === "transparent"
                  ? "bg-transparent"
                  : "bg-fd-background"
            }`;

            const imgClass =
              asset.kind === "full"
                ? "object-contain max-h-[88px]"
                : "object-contain max-h-[72px]";

            return (
              <div
                key={asset.name}
                className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-4 shadow-sm"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/18" />
                <div className="relative">
                  <h3 className="text-lg font-bold tracking-tight text-fd-foreground mb-1">
                    {asset.name}
                  </h3>
                  <p className="text-sm text-fd-foreground/75 mb-4">
                    {asset.description}
                  </p>

                  {hasSquare ? (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className={previewBoxClass}>
                        <BaseImage
                          src={asset.png || asset.svg}
                          alt={asset.name}
                          width={160}
                          height={160}
                          className={imgClass}
                        />
                      </div>
                      <div className={previewBoxClass}>
                        <BaseImage
                          src={asset.squarePng || asset.squareSvg || ""}
                          alt={`${asset.name} (square)`}
                          width={160}
                          height={160}
                          className={imgClass}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={`${previewBoxClass} mb-4`}>
                      <BaseImage
                        src={asset.png || asset.svg}
                        alt={asset.name}
                        width={asset.kind === "full" ? 320 : 160}
                        height={asset.kind === "full" ? 100 : 160}
                        className={imgClass}
                      />
                    </div>
                  )}

                  {hasSquare ? (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-3">
                        {asset.png && (
                          <a
                            href={asset.png}
                            download
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#23232D] px-3 py-2 text-xs font-medium text-[#F0F0F0] transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span className="whitespace-nowrap">Round PNG</span>
                          </a>
                        )}
                        <a
                          href={asset.svg}
                          download
                          className="flex w-full items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-card sm:px-4 sm:text-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span className="whitespace-nowrap">Round SVG</span>
                        </a>
                      </div>
                      <div className="flex flex-col gap-3">
                        {asset.squarePng && (
                          <a
                            href={asset.squarePng}
                            download
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#23232D] px-3 py-2 text-xs font-medium text-[#F0F0F0] transition-opacity hover:opacity-90 sm:px-4 sm:text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span className="whitespace-nowrap">Square PNG</span>
                          </a>
                        )}
                        {asset.squareSvg && (
                          <a
                            href={asset.squareSvg}
                            download
                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-card sm:px-4 sm:text-sm"
                          >
                            <Download className="w-4 h-4" />
                            <span className="whitespace-nowrap">Square SVG</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
                      {asset.png && (
                        <a
                          href={asset.png}
                          download
                          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#23232D] px-3 py-2 text-xs font-medium text-[#F0F0F0] transition-opacity hover:opacity-90 sm:w-auto sm:px-4 sm:text-sm"
                        >
                          <Download className="w-4 h-4" />
                          <span className="whitespace-nowrap">PNG</span>
                        </a>
                      )}
                      <a
                        href={asset.svg}
                        download
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-fd-border bg-fd-background px-3 py-2 text-xs font-medium text-fd-foreground transition-colors hover:bg-fd-card sm:w-auto sm:px-4 sm:text-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span className="whitespace-nowrap">SVG</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Color Palette Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground mb-8">
          Color Palette
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {colors.map((color) => (
            <div
              key={color.name}
              className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm"
            >
              <div
                className="w-full h-24 rounded-lg mb-4"
                style={{ backgroundColor: color.hex }}
              />
              <h3 className="text-lg font-semibold text-fd-foreground mb-1">
                {color.name}
              </h3>
              <p className="text-sm font-mono text-fd-foreground/70 mb-2">
                {color.hex}
              </p>
              <p className="text-sm text-fd-foreground/75">
                {color.usage}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Typography Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground mb-8">
          Typography
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-fd-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Besley
            </h3>
            <p className="text-sm text-fd-foreground/75 mb-4">
              Used for headlines and display text. Weight: 800 (Extra Bold).
            </p>
            <div className="space-y-2">
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
                <p className="text-4xl">The Quick Brown Fox</p>
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
                <p className="text-2xl">Jumps Over The Lazy Dog</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <h3 className="text-xl font-bold tracking-tight text-fd-foreground mb-4">
              Plus Jakarta Sans
            </h3>
            <p className="text-sm text-fd-foreground/75 mb-4">
              Used for body text and UI elements. Variable font with multiple weights.
            </p>
            <div className="space-y-2">
              <p className="text-base">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-base font-semibold">The quick brown fox jumps over the lazy dog.</p>
              <p className="text-sm">The quick brown fox jumps over the lazy dog.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Token Logo Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <h2 className="text-3xl font-bold tracking-tight text-fd-foreground mb-8">
          Token Logo
        </h2>
        <div className="max-w-md mx-auto">
          <div className="rounded-xl border border-fd-border bg-fd-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-fd-foreground mb-2">
              ARIO Token Logo
            </h3>
            <p className="text-sm text-fd-foreground/75 mb-4">
              Official logo for the ARIO token
            </p>
            <div className="flex items-center justify-center bg-fd-background rounded-lg p-8 mb-6 min-h-[200px]">
              <BaseImage
                src="/brand/ario-token-logo.png"
                alt="ARIO Token Logo"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
            <div className="flex gap-3">
              <a
                href="/brand/ario-token-logo.png"
                download
                className="flex items-center gap-2 px-4 py-2 bg-[#23232D] text-[#F0F0F0] rounded-lg hover:opacity-90 transition-opacity text-sm font-medium flex-1 justify-center"
              >
                <Download className="w-4 h-4" />
                PNG
              </a>
              <a
                href="/brand/ario-token-logo.svg"
                download
                className="flex items-center gap-2 px-4 py-2 border border-fd-border bg-fd-background text-fd-foreground rounded-lg hover:bg-fd-card transition-colors text-sm font-medium flex-1 justify-center"
              >
                <Download className="w-4 h-4" />
                SVG
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
