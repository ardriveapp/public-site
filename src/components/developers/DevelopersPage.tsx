import { FINAL_CTA_WIDTH_CLASS, SITE_CONTAINER_CLASS } from "@/components/site-container";

const TOOLS = [
  {
    tag: "Protocol",
    name: "ArFS",
    full: "Arweave File System",
    desc: "ArFS is a data modeling, storage, and retrieval protocol designed to emulate common file system operations and provide aspects of mutability to your data hierarchy on Arweave's permanent, immutable blockweave. It gives you the power of a file system with total control over the privacy of your data.",
    cta: { label: "See ArFS Docs", href: "https://docs.ar.io/build/advanced/arfs" },
  },
  {
    tag: "SDK + Bundler",
    name: "Turbo",
    full: "Bundler and SDK",
    desc: "The first open source bundler for the Arweave ecosystem. Turbo has been designed and built for enterprise-level scale and security, trusted by Meta for their uploads to Arweave. Turbo SDK brings programmable fiat top-ups, upload reliability, and fast data indexing finality.",
    bullets: [
      "Seeking to leverage a FIAT payment option for bundling services",
      "Building a front-end app to reliably send data to Arweave",
      "Building a back-end system that stores or backs up data to Arweave",
    ],
    cta: { label: "Build with Turbo", href: "https://docs.ar.io/build/upload/bundling-services#what-is-turbo" },
    secondaryCta: { label: "Learn More", href: "https://docs.ar.io" },
  },
  {
    tag: "Naming",
    name: "ArNS domains",
    full: "Human-readable permaweb URLs",
    desc: "ArNS gives permanent data, apps, and pages memorable names instead of raw transaction IDs. Point a friendly domain to Arweave data, update where it resolves as your project evolves, and make permanent links easier for people and applications to share.",
    bullets: [
      "Publishing a permanent app or website with a readable URL",
      "Keeping stable links while updating the underlying transaction ID",
      "Creating shareable entry points for public ArDrive data",
    ],
    cta: { label: "Explore ArNS", href: "https://docs.ar.io/build/access/arns" },
    secondaryCta: { label: "Register a Name", href: "https://arns.ar.io" },
  },
  {
    tag: "Retrieval",
    name: "Access flexibility",
    full: "Gateway routing and verification",
    desc: "Build retrieval flows that are not tied to a single gateway. ar.io gateway discovery and Wayfinder help route requests across the network, fail over when needed, and verify data integrity for production applications.",
    bullets: [
      "Routing reads through trusted, network, or static gateway providers",
      "Adding failover and retries for more resilient data access",
      "Verifying responses when your app needs stronger guarantees",
    ],
    cta: { label: "Use Wayfinder", href: "https://docs.ar.io/build/access/wayfinder" },
    secondaryCta: { label: "Learn Gateways", href: "https://docs.ar.io/learn/gateways/gateway-registry" },
  },
  {
    tag: "CLI",
    name: "ardrive-cli",
    full: "Command Line Interface",
    desc: "Power users and DevOps teams: streamline file management and automate ArDrive operations with the ArDrive Command Line Interface. Full scripting support for uploads, downloads, drive management, and more.",
    cta: { label: "View on GitHub", href: "https://github.com/ardriveapp/ardrive-cli" },
  },
];

export function DevelopersPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="px-4 pt-20 pb-20 text-center"
        style={{ background: "radial-gradient(60% 50% at 50% 60%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "rgba(254,2,48,0.7)" }}
          >
            For Developers
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Powering the{" "}
            <span className="text-fd-primary">permanent cloud.</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            Store, organize, and access your data through APIs, SDKs, and developer tools
            that make permanent storage as simple as familiar cloud workflows.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.ar.io"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              See Docs
            </a>
            <a
              href="https://github.com/ardriveapp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(250,250,250,0.8)" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── Platform overview ── */}
      <section className="px-4 py-6">
        <div className={SITE_CONTAINER_CLASS}>
          <div
            className="rounded-2xl p-6 text-center"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-base" style={{ color: "rgba(250,250,250,0.6)" }}>
              <span className="font-bold text-fd-foreground">Cloud storage, on roids.</span>
              {" "}A web3 platform of open-source apps, developer tools, and libraries.
            </p>
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="flex flex-col gap-6">
            {TOOLS.map((tool, i) => (
              <div
                key={tool.name}
                className="rounded-2xl p-8"
                style={{
                  background: i % 2 === 0
                    ? "radial-gradient(80% 60% at 0% 50%, rgba(46,5,8,0.6) 0%, rgba(255,255,255,0.03) 100%)"
                    : "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
                  <div className="lg:w-64 shrink-0">
                    <p
                      className="text-xs font-semibold uppercase tracking-widest mb-1"
                      style={{ color: "rgba(254,2,48,0.6)" }}
                    >
                      {tool.tag}
                    </p>
                    <h2
                      className="text-3xl font-extrabold"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
                    >
                      {tool.name}
                    </h2>
                    <p className="text-sm mt-1" style={{ color: "rgba(250,250,250,0.4)" }}>
                      {tool.full}
                    </p>
                  </div>
                  <div className="flex-1">
                    <p className="text-base leading-relaxed" style={{ color: "rgba(250,250,250,0.65)" }}>
                      {tool.desc}
                    </p>
                    {tool.bullets && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {tool.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "rgba(250,250,250,0.55)" }}>
                            <span className="text-fd-primary mt-0.5 shrink-0">→</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a
                        href={tool.cta.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                      >
                        {tool.cta.label}
                      </a>
                      {tool.secondaryCta && (
                        <a
                          href={tool.secondaryCta.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/5"
                          style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(250,250,250,0.7)" }}
                        >
                          {tool.secondaryCta.label}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Red blob CTA (fd-primary / #D31721) ── */}
      <section className="px-4 py-12" style={{ background: "#080808" }}>
        <div
          className={`${FINAL_CTA_WIDTH_CLASS} relative overflow-hidden rounded-[2.5rem] border border-white/15 bg-fd-primary px-6 py-14 text-center text-white shadow-2xl shadow-black/35 sm:px-10 sm:py-16 lg:px-12 lg:py-20`}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[45%] opacity-35"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(75% 55% at 50% 100%, rgba(255,255,255,0.22) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: "url(/home/texture-noise.png)", backgroundSize: "200px" }}
          />

          <h2
            className="relative z-10 mx-auto max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Permanent, private, and powerful.
          </h2>
          <p className="relative z-10 mx-auto mt-5 max-w-md text-base leading-relaxed text-white/85">
            Open-source tools to build on the permanent web.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.ar.io"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity"
            >
              View Docs
            </a>
            <a
              href="https://github.com/ardriveapp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-8 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
