import { SITE_CONTAINER_CLASS } from "@/components/site-container";

const PLATFORMS = [
  {
    num: "01",
    name: "ArDrive Web",
    desc: "Securely upload, access, and manage your multimedia files via your favorite web browser.",
    cta: { label: "Launch app", href: "https://app.ardrive.io" },
    available: true,
  },
  {
    num: "02",
    name: "ArDrive Android",
    desc: "Take your files on the go — download ArDrive for Android and access your data anytime, anywhere.",
    cta: { label: "Get on Android", href: "https://play.google.com/store/apps/details?id=io.ardrive.app" },
    available: true,
  },
  {
    num: "03",
    name: "ArDrive iOS",
    desc: "Decentralized storage on your iPhone via the iOS app.",
    cta: { label: "Coming soon", href: "#" },
    available: false,
  },
  {
    num: "04",
    name: "ArDrive CLI",
    desc: "Power users, meet your match — streamline file management with the ArDrive Command Line Interface.",
    cta: { label: "View on GitHub", href: "https://github.com/ardriveapp/ardrive-cli" },
    available: true,
  },
];

export function StartPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="px-4 pt-20 pb-16 text-center"
        style={{ background: "radial-gradient(60% 50% at 50% 60%, #2e0508 0%, #080808 100%)" }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Get{" "}
            <span className="text-fd-primary">Started.</span>
          </h1>
          <p className="mt-5 max-w-lg mx-auto text-lg" style={{ color: "rgba(250,250,250,0.55)" }}>
            ArDrive gives you permanent control of your data. Our login process is different
            than other storage apps — in the end, you&apos;ll totally own your data and we
            won&apos;t even have your password.
          </p>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="px-4 py-16">
        <div className={SITE_CONTAINER_CLASS}>
          <div className="grid gap-5 sm:grid-cols-2">
            {PLATFORMS.map((p) => (
              <div
                key={p.num}
                className="rounded-2xl p-7 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  opacity: p.available ? 1 : 0.5,
                }}
              >
                <span
                  className="text-5xl font-extrabold leading-none mb-4"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "rgba(254,2,48,0.2)" }}
                >
                  {p.num}
                </span>
                <h2
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {p.name}
                </h2>
                <p className="mt-2 text-sm flex-1" style={{ color: "rgba(250,250,250,0.55)" }}>
                  {p.desc}
                </p>
                <div className="mt-6">
                  {p.available ? (
                    <a
                      href={p.cta.href}
                      target={p.cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={p.cta.href.startsWith("http") ? "noreferrer" : undefined}
                      className="inline-flex items-center gap-2 rounded-full bg-fd-primary px-5 py-2 text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    >
                      {p.cta.label}
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold"
                      style={{ background: "rgba(255,255,255,0.06)", color: "rgba(250,250,250,0.4)" }}
                    >
                      {p.cta.label}
                    </span>
                  )}
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
          <p className="relative z-10 mt-3 opacity-75 max-w-sm mx-auto">
            Your data. Your keys. Forever.
          </p>
          <a href="https://app.ardrive.io" className="relative z-10 mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary hover:opacity-90 transition-opacity">
            Launch App
          </a>
        </div>
      </section>

    </main>
  );
}
