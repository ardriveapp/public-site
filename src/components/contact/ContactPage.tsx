import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const CHANNELS = [
  {
    title: "Developer Docs",
    desc: "Guidance for integrating, using and building on ArDrive.",
    cta: { label: "Visit Docs", href: "https://docs.ardrive.io" },
  },
  {
    title: "Developer Support",
    desc: "Reach out to our technical team via Discord.",
    cta: { label: "Join Discord", href: "https://discord.gg/ardrive" },
  },
  {
    title: "Get in Touch",
    desc: "Reach out to the ArDrive team directly.",
    cta: { label: "hey@ardrive.io", href: "mailto:hey@ardrive.io" },
  },
  {
    title: "Share Your Feedback",
    desc: "Fill out our quick feedback form and help make ArDrive even better.",
    cta: { label: "Give Feedback", href: "https://ardrive.io/feedback" },
  },
];

export function ContactPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="px-4 pt-20 pb-16 text-center"
        style={{ background: "radial-gradient(60% 50% at 50% 60%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <h1
            className="text-5xl sm:text-6xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            <span className="text-fd-primary">Contact</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            Have you run into an issue and need some support?
          </p>
        </div>
      </section>

      {/* ── Channels ── */}
      <section className="px-4 py-16">
        <div className={`${SITE_CONTAINER_CLASS} max-w-3xl mx-auto`}>
          <div className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl p-6 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {c.title}
                </h2>
                <p className="mt-2 text-sm flex-1" style={{ color: "rgba(250,250,250,0.5)" }}>
                  {c.desc}
                </p>
                <div className="mt-5">
                  <a
                    href={c.cta.href}
                    target={c.cta.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.cta.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  >
                    {c.cta.label}
                  </a>
                </div>
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
          <p className="relative z-10 mt-3 opacity-75">ArDrive — Pay once. Store forever.</p>
          <a href="https://app.ardrive.io" className="relative z-10 mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity">
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
}
