import Link from "next/link";
import { getAllCaseStudies } from "@/lib/case-studies";
import { BaseImage } from "@/components/base-image";
import { buildMetadata } from "@/lib/metadata";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export const metadata = buildMetadata({
  title: "ar.io Case Studies - Real-World Permanent Storage",
  description:
    "Discover how leading organizations use ar.io for permanent data storage. Real-world examples of ransomware protection, data preservation, and decentralized applications.",
  canonical: "/case-studies",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Case Studies | Real-World Permanent Storage",
});

export default function CaseStudiesIndexPage() {
  const caseStudies = getAllCaseStudies();

  return (
    <main className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Case Studies</h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            Real-world examples of how ar.io powers permanent, decentralized applications.
          </p>
        </div>

        {caseStudies.length === 0 ? (
          <div className="rounded-2xl border border-fd-border bg-fd-card p-12 text-center">
            <p className="text-fd-muted-foreground">
              No case studies yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy) => (
              <article
                key={caseStudy.slug}
                className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all hover:shadow-xl hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgb(var(--color-fd-card)), rgb(223 214 247))",
                }}
              >
                <Link href={`/case-studies/${caseStudy.slug}`} className="block">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fd-primary/18" />
                  {caseStudy.heroImage && (
                    <div className="relative h-64 w-full overflow-hidden bg-fd-muted">
                      <BaseImage
                        src={caseStudy.heroImage}
                        alt={caseStudy.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="relative p-6">
                    <h2 className="text-xl font-semibold tracking-tight line-clamp-2 group-hover:text-fd-primary transition-colors">
                      {caseStudy.title}
                    </h2>
                    {caseStudy.description && (
                      <p className="mt-2 text-sm text-fd-muted-foreground line-clamp-3">
                        {caseStudy.description}
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

