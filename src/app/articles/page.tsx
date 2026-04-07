import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import { buildMetadata } from "@/lib/metadata";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { BaseImage } from "@/components/base-image";

export const metadata = buildMetadata({
  title: "Articles — ArDrive",
  description:
    "Guides, tutorials, and insights on permanent storage, Arweave, and the permaweb ecosystem.",
  canonical: "/articles",
  ogImage: "/previews/general-og.jpg",
});

export default function ArticlesIndexPage() {
  const articles = getAllArticles();

  return (
    <main
      className={`${SITE_CONTAINER_CLASS} py-16`}
      style={{ minHeight: "60vh" }}
    >
      <div className="mb-12">
        <h1
          className="text-4xl font-extrabold sm:text-5xl"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
        >
          Articles
        </h1>
        <p className="mt-3 text-lg" style={{ color: "rgba(250,250,250,0.5)" }}>
          Guides, tutorials, and insights on permanent storage and the permaweb.
        </p>
      </div>

      {articles.length === 0 ? (
        <div
          className="rounded-2xl p-12 text-center"
          style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}
        >
          <p style={{ color: "rgba(250,250,250,0.4)" }}>No articles yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/articles/${article.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl transition-transform hover:scale-[1.02]"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(254,2,48,0.04) 100%)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              {/* Hero image */}
              {article.heroImage && (
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-fd-card">
                  <BaseImage
                    src={article.heroImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                {/* Tag */}
                {article.tags && article.tags.length > 0 && (
                  <span
                    className="mb-2 text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "rgba(254,2,48,0.7)" }}
                  >
                    {article.tags[0]}
                  </span>
                )}

                <h2
                  className="text-base font-bold leading-snug line-clamp-2 group-hover:text-fd-primary transition-colors"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 700 }}
                >
                  {article.title}
                </h2>

                {article.date && (
                  <p
                    className="mt-auto pt-4 text-xs"
                    style={{ color: "rgba(250,250,250,0.3)" }}
                  >
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
