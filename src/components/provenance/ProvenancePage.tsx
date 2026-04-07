"use client";

import Link from "next/link";
import { BaseImage } from "@/components/base-image";
import { ContactUsTrigger } from "@/components/contact/ContactUsTrigger";
import {
  FINAL_CTA_WIDTH_CLASS,
  HOW_IT_WORKS_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
} from "@/components/site-container";
import {
  ArrowDown,
  BadgeCheck,
  Boxes,
  Check,
  ChevronRight,
  Fingerprint,
  Lock,
} from "lucide-react";

const riskPoints = [
  "AI multiplies faster than we can verify",
  "Synthetic media is rising rapidly",
  "Misinformation scales globally",
  "Identities and records are harder to trust",
];

const proofOutcomes = [
  {
    icon: Boxes,
    title: "Open & Interoperable",
    description:
      "Built on open, standards-aligned protocols to support interoperability across systems.",
  },
  {
    icon: Lock,
    title: "Immutable",
    description: "Records cannot be altered, expired, or silently rewritten over time.",
  },
  {
    icon: Fingerprint,
    title: "Provably authentic",
    description: "Cryptographic proof of origin and state, independently verifiable.",
  },
];

const useCases = [
  "Logs and audit trails",
  "C2PA and media provenance",
  "Compliance and signed evidence",
  "Identity and model history",
  "Enterprise verification dashboards",
  "Portable JSON proofs",
];

export function ProvenancePage() {
  return (
    <main
      className="text-fd-foreground"
      style={{
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <BaseImage
              src="/provenance/hero-provenance.png"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 1400px, 100vw"
            />
            <div className="absolute inset-0 bg-black/60 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.68) 36%, rgba(0,0,0,0.15) 68%, rgba(0,0,0,0) 100%)",
              }}
            />

            <div className="relative min-h-[400px] px-8 py-14 md:min-h-[480px] md:px-14 md:py-20 lg:min-h-[520px] lg:py-24">
              <div className="max-w-2xl">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm">
                  Provenance
                </div>

                <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                  Verification infrastructure for the AI era
                </h1>

                <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
                  Write once, prove forever. Ar.io creates cryptographically sealed records that can be verified independently of the system that produced them.
                </p>

                <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-white/80 sm:text-base">
                  A neutral verification layer for data, content, and AI workflows.
                </p>

                <div className="mt-7 text-sm font-medium text-white/80 sm:text-base">
                  Independent · Permanent · Verifiable
                </div>

                <div className="mt-8">
                  <ContactUsTrigger className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#23232D] transition-opacity hover:opacity-90 sm:w-auto">
                    Talk to us about provenance
                  </ContactUsTrigger>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-4">
              <p className="text-xs font-semibold tracking-[0.22em] text-fd-primary/80">
                THE PROBLEM
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                Systems can store data.
                <br />
                They cannot export trust.
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-fd-muted-foreground">
                Infrastructure can log, back up, and secure data, but proof remains locked
                inside the system that created it.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-base leading-relaxed font-medium text-fd-foreground sm:text-lg">
                    If truth cannot be verified independently, it breaks at scale.
                  </p>
                  <ul className="mt-8 space-y-3 text-sm text-fd-foreground/80 sm:text-base">
                    {riskPoints.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-sm font-semibold leading-relaxed text-fd-foreground/85 sm:text-base">
                    Without verifiable records AI cannot be audited, media cannot be trusted,
                    and systems cannot be defended.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-fd-border bg-fd-card p-5 shadow-sm sm:p-7">
                  <p className="mt-3 text-2xl font-semibold leading-snug text-fd-foreground">
                    No universal independent verification layer
                  </p>
                  <ul className="mt-5 space-y-2 text-sm text-fd-foreground/80 sm:text-base">
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                      <span>Proof stays with the data holder</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                      <span>Records expire or change</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                      <span>Audit history is fragmented</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                      <span>Trust does not transfer across systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className={HOW_IT_WORKS_WIDTH_CLASS}>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.22em] text-fd-primary/80">
                  THE OPPORTUNITY
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                  Ar.io is the verification layer for AI
                </h2>
                <p className="mt-5 text-base leading-relaxed text-fd-muted-foreground">
                  Records with ar.io are sovereign, permanent, and verifiable without relying
                  on a vendor or platform.
                </p>
                <p className="mt-5 text-base font-medium leading-relaxed text-fd-foreground/85">
                  Ar.io does not replace systems. It makes their data provable.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-[1.75rem] border border-fd-border bg-white/80 p-5 shadow-sm sm:p-8">
                  <div className="grid gap-6 md:grid-cols-3">
                    {proofOutcomes.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="rounded-2xl border border-fd-border bg-fd-card p-5">
                          <div className="flex size-12 items-center justify-center rounded-2xl bg-fd-primary/10">
                            <Icon className="size-6 text-fd-primary" />
                          </div>
                          <h3 className="mt-4 text-lg font-semibold text-fd-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-fd-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 rounded-[1.5rem] border border-fd-border bg-gradient-to-r from-white to-[#DFD6F7]/45 p-5 sm:p-6">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-fd-primary" />
                      <div>
                        <p className="text-sm font-semibold text-fd-foreground">
                          Write once → prove forever
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-fd-muted-foreground">
                          Proof that survives system changes, policies, and time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="overflow-hidden rounded-[2rem] border border-fd-border bg-[linear-gradient(to_bottom_right,rgba(240,240,240,0.95),rgba(223,214,247,0.55))] shadow-sm">
            <div className="grid gap-8 p-5 sm:gap-10 sm:p-10 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.22em] text-fd-primary/80">
                  HOW IT WORKS
                </p>
                <h2 className="mt-3 text-balance text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                  Storage + verification
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-fd-muted-foreground">
                  Ar.io acts as a verification layer beneath existing systems.
                </p>
                <p className="mt-5 max-w-md text-base leading-relaxed text-fd-muted-foreground">
                  Inputs from developers, platforms, and enterprises are recorded and
                  verified cryptographically.
                </p>
                <p className="mt-6 text-base font-semibold leading-relaxed text-fd-foreground">
                  Proof is returned as:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-fd-muted-foreground sm:text-base">
                  <li>JSON (developers)</li>
                  <li>Dashboards (enterprise)</li>
                  <li>Signed evidence (audit/legal)</li>
                </ul>

              </div>

              <div className="lg:col-span-8">
                <div className="rounded-[1.5rem] border border-fd-border bg-white p-3 shadow-sm sm:p-5">
                  <div className="hidden md:block">
                    <BaseImage
                      src="/provenance/verification-diagram-animated.svg"
                      alt="Provenance diagram showing storage and verification layers"
                      width={1074}
                      height={637}
                      className="h-auto w-full"
                      priority
                    />
                  </div>

                  <div className="space-y-4 md:hidden">
                    <div className="rounded-xl border border-dashed border-fd-border bg-fd-card px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-fd-primary/80">
                        INPUT
                      </p>
                      <p className="mt-2 text-sm font-medium text-fd-foreground">
                        Developers, Enterprise, Platforms
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-fd-primary/30 to-fd-primary" />
                      <ArrowDown className="size-3.5 text-fd-primary/80" />
                    </div>

                    <div className="rounded-xl border border-[#2563EB]/40 bg-[#2563EB]/5 px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-[#2563EB]">
                        STORAGE LAYER
                      </p>
                      <p className="mt-1 text-base font-semibold text-fd-foreground">
                        Core data infrastructure
                      </p>
                      <p className="mt-2 text-sm text-fd-muted-foreground">
                        Store, index, and retrieve content-addressed records.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-fd-primary/30 to-fd-primary" />
                      <ArrowDown className="size-3.5 text-fd-primary/80" />
                    </div>

                    <div className="rounded-xl border border-fd-primary/40 bg-fd-primary/5 px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-fd-primary">
                        VERIFICATION LAYER
                      </p>
                      <p className="mt-1 text-base font-semibold text-fd-foreground">
                        Cryptographic proof
                      </p>
                      <p className="mt-2 text-sm text-fd-muted-foreground">
                        Verify existence, timestamp, signer, and integrity.
                      </p>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1">
                      <div className="h-6 w-0.5 rounded-full bg-gradient-to-b from-fd-primary/30 to-fd-primary" />
                      <ArrowDown className="size-3.5 text-fd-primary/80" />
                    </div>

                    <div className="rounded-xl border border-dashed border-fd-border bg-fd-card px-4 py-3">
                      <p className="text-xs font-semibold tracking-[0.18em] text-fd-primary/80">
                        OUTPUT
                      </p>
                      <p className="mt-2 text-sm font-medium text-fd-foreground">
                        JSON proofs, verification dashboards, signed evidence
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-5 pb-6 pt-2 sm:px-10 sm:pb-8 sm:pt-3">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-white/70 bg-white/85 px-5 py-4 text-sm text-fd-muted-foreground shadow-sm">
                  <span className="block text-sm font-semibold text-fd-foreground">Store</span>
                  Content-address records.
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/85 px-5 py-4 text-sm text-fd-muted-foreground shadow-sm">
                  <span className="block text-sm font-semibold text-fd-foreground">Verify</span>
                  Origin, time, signer, integrity.
                </div>
                <div className="rounded-2xl border border-white/70 bg-white/85 px-5 py-4 text-sm text-fd-muted-foreground shadow-sm">
                  <span className="block text-sm font-semibold text-fd-foreground">Export</span>
                  JSON, dashboards, signed evidence.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className={HOW_IT_WORKS_WIDTH_CLASS}>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <p className="text-xs font-semibold tracking-[0.22em] text-fd-primary/80">
                  BUILT FOR
                </p>
                <h2 className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
                  Real systems, not theory
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-fd-muted-foreground">
                  Provenance is truly useful when it works inside real workflows.
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-[1.5rem] border border-fd-border bg-white/85 p-5 shadow-sm sm:p-7">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {useCases.map((label) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-xl border border-fd-border bg-fd-card px-4 py-3"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border border-fd-primary/40 bg-fd-primary/10">
                          <Check className="size-3.5 text-fd-primary" />
                        </span>
                        <p className="text-sm font-medium leading-relaxed text-fd-foreground sm:text-base">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-semibold tracking-[0.22em] text-fd-primary/80">
              WHY THIS MATTERS
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl">
              Trust does not scale by policy.
              <br />
              It needs infrastructure.
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-fd-muted-foreground sm:text-lg">
              Provenance truly works when it persists across systems, teams, and time.
              Ar.io provides that layer beneath AI pipelines, media workflows, and
              enterprise systems.
            </p>
            <div className="mt-8">
              <Link
                href="/technology"
                className="inline-flex items-center gap-2 rounded-full border border-fd-border bg-fd-background/70 px-4 py-2 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
              >
                Learn more
                <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SITE_CONTAINER_CLASS} pb-16 pt-8 sm:pb-20`}>
        <div className={FINAL_CTA_WIDTH_CLASS}>
          <div
            className="relative overflow-hidden rounded-3xl border border-fd-border p-8 shadow-sm sm:p-10"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight text-fd-foreground md:text-4xl">
                  Build on provenance
                </h2>
                <p className="mt-2 text-sm text-fd-muted-foreground sm:text-base">
                  Add independent verification to your logs, workflows, and media.
                </p>
              </div>
              <div className="relative shrink-0">
                <ContactUsTrigger className="inline-flex w-full items-center justify-center rounded-full bg-[#23232D] px-6 py-3 text-sm font-semibold text-[#F0F0F0] transition-opacity hover:opacity-90 sm:w-auto">
                  Contact us
                </ContactUsTrigger>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

