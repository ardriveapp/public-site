import Link from "next/link";
import { getAllHelpArticles } from "@/lib/help";
import { buildMetadata } from "@/lib/metadata";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export const metadata = buildMetadata({
  title: "Help — ArDrive",
  description:
    "Product guides, FAQs, and troubleshooting for ArDrive apps, wallets, uploads, and the permaweb.",
  canonical: "/help",
  ogImage: "/previews/general-og.jpg",
});

export default function HelpIndexPage() {
  const articles = getAllHelpArticles();

  const byCategory = articles.reduce<Record<string, typeof articles>>((acc, a) => {
    const key = a.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(a);
    return acc;
  }, {});

  const categoryKeys = Object.keys(byCategory).sort((a, b) => a.localeCompare(b));

  return (
    <main
      className={`${SITE_CONTAINER_CLASS} py-16`}
      style={{ minHeight: "60vh", background: "#080808" }}
    >
      <div className="mb-12">
        <h1
          className="text-4xl font-extrabold sm:text-5xl"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
        >
          Help <span className="text-fd-primary">&amp; how-tos</span>
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-fd-foreground/55">
          Product guides, FAQs, and troubleshooting for ArDrive apps and the permaweb.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="rounded-2xl border border-fd-border/10 bg-fd-card/40 p-12 text-center">
          <p className="text-fd-muted-foreground">No help articles yet.</p>
        </div>
      ) : (
        <div className="space-y-14">
          {categoryKeys.map((category) => (
            <section key={category}>
              <h2
                className="mb-6 text-xl font-bold text-fd-foreground sm:text-2xl"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
              >
                {category}
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {byCategory[category].map((article) => (
                  <Link
                    key={article.slug}
                    href={`/help/${article.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-fd-border/10 p-5 transition-colors hover:border-fd-primary/25"
                    style={{
                      background:
                        "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(30 10 15))",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/10 opacity-80 transition-opacity group-hover:opacity-100" />
                    <div className="relative">
                      {article.section ? (
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-fd-primary/80">
                          {article.section}
                        </p>
                      ) : null}
                      <h3
                        className="text-base font-bold leading-snug text-fd-foreground group-hover:text-fd-foreground"
                        style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                      >
                        {article.title}
                      </h3>
                      {article.description ? (
                        <p className="mt-2 line-clamp-2 text-sm text-fd-foreground/50">{article.description}</p>
                      ) : null}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
