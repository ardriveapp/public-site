import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getHelpArticle, getHelpSlugs } from "@/lib/help";
import { compileMDX } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { YouTubeEmbed } from "@/components/help/YouTubeEmbed";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getHelpSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getHelpArticle(slug);

  if (!article) return { title: "Help article not found" };

  return buildMetadata({
    title: `${article.title} — Help`,
    description: article.description || article.title,
    canonical: `/help/${slug}`,
    ogImage: "/previews/general-og.jpg",
  });
}

export default async function HelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getHelpArticle(slug);

  if (!article) notFound();

  const { Content } = await compileMDX(article.content, { YouTubeEmbed });

  return (
    <main className="min-h-screen px-4 py-16" style={{ background: "#080808" }}>
      <div className={`${SITE_CONTAINER_CLASS} mx-auto max-w-3xl`}>
        {/* Breadcrumb */}
        <nav className="mb-10 flex items-center gap-1.5 text-sm flex-wrap" style={{ color: "rgba(250,250,250,0.35)" }}>
          <Link href="/help" className="transition-colors hover:text-fd-primary">Help</Link>
          {article.category && (
            <>
              <span>/</span>
              <span>{article.category}</span>
            </>
          )}
          {article.section && (
            <>
              <span>/</span>
              <span>{article.section}</span>
            </>
          )}
        </nav>

        <article>

          <h1
            className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
          >
            {article.title}
          </h1>

          <div className="prose mt-10 max-w-none">
            <Content />
          </div>
        </article>

        <div className="mt-16 border-t border-fd-border/10 pt-8">
          <Link
            href="/help"
            className="inline-flex items-center gap-2 text-sm font-medium text-fd-foreground/40 transition-colors hover:text-fd-primary"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to help home
          </Link>
        </div>
      </div>
    </main>
  );
}
