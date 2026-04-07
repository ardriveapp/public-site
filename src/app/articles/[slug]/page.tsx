import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticle, getArticleSlugs } from "@/lib/articles";
import { compileMDX } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getArticleSchema } from "@/lib/json-ld";
import { ContactUsButton } from "@/components/mdx/ContactUsButton";
import { AdaptiveHero } from "@/components/adaptive-hero";

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

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

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

  if (!article) {
    notFound();
  }

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
      <main className="mx-auto max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Articles
        </Link>

        <article>
          {/* Hero image */}
          {article.heroImage && (
            <AdaptiveHero
              src={article.heroImage}
              alt={article.title}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          )}

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-fd-primary/10 px-3 py-1 text-xs font-medium text-fd-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {article.title}
          </h1>

          {/* Authors */}
          {article.authors && article.authors.length > 0 && article.authors.filter(Boolean).length > 0 && (
            <div className="text-sm text-fd-muted-foreground mb-4">
              By {article.authors.filter(Boolean).join(", ")}
            </div>
          )}

          {/* Description */}
          {article.description && (
            <p className="text-xl text-fd-muted-foreground mb-8">
              {article.description}
            </p>
          )}

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Content />
          </div>
        </article>
      </main>
    </>
  );
}

