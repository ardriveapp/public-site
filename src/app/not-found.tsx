import Link from "next/link";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { buildMetadata } from "@/lib/metadata";
import { LegacyRedirector } from "@/components/redirects/LegacyRedirector";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  canonical: "/404",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "Page Not Found | ar.io",
});

export default function NotFoundPage() {
  return (
    <main className="bg-fd-background">
      <LegacyRedirector />
      <section className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center">
          <div
            className="w-full rounded-3xl border border-fd-border bg-fd-card p-8 text-center shadow-sm"
            style={{
              background:
                "radial-gradient(ellipse 140% 120% at top left, rgb(var(--color-fd-card)), rgb(84 39 200 / 0.03))",
            }}
          >
            <p className="text-sm font-semibold tracking-widest text-fd-muted-foreground">
              404
            </p>
            <h1
              className="mt-3 text-4xl font-bold tracking-tight text-fd-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Page not found
            </h1>
            <p className="mt-4 text-base leading-7 text-fd-muted-foreground">
              That link doesn’t go anywhere.
            </p>

            <div className="mt-8 flex justify-center">
              <div className="inline-flex overflow-hidden rounded-full border border-fd-border bg-fd-background/70 shadow-sm">
                <Link
                  href="/"
                  className="px-5 py-2 text-sm font-semibold hover:bg-fd-accent transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/contact"
                  className="border-l border-fd-border px-5 py-2 text-sm font-semibold hover:bg-fd-accent transition-colors"
                >
                  Contact Us
                </Link>
                <a
                  href="https://docs.ar.io"
                  target="_blank"
                  rel="noreferrer"
                  className="border-l border-fd-border px-5 py-2 text-sm font-semibold hover:bg-fd-accent transition-colors"
                >
                  Docs
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}