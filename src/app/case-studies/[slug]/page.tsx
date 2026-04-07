import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { compileMDX } from "@/lib/mdx";
import { ArrowLeft } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { AdaptiveHero } from "@/components/adaptive-hero";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const ogImage = caseStudy.ogImage || caseStudy.heroImage || "/previews/general-og.jpg";

  return buildMetadata({
    title: caseStudy.title,
    description: caseStudy.description,
    canonical: `/case-studies/${slug}`,
    ogType: "article",
    ogImage,
    ogAlt: caseStudy.title,
    openGraphExtras: {
      publishedTime: caseStudy.date,
    },
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);

  if (!caseStudy) {
    notFound();
  }

  const { Content } = await compileMDX(caseStudy.content);

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
        {/* Back link */}
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-muted-foreground hover:text-fd-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-4" />
          Back to Case Studies
        </Link>

        <article>
          {/* Hero image */}
          {caseStudy.heroImage && (
            <AdaptiveHero
              src={caseStudy.heroImage}
              alt={caseStudy.title}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            {caseStudy.title}
          </h1>

          {/* Description */}
          {caseStudy.description && (
            <p className="text-xl text-fd-muted-foreground mb-8">
              {caseStudy.description}
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

