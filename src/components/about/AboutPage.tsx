import { BaseImage } from "@/components/base-image";
import { AboutHeroBackgroundVideo } from "@/components/about/AboutHeroBackgroundVideo";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export function AboutPage() {
  return (
    <main
      style={{
        // Top 1/3: white, middle 1/3: transition, bottom 1/3: solid lavender (matches design reference)
        background:
          "linear-gradient(to bottom, rgb(var(--color-fd-background)) 0%, rgb(var(--color-fd-background)) 33%, rgb(223 214 247) 66%, rgb(223 214 247) 100%)",
      }}
    >
      {/* Hero Section */}
      <section className="pb-12 pt-10">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-fd-card lg:aspect-[2/1]">
            {/* Background (static on small screens, video on large screens) */}
            <BaseImage
              src="/about/hero-clouds.jpg"
              alt=""
              fill
              priority
              className="object-cover lg:hidden"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
            {/* Mobile-only zero balloon artwork overlay */}
            <BaseImage
              src="/about/hero-zero-balloon.png"
              alt=""
              aria-hidden="true"
              fill
              className="pointer-events-none object-contain object-right-bottom opacity-95 md:hidden translate-x-8 translate-y-8"
              sizes="(max-width: 767px) 100vw, 0vw"
              priority={false}
            />
            <AboutHeroBackgroundVideo className="absolute inset-0 hidden h-full w-full object-cover lg:block" />
            {/* Light overlay for text readability - full on mobile, gradient on desktop */}
            <div className="absolute inset-0 bg-fd-background/70 lg:hidden" />
            <div
              className="absolute inset-0 hidden lg:block"
              style={{
                background: "linear-gradient(to right, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.7) 35%, rgba(255,255,255,0) 65%)",
              }}
            />

            <div className="relative grid gap-10 px-8 py-14 md:px-14 md:py-16 lg:py-20 lg:grid-cols-2 lg:items-center">
              <div className="min-w-0">
                <h1 className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  Zero worry.
                </h1>

                <p className="mt-3 max-w-xl text-pretty text-base leading-7 text-fd-muted-foreground">
                  Providing permanent access to data that matters is our mission. We exist to ensure that the data society relies on remains accessible, trustworthy, and usable over time — even as everything around it changes.
                </p>

                <ul className="mt-6 space-y-3 text-sm text-fd-muted-foreground">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      Pay once, store forever
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      Right to access above all
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex size-5 shrink-0 items-center justify-center rounded bg-fd-foreground">
                      <BaseImage
                        src="/icons/checkbox.svg"
                        alt=""
                        aria-hidden="true"
                        width={16}
                        height={16}
                        className="size-4"
                      />
                    </span>
                    <span className="font-semibold text-fd-foreground/90">
                      Open and verifiable
                    </span>
                  </li>
                </ul>
              </div>

              {/* Empty right column to preserve spacing vs the balloon artwork */}
              <div className="hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Body Text Sections */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="max-w-[900px] px-4 md:pl-16 md:pr-0">
          <h2 className="text-5xl font-bold tracking-tight text-fd-foreground mb-6">
            What we do
          </h2>
          <div className="space-y-6 text-base leading-7 text-fd-muted-foreground">
            <p>
              Ar.io is a data infrastructure solution for long-term access. We help enterprises, institutions, and platforms ensure that critical information remains accessible, verifiable, and intact over time — even as systems, providers, technologies, or attacks disrupt the environments around them.
            </p>
            <p>
              Our infrastructure is designed for data that must outlast outages, migrations, vendor changes, and product cycles, without relying on recurring subscriptions or centralized points of failure.
            </p>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-fd-foreground mt-12 mb-4">
            The Challenge
          </h3>
          <div className="space-y-6 text-base leading-7 text-fd-muted-foreground">
            <p>
              Modern digital systems are powerful, yet increasingly fragile over time. Traditional cloud storage and backup solutions are optimized for availability today, not certainty over time.
            </p>
            <p>
              Most data loss does not occur because data is destroyed. It happens because access to otherwise intact data is lost — due to outages, ransomware, infrastructure changes, contract terms, or service shutdowns. As systems grow more complex and interdependent, access risk quietly accumulates.
            </p>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-fd-foreground mt-12 mb-4">
            The Solution
          </h3>
          <div className="space-y-6 text-base leading-7 text-fd-muted-foreground">
            <p>
              Ar.io is designed to separate data access from infrastructure dependency.
              <br />
              By storing data in a decentralized and permanent way, we reduce reliance on individual vendors, contracts, and systems — while maintaining enterprise-grade access and usability. This allows organizations to plan for change without putting long-term access at risk.
              <br />
              Our focus is not on replacing existing systems, but on providing a durable foundation beneath them.
            </p>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-fd-foreground mt-12 mb-4">
            Why It Matters
          </h3>
          <div className="space-y-6 text-base leading-7 text-fd-muted-foreground">
            <p>
              Digital data underpins how society functions.
            </p>
            <p>
              Information now drives financial systems, healthcare, public services, individual safety, personal identity and automated decision-making. At the same time, advances in AI, analytics, and automation amplify the consequences of data failure — whether through loss of access, loss of integrity, or loss of trust.
            </p>
            <p>
              Ensuring that essential data remains accessible and trustworthy over time is no longer just a technical concern. It is an operational and societal responsibility.
            </p>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-fd-foreground mt-12 mb-4">
            Stewardship
          </h3>
          <div className="space-y-6 text-base leading-7 text-fd-muted-foreground">
            <p>
              Long-term infrastructure requires long-term thinking.
              <br />
              We approach data storage as a form of stewardship, designing systems that remain dependable across technological change, organizational transitions, and evolving requirements. Our work emphasizes durability, transparency, and accountability above all.
            </p>
            <p>
              <b>Ar.io exists to help ensure that the data society relies on remains accessible, trustworthy, and usable — not just today, but over time.</b>
            </p>
          </div>
        </div>
      </section>

      {/* Organization Cards Section */}
      <section className={`${SITE_CONTAINER_CLASS} py-10`}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Foundation Card */}
          <div
            className="group relative overflow-hidden rounded-3xl border border-fd-border bg-fd-card p-6 shadow-sm sm:p-8"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 72%, rgb(223 214 247 / 0.30) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <BaseImage
                src="/brand/ario-black.svg"
                alt="ar.io Foundation"
                width={64}
                height={64}
                className="object-contain"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-fd-foreground">
                    ar.io Foundation
                  </h3>
                  <span className="text-sm text-fd-foreground/70">
                    Non-profit organization
                  </span>
                </div>

                <div className="mt-5 space-y-4 text-left">
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    The ar.io Foundation is a Netherlands-based non-profit organization that supports the long-term health and growth of the ar.io Network and its token ecosystem. It focuses on stewardship rather than control, working to ensure the network remains secure, resilient, and accessible.
                  </p>
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    The Foundation supports the ecosystem through grants, investments, core software development, education, outreach, and partnerships. It helps fund research and community-led projects, guides core development in line with the community&apos;s direction, and encourages collaboration across the network.
                  </p>
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    Its guiding approach emphasizes transparency, inclusion, and progress, with the goal of enabling sustainable adoption while preserving the network&apos;s open and decentralized nature.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PDS Card */}
          <div
            className="group relative overflow-hidden rounded-3xl border border-fd-border bg-fd-card p-6 shadow-sm sm:p-8"
            style={{
              background:
                "linear-gradient(to bottom right, rgb(var(--color-fd-card)) 0%, rgb(var(--color-fd-card)) 72%, rgb(223 214 247 / 0.30) 100%)",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
              <BaseImage
                src="/ecosystem-logos/logo-pds.png"
                alt="Permanent Data Solutions"
                width={64}
                height={64}
                className="rounded-lg object-contain"
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1">
                  <a
                    href="https://pds.inc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-fd-foreground hover:text-fd-primary transition-colors"
                  >
                    Permanent Data Solutions (PDS)
                  </a>
                  <a
                    href="https://pds.inc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-fd-foreground/70 hover:text-fd-primary transition-colors w-fit"
                  >
                    https://pds.inc
                  </a>
                </div>

                <div className="mt-5 space-y-4 text-left">
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    Permanent Data Solutions is a U.S.-based software and infrastructure company focused on building and operating core tooling for the permanent web. It develops and maintains production-grade software used across the Arweave and ar.io ecosystems, with a focus on reliability, performance, and long-term operation.
                  </p>
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    PDS designs and runs critical infrastructure, including gateway software, developer tooling, and network services that support indexing, retrieval, and high-availability access to permanent data. Alongside software development, it provides infrastructure hosting that helps applications and users interact with permanent storage at scale.
                  </p>
                  <p className="text-base leading-7 text-fd-muted-foreground">
                    <strong className="text-fd-foreground">Headquarters:</strong>
                    <br />
                    377 Valley Rd, Unit #2538
                    <br />
                    Clifton, NJ 07013
                    <br />
                    United States
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Version */}
      <div className="pb-8 text-center">
        <span className="text-sm text-fd-muted-foreground/60">
          v{process.env.NEXT_PUBLIC_APP_VERSION}
        </span>
      </div>
    </main>
  );
}

