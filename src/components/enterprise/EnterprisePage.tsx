import Link from "next/link";
import {
  Unplug,
  Fingerprint,
  FolderCheck,
  Upload,
  Cloud,
  Zap,
  Search,
  ShieldCheck,
  HardDrive,
} from "lucide-react";
import { BaseImage } from "@/components/base-image";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import {
  FINAL_CTA_WIDTH_CLASS,
  HOW_IT_WORKS_WIDTH_CLASS,
  PROBLEM_CARD_RAIL_CLASS,
  PROBLEM_CARD_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WHAT_YOU_GET_WIDTH_CLASS,
} from "@/components/site-container";
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
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-[#23232D] bg-transparent px-5 py-2.5 text-sm font-semibold text-[#23232D] hover:bg-[#23232D]/5 transition-colors"
    >
      {children}
    </Link>
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

export function EnterprisePage() {
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
              src="/enterprise/hero-enterprise.jpg"
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
                <PageTitleBadge title="Enterprise" />

                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Always access.
                </h1>

                <p className="mt-4 text-base leading-7 text-white/90">
                  With ar.io — Your most important data is secured.
                  Accessible anytime, anywhere.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Enterprise data access that never fails
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Secure mission-critical data from downtime
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Make ransomware attacks a distant memory
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
            Ar.io provides a permanent, decentralized data layer that ensures critical information remains accessible, intact, and verifiable — regardless of outages, attacks, or provider failure.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
          <BenefitCard
            icon={Zap}
            title="Constant Access"
            description="Ensure critical data remains available if systems fail."
          />
          <BenefitCard
            icon={ShieldCheck}
            title="Ransomware Resistant"
            description="Data cannot be encrypted, altered, or held hostage."
          />
          <BenefitCard
            icon={Unplug}
            title="Vendor Independence"
            description="Access does not depend on renewals or subscriptions."
          />
          <BenefitCard
            icon={Fingerprint}
            title="Verifiable Integrity"
            description="Prove when data was created and that it has not been altered."
          />
          </div>
        </div>
      </section>

      {/* Problem/Intro Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-8`}>
        <div
          className={`relative overflow-hidden rounded-[2rem] border border-fd-border shadow-sm ${PROBLEM_CARD_WIDTH_CLASS}`}
          style={{
            // Match reference: lavender-to-light split across the card
            background:
              "linear-gradient(to right, rgb(223 214 247) 0%, rgb(var(--color-fd-card)) 70%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />

          <div className={`relative ${PROBLEM_CARD_RAIL_CLASS}`}>
            <div className="min-w-0 p-8 md:p-10">
              <h2 className="text-3xl font-bold tracking-tight text-fd-foreground">
                When access fails,
                <br />
                the cost is immediate.
              </h2>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Most enterprise data loss is not due to data being corrupted.
                Instead access to perfectly intact data is lost through failures
                elsewhere: outages, ransomware, migrations, contract changes, or
                service shutdowns.
              </p>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Traditional cloud storage and backups still rely on centralized
                infrastructure and subscriptions, creating risky hidden points
                of failure.
              </p>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Ar.io removes that risk by separating data access from
                infrastructure or vendor dependency.
              </p>
            </div>

            {/* Desktop: image hugs bottom-right of the card */}
            <div className="relative hidden min-h-[420px] overflow-hidden lg:block lg:-ml-12 lg:w-[calc(100%+3rem)] xl:-ml-16 xl:w-[calc(100%+4rem)]">
              <BaseImage
                src="/enterprise/enterprise-image.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-right-bottom"
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
            Choose the level of support that fits your team.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="Self-service"
            description="Direct access via APIs and tooling for teams managing their own integrations."
            bestFor="platform teams, internal tools, early adoption."
          />
          <ServiceCard
            title="Managed Essentials"
            description={
              <>
                Data discovery, management, and production-grade access with SLAs, monitoring, and operational support.
              </>
            }
            bestFor="enterprises operationalizing permanent storage for critical data."
          />
          <ServiceCard
            title="Managed Dedicated"
            description="Everything in Essentials, plus dedicated infrastructure for maximum control and sovereignty."
            bestFor="regulated industries and mission-critical systems."
            additionalText="Configurations are tailored to your requirements."
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
              From upload to permanent access, your data is protected, available, and verifiable at every step.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <StepCard
            icon={FolderCheck}
            title="Select Critical Data"
            description="Choose the data that matters most."
            stepNumber={1}
          />
          <StepCard
            icon={Upload}
            title="Upload to ar.io"
            description="Upload once, knowing it’s secured from the start."
            stepNumber={2}
          />
          <StepCard
            icon={HardDrive}
            title="Permanent Storage"
            description="Your data is distributed across a global network, built to last."
            stepNumber={3}
          />
          <StepCard
            icon={Zap}
            title="Resilient Access"
            description="Retrieve data at any time through multiple independent access points."
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

      {/* Why Enterprises Choose Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Why enterprises choose ar.io
            </h2>

            <div className="mt-6 text-base font-medium text-fd-foreground md:text-lg">
              We’re built for:
            </div>
            <ul className="mx-auto mt-3 max-w-xl list-inside list-disc space-y-2 text-base text-fd-foreground/80">
              <li>Infrastructure-level risk reduction</li>
              <li>Complex failure scenarios</li>
              <li>No hidden access or egress fees</li>
              <li>Constant access to mission-critical data</li>
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
          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
              Talk to us about your access risks
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">

              We work with enterprise teams to assess dependency, failure scenarios, and the right level of service for critical data.

            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCta href="#contact">Talk to us</PrimaryCta>
              <SecondaryCta href="/use-cases">View Use Cases</SecondaryCta>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
