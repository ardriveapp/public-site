"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BaseImage } from "@/components/base-image";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

// ─── Rotating text data ────────────────────────────────────────────────────────
const ROTATING_PHRASES = [
  "no privacy breaches.",
  "no vendor lock-in.",
  "no 404s.",
  "no storage limits.",
  "no subscriptions.",
];

// ─── Features data ─────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num: "01",
    title: "Unlimited Storage",
    desc: "Store and share your files effortlessly, with no upload limits or storage caps.",
  },
  {
    num: "02",
    title: "No Subscriptions",
    desc: "Pay once and access your files indefinitely, without monthly fees or recurring plans.",
  },
  {
    num: "03",
    title: "Open Source",
    desc: "Benefit from full transparency, robust security, and complete flexibility.",
  },
];

// ─── Product feature cards ─────────────────────────────────────────────────────
const PRODUCT_FEATURES = [
  {
    icon: "🔒",
    title: "End to end encryption",
    desc: "Ensure your files remain fully secure from upload to download.",
  },
  {
    icon: "🌐",
    title: "Permanent Publishing",
    desc: "Publish sites with unbreakable links and content that never disappears.",
  },
  {
    icon: "♾️",
    title: "Designed to Last",
    desc: "Enjoy unlimited access to your secure data for generations to come.",
  },
  {
    icon: "🔁",
    title: "Version Tracking",
    desc: "Track changes, review history, and restore any previous document version.",
  },
];

// ─── Comparison data ───────────────────────────────────────────────────────────
const COMPARISON_TRADITIONAL = [
  "Pay monthly to access your own files",
  "Risk losing everything",
  "Proprietary and company controlled",
  "Risk account shutdown",
  "User tracking and big data collection",
  "Storage based on subscription tiers",
  "Subject to corporate control",
];

const COMPARISON_ARDRIVE = [
  "One time payments for file storage",
  "Data available even if ArDrive disappears",
  "Decentralized and open source",
  "Inactive accounts never deleted",
  "No collection of personal data",
  "No storage restrictions",
  "The ArDrive app will outlive the company",
];

// ─── More features data ────────────────────────────────────────────────────────
const MORE_FEATURES = [
  {
    title: "File Licensing",
    desc: "Upload documents or images with the ability to add licenses such as CC or UDL.",
    icon: "📄",
  },
  {
    title: "Site and App Hosting",
    desc: "Easily deploy and host sites or apps directly from your drives.",
    icon: "🖥️",
  },
  {
    title: "Content Streaming",
    desc: "Stream your favourite media content from drives, and create playlists.",
    icon: "▶️",
  },
  {
    title: "Enriched Metadata",
    desc: "Get advanced metadata customization for NFT projects.",
    icon: "🏷️",
  },
];

// ─── Audience tags ─────────────────────────────────────────────────────────────
const AUDIENCE_TAGS = [
  "Open Source", "Communities", "Film Makers", "Educators", "Casual Users",
  "Designers", "Students", "Archivists", "Digital Artists", "Developers",
  "Family Historians", "Photographers", "Journalists", "Sound Engineers", "Architects",
];

// ─── Audience benefit cards ────────────────────────────────────────────────────
const AUDIENCE_BENEFITS = [
  {
    title: "One stop storage spot",
    desc: "Organize your most important personal or business multi-media files, where they can't be lost or deleted.",
  },
  {
    title: "Pay in Crypto or Fiat",
    desc: "Pay as you go in crypto or fiat using Turbo for ArDrive.",
  },
  {
    title: "Full privacy control",
    desc: "Control who can see your data. Break free from vendor lock-in.",
  },
];

// ─── Testimonials data ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We use ArDrive so our records are kept forever and we don't have to worry about lost data.",
    name: "Joe David",
    role: "CEO, Myna Accountants",
    image: "/home/testimonial-joe.jpg",
  },
  {
    quote: "ArDrive literally saved the entire migration... If I was restarting from scratch, I would've used it way earlier. It's amazing to see that something as big as RTFKT can be fully permanent on chain.",
    name: "Sam Cardillo",
    role: "RTFKT",
    image: "/home/testimonial-sam.png",
  },
  {
    quote: "I stored all 3 of my NFT projects on ArDrive and will continue to do so.",
    name: "BT",
    role: "Grammy Nominated DJ",
    image: "/home/testimonial-bt.png",
  },
];

// ─── CLI snippet ───────────────────────────────────────────────────────────────
const CLI_COMMAND = `$ ardrive create-drive \\
    --wallet-file /path/to/wallet.json \\
    --drive-name "Teenage Love Poetry"`;

const CLI_OUTPUT = `{
  "created": [
    {
      "type": "drive",
      "metadataTxId": "giv2R8Xj0b…",
      "entityId": "898687ea-b678-4f86-b4e7-49560b190356",
      "entityName": "Teenage Love Poetry"
    },
    {
      "type": "folder",
      "metadataTxId": "VljnttwUxR…",
      "entityId": "f0c58c11-430c-4383-8e54-4d864cc7e927",
      "entityName": "Teenage Love Poetry"
    },
    {
      "type": "bundle",
      "bundleTxId": "Vj2x4IBEAe…"
    }
  ]
}`;

// ─── Scrolling ticker items ────────────────────────────────────────────────────
const TICKER_ITEMS = [
  "404s", "subscriptions", "privacy breaches",
  "storage limits", "vendor lock-in", "404s", "subscriptions",
  "privacy breaches", "storage limits", "vendor lock-in",
  "404s", "subscriptions", "privacy breaches", "storage limits",
];

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const advance = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % ROTATING_PHRASES.length);
      setVisible(true);
    }, 300);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 2800);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <span
      className="inline-block text-fd-primary transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATING_PHRASES[index]}
    </span>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <main className="flex flex-col overflow-hidden bg-fd-background text-fd-foreground">

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative px-4 pb-0 pt-16 sm:pt-20">
        {/* Abstract background graphic */}
        <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
          <BaseImage
            src="/home/hero-abstract.svg"
            alt=""
            width={1200}
            height={800}
            className="w-full max-w-5xl opacity-60"
            unoptimized
          />
        </div>

        <div className={`${SITE_CONTAINER_CLASS} relative z-10 flex flex-col items-center text-center`}>
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fd-border/15 bg-fd-card/60 px-4 py-1.5 text-xs font-medium text-fd-foreground/70 backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-fd-primary" />
            200K+ Projects Managed Daily
          </div>

          {/* Headline */}
          <h1
            className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Pay Once.{" "}
            <span className="text-fd-primary">Store Forever.</span>
          </h1>

          <p className="mt-4 max-w-xl text-lg text-fd-foreground/70">
            Store files, apps, and pages with no subscriptions.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="https://app.ardrive.io"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <span className="size-2 rounded-full bg-white/70 shrink-0" />
              Get Started
            </a>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full border border-fd-border/20 px-7 py-3 text-sm font-semibold text-fd-foreground hover:bg-fd-card transition-colors"
            >
              Explore Pricing
            </Link>
          </div>

          {/* Hero image */}
          <div className="mt-12 w-full max-w-4xl">
            <BaseImage
              src="/home/hero-devices.png"
              alt="ArDrive app running on tablet, desktop, and phone"
              width={1200}
              height={800}
              className="w-full drop-shadow-2xl"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ── 2. ROTATING TEXT ───────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className={`${SITE_CONTAINER_CLASS} text-center`}>
          <p className="mx-auto max-w-2xl text-2xl font-light leading-relaxed text-fd-foreground/80 sm:text-3xl">
            Seamless access to your apps and data for{" "}
            <RotatingText />
          </p>
        </div>
      </section>

      {/* ── 3. FEATURES — "Cloud storage, evolved." ─────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          {/* Section header */}
          <div className="mb-12 max-w-xl">
            <h2
              className="text-4xl font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Cloud storage,{" "}
              <span className="text-fd-primary">evolved.</span>
            </h2>
            <p className="mt-3 text-fd-foreground/60">
              Leverage the power of permanent storage to future-proof your data.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: numbered features */}
            <div className="flex flex-col gap-8">
              {FEATURES.map((f) => (
                <div key={f.num} className="flex gap-5">
                  <span
                    className="shrink-0 text-4xl font-extrabold text-fd-primary/25 leading-none"
                    aria-hidden="true"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
                  >
                    {f.num}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-fd-foreground">{f.title}</h3>
                    <p className="mt-1 text-sm text-fd-foreground/60">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: CLI code block */}
            <div className="rounded-2xl bg-fd-card border border-fd-border/10 overflow-hidden">
              <div className="flex items-center gap-1.5 border-b border-fd-border/10 px-4 py-3">
                <span className="size-2.5 rounded-full bg-fd-primary/60" />
                <span className="size-2.5 rounded-full bg-fd-foreground/20" />
                <span className="size-2.5 rounded-full bg-fd-foreground/20" />
                <span className="ml-3 text-xs text-fd-foreground/40 font-mono">terminal</span>
              </div>
              <div className="p-5 font-mono text-xs leading-relaxed">
                <pre className="text-fd-primary whitespace-pre-wrap">{CLI_COMMAND}</pre>
                <pre className="mt-3 text-fd-foreground/60 whitespace-pre-wrap">{CLI_OUTPUT}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. PRODUCT SHOWCASE — "Access, upload, own." ─────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-12 text-center">
            <h2
              className="text-4xl font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Access, upload,{" "}
              <span className="text-fd-primary">own.</span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-fd-foreground/60">
              ArDrive acts just like your go-to cloud storage app, but comes supercharged
              with features that let you permanently secure, manage, and access your data.
            </p>
          </div>

          {/* App UI + feature cards */}
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* App screenshot */}
            <div className="rounded-2xl overflow-hidden border border-fd-border/10 bg-fd-card">
              <BaseImage
                src="/home/app-ui.png"
                alt="ArDrive app interface showing file manager with upload notification"
                width={700}
                height={500}
                className="w-full"
                unoptimized
              />
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {PRODUCT_FEATURES.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl bg-fd-card border border-fd-border/10 p-5"
                >
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl bg-fd-primary/10 text-lg">
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-fd-foreground">{feat.title}</h3>
                  <p className="mt-1.5 text-sm text-fd-foreground/60">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        {/* Background hills */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-center opacity-20">
          <BaseImage
            src="/home/permahills.svg"
            alt=""
            width={1400}
            height={400}
            className="w-full"
            unoptimized
          />
        </div>
        <div className={`${SITE_CONTAINER_CLASS} relative z-10 text-center`}>
          <p className="text-sm font-semibold uppercase tracking-widest text-fd-primary mb-3">
            Growing every day
          </p>
          <h2
            className="text-5xl font-extrabold sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            18,000,000+
          </h2>
          <p className="mt-2 text-xl text-fd-foreground/60">files stored</p>
        </div>
      </section>

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl border border-fd-border/10 overflow-hidden p-6 flex flex-col gap-4"
                style={{
                  background: "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(30 10 15))",
                }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
                <blockquote className="relative z-10 text-fd-foreground/80 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="relative z-10 flex items-center gap-3 mt-auto">
                  <div className="size-10 rounded-full overflow-hidden shrink-0">
                    <BaseImage
                      src={t.image}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-fd-foreground">{t.name}</p>
                    <p className="text-xs text-fd-foreground/50">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. COMPARISON — "See the difference." ────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <h2
              className="text-4xl font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              See the{" "}
              <span className="text-fd-primary">difference.</span>
            </h2>
          </div>

          <div className="mx-auto max-w-3xl rounded-2xl overflow-hidden border border-fd-border/10">
            {/* Table header */}
            <div className="grid grid-cols-2 bg-fd-muted">
              <div className="p-4 text-sm font-semibold text-fd-foreground/50 border-r border-fd-border/10">
                Traditional Cloud Storage
              </div>
              <div className="p-4 text-sm font-semibold text-fd-primary">
                ArDrive
              </div>
            </div>

            {/* Table rows */}
            {COMPARISON_TRADITIONAL.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-t border-fd-border/10"
              >
                <div className="flex items-start gap-2 p-4 text-sm text-fd-foreground/50 border-r border-fd-border/10">
                  <span className="shrink-0 mt-0.5 text-fd-foreground/30">
                    <XIcon />
                  </span>
                  {item}
                </div>
                <div className="flex items-start gap-2 p-4 text-sm text-fd-foreground/80">
                  <span className="shrink-0 mt-0.5 text-fd-primary">
                    <CheckIcon />
                  </span>
                  {COMPARISON_ARDRIVE[i]}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Explore Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. MORE FEATURES — "Do more with your data." ─────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <h2
              className="text-4xl font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Do more with your{" "}
              <span className="text-fd-primary">data.</span>
            </h2>
            <p className="mt-3 text-fd-foreground/60">
              Next-level storage, powered by permanence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl bg-fd-card border border-fd-border/10 p-6"
              >
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-fd-primary/10 text-xl">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-fd-foreground">{feat.title}</h3>
                <p className="mt-2 text-sm text-fd-foreground/60">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. AUDIENCE — "Permanent data for everyone." ──────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <h2
              className="text-4xl font-extrabold sm:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Permanent data for{" "}
              <span className="text-fd-primary">everyone.</span>
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-fd-foreground/60">
              Create a digital time capsule of websites, news articles, and personal files
              that can be stored on the permanent web.
            </p>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {AUDIENCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-fd-border/15 bg-fd-card px-4 py-1.5 text-sm text-fd-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Benefit cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {AUDIENCE_BENEFITS.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl bg-fd-card border border-fd-border/10 p-6"
              >
                <h3 className="font-bold text-fd-foreground">{b.title}</h3>
                <p className="mt-2 text-sm text-fd-foreground/60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. SCROLLING TICKER + RED BLOB CTA ──────────────────────────────── */}
      {/* Ticker */}
      <div className="overflow-hidden py-6 border-y border-fd-border/10">
        <div className="flex gap-8 animate-[ticker_20s_linear_infinite] whitespace-nowrap">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-medium text-fd-foreground/30">
              <span className="size-1.5 rounded-full bg-fd-primary/50 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Red blob CTA */}
      <section className="px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] bg-fd-primary px-8 py-16 text-center text-white">
          <h2
            className="text-3xl font-extrabold sm:text-4xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Permanent, private, and powerful.
          </h2>
          <p className="mt-4 max-w-md mx-auto opacity-80">
            Break free from subscriptions, 404s, and storage limits. Store forever.
          </p>
          <a
            href="https://app.ardrive.io"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
}
