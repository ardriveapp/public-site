import Link from "next/link";
import { ABOUT_FAQS } from "@/lib/about-faq-config";
import {
  FINAL_CTA_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WHAT_YOU_GET_WIDTH_CLASS,
} from "@/components/site-container";

const PRODUCTS = [
  {
    title: "ArDrive app",
    text: "The ArDrive web app lets you create drives, upload files, and organize them into folders, much like a familiar cloud storage app. You choose which drives are public and which are private and encrypted, and every upload becomes a permanent, addressable file on Arweave.",
  },
  {
    title: "ArDrive CLI",
    text: "The ArDrive command line interface runs the same uploads and drive management from a terminal instead of a browser. It suits bulk uploads, backups, and workflows driven by scripts, automation tools, or bots rather than manual clicks.",
  },
  {
    title: "Turbo, for developers",
    text: "Turbo is the upload service behind ArDrive. Developers use the open-source Turbo SDK to upload data to Arweave from their own apps, and can pay with a credit card instead of holding AR tokens.",
  },
  {
    title: "Site and app hosting",
    text: "You can host a static site or app by uploading its files to a drive; the folder becomes a permanent location on Arweave. Pointing a human-readable ArNS domain at that folder gives visitors a stable link even as you publish new versions.",
  },
] as const;

const DIFFERENTIATORS = [
  {
    title: "Pay once, not monthly",
    text: "You pay one time for each file you upload, instead of a recurring subscription. Storage providers like Dropbox and Google Drive bill you monthly or yearly to keep your files online; ArDrive charges once, when you upload.",
  },
  {
    title: "Your data lives on Arweave",
    text: "Files uploaded through ArDrive are stored on Arweave, a decentralized network of storage nodes, rather than on a single company's servers. Your data stays available even if ArDrive stops operating.",
  },
  {
    title: "Open source",
    text: "The ArDrive app, CLI, and core libraries are open source and published on GitHub, so anyone can inspect, audit, or build on them.",
  },
  {
    title: "You hold your own keys",
    text: "Your ArDrive wallet is controlled by a seed phrase or keyfile that only you hold, not by ArDrive. ArDrive never stores a copy, so it can't recover a wallet for you if both are lost.",
  },
  {
    title: "Private, encrypted drives",
    text: "Files in a private drive are encrypted before they leave your device, and only you and the people you share a key with can open them. Public drives, once uploaded, are visible to anyone.",
  },
  {
    title: "Readable from any Arweave gateway",
    text: "A public file uploaded through ArDrive gets a permanent transaction ID that any Arweave gateway can serve, so retrieving it doesn't depend on ArDrive's own servers staying online.",
  },
] as const;

const AUDIENCES = [
  "Individuals archiving family photos, videos, and documents",
  "Digital artists and NFT creators timestamping their work",
  "Journalists, researchers, and archivists preserving records and source material",
  "Open-source developers and communities publishing sites, apps, and data",
  "Businesses and creators who want files to stay accessible without a recurring bill",
] as const;

const GET_STARTED_STEPS = [
  {
    title: "Sign up and create a drive",
    text: "Go to app.ardrive.io and create your first drive. ArDrive can generate an Arweave wallet for you if you don't already have one.",
    href: "https://app.ardrive.io",
    linkLabel: "app.ardrive.io",
    external: true,
  },
  {
    title: "Add credits",
    text: "Add Turbo Credits with a credit or debit card, or use the free tier for very small uploads. Current rates are on the pricing page.",
    href: "/pricing",
    linkLabel: "See pricing",
    external: false,
  },
  {
    title: "Upload your files",
    text: "Upload files or folders into your drive. Each upload becomes a permanent transaction on Arweave.",
    href: "/help",
    linkLabel: "Read the help center",
    external: false,
  },
  {
    title: "Build or get help",
    text: "To build an integration, use the developer docs. For anything else, use the contact page.",
    href: "/developers",
    linkLabel: "Developer docs",
    href2: "/contact",
    linkLabel2: "Contact us",
    external: false,
  },
] as const;


function CardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-balance text-4xl font-bold tracking-tight sm:text-5xl"
      style={{ fontFamily: "var(--font-heading)" }}
    >
      {children}
    </h2>
  );
}

export function AboutPage() {
  return (
    <main className="bg-fd-background text-fd-foreground">
      {/* Hero: H1 + value sentence */}
      <section className="relative overflow-hidden pb-16 pt-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 10%, rgb(211 23 33 / 0.22) 0%, transparent 65%)",
          }}
        />
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              About ArDrive
            </p>
            <h1
              className="text-balance text-5xl sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              Permanent storage, not a{" "}
              <span className="text-fd-primary">subscription.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-[rgb(var(--color-fd-foreground)/0.7)]">
              ArDrive is a permanent storage app that keeps your files, sites
              and apps on Arweave for a one-time payment, for anyone who wants
              their data to outlast a subscription or a single company.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://app.ardrive.io"
                className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <span className="size-2 shrink-0 rounded-full bg-white/70" />
                Get Started
              </a>
              <a
                href="https://github.com/ardriveapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--color-fd-border)/0.2)] px-7 py-3 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-card"
              >
                View Open Source
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What ArDrive does */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              The platform
            </p>
            <CardHeading>What ArDrive does</CardHeading>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {PRODUCTS.map((product) => (
              <div
                key={product.title}
                className="relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgb(var(--color-fd-primary)/0.1)]" />
                <div className="relative">
                  <h3 className="text-2xl font-bold tracking-tight">
                    {product.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    {product.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes ArDrive different */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              What stays true
            </p>
            <CardHeading>What makes ArDrive different</CardHeading>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {DIFFERENTIATORS.map((item, index) => (
              <div
                key={item.title}
                className="relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgb(var(--color-fd-primary)/0.1)]" />
                <div className="relative">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-fd-primary)/0.8)]">
                    0{index + 1}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who uses ArDrive */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={`${WHAT_YOU_GET_WIDTH_CLASS} grid items-start gap-5 md:grid-cols-2`}>
          <div className="rounded-2xl border border-fd-border bg-fd-card p-7 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              Who it&apos;s for
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Who uses ArDrive
            </h2>
            <ul className="mt-6 space-y-4 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
              {AUDIENCES.map((audience) => (
                <li key={audience} className="flex gap-3">
                  <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-fd-primary" />
                  <span>{audience}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Who builds ArDrive */}
          <div className="rounded-2xl border border-fd-border bg-fd-card p-7 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              Who builds it
            </p>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Who builds ArDrive
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
              <p>
                ArDrive is built by Permanent Data Solutions, Inc. ArDrive
                began in 2020.
              </p>
              <p>
                Uploads are handled by Turbo, which Permanent Data Solutions
                also runs. ArDrive is part of the{" "}
                <a
                  href="https://ar.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-fd-primary underline-offset-4 hover:underline"
                >
                  ar.io
                </a>{" "}
                ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to get started */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              Get started
            </p>
            <CardHeading>How to get started</CardHeading>
          </div>

          <ol className="mt-10 grid gap-5 md:grid-cols-2">
            {GET_STARTED_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgb(var(--color-fd-primary)/0.1)]" />
                <div className="relative">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[rgb(var(--color-fd-primary)/0.8)]">
                    Step {index + 1}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    {step.text}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm font-semibold">
                    {step.external ? (
                      <a
                        href={step.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-fd-primary hover:opacity-80"
                      >
                        {step.linkLabel}
                      </a>
                    ) : (
                      <Link href={step.href} className="text-fd-primary hover:opacity-80">
                        {step.linkLabel}
                      </Link>
                    )}
                    {"href2" in step && step.href2 && (
                      <Link href={step.href2} className="text-fd-primary hover:opacity-80">
                        {step.linkLabel2}
                      </Link>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Key facts */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              At a glance
            </p>
            <CardHeading>Key facts</CardHeading>
          </div>

          <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-fd-border bg-fd-card">
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">Key facts about ArDrive.</caption>
              <tbody>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="w-1/3 px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Name</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">ArDrive</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Type</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">Permanent storage app built on Arweave</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Built by</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">Permanent Data Solutions, Inc.</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Started</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">2020</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Files stored</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">Billions, through ArDrive and Turbo</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Website</th>
                  <td className="px-6 py-4">
                    <a href="https://ardrive.io" className="text-fd-primary hover:underline">ardrive.io</a>
                  </td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Core offering</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">Permanent, one-time-payment file storage</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Pricing model</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    Pay once per upload, no subscription. Current rates:{" "}
                    <Link href="/pricing" className="text-fd-primary hover:underline">pricing page</Link>
                  </td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Services</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">ArDrive app, ArDrive CLI, Turbo uploads and SDK</td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Open source</th>
                  <td className="px-6 py-4">
                    <a
                      href="https://github.com/ardriveapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-primary hover:underline"
                    >
                      github.com/ardriveapp
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-fd-border">
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Help</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    <Link href="/help" className="text-fd-primary hover:underline">Help center</Link>
                    {", "}
                    <Link href="/contact" className="text-fd-primary hover:underline">Contact</Link>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-semibold text-[rgb(var(--color-fd-foreground)/0.5)]">Social</th>
                  <td className="px-6 py-4 text-[rgb(var(--color-fd-foreground)/0.7)]">
                    <a
                      href="https://x.com/ardriveapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-primary hover:underline"
                    >
                      X @ardriveapp
                    </a>
                    {", "}
                    <a
                      href="https://discord.com/invite/ya4hf2H"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-primary hover:underline"
                    >
                      Discord
                    </a>
                    {", "}
                    <a
                      href="https://github.com/ardriveapp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fd-primary hover:underline"
                    >
                      GitHub
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              FAQ
            </p>
            <CardHeading>Frequently asked questions</CardHeading>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
            {ABOUT_FAQS.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-fd-border bg-fd-card p-6"
              >
                <h3 className="text-lg font-bold tracking-tight">{faq.question}</h3>
                <p className="mt-2 text-base leading-7 text-[rgb(var(--color-fd-foreground)/0.7)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-8 pt-10">
        <div
          className={`${FINAL_CTA_WIDTH_CLASS} relative overflow-hidden rounded-[2.5rem] bg-fd-primary px-8 py-16 text-center text-white`}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 100%, rgb(255 255 255 / 0.28) 0%, transparent 100%)",
            }}
          />
          <div className="relative">
            <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">
              Store something that lasts.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Permanent, private, user-owned storage, for a one-time payment.
            </p>
            <a
              href="https://app.ardrive.io"
              className="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary transition-opacity hover:opacity-90"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
