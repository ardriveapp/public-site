import Link from "next/link";
import {
  Unplug,
  Fingerprint,
  BrickWall,
  Boxes,
  Folders,
  Upload,
  Cloud,
  Zap,
  Search,
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
          <linearGradient id="hex-gradient-platforms" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5427C8" />
            <stop offset="100%" stopColor="#F0F0F0" />
          </linearGradient>
        </defs>
        <path
          d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
          fill="url(#hex-gradient-platforms)"
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
  subtitle: string;
  description: string | React.ReactNode;
  bestFor: string;
  additionalText?: string;
}

function ServiceCard({ title, subtitle, description, bestFor, additionalText }: ServiceCardProps) {
  return (
    <div
      className="rounded-2xl border border-fd-border p-6 shadow-sm"
      style={{
        background:
          "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 55%, rgb(223 214 247) 100%)",
      }}
    >
      <h3 className="text-xl font-bold text-fd-foreground">{title}</h3>
      <p className="mt-1 text-sm font-medium text-fd-primary/80">{subtitle}</p>
      <div className="mt-3 text-base leading-7 text-fd-muted-foreground">
        {description}
      </div>
      <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
        {bestFor}
      </p>
      {additionalText && (
        <p className="mt-2 text-sm leading-6 text-fd-muted-foreground italic">
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

export function PlatformsPage() {
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
              src="/platforms/hero-platforms.jpg"
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
                <PageTitleBadge title="User Platforms" />

                <h1 className="mt-6 text-balance text-5xl font-bold tracking-tight text-white lg:text-6xl">
                  Always access.
                </h1>

                <p className="mt-4 text-base leading-7 text-white/90">
                  With ar.io — Your users data is always secured and verified.
                  Accessible anytime, anywhere.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-white/90">
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      User data access that never fails
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Let users pay once yet access their data forever
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BulletIcon />
                    <span className="font-semibold">
                      Protect users from ransomware attacks
                    </span>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <PrimaryCta href="/#contact" variant="light">Contact Sales</PrimaryCta>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Platforms Enable Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              What platforms enable with ar.io
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-fd-muted-foreground md:text-base md:leading-7">
              Ar.io enables platforms to offer user-owned, permanent data storage — reducing dependency on third-party infrastructure while preserving access, integrity, and control.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
          <BenefitCard
            icon={BrickWall}
            title="Permanent User Access"
            description="Users retain continuous access to their data, even as platforms or providers change."
          />
          <BenefitCard
            icon={Fingerprint}
            title="Durable Content Authenticity"
            description="Cryptographic provenance enables verifiable authenticity and transparency in the age of AI."
          />
          <BenefitCard
            icon={Unplug}
            title="Pay Once, Store Forever"
            description="One-time storage removes ongoing fees, renewals, or lock-ins."
          />
          <BenefitCard
            icon={Boxes}
            title="Open & Interoperable"
            description="Built on open protocols to support portability and long-term compatibility."
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
                When user content needs safekeeping.
              </h2>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                User platforms enable people to create valuable apps, content, assets, and data. Yet access and authenticity are often mediated by third-party infrastructure — such as hosting, storage, or verification services — operating outside the platform’s control.
              </p>
              <p className="mt-6 text-base leading-7 text-fd-muted-foreground">
                Over time, this exposes platforms and users to access and integrity risk: broken references, inaccessible data, and uncertainty around content origin and ownership, especially as AI-generated and manipulated media increases. Ar.io removes this risk by separating user data access and provenance from infrastructure and vendor dependency.
              </p>
            </div>

            {/* Desktop: image hugs bottom-right of the card */}
            <div className="relative hidden min-h-[420px] overflow-hidden lg:block lg:-ml-12 lg:w-[calc(100%+3rem)] xl:-ml-16 xl:w-[calc(100%+4rem)]">
              <BaseImage
                src="/platforms/platforms-image.png"
                alt=""
                aria-hidden="true"
                fill
                className="object-contain object-right-bottom origin-bottom-right scale-110"
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
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ServiceCard
            title="API & SDK Integration"
            subtitle='"Bring your own logic"'
            description={
              <>
                Platform writes user data to ar.io via API/SDK
                <br />
                Full control over UX and workflows
              </>
            }
            bestFor="ar.io operates as a permanent storage layer in your stack."
          />
          <ServiceCard
            title="Managed Publishing"
            subtitle='"Permanence as a feature"'
            description={
              <>
                ar.io operates the publishing and access layer
                <br />
                Platform exposes permanence as a user option
                <br />
                Reduced operational overhead
              </>
            }
            bestFor="Platforms focus on product, ar.io handles permanence."
          />
          <ServiceCard
            title="Embedded"
            subtitle='"User-owned by default"'
            description={
              <>
                Deeper integration
                <br />
                Dedicated infrastructure or custom workflows
                <br />
                Long-term guarantees aligned with platform roadmap
              </>
            }
            bestFor="Designed for platforms making data sovereignty core to their identity."
          />
        </div>

        <div className="mt-10 flex justify-center">
          <PrimaryCta href="/#contact">Contact Sales</PrimaryCta>
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
              From creation to permanent access, user data is protected, available, and verifiable at every step.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            <StepCard
              icon={Folders}
              title="Content Creation"
              description="Users create content, apps, assets, or data on your platform."
              stepNumber={1}
            />
            <StepCard
              icon={Upload}
              title="Upload to ar.io"
              description="Upload once, knowing it's secured from the start."
              stepNumber={2}
            />
            <StepCard
              icon={HardDrive}
              title="Permanent Storage"
              description="Content is preserved across decentralized infrastructure, built for long-term access."
              stepNumber={3}
            />
            <StepCard
              icon={Zap}
              title="Resilient Access"
              description="Users can retrieve content at any time through multiple independent access points."
              stepNumber={4}
            />
            <StepCard
              icon={Search}
              title="Audit & Verify"
              description="Anyone can verify integrity, authenticity, and provenance with cryptographic assurance."
              stepNumber={5}
            />
          </div>
        </div>
      </section>

      {/* Why Partners Choose Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
            Why our partners choose ar.io
          </h2>

          <div className="mt-6 text-base font-medium text-fd-foreground md:text-lg">
            We&apos;re built to:
          </div>
          <ul className="mx-auto mt-3 max-w-xl list-inside list-disc space-y-2 text-base text-fd-foreground/80">
            <li>Reduce reliance on third-party infrastructure</li>
            <li>Support creator, Web3, and AI-native workflows</li>
            <li>Protect long-term user access and trust</li>
            <li>Remove future access and storage liability</li>
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
              Talk to us about user owned data
            </h2>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              We work with platform teams to design storage and access models that
              strengthen user trust while reducing long-term dependency risk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <PrimaryCta href="/#contact">Talk to us</PrimaryCta>
              <SecondaryCta href="/use-cases">View Use Cases</SecondaryCta>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Logos */}
      <FeaturedLogosRow featuredItems={featuredItems} />
    </main>
  );
}
