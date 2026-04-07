import { getAllHelpArticles } from "@/lib/help";
import { buildMetadata } from "@/lib/metadata";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { HelpIndex } from "@/components/help/HelpIndex";

export const metadata = buildMetadata({
  title: "Help — ArDrive",
  description:
    "Product guides, FAQs, and troubleshooting for ArDrive apps, wallets, uploads, and the permaweb.",
  canonical: "/help",
  ogImage: "/previews/general-og.jpg",
});

export default function HelpIndexPage() {
  const articles = getAllHelpArticles();

  return (
    <main style={{ background: "#080808", minHeight: "60vh" }}>
      <section
        className="px-4 pt-16 pb-10"
        style={{
          background: "radial-gradient(60% 50% at 50% 0%, rgba(46,5,8,0.7) 0%, transparent 100%)",
        }}
      >
        <div className={SITE_CONTAINER_CLASS}>
          <h1
            className="text-4xl font-extrabold sm:text-5xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            Help &amp; <span className="text-fd-primary">how-tos</span>
          </h1>
          <p className="mt-3 max-w-2xl text-lg" style={{ color: "rgba(250,250,250,0.5)" }}>
            Product guides, FAQs, and troubleshooting for ArDrive apps and the permaweb.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 pt-2">
        <div className={SITE_CONTAINER_CLASS}>
          <HelpIndex articles={articles} />
        </div>
      </section>
    </main>
  );
}
