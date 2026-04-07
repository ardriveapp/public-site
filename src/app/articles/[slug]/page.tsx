import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { compileMDX } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { getArticleSchema } from "@/lib/json-ld";
import { ContactUsButton } from "@/components/mdx/ContactUsButton";
import { BaseImage } from "@/components/base-image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return { title: "Article Not Found" };

  const ogImage = article.ogImage || article.heroImage || "/previews/general-og.jpg";

  return buildMetadata({
    title: article.title,
    description: article.description,
    canonical: `/articles/${slug}`,
    ogType: "article",
    ogImage,
    ogAlt: article.title,
    openGraphExtras: {
      publishedTime: article.date,
      authors: article.authors,
    },
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const { Content } = await compileMDX(article.content, { ContactUsButton });

  const articleSchema = getArticleSchema({
    title: article.title,
    description: article.description,
    date: article.date,
    heroImage: article.heroImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <main
        className="min-h-screen px-4 py-16"
        style={{ background: "#080808" }}
      >
        <div className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors hover:text-fd-primary"
            style={{ color: "rgba(250,250,250,0.4)" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All Articles
          </Link>

          <article>
            {/* Tag */}
            {article.tags && article.tags.length > 0 && (
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(254,2,48,0.7)" }}
              >
                {article.tags[0]}
              </p>
            )}

            {/* Title */}
            <h1
              className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
            >
              {article.title}
            </h1>

            {/* Date */}
            {article.date && (
              <p
                className="mt-4 text-sm"
                style={{ color: "rgba(250,250,250,0.35)" }}
              >
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}

            {/* Hero image */}
            {article.heroImage && (
              <div className="mt-8 overflow-hidden rounded-2xl">
                <BaseImage
                  src={article.heroImage}
                  alt={article.title}
                  width={900}
                  height={506}
                  className="w-full object-cover"
                  priority
                  unoptimized
                />
              </div>
            )}

            {/* Content */}
            <div className="prose mt-10 max-w-none">
              <Content />
            </div>
          </article>

          {/* Footer nav */}
          <div
            className="mt-16 pt-8"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-fd-primary"
              style={{ color: "rgba(250,250,250,0.4)" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
