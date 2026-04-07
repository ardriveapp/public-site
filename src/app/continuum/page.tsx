import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContinuumDoc } from "@/lib/continuum";
import { compileMDX } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";
import { ContinuumTOC } from "@/components/continuum/continuum-toc";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export async function generateMetadata(): Promise<Metadata> {
  const doc = getContinuumDoc();

  if (!doc) {
    return {
      title: "Continuum Framework",
    };
  }

  return buildMetadata({
    title: doc.title,
    description: doc.description || "An Ar.io Digital Preservation Initiative",
    canonical: "/continuum/",
    ogImage: "/previews/general-og.jpg",
  });
}

export default async function ContinuumPage() {
  const doc = getContinuumDoc();

  if (!doc) {
    notFound();
  }

  const { Content } = await compileMDX(doc.content);

  return (
    <main className={`${SITE_CONTAINER_CLASS} py-16`}>
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
        <ContinuumTOC contentRootId="continuum-content" />

        <div className="min-w-0">
          <article>
            {/* Title */}
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {doc.title}
            </h1>

            {/* Metadata */}
            {(doc.date || doc.version || doc.authors) && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-fd-muted-foreground mb-6">
                {doc.date && (
                  <span>
                    {new Date(doc.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                )}
                {doc.version && <span>v{doc.version}</span>}
                {doc.authors && doc.authors.length > 0 && doc.authors[0] && (
                  <span>By {doc.authors.filter(Boolean).join(", ")}</span>
                )}
              </div>
            )}

            {/* Description */}
            {doc.description && (
              <p className="text-xl text-fd-muted-foreground mb-8">
                {doc.description}
              </p>
            )}

            {/* Content */}
            <div
              id="continuum-content"
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              <Content />
            </div>
          </article>
        </div>
      </div>
    </main>
  );
}
