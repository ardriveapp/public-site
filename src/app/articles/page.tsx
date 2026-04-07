import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/metadata";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { AdaptiveCardImage } from "@/components/adaptive-card-image";

export const metadata = buildMetadata({
  title: "ar.io Articles - News, Updates & Technical Insights",
  description:
    "Stay up to date with ar.io news, product updates, and technical insights on permanent decentralized storage, gateways, and the permaweb ecosystem.",
  canonical: "/articles",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Articles | News & Updates",
});

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <main className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Articles</h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            News, updates, and insights from the ar.io team.
          </p>
        </div>

        {articles.length === 0 ? (
          <div className="rounded-2xl border border-fd-border bg-fd-card p-12 text-center">
            <p className="text-fd-muted-foreground">
              No articles yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
                }}
              >
                <Link href={`/articles/${article.slug}`} className="block">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/18" />
                  {article.heroImage && (
                    <div className="relative w-full overflow-hidden bg-fd-background/40 aspect-[16/9]">
                      <AdaptiveCardImage
                        src={article.heroImage}
                        alt={article.title}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="absolute inset-0"
                      />
                    </div>
                  )}
                  <div className="relative p-6">
                    <h2 className="text-xl font-semibold tracking-tight line-clamp-2 group-hover:text-fd-primary transition-colors">
                      {article.title}
                    </h2>
                    {article.description && (
                      <p className="mt-2 text-sm text-fd-muted-foreground line-clamp-3">
                        {article.description}
                      </p>
                    )}
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
    </main>
  );
}

