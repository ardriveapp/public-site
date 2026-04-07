import Link from "next/link";
import {
  Fingerprint,
  Unplug,
  LocateFixed,
  Boxes,
  FolderSearch,
  Upload,
  HardDrive,
  Zap,
  Search,
  ExternalLink,
} from "lucide-react";
import { BaseImage } from "@/components/base-image";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import {
  CASE_STUDY_WIDTH_CLASS,
  FINAL_CTA_WIDTH_CLASS,
  HOW_IT_WORKS_WIDTH_CLASS,
  PROBLEM_CARD_RAIL_CLASS,
  PROBLEM_CARD_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WHAT_YOU_GET_WIDTH_CLASS,
} from "@/components/site-container";
import { FeaturedLogosRow } from "@/components/featured-logos/FeaturedLogosRow";
import { getFeaturedEcosystemItems } from "@/lib/ecosystem-content";
import type { LucideIcon } from "lucide-react";

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
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
      >
        {children}
        <ExternalLink className="size-4" />
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
    >
      {children}
    </Link>
  );
}

function TertiaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-fd-foreground hover:text-fd-primary transition-colors"
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

interface HexBadgeProps {
  icon: LucideIcon;
  size?: "default" | "large";
  strokeWidth?: number;
}

function HexBadge({ icon: Icon, size = "default", strokeWidth = 2.5 }: HexBadgeProps) {
  const containerSize = size === "large" ? "size-20" : "size-16";
  const iconSize = size === "large" ? "size-9" : "size-7";

  return (
    <div className={`relative ${containerSize} shrink-0`}>
      {/* Hex shape with gradient */}
      <svg
        viewBox="0 0 64 64"
        className="absolute inset-0 size-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hex-gradient-institutions" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5427C8" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
        <path
          d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
          fill="url(#hex-gradient-institutions)"
        />
      </svg>
      {/* Centered icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={`${iconSize} text-[#23232D]`} strokeWidth={strokeWidth} />
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

function BenefitCard({ icon, title, description, iconStrokeWidth }: BenefitCardProps) {
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

interface ServiceCardProps {
  title: string;
  description: string | React.ReactNode;
  bestFor: string;
  additionalText?: string;
}

function ServiceCard({ title, description, bestFor, additionalText }: ServiceCardProps) {
  return (
    <div
      className="rounded-2xl border border-fd-border p-6 shadow-sm"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 55%, rgb(223 214 247) 100%)",
      }}
    >
      <h3 className="text-xl font-bold text-fd-foreground">{title}</h3>
      <div className="mt-2 text-base leading-7 text-fd-muted-foreground">
        {description}
      </div>
      <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
        <span className="font-semibold text-fd-foreground">Best for:</span>{" "}
        {bestFor}
      </p>
      {additionalText && (
        <p className="mt-2 text-base leading-7 text-fd-muted-foreground">
          {additionalText}
        </p>
      )}
    </div>
  );
}

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  stepNumber: number;
}

function StepCard({ icon, title, description, stepNumber }: StepCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative">
        <HexBadge icon={icon} size="large" />
        <div className="absolute -bottom-2 -right-2 flex size-7 items-center justify-center rounded-full bg-fd-primary text-xs font-bold text-white">
          {stepNumber}
        </div>
      </div>
      <h3 className="mt-4 text-base font-bold text-fd-foreground">{title}</h3>
      <p className="mt-1.5 text-sm leading-6 text-fd-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function InstitutionsPage() {
  const featuredItems = getFeaturedEcosystemItems();

  return (
    <main
      style={{
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem]">
            {/* Background image */}
            <BaseImage
              src="/institutions/hero-institutions.jpg"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            {/* Dark overlay for text readability - full on mobile, gradient on desktop */}
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
              }}
            />

            <div className="relative px-8 py-14 md:px-14 md:py-20 lg:py-24 min-h-[400px] md:min-h-[480px] lg:min-h-[520px]">
              <div className="max-w-2xl">
                <PageTitleBadge title="Institutions" />

                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Always access.
                </h1>

                <p className="mt-4 text-base leading-7 text-white/90">
                  With ar.io — Your data is always secured and verified.
                  Accessible anytime, anywhere.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Institutional data access that never fails
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      OAIS aligned, verifiable longterm archival
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Impossible to ransomware or corrupt
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCta href="#contact" variant="light">Contact Sales</PrimaryCta>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              What You Get
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Ar.io provides permanent, verifiable access to the records that institutions are responsible for preserving — independent of future platforms, funding, or technologies.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
          <BenefitCard
            icon={Unplug}
            title="Pay Once, Store Forever"
            description="Records are paid for once and preserved for long-term access, without ongoing renewals or provider dependence."
          />
          <BenefitCard
            icon={Fingerprint}
            title="Verifiable Authenticity"
            description="Cryptographic proofs allow independent verification of data authenticity and integrity."
          />
          <BenefitCard
            icon={LocateFixed}
            title="Durable Identifiers"
            description="Records remain persistently referenceable and resolvable over time."
          />
          <BenefitCard
            icon={Boxes}
            title="Open & Interoperable"
            description="Built on open, standards-aligned protocols to support interoperability across systems and institutions."
            iconStrokeWidth={1.5}
          />
          </div>
        </div>
      </section>

      {/* Problem/Intro Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border shadow-sm ${PROBLEM_CARD_WIDTH_CLASS}`}
          style={{
            background:
              "linear-gradient(to right, rgb(223 214 247) 0%, rgb(var(--color-fd-card)) 70%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />

          <div className={`relative ${PROBLEM_CARD_RAIL_CLASS}`}>
            <div className="min-w-0 p-8 md:p-10">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                When access has to outlive systems and organizations.
              </h2>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Institutions are entrusted with records that must remain accessible,
                authentic, and trustworthy over time. But what happens when access is
                disrupted by an outage, ransomware, or system failure — or when the
                platforms and technologies supporting those records no longer exist?
              </p>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Ar.io is designed to eliminate this risk, providing a durable
                preservation layer that helps ensure records remain accessible and
                verifiable across incidents, transitions, and time.
              </p>
            </div>

            {/* Desktop: image right-aligned and stretches to the left */}
            <div className="relative hidden min-h-[420px] lg:block lg:-ml-12 lg:w-[calc(100%+3rem)] xl:-ml-16 xl:w-[calc(100%+4rem)]">
              <BaseImage
                src="/institutions/institution-image.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-contain object-right-bottom"
                sizes="(min-width: 1024px) 640px, 0px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Models Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
            Service models
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
            Choose the level of support that fits your institution.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Self-service"
            description="Direct access via APIs and open-source tooling for institutions managing their own preservation infrastructure."
            bestFor="institutional repositories, digital libraries, self-hosted archives."
          />
          <ServiceCard
            title="Managed Essentials"
            description="Production-grade preservation with monitoring, SLAs, and operational support for OAIS-aligned workflows."
            bestFor="institutions operationalizing permanent access for collections and scholarly records."
          />
          <ServiceCard
            title="Managed Dedicated"
            description="Everything in Essentials, plus dedicated infrastructure for maximum control, compliance, and sovereignty."
            bestFor="regulated institutions, national archives, and mission-critical preservation systems."
            additionalText="Configurations tailored to institutional requirements and governance frameworks."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <PrimaryCta href="#contact">Contact Sales</PrimaryCta>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={HOW_IT_WORKS_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              From ingest to permanent access, institutional records are preserved, verifiable, and reliably accessible over time.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <StepCard
            icon={FolderSearch}
            title="Identify Records"
            description="Select institutional records for permanent preservation."
            stepNumber={1}
          />
          <StepCard
            icon={Upload}
            title="Prepare & Upload"
            description="Package and upload records with metadata following institutional standards."
            stepNumber={2}
          />
          <StepCard
            icon={HardDrive}
            title="Immutable Preservation"
            description="Records are permanently stored across a decentralized network."
            stepNumber={3}
          />
          <StepCard
            icon={Zap}
            title="Resilient Access"
            description="Retrieve records at any time through multiple independent access points."
            stepNumber={4}
          />
          <StepCard
            icon={Search}
            title="Audit & Verify"
            description="Independently verify integrity, authenticity, and provenance with cryptographic assurance."
            stepNumber={5}
          />
          </div>
        </div>
      </section>

      {/* Case Study CrimRxiv Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border shadow-sm ${CASE_STUDY_WIDTH_CLASS}`}
          style={{
            background:
              "linear-gradient(to bottom right, rgb(var(--color-fd-background)), rgb(223 214 247))",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />

          <div className="relative grid gap-8 p-8 md:p-10 lg:grid-cols-[minmax(0,450px)_minmax(0,550px)] lg:items-center lg:justify-center lg:gap-12">
            <div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-fd-foreground">
                CrimRxiv
              </h2>
              <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
                An open criminology and criminal justice preprint repository
                built on ar.io&apos;s permanent infrastructure, ensuring scholarly
                works remain accessible regardless of funding cycles or
                institutional changes.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>
                    3,181
                  </div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">
                    Publications
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>
                    100%
                  </div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">
                    Verifiable authenticity
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#5427C8]" style={{ fontFamily: 'var(--font-heading)' }}>
                    0
                  </div>
                  <div className="mt-1 text-xs text-fd-muted-foreground">
                    Broken links
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <SecondaryCta href="/case-studies/crimrxiv">View Case Study</SecondaryCta>
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              <BaseImage
                src="/institutions/archive-room.jpg"
                alt="Archive room"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 600px, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Institutions Choose Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Why institutions choose ar.io
          </h2>

          <div className="mt-6 text-base font-medium text-fd-foreground md:text-lg">
            We&apos;re built for:
          </div>
          <ul className="mx-auto mt-3 max-w-xl list-inside list-disc space-y-2 text-base text-fd-foreground/80">
            <li>Institutional grade safety</li>
            <li>Verifiable integrity</li>
            <li>Independent access</li>
            <li>Open standards</li>
            <li>Long-term continuity</li>
          </ul>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`${SITE_CONTAINER_CLASS} pb-20 pt-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border p-8 shadow-sm md:p-12 ${FINAL_CTA_WIDTH_CLASS}`}
          style={{
            background:
              "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Talk to us about securing your data
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              We work with institutions to assess preservation requirements,
              explore OAIS-aligned workflows, and determine the right service
              model for collections and scholarly records.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCta href="#contact">Schedule a Demo</PrimaryCta>
              <SecondaryCta href="/continuum" >
                Read the Framework
              </SecondaryCta>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
              <TertiaryCta href="/use-cases">
                View Use Cases
              </TertiaryCta>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Logos */}
      <FeaturedLogosRow featuredItems={featuredItems} />
    </main>
  );
}
