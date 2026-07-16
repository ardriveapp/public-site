import type { LucideIcon } from "lucide-react";
import { BookOpen, Code, Mail } from "lucide-react";
import { FINAL_CTA_WIDTH_CLASS, SITE_CONTAINER_CLASS } from "@/components/site-container";
import { EmailSupportButton } from "@/components/contact/EmailSupportButton";

const CHANNELS: {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: { label: string; href: string };
  email?: boolean;
}[] = [
  {
    icon: BookOpen,
    title: "Developer Docs",
    desc: "Guidance for integrating, using and building on ArDrive.",
    cta: { label: "View docs", href: "https://docs.ar.io/build" },
  },
  {
    icon: Code,
    title: "Developer Support",
    desc: "Reach out to our technical team via Discord.",
    cta: { label: "Join Discord", href: "https://discord.com/invite/ya4hf2H" },
  },
  {
    icon: Mail,
    title: "Get in Touch",
    desc: "Reach out to support@ardrive.io",
    cta: { label: "Email us", href: "mailto:support@ardrive.io" },
    email: true,
  },
];

export function ContactPage() {
  return (
    <main style={{ backgroundColor: "#080808", color: "#FAFAFA" }}>

      {/* ── Hero ── */}
      <section
        className="px-4 pt-20 pb-12 text-center"
        style={{
          background:
            "radial-gradient(70% 55% at 15% 35%, rgba(46, 5, 8, 0.85) 0%, transparent 55%), radial-gradient(60% 50% at 50% 80%, #080808 0%, #080808 100%)",
        }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <h1
            className="text-5xl sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Contact
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-base sm:text-lg leading-relaxed" style={{ color: "rgba(250,250,250,0.55)" }}>
            Have you run into an issue and need some support?
          </p>
        </div>
      </section>

      {/* ── Channels ── */}
      <section className="px-4 pb-20">
        <div className={`${SITE_CONTAINER_CLASS} max-w-5xl mx-auto`}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {CHANNELS.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="group flex h-full flex-col items-center rounded-2xl p-8 text-center transition-colors"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 0 0 1px rgba(254,2,48,0.04)",
                  }}
                >
                  <div
                    className="mb-5 flex size-14 shrink-0 items-center justify-center rounded-xl border border-fd-primary/45 bg-fd-background/80 text-fd-foreground transition-colors group-hover:border-fd-primary/70"
                    aria-hidden
                  >
                    <Icon className="size-7 stroke-[1.5]" />
                  </div>
                  <h2
                    className="text-lg font-bold tracking-tight sm:text-xl"
                    style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                  >
                    {c.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed sm:text-[0.9375rem]" style={{ color: "rgba(250,250,250,0.5)" }}>
                    {c.desc}
                  </p>
                  {c.email ? (
                    <EmailSupportButton />
                  ) : (
                    <a
                      href={c.cta.href}
                      target={c.cta.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.cta.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-8 inline-flex items-center justify-center rounded-full bg-fd-primary px-8 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      {c.cta.label}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Red blob CTA ── */}
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
            ArDrive — Pay once. Store forever.
          </p>
          <a
            href="https://app.ardrive.io"
            className="relative z-10 mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold text-fd-primary transition-opacity hover:opacity-90"
          >
            Get Started
          </a>
        </div>
      </section>

    </main>
  );
}
