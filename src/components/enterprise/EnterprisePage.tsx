import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const SERVICES = [
  {
    title: "Expert Technical Support",
    desc: "Gain direct access to our technical team and robust development tools to maximize your project's potential.",
  },
  {
    title: "Premium Onboarding Services",
    desc: "Enjoy white-glove assistance with uploading, setup, and ongoing support to ensure a smooth experience.",
  },
  {
    title: "Scalable Data Storage",
    desc: "Leverage a high-performance, decentralized data infrastructure, designed to grow with you effortlessly.",
  },
];

export function EnterprisePage() {
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
            Enterprise Services
          </p>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Never lose your{" "}
            <span className="text-fd-primary">data again.</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            Securely save, manage and share photos, files and documents — by leveraging
            the power of a permanent blockchain.
          </p>
          <div className="mt-8">
            <a
              href="mailto:hey@ardrive.io"
              className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-7 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section
        className="px-4 py-20"
        style={{ background: "radial-gradient(55% 40% at 50% 60%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <div className="grid gap-5 sm:grid-cols-3">
            {SERVICES.map((s, i) => (
              <div
                key={s.title}
                className="rounded-2xl p-7"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "rgba(254,2,48,0.6)" }}
                >
                  0{i + 1}
                </div>
                <h2
                  className="text-xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {s.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(250,250,250,0.55)" }}>
                  {s.desc}
                </p>
              </div>
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
            Permanent, private, and powerful.
          </h2>
          <p className="relative z-10 mt-3 opacity-75 max-w-sm mx-auto">
            Enterprise-grade permanent storage for teams that can&apos;t afford to lose data.
          </p>
          <a href="mailto:hey@ardrive.io" className="relative z-10 mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity">
            Get in Touch
          </a>
        </div>
      </section>

    </main>
  );
}
