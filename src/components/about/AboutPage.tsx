import {
  FINAL_CTA_WIDTH_CLASS,
  SITE_CONTAINER_CLASS,
  WHAT_YOU_GET_WIDTH_CLASS,
} from "@/components/site-container";

const BELIEFS = [
  {
    title: "Data should last.",
    text: "Not for a month. Not for a year. Indefinitely.",
  },
  {
    title: "Privacy is non-negotiable.",
    text: "Only you can access your private files. That's how it should be.",
  },
  {
    title: "Ownership is power.",
    text: "You don't rent storage, you own it. Your keys, your files, your identity, forever with a platform built in the open, by and for the community.",
  },
  {
    title: "Digital speech must be protected.",
    text: "Everyone should be free to store and share information without fear of censorship or deletion.",
  },
  {
    title: "Provenance matters.",
    text: "Every upload is timestamped and permanent, so you can prove where your data came from and that it's never been changed.",
  },
] as const;

export function AboutPage() {
  return (
    <main className="bg-fd-background text-fd-foreground">
      <section className="relative overflow-hidden pb-12 pt-16">
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
              Our Story
            </p>
            <h1
              className="text-balance text-5xl sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              A new kind of <span className="text-fd-primary">cloud.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-fd-foreground/70">
              ardrive began in 2020 as a small project on the Arweave
              blockchain - a simple idea with big consequences: what if cloud
              storage didn&apos;t come with monthly fees, centralized control,
              or an expiration date?
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://app.ardrive.io"
                className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Get Started
              </a>
              <a
                href="https://github.com/ardriveapp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-fd-border/20 px-7 py-3 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-card"
              >
                View Open Source
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
          <div className="rounded-[2rem] border border-fd-border/10 bg-fd-card p-7 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Story
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-fd-foreground/70">
              <p>
                ardrive began in 2020 as a small project on the Arweave
                blockchain - a simple idea with big consequences: what if cloud
                storage didn&apos;t come with monthly fees, centralized control,
                or an expiration date? What if it was yours and lasted forever,
                always?
              </p>
              <p>That idea became both a mission and a movement.</p>
              <p>
                Since then, we&apos;ve grown from a small tool into a permanent
                storage platform used by creators, researchers, developers, and
                everyday people around the world. We&apos;ve been part of the
                Arweave ecosystem from its early days, built open source
                infrastructure, and kept growing with the support of the
                community, all while staying true to our mission.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-fd-primary/20 bg-fd-primary p-7 text-white sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
              Our Mission
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              To get permanent storage in the hands of everyone.
            </h2>
            <p className="mt-6 text-base leading-7 text-white/75">
              It&apos;s that simple. Your digital life shouldn&apos;t depend on
              someone else&apos;s server bill, subscription model, or terms of
              service.
            </p>
          </div>
        </div>
      </section>

      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className={WHAT_YOU_GET_WIDTH_CLASS}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-fd-primary">
              What We Believe
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Permanence should belong to people.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {BELIEFS.map((belief, index) => (
              <div
                key={belief.title}
                className="relative overflow-hidden rounded-2xl border border-fd-border/10 bg-fd-card p-6"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10" />
                <div className="relative">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-fd-primary/80">
                    0{index + 1}
                  </p>
                  <h3 className="text-2xl font-bold tracking-tight">
                    {belief.title}
                  </h3>
                  <p className="mt-3 text-base leading-7 text-fd-foreground/70">
                    {belief.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="mx-auto grid max-w-[1100px] gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-fd-border/10 bg-fd-card p-7 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built with the Community
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-fd-foreground/70">
              <p>
                ardrive is developed by Permanent Data Solutions, but it&apos;s
                shaped by a global community of contributors, builders, and
                believers in open, sovereign infrastructure.
              </p>
              <p>
                Everything we build is open source. We invite anyone to explore,
                contribute, fork, and remix. We believe the best software is
                built in the open and collaboratively.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-fd-border/10 bg-fd-card p-7 sm:p-10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A New Kind of Cloud
            </h2>
            <div className="mt-6 space-y-5 text-base leading-7 text-fd-foreground/70">
              <p>
                ardrive isn&apos;t just another Dropbox alternative. It&apos;s
                part of a larger shift toward a more permanent cloud, one
                that&apos;s censorship-resistant, user-owned, and universally
                accessible.
              </p>
              <p>
                We&apos;re building the tools to make permanence accessible,
                affordable, and intuitive, so no one has to rely on platforms
                that forget, fail, or vanish.
              </p>
            </div>
          </div>
        </div>
      </section>

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
              Join us in building a future that remembers.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">
              Permanent, private, user-owned storage for anyone ready to move
              beyond platforms that forget.
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
