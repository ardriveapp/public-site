import Link from "next/link";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { PricingCalculator } from "./PricingCalculator";

const ARDRIVE_BENEFITS = [
  "One time payment per file",
  "Inactive accounts never deleted",
  "Top-level encryption for personal files",
  "No storage restrictions — just pay for what you need",
  "No collection of personal data",
  "Data available even if ArDrive disappears",
  "The ArDrive app will outlive the company",
];

const TRADITIONAL_DRAWBACKS = [
  "Monthly subscription fee",
  "Accounts tied to monthly subscription",
  "Private encryption often unavailable; risk of data leaks",
  "Based on subscription tiers with maximum storage amounts",
  "User tracking and big data collection",
  "Risk losing everything",
  "Subject to corporate control",
];

const RELATED_ARTICLES = [
  { slug: "arweave-vs-filecoin", title: "Arweave vs. Filecoin" },
  { slug: "blockchain-storage-versus-cloud-storage", title: "Blockchain storage vs cloud storage" },
  { slug: "what-is-permanent-data", title: "What is Permanent Data?" },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-4xl sm:text-5xl"
      style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
    >
      {children}
    </h2>
  );
}

export function PricingPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="px-4 pt-20 pb-16 text-center"
        style={{ background: "radial-gradient(60% 50% at 50% 60%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "rgba(254,2,48,0.7)" }}
          >
            Simple pricing
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Pay once,{" "}
            <span className="text-fd-primary">store forever.</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            No subscriptions, just permanent preservation and access.
          </p>
          <div className="mt-8">
            <a
              href="https://app.ardrive.io"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              <span className="size-2 rounded-full bg-white/70 shrink-0" />
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* ── Calculator ── */}
      <section className="px-4 pb-4">
        <div className={`${SITE_CONTAINER_CLASS} max-w-2xl mx-auto`}>
          <PricingCalculator />
        </div>
      </section>

      {/* ── How pricing works ── */}
      <section className="px-4 py-20">
        <div className={`${SITE_CONTAINER_CLASS} max-w-4xl mx-auto`}>
          <div className="mb-10 text-center">
            <SectionHeading>
              How pricing{" "}
              <span className="text-fd-primary">works.</span>
            </SectionHeading>
            <p className="mt-4 max-w-2xl mx-auto text-base" style={{ color: "rgba(250,250,250,0.5)" }}>
              ArDrive is powered by permanent blockchain technology, which uses a unique model:
              you pay once to store data permanently. No renewals, no data caps, and no additional fees.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="mb-3 text-2xl">📁</div>
              <h3 className="font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                File Size
              </h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(250,250,250,0.5)" }}>
                Charged based on size — larger files cost more. Uploads under 100 KB are free.
              </p>
            </div>
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="mb-3 text-2xl">🌐</div>
              <h3 className="font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                Network Fee
              </h3>
              <p className="mt-2 text-sm" style={{ color: "rgba(250,250,250,0.5)" }}>
                Paid to permanently store your data across hundreds of network nodes worldwide.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── Comparison ── */}
      <section
        className="px-4 py-20"
        style={{ background: "radial-gradient(55% 45% at 50% 50%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={`${SITE_CONTAINER_CLASS}`}>
          <div className="mb-10 text-center">
            <SectionHeading>
              How ArDrive{" "}
              <span className="text-fd-primary">stacks up.</span>
            </SectionHeading>
            <p className="mt-3 max-w-xl mx-auto text-base" style={{ color: "rgba(250,250,250,0.45)" }}>
              Benefits of ArDrive compared to traditional cloud storage.
            </p>
          </div>

          <div
            className="mx-auto max-w-3xl rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div
              className="grid grid-cols-2"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div
                className="p-4 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(250,250,250,0.35)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
              >
                Traditional Cloud Storage
              </div>
              <div className="p-4 text-xs font-semibold uppercase tracking-widest text-fd-primary">
                ArDrive
              </div>
            </div>
            {TRADITIONAL_DRAWBACKS.map((trad, i) => (
              <div
                key={i}
                className="grid grid-cols-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <div
                  className="flex items-start gap-2.5 p-4 text-sm"
                  style={{ color: "rgba(250,250,250,0.35)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5" aria-hidden="true">
                    <path d="M11 3L3 11M3 3l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {trad}
                </div>
                <div className="flex items-start gap-2.5 p-4 text-sm" style={{ color: "rgba(250,250,250,0.8)" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5 text-fd-primary" aria-hidden="true">
                    <path d="M2 7l3.5 3.5L12 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {ARDRIVE_BENEFITS[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next steps ── */}
      <section className="px-4 py-20">
        <div className={`${SITE_CONTAINER_CLASS} max-w-2xl mx-auto`}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(254,2,48,0.6)" }}>01</p>
              <h3 className="font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                Pricing Calculator
              </h3>
              <p className="mt-2 text-sm flex-1" style={{ color: "rgba(250,250,250,0.5)" }}>
                See how much storage you'll need for common file types and compare prices.
              </p>
              <a
                href="https://app.ardrive.io"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:opacity-80 transition-opacity"
              >
                See prices →
              </a>
            </div>
            <div
              className="rounded-2xl p-6 flex flex-col"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(254,2,48,0.6)" }}>02</p>
              <h3 className="font-bold" style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}>
                Try ArDrive
              </h3>
              <p className="mt-2 text-sm flex-1" style={{ color: "rgba(250,250,250,0.5)" }}>
                Get started uploading your files via the ArDrive app.
              </p>
              <a
                href="https://app.ardrive.io"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:opacity-80 transition-opacity"
              >
                Launch app →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      <section className="px-4 pb-16">
        <div className={`${SITE_CONTAINER_CLASS} max-w-2xl mx-auto`}>
          <h2 className="text-lg font-bold mb-4" style={{ color: "rgba(250,250,250,0.5)" }}>
            Related articles
          </h2>
          <div className="flex flex-col gap-2">
            {RELATED_ARTICLES.map(a => (
              <Link
                key={a.slug}
                href={`/articles/${a.slug}`}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:text-fd-primary"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.7)" }}
              >
                <span className="text-fd-primary">→</span>
                {a.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Red blob CTA ── */}
      <section className="px-4 py-10">
        <div
          className="mx-auto max-w-4xl text-center text-white px-8 py-16 relative overflow-hidden"
          style={{ borderRadius: "2.5rem", background: "#d31721" }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(60% 50% at 50% 100%, rgba(255,80,80,0.5) 0%, transparent 100%)" }} />
          <h2 className="relative z-10 text-3xl sm:text-4xl font-extrabold" style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>
            Store once. Keep forever.
          </h2>
          <p className="relative z-10 mt-3 opacity-75 max-w-sm mx-auto">
            No subscriptions, no data caps, no surprises.
          </p>
          <a href="https://app.ardrive.io" className="relative z-10 mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
}
