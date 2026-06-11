"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { BaseImage } from "@/components/base-image";
import { FINAL_CTA_WIDTH_CLASS, SITE_CONTAINER_CLASS } from "@/components/site-container";

// ─── Data ──────────────────────────────────────────────────────────────────────

const ROTATING_PHRASES = [
  "no privacy breaches.",
  "no vendor lock-in.",
  "no 404s.",
  "no storage limits.",
  "no subscriptions.",
];

const FEATURES = [
  {
    num: "01",
    title: "Unlimited Storage",
    desc: "Store and share your files effortlessly, with no upload limits or storage caps.",
    pill: "Off Subscription",
    img: "/home/turbo-balances.png",
  },
  {
    num: "02",
    title: "No Subscriptions",
    desc: "Pay once and access your files indefinitely, without monthly fees or recurring plans.",
    pill: "Off Subscription",
    img: "/home/feature-2.svg",
  },
  {
    num: "03",
    title: "Open Source",
    desc: "Benefit from full transparency, robust security, and complete flexibility.",
    pill: null,
    img: "/home/open-source.png",
  },
];

const PRODUCT_FEATURES = [
  {
    title: "End to end encryption",
    desc: "Ensure your files remain fully secure from upload to download.",
  },
  {
    title: "Permanent Publishing",
    desc: "Publish sites with unbreakable links and content that never disappears.",
  },
  {
    title: "Designed to Last",
    desc: "Enjoy unlimited access to your secure data for generations to come.",
  },
  {
    title: "Version Tracking",
    desc: "Track changes, review history, and restore any previous document version.",
  },
];

const TESTIMONIALS = [
  {
    quote: "We use ArDrive so our records are kept forever and we don't have to worry about lost data.",
    name: "Joe David",
    role: "CEO, Myna Accountants",
    image: "/home/testimonial-joe.png",
  },
  {
    quote: "ArDrive literally saved the entire migration... If I was restarting from scratch, I would've used it way earlier. It's amazing to see that something as big as RTFKT can be fully permanent on chain.",
    name: "Sam Cardillo",
    role: "RTFKT",
    image: "/home/testimonial-sam.jpg",
  },
  {
    quote: "I stored all 3 of my NFT projects on ArDrive and will continue to do so.",
    name: "BT",
    role: "Grammy Nominated DJ",
    image: "/home/testimonial-bt.png",
  },
];

const COMPARISON_ROWS = [
  ["Pay monthly to access your own files",       "One time payments for file storage"],
  ["Risk losing everything",                      "Data available even if ArDrive disappears"],
  ["Proprietary and company controlled",          "Decentralized and open source"],
  ["Risk account shutdown",                       "Inactive accounts never deleted"],
  ["User tracking and big data collection",       "No collection of personal data"],
  ["Storage based on subscription tiers",         "No storage restrictions"],
  ["Subject to corporate control",                "The ArDrive app will outlive the company"],
];

const MORE_FEATURES = [
  {
    title: "File Licensing",
    desc: "Upload documents or images with the ability to add licenses such as CC or UDL.",
  },
  {
    title: "Site and App Hosting",
    desc: "Easily deploy and host sites or apps directly from your drives.",
  },
  {
    title: "Content Streaming",
    desc: "Stream your favourite media content from drives, and create playlists.",
  },
  {
    title: "Enriched Metadata",
    desc: "Get advanced metadata customization for NFT projects.",
  },
];

const AUDIENCE_TAGS = [
  "Open Source", "Communities", "Film Makers", "Educators", "Casual Users",
  "Designers", "Students", "Archivists", "Digital Artists", "Developers",
  "Family Historians", "Photographers", "Journalists", "Sound Engineers", "Architects",
];

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

const SLOT_ITEMS = [
  "vendor lock-in",
  "404s",
  "subscriptions",
  "privacy breaches",
  "storage limits",
];

// ─── Sub-components ────────────────────────────────────────────────────────────

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
      className="text-fd-primary transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {ROTATING_PHRASES[index]}
    </span>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0">
      <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const SLOT_VIEWPORT_ROWS = 5;
/** Row height in px — must fit responsive headline size without clipping */
const SLOT_ITEM_PX = 70;
const SLOT_VIEWPORT_PX = SLOT_VIEWPORT_ROWS * SLOT_ITEM_PX;

function SlotMachine({ items, itemHeight = SLOT_ITEM_PX, textClassName = "" }: { items: string[]; itemHeight?: number; textClassName?: string }) {
  const ITEM_H = itemHeight;
  const n = items.length;
  // Top padding rows + full cycle + tail so the center row can stay aligned while looping
  const all =
    n >= 2
      ? [items[n - 2]!, items[n - 1]!, ...items, items[0]!, items[1]!]
      : [...items, items[0]!];

  const [offset, setOffset] = useState(0);
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setAnimated(true);
      setOffset((prev) => prev + 1);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (n < 1) return;
    if (offset === n) {
      const t = setTimeout(() => {
        setAnimated(false);
        setOffset(0);
      }, 520);
      return () => clearTimeout(t);
    }
  }, [offset, n]);

  useEffect(() => {
    if (!animated) {
      const t = setTimeout(() => setAnimated(true), 30);
      return () => clearTimeout(t);
    }
  }, [animated]);

  const viewportH = SLOT_VIEWPORT_ROWS * ITEM_H;

  return (
    <div
      className="relative w-max shrink-0 overflow-hidden"
      style={{
        height: viewportH,
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)",
      }}
    >
      <div
        style={{
          transform: `translateY(-${offset * ITEM_H}px)`,
          transition: animated ? "transform 520ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
        }}
      >
        {all.map((item, i) => (
          <div
            key={`slot-row-${i}`}
            className="flex items-center justify-start"
            style={{ height: ITEM_H }}
          >
            <span
              className={`inline-block whitespace-nowrap text-left leading-none text-fd-foreground ${textClassName}`}
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                lineHeight: 1,
                paddingTop: "0.06em",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <main
      className="flex flex-col overflow-hidden"
      style={{ backgroundColor: "#080808", color: "#FAFAFA" }}
    >

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative px-4 pt-20 pb-0"
        style={{
          background: "radial-gradient(60% 50% at 50% 60%, #2e0508 0%, #080808 100%)",
        }}
      >
        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "url(/home/texture-noise.png)",
            backgroundSize: "200px",
          }}
        />

        <div className={`${SITE_CONTAINER_CLASS} relative z-10 flex flex-col items-center text-center`}>
          {/* Headline */}
          <h1
            className="max-w-3xl text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-[5.5rem]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Pay Once.{" "}
            <span className="text-fd-primary">Store Forever.</span>
          </h1>

          <p
            className="mt-5 max-w-md text-lg"
            style={{ color: "rgba(250,250,250,0.55)" }}
          >
            Store files, apps, and pages with no subscriptions.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="https://app.ardrive.io"
              className="inline-flex items-center gap-2.5 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <span className="size-2 rounded-full bg-white/70 shrink-0" />
              Get Started
            </a>
          </div>

          {/* Hero device image */}
          <div className="mt-12 w-full max-w-4xl">
            <BaseImage
              src="/home/hero-devices.png"
              alt="ArDrive app on tablet, desktop, and phone"
              width={1200}
              height={760}
              className="w-full"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. ROTATING TEXT
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20" style={{ background: "#080808" }}>
        <div className={`${SITE_CONTAINER_CLASS} text-center`}>
          <p
            className="mx-auto max-w-2xl text-2xl leading-relaxed sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 300, color: "rgba(250,250,250,0.75)" }}
          >
            Seamless access to your apps and data for{" "}
            <RotatingText />
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. FEATURES — "Cloud storage, evolved."
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{
          background: "radial-gradient(55% 40% at 50% 70%, #2e0508 0%, #080808 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "url(/home/texture-noise.png)",
            backgroundSize: "200px",
          }}
        />
        <div className={`${SITE_CONTAINER_CLASS}`}>
          {/* Section label + heading */}
          <div className="mb-14">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Cloud storage,{" "}
              <span className="text-fd-primary">evolved.</span>
            </h2>
            <p className="mt-3 max-w-sm text-base" style={{ color: "rgba(250,250,250,0.45)" }}>
              Leverage the power of permanent storage to future-proof your data.
            </p>
          </div>

          {/* Three features with illustrations */}
          <div className="flex flex-col gap-6">
            {/* Feature 01 + 02 with illustrations */}
            <div className="grid gap-6 lg:grid-cols-2">
              {FEATURES.slice(0, 2).map((f) => (
                <div
                  key={f.num}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {f.img && (
                    <div className="relative overflow-hidden" style={{ height: 220 }}>
                      <BaseImage
                        src={f.img}
                        alt=""
                        width={516}
                        height={412}
                        className="w-full h-full object-cover object-top"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span
                      className="text-5xl font-extrabold leading-none"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 800,
                        color: "rgba(254,2,48,0.2)",
                      }}
                    >
                      {f.num}
                    </span>
                    <h3
                      className="mt-2 text-xl font-bold"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                    >
                      {f.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(250,250,250,0.5)" }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature 03 + CLI illustration side by side */}
            <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
              <div
                className="relative min-h-[360px] overflow-hidden rounded-2xl p-6 flex flex-col justify-between"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {FEATURES[2].img && (
                  <BaseImage
                    src={FEATURES[2].img}
                    alt=""
                    fill
                    className="object-cover object-center opacity-90"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    unoptimized
                  />
                )}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.2) 45%, rgba(8,8,8,0.86) 100%)",
                  }}
                />
                <span
                  className="relative z-10 text-5xl font-extrabold leading-none"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 800,
                    color: "rgba(254,2,48,0.2)",
                  }}
                >
                  {FEATURES[2].num}
                </span>
                <div className="relative z-10 mt-auto">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {FEATURES[2].title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(250,250,250,0.5)" }}>
                    {FEATURES[2].desc}
                  </p>
                </div>
              </div>

              {/* CLI terminal */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "#0d0d0d",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Terminal chrome */}
                <div
                  className="flex items-center gap-1.5 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <span className="size-2.5 rounded-full" style={{ background: "#FE0230" }} />
                  <span className="size-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <span className="size-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                  <span className="ml-3 font-mono text-xs" style={{ color: "rgba(250,250,250,0.25)" }}>
                    ardrive-cli
                  </span>
                </div>
                <div className="p-5 font-mono text-xs leading-relaxed overflow-x-auto">
                  <div className="flex gap-2">
                    <span style={{ color: "#FE0230" }}>❯</span>
                    <span style={{ color: "rgba(250,250,250,0.85)" }}>
                      ardrive create-drive \<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;--wallet-file /path/to/wallet.json \<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;--drive-name &quot;Teenage Love Poetry&quot;
                    </span>
                  </div>
                  <pre className="mt-4 text-[11px]" style={{ color: "rgba(250,250,250,0.35)" }}>{`{
  "created": [
    {
      "type": "drive",
      "metadataTxId": "giv2R8Xj0b…",
      "entityId": "898687ea-b678-4f86-…",
      "entityName": "Teenage Love Poetry"
    },
    {
      "type": "folder",
      "metadataTxId": "VljnttwUxR…",
      "entityId": "f0c58c11-430c-4383-…",
      "entityName": "Teenage Love Poetry"
    },
    {
      "type": "bundle",
      "bundleTxId": "Vj2x4IBEAe…"
    }
  ]
}`}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. PRODUCT SHOWCASE — "Access, upload, own."
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{
          background: "radial-gradient(50% 30% at 50% 65%, #2e0508 0%, #080808 100%)",
        }}
      >
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-12 text-center">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Access, upload,{" "}
              <span className="text-fd-primary">own.</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-base" style={{ color: "rgba(250,250,250,0.45)" }}>
              ArDrive acts just like your go-to cloud storage app, but comes supercharged
              with features that let you permanently secure, manage, and access your data.
            </p>
          </div>

          {/* App UI */}
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{
              border: "1px solid rgba(255,255,255,0.07)",
              background: "#0d0d0d",
            }}
          >
            <BaseImage
              src="/home/app-ui.png"
              alt="ArDrive file manager interface"
              width={1200}
              height={700}
              className="w-full"
              unoptimized
            />
          </div>

          {/* Feature cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCT_FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-3 size-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(254,2,48,0.12)" }}
                >
                  <span className="size-2 rounded-full bg-fd-primary" />
                </div>
                <h3
                  className="font-semibold text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 600 }}
                >
                  {feat.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: "rgba(250,250,250,0.45)" }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. STATS — 18M+ files stored
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative py-24 overflow-hidden"
        style={{
          background: "radial-gradient(50% 30% at 50% 75%, #2e0508 0%, #080808 100%)",
        }}
      >
        {/* Watermark wordmark */}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          aria-hidden="true"
        >
          <BaseImage
            src="/home/permahills.svg"
            alt=""
            width={1400}
            height={320}
            className="w-full opacity-[0.04] object-contain"
            unoptimized
          />
        </div>

        <div className={`${SITE_CONTAINER_CLASS} relative z-10 text-center`}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-4"
            style={{ color: "rgba(254,2,48,0.7)" }}
          >
            Growing every day
          </p>
          <h2
            className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            18,000,000+
          </h2>
          <p className="mt-3 text-lg" style={{ color: "rgba(250,250,250,0.4)" }}>
            files stored
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. TESTIMONIALS
          ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: "#080808" }}>
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="grid gap-5 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="relative rounded-2xl overflow-hidden p-6 flex flex-col gap-5"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(254,2,48,0.05) 100%)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Red corner glow */}
                <div
                  className="pointer-events-none absolute bottom-0 right-0 w-40 h-40 rounded-full opacity-10"
                  style={{ background: "radial-gradient(circle, #FE0230 0%, transparent 70%)" }}
                />
                <blockquote
                  className="relative z-10 text-sm leading-relaxed"
                  style={{ color: "rgba(250,250,250,0.7)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="relative z-10 flex items-center gap-3 mt-auto pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="size-9 rounded-full overflow-hidden shrink-0">
                    <BaseImage
                      src={t.image}
                      alt={t.name}
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs" style={{ color: "rgba(250,250,250,0.4)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. COMPARISON — "See the difference."
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{
          background: "radial-gradient(55% 45% at 50% 50%, #2e0508 0%, #080808 100%)",
        }}
      >
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              See the{" "}
              <span className="text-fd-primary">difference.</span>
            </h2>
          </div>

          <div
            className="mx-auto max-w-3xl rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Header row */}
            <div
              className="grid grid-cols-2"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="p-4 text-xs font-semibold uppercase tracking-widest"
                style={{
                  color: "rgba(250,250,250,0.35)",
                  borderRight: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Traditional Cloud Storage
              </div>
              <div
                className="p-4 text-xs font-semibold uppercase tracking-widest text-fd-primary"
              >
                ArDrive
              </div>
            </div>

            {COMPARISON_ROWS.map(([trad, ard], i) => (
              <div
                key={i}
                className="grid grid-cols-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="flex items-start gap-2.5 p-4 text-sm"
                  style={{
                    color: "rgba(250,250,250,0.35)",
                    borderRight: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span className="mt-0.5" style={{ color: "rgba(250,250,250,0.2)" }}>
                    <XIcon />
                  </span>
                  {trad}
                </div>
                <div
                  className="flex items-start gap-2.5 p-4 text-sm"
                  style={{ color: "rgba(250,250,250,0.8)" }}
                >
                  <span className="mt-0.5 text-fd-primary">
                    <CheckIcon />
                  </span>
                  {ard}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Explore Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. MORE FEATURES — "Do more with your data."
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="pt-0 pb-24"
        style={{ background: "#080808" }}
      >
        <div className="mb-12 px-4 pt-12">
          <div className={`${SITE_CONTAINER_CLASS} text-center`}>
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl text-white"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Do more with your{" "}
              <span style={{ color: "rgba(255,255,255,0.6)" }}>data.</span>
            </h2>
            <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
              Next-level storage, powered by permanence.
            </p>
          </div>
        </div>

        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MORE_FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(254,2,48,0.6)" }}
                >
                  0{i + 1}
                </div>
                <h3
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {feat.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(250,250,250,0.45)" }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. AUDIENCE — "Permanent data for everyone."
          ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="py-24"
        style={{
          background: "radial-gradient(50% 40% at 50% 50%, #2e0508 0%, #080808 100%)",
        }}
      >
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Permanent data for{" "}
              <span className="text-fd-primary">everyone.</span>
            </h2>
            <p className="mt-4 max-w-lg mx-auto text-base" style={{ color: "rgba(250,250,250,0.45)" }}>
              Create a digital time capsule of websites, news articles, and personal files
              that can be stored on the permanent web.
            </p>
          </div>

          {/* Tag cloud */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {AUDIENCE_TAGS.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-4 py-1.5 text-sm"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(250,250,250,0.6)",
                }}
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
                className="rounded-2xl p-6"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h3
                  className="font-bold text-sm"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(250,250,250,0.45)" }}>
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. SLOT MACHINE + RED BLOB CTA
          ══════════════════════════════════════════════════════════════════════ */}
      {/* Slot machine */}
      <section className="py-20" style={{ background: "#080808" }}>
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-5 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-center sm:gap-4 lg:gap-6">
            {/* Match reel row math so "Break free from" aligns with active slot row */}
            <div
              className="grid w-full shrink-0 items-center justify-items-center text-center sm:w-auto sm:min-w-fit sm:justify-items-end sm:text-right"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                height: SLOT_VIEWPORT_PX,
                gridTemplateRows: `repeat(${SLOT_VIEWPORT_ROWS}, minmax(0, 1fr))`,
              }}
            >
              <span className="row-start-3 block whitespace-nowrap text-4xl leading-none text-fd-foreground sm:text-5xl lg:text-6xl">
                <span className="text-fd-primary">Break free</span> from
              </span>
            </div>

            <div className="flex min-h-0 w-full min-w-0 justify-center sm:w-auto sm:justify-start">
              <SlotMachine
                items={SLOT_ITEMS}
                itemHeight={SLOT_ITEM_PX}
                textClassName="text-4xl sm:text-5xl lg:text-6xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Red blob CTA */}
      <section
        className="px-4 py-12"
        style={{ background: "#080808" }}
      >
        <div
          className={`${FINAL_CTA_WIDTH_CLASS} relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-fd-primary px-6 py-14 text-center text-white shadow-2xl shadow-black/35 sm:px-10 sm:py-16 lg:px-12 lg:py-20`}
        >
          {/* Top sheen */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[45%] opacity-35"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)",
            }}
          />
          {/* Inner glow */}
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(75% 55% at 50% 100%, rgba(255,255,255,0.22) 0%, transparent 60%)",
            }}
          />
          {/* Noise */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url(/home/texture-noise.png)", backgroundSize: "200px" }}
          />

          <h2
            className="relative z-10 mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-[3.35rem]"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Permanent, private, and powerful
          </h2>
          <p className="relative z-10 mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85">
            Store your files, apps, and pages once — and keep them forever.
          </p>
          <a
            href="https://app.ardrive.io"
            className="relative z-10 mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity"
          >
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
}
