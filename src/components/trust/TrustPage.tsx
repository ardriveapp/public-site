import Link from "next/link";
import {
  Shield,
  CheckCircle,
  Lock,
  Globe,
  Eye,
  Code,
  Upload,
  Download,
  Hash,
  GitCompare,
  BadgeCheck,
  ChevronDown,
  AlertTriangle,
  ShieldCheck,
  ArrowDown,
  ArrowRight,
  FileText,
  FileCode,
  FileVideo,
  Database,
  Music,
} from "lucide-react";
import { BaseImage } from "@/components/base-image";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import {
  FINAL_CTA_WIDTH_CLASS,
  HOW_IT_WORKS_WIDTH_CLASS,
  PROBLEM_CARD_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WHAT_YOU_GET_WIDTH_CLASS,
} from "@/components/site-container";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Local UI primitives (same pattern as EnterprisePage)               */
/* ------------------------------------------------------------------ */

function BulletIcon() {
  return (
    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
      <BaseImage
        src="/icons/checkbox.svg"
        alt=""
        aria-hidden="true"
        width={16}
        height={16}
        className="size-4 brightness-0 invert"
      />
    </span>
  );
}

function PageTitleBadge({ title }: { title: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
      {title}
    </div>
  );
}

function PrimaryCta({
  href,
  children,
  variant = "dark",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const isContactLink = href === "#contact" || href === "/#contact";
  const className =
    variant === "light"
      ? "inline-flex items-center gap-2 rounded-full border border-white/80 bg-transparent px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
      : "inline-flex items-center gap-2 rounded-full bg-[#23232D] px-5 py-2.5 text-sm font-semibold text-[#F0F0F0] hover:opacity-90 transition-opacity";

  if (isContactLink) {
    return (
      <ContactUsTrigger className={className}>
        {children}
      </ContactUsTrigger>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const isContactLink = href === "#contact" || href === "/#contact";
  const className =
    "inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors";

  if (isContactLink) {
    return (
      <ContactUsTrigger className={className}>
        {children}
      </ContactUsTrigger>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

interface HexBadgeProps {
  icon: LucideIcon;
  size?: "default" | "large";
  strokeWidth?: number;
}

function HexBadge({
  icon: Icon,
  size = "default",
  strokeWidth = 2.5,
}: HexBadgeProps) {
  const containerSize = size === "large" ? "size-20" : "size-16";
  const iconSize = size === "large" ? "size-9" : "size-7";

  return (
    <div className={`relative ${containerSize} shrink-0`}>
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hex-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5427C8" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
        <path
          d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
          fill="url(#hex-gradient)"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon
          className={`${iconSize} text-[#23232D]`}
          strokeWidth={strokeWidth}
        />
      </div>
    </div>
  );
}

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconStrokeWidth?: number;
}

function BenefitCard({
  icon,
  title,
  description,
  iconStrokeWidth,
}: BenefitCardProps) {
  return (
    <div className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-fd-primary/30">
      <div className="flex items-start gap-5">
        <HexBadge icon={icon} strokeWidth={iconStrokeWidth} />
        <div className="min-w-0">
          <h3 className="text-2xl font-bold leading-tight text-fd-foreground">
            {title}
          </h3>
          <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ accordion item (uses native <details> for server rendering)    */
/* ------------------------------------------------------------------ */

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: React.ReactNode;
}) {
  return (
    <details className="group border-b border-fd-border last:border-b-0">
      <summary className="flex cursor-pointer items-center justify-between gap-4 py-5 text-base font-semibold text-fd-foreground transition-colors hover:text-fd-primary list-none [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        <ChevronDown className="size-5 shrink-0 text-fd-muted-foreground transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-5 text-base leading-7 text-fd-muted-foreground">
        {answer}
      </div>
    </details>
  );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export function TrustPage() {
  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      {/* ============================================================ */}
      {/*  Hero Section                                                 */}
      {/* ============================================================ */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <BaseImage
              src="/trust/hero-trust.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
              }}
            />

            <div className="relative px-8 py-14 md:px-14 md:py-20 lg:py-24 min-h-[400px] md:min-h-[480px] lg:min-h-[520px]">
              <div className="max-w-2xl">
                <PageTitleBadge title="Trust Center" />

                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Don&apos;t trust, verify.
                </h1>

                <p className="mt-4 text-base leading-7 text-white/90">
                  Data integrity proven by cryptography, not promised by
                  vendors.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Protocol-enforced immutability with no admin override
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Cryptographic proof that stored data hasn&apos;t been altered
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Independent verification without vendor contact
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCta href="#contact" variant="light">
                    Book a Call
                  </PrimaryCta>
                  <Link
                    href="https://docs.ar.io"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white/80 hover:bg-white/10 transition-colors"
                  >
                    View Documentation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Security Properties                                          */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              What Makes It Secure
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Built on the Arweave protocol, a decentralized permanent storage
              network operational since 2018 with zero data loss. Ar.io
              provides security properties that are structural, not
              policy-based.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <BenefitCard
              icon={Shield}
              title="Protocol-Enforced Immutability"
              description="No admin override, no vendor override, no single point of deletion. Immutability is a structural property of the protocol."
            />
            <BenefitCard
              icon={CheckCircle}
              title="Cryptographic Integrity & Provenance"
              description="Merkle tree verification ensures any tampering is mathematically detectable. Permanent, verifiable records of who created what and when, architecturally aligned with C2PA content authenticity standards."
            />
            <BenefitCard
              icon={Lock}
              title="Client-Side Encryption"
              description="AES-256-GCM encryption before data leaves your environment. You manage all keys."
            />
            <BenefitCard
              icon={Globe}
              title="Decentralized Redundancy"
              description="Hundreds of replicas across dozens of countries. Self-healing replication via economic incentives. 7+ years zero data loss."
            />
            <BenefitCard
              icon={Eye}
              title="Independent Verification"
              description="Any auditor, regulator, or third party can verify data integrity with only a transaction ID. No vendor contact required."
            />
            <BenefitCard
              icon={Code}
              title="Open Source"
              description="All code is open source on GitHub and fully self-hostable. Zero vendor dependency if you choose sovereign deployment."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  How Verification Works                                       */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              How Verification Works
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              No vendor contact, API keys or subscriptions. Just math.
            </p>
          </div>

          <div className="rounded-3xl border border-fd-border bg-fd-card p-6 md:p-10 shadow-sm">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="relative" style={{ paddingBottom: "16px" }}>
                {/* Connecting gradient line — z-0 behind everything */}
                <div
                  className="absolute z-0 h-[3px] rounded-full"
                  style={{
                    top: "60px",
                    left: "10%",
                    right: "10%",
                    background:
                      "linear-gradient(to right, #5427C8, #5427C8 70%, #22c55e)",
                  }}
                />

                {/* Animated file icons — z-[1] above line, below circles */}
                <div
                  className="pointer-events-none absolute z-[1]"
                  style={{ top: "50px", left: "10%", right: "10%" }}
                >
                  <div className="trust-flow-icon" style={{ animationDelay: "0s" }}>
                    <FileText className="size-5 text-fd-primary/70" />
                  </div>
                  <div className="trust-flow-icon" style={{ animationDelay: "1.2s" }}>
                    <Database className="size-5 text-fd-primary/70" />
                  </div>
                  <div className="trust-flow-icon" style={{ animationDelay: "2.4s" }}>
                    <FileCode className="size-5 text-fd-primary/70" />
                  </div>
                  <div className="trust-flow-icon" style={{ animationDelay: "3.6s" }}>
                    <Music className="size-5 text-fd-primary/70" />
                  </div>
                  <div className="trust-flow-icon" style={{ animationDelay: "4.8s" }}>
                    <FileVideo className="size-5 text-fd-primary/70" />
                  </div>
                </div>

                {/* Nodes — z-10 above line and icons */}
                <div className="relative z-10 grid grid-cols-5 gap-4">
                  {/* 1: YOUR DATA (large, purple) */}
                  <div className="text-center">
                    <div className="relative mx-auto mb-4 flex size-[120px] items-center justify-center rounded-full border-[3px] border-fd-primary bg-white shadow-lg">
                      <div className="text-center">
                        <Upload
                          className="mx-auto size-7 text-fd-primary mb-1"
                          strokeWidth={1.5}
                        />
                        <span className="text-[10px] font-bold text-fd-foreground">
                          YOUR DATA
                        </span>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-fd-foreground mb-1">
                      Store
                    </h3>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground mx-auto max-w-[160px]">
                      Upload through ar.io and receive a transaction ID
                    </p>
                  </div>

                  {/* 2: Retrieve (small, vertically centered on line) */}
                  <div className="text-center pt-5">
                    <div className="mx-auto mb-4 flex size-[80px] items-center justify-center rounded-full border-2 border-fd-primary/40 bg-fd-primary/5 bg-fd-card shadow">
                      <Download
                        className="size-5 text-fd-primary"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-fd-foreground mb-1">
                      Retrieve
                    </h3>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground mx-auto max-w-[140px]">
                      Fetch from any gateway worldwide
                    </p>
                  </div>

                  {/* 3: Recompute (small) */}
                  <div className="text-center pt-5">
                    <div className="mx-auto mb-4 flex size-[80px] items-center justify-center rounded-full border-2 border-fd-primary/40 bg-fd-primary/5 bg-fd-card shadow">
                      <Hash
                        className="size-5 text-fd-primary"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-fd-foreground mb-1">
                      Recompute
                    </h3>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground mx-auto max-w-[140px]">
                      Compute the Merkle data root
                    </p>
                  </div>

                  {/* 4: Compare (small) */}
                  <div className="text-center pt-5">
                    <div className="mx-auto mb-4 flex size-[80px] items-center justify-center rounded-full border-2 border-fd-primary/40 bg-fd-primary/5 bg-fd-card shadow">
                      <GitCompare
                        className="size-5 text-fd-primary"
                        strokeWidth={2}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-fd-foreground mb-1">
                      Compare
                    </h3>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground mx-auto max-w-[140px]">
                      Check against on-chain root
                    </p>
                  </div>

                  {/* 5: VERIFIED (large, green, with pulse) */}
                  <div className="text-center">
                    <div className="relative mx-auto mb-4 size-[120px]">
                      <div className="trust-verified-pulse absolute -inset-4 rounded-full bg-green-500 blur-lg" />
                      <div className="relative flex size-[120px] items-center justify-center rounded-full border-[3px] border-green-500 bg-white shadow-lg">
                        <div className="text-center">
                          <BadgeCheck
                            className="mx-auto size-7 text-green-500 mb-1"
                            strokeWidth={1.5}
                          />
                          <span className="text-[10px] font-bold text-fd-foreground">
                            VERIFIED
                          </span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-fd-foreground mb-1">
                      Proof
                    </h3>
                    <p className="text-xs leading-relaxed text-fd-muted-foreground mx-auto max-w-[160px]">
                      Byte-for-byte identical. Mathematical proof.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary bg-white shadow">
                  <Upload className="size-7 text-fd-primary" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-fd-foreground mb-1">
                    Store
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    Upload data through ar.io. Receive a transaction ID,
                    your permanent cryptographic receipt.
                  </p>
                </div>
              </div>
              <div className="flex justify-start pl-7">
                <ArrowDown className="size-5 text-fd-primary" />
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary/50 bg-fd-primary/5 shadow">
                  <Download className="size-7 text-fd-primary" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-fd-foreground mb-1">
                    Retrieve
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    Fetch your data from any ar.io gateway worldwide or
                    from your own self-hosted gateway.
                  </p>
                </div>
              </div>
              <div className="flex justify-start pl-7">
                <ArrowDown className="size-5 text-fd-primary" />
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary/50 bg-fd-primary/5 shadow">
                  <Hash className="size-7 text-fd-primary" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-fd-foreground mb-1">
                    Recompute
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    Compute the Merkle data root from the retrieved data
                    using the open-source algorithm.
                  </p>
                </div>
              </div>
              <div className="flex justify-start pl-7">
                <ArrowDown className="size-5 text-fd-primary" />
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-fd-primary/50 bg-fd-primary/5 shadow">
                  <GitCompare className="size-7 text-fd-primary" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-fd-foreground mb-1">
                    Compare
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    Check the computed root against the on-chain root in
                    the transaction header on Arweave.
                  </p>
                </div>
              </div>
              <div className="flex justify-start pl-7">
                <ArrowDown className="size-5 text-fd-primary" />
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 flex size-16 items-center justify-center rounded-full border-2 border-green-500 bg-green-50 shadow">
                  <BadgeCheck className="size-7 text-green-500" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="text-base font-bold text-fd-foreground mb-1">
                    Verified
                  </h3>
                  <p className="text-sm text-fd-muted-foreground leading-relaxed">
                    If roots match, the data is byte-for-byte identical to
                    the original. Mathematical proof, not a vendor promise.
                  </p>
                </div>
              </div>
            </div>

            {/* CSS Animations */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  .trust-flow-icon {
                    position: absolute;
                    background: white;
                    border-radius: 50%;
                    padding: 4px;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                    animation: trustFileFlow 6s ease-in-out infinite;
                  }
                  @keyframes trustFileFlow {
                    0% { left: 0%; opacity: 0; transform: translateX(-50%); }
                    4% { opacity: 1; }
                    96% { opacity: 1; }
                    100% { left: 100%; opacity: 0; transform: translateX(-50%); }
                  }
                  .trust-verified-pulse {
                    animation: trustVerifiedPulse 2.5s ease-in-out infinite;
                  }
                  @keyframes trustVerifiedPulse {
                    0%, 100% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.15); opacity: 0.25; }
                  }
                `,
              }}
            />
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="https://docs.ar.io/learn/wayfinder/#what-is-wayfinder"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-fd-primary hover:underline"
            >
              Learn more about Wayfinder, the client-side verification protocol
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Compliance Posture                                           */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={PROBLEM_CARD_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Compliance
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Ar.io supports regulated recordkeeping through immutable storage,
              tamper-evident timestamps, and independent verification. Here’s
              what the network enables today.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recordkeeping & auditability */}
            <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-fd-foreground">
                Recordkeeping &amp; auditability
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      WORM-oriented retention (SEC 17a-4 workflows)
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Protocol-enforced immutability supports WORM-style
                      recordkeeping and supervision workflows.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      Audit trails (SOX / FINRA)
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Immutable, independently verifiable records with
                      tamper-evident timestamps for evidentiary integrity.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      eDiscovery &amp; chain of custody
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Content-addressed storage and immutable receipts can
                      simplify integrity verification and chain-of-custody
                      documentation.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      Independent verification
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Any third party can verify integrity from a transaction
                      ID - no vendor involvement required.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Security & privacy controls */}
            <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8 shadow-sm">
              <h3 className="text-xl font-bold text-fd-foreground">
                Security &amp; privacy controls
              </h3>
              <ul className="mt-4 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      Encryption &amp; key control
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Supports customer-managed encryption workflows so access
                      can be controlled by keys, not by storage operators.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-green-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      Gateway policy controls
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Access enforcement and policy controls live at the
                      gateway/application layer - where enterprises already
                      operate controls.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block size-2.5 shrink-0 rounded-full bg-yellow-500" />
                  <div>
                    <span className="text-sm font-semibold text-fd-foreground">
                      GDPR-oriented handling patterns
                    </span>
                    <p className="mt-0.5 text-sm leading-6 text-fd-muted-foreground">
                      Patterns like encryption key destruction (“crypto-shredding”)
                      and gateway moderation can support privacy requirements;
                      applicability depends on your use case and counsel.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Callout box */}
          <div
            className="mt-8 rounded-2xl border border-fd-border p-6 md:p-8 shadow-sm"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 55%, rgb(223 214 247) 100%)",
            }}
          >
            <div className="flex items-start gap-4">
              <ShieldCheck className="mt-0.5 size-6 shrink-0 text-fd-primary" />
              <div>
                <h3 className="text-lg font-bold text-fd-foreground">
                  Making compliance easy
                </h3>
                <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
                  By using cryptographic proofs, any auditor, regulator, or
                  third party can independently verify data integrity using
                  only a transaction ID - without signing NDAs or requiring
                  vendor involvement. With verifiable security, trust is not
                  required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Transparency                                                 */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={PROBLEM_CARD_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Transparency
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Security through openness, not obscurity.
            </p>
          </div>

          <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8 shadow-sm">
            <div className="grid gap-8 md:grid-cols-2 md:gap-12">
              {/* What We Do */}
              <div>
                <h3 className="text-xl font-bold text-fd-foreground">
                  What We Do
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                    <span className="text-sm leading-6 text-fd-muted-foreground">
                      All code is open source ({" "}
                      <a
                        href="https://github.com/ar-io"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-fd-primary hover:underline"
                      >
                        github.com/ar-io
                      </a>
                      )
                    </span>
                  </li>
                  {[
                    "Observation reports stored permanently on Arweave",
                    "All network state publicly verifiable on-chain",
                    "Economic model and endowment fund publicly documented",
                    "Full security architecture document available upon request",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-500" />
                      <span className="text-sm leading-6 text-fd-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What We Don't Do */}
              <div>
                <h3 className="text-xl font-bold text-fd-foreground">
                  What We Don&apos;t Do
                </h3>
                <ul className="mt-4 space-y-3">
                  {[
                    "No server-side encryption. You control all encryption.",
                    "No data deletion by design. Crypto-shredding available.",
                    "No data residency controls. Global replication by design.",
                    "No vendor access to your plaintext data",
                    "No recurring fees that could lapse and put data at risk",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                      <span className="text-sm leading-6 text-fd-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  FAQ                                                          */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto w-full max-w-[900px]">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Common Questions
            </h2>
          </div>

          <div className="rounded-2xl border border-fd-border bg-fd-card p-6 md:p-8 shadow-sm">
            <FaqItem
              question="How do I verify data integrity?"
              answer={
                <>
                  With only a transaction ID, you can retrieve data from any of
                  hundreds of gateways, recompute its Merkle root, and compare
                  against the on-chain root. A match provides mathematical proof
                  the data is byte-for-byte identical to the original. No vendor
                  involvement needed. The{" "}
                  <a
                    href="https://docs.ar.io/build/access/wayfinder/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-fd-primary hover:underline"
                  >
                    Wayfinder protocol
                  </a>{" "}
                  provides client-side routing and cryptographic verification out
                  of the box.
                </>
              }
            />
            <FaqItem
              question="How is data encrypted?"
              answer="All encryption is client-side, before data reaches ar.io. We recommend authenticated encryption (for example, AES-256-GCM). You manage all keys and we never have access to plaintext data. You can use any enterprise KMS, HSM, or ArDrive's built-in encryption."
            />
            <FaqItem
              question="Can data be deleted?"
              answer="No, by design. Data on Arweave is permanent. For GDPR scenarios, teams commonly use crypto-shredding (destroying the encryption key renders encrypted data mathematically inaccessible) and gateway-level content moderation."
            />
            <FaqItem
              question="What if I accidentally upload unencrypted data?"
              answer="It is permanently and irreversibly public. This is the most important operational risk to address before deployment. Use mandatory encryption pipelines or ArDrive private drives, which encrypt data automatically before upload."
            />
            <FaqItem
              question="Where is data stored?"
              answer="Across decentralized mining nodes in dozens of countries. Data is replicated hundreds of times via economic incentives. You cannot restrict geographic location. Global replication is by design, which means no single regional disaster can affect availability."
            />
            <FaqItem
              question="What happens if ar.io shuts down?"
              answer="Your data persists on the Arweave network regardless of ar.io's status. The gateway software is open source and fully self-hostable. You can run your own gateway and access your data with zero vendor dependency."
            />
            <FaqItem
              question="How is this different from a traditional backup vault?"
              answer="Traditional vaults enforce immutability with software policies that privileged administrators can override. Arweave enforces immutability at the protocol level. There is no override mechanism, no admin concept, and no single entity with deletion capability."
            />
            <FaqItem
              question="How does ar.io relate to content provenance standards like C2PA?"
              answer="Arweave's architecture is naturally aligned with C2PA (Coalition for Content Provenance and Authenticity) standards. Both use SHA-256 hashing and Merkle trees. C2PA's biggest vulnerability is metadata stripping: platforms and file transfers routinely remove provenance manifests. Permanent storage solves this by preserving provenance records independently and immutably, so authenticity can always be verified even after manifests are stripped from the original content."
            />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  Final CTA                                                    */}
      {/* ============================================================ */}
      <section className={`${SITE_CONTAINER_CLASS} pb-20 pt-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border p-8 shadow-sm md:p-12 ${FINAL_CTA_WIDTH_CLASS}`}
          style={{
            background:
              "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Verify it yourself
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              Upload test data, get a transaction ID, and independently confirm
              integrity from any gateway. Or talk to our team about your
              security requirements.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCta href="#contact">Book a Call</PrimaryCta>
              <SecondaryCta href="/enterprise">
                Enterprise Solutions
              </SecondaryCta>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
