import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLegalDocument, getLegalSlugs } from "@/lib/legal";
import { compileMDX } from "@/lib/mdx";
import { ArrowLeft, Calendar } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getLegalSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    return {
      title: "Legal Document Not Found",
    };
  }

  return buildMetadata({
    title: document.title,
    description: document.description,
    canonical: `/legal/${slug}`,
    ogType: "article",
    ogImage: "/previews/general-og.jpg",
    ogAlt: document.title,
    twitterCard: "summary",
    openGraphExtras: {
      publishedTime: document.date,
    },
  });
}

function formatDate(dateString: string): string {
  if (!dateString) return "";
  // Parse YYYY-MM-DD and create date in local timezone to avoid UTC conversion
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day); // month is 0-indexed
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function LegalPage({ params }: PageProps) {
  const { slug } = await params;
  const document = getLegalDocument(slug);

  if (!document) {
    notFound();
  }

  const { Content } = await compileMDX(document.content);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      <article>
        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-fd-muted-foreground mb-4">
          {document.date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="size-4" />
              Last Updated: {formatDate(document.date)}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          {document.title}
        </h1>

        {/* Description */}
        {document.description && (
          <p className="text-xl text-fd-muted-foreground mb-8">
            {document.description}
          </p>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Content />
        </div>
      </article>
    </main>
  );
}

