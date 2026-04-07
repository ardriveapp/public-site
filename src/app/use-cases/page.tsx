import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { USE_CASE_METADATA } from "@/lib/use-case-config";
import { getUseCasesForNav } from "@/lib/use-cases";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";

export const metadata = buildMetadata({
  title: "ar.io Use Cases - Permanent Storage Applications",
  description:
    "Explore how ar.io enables permanent, decentralized solutions across industries. From AI data provenance to institutional archives, discover applications for permanent storage.",
  canonical: "/use-cases",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Use Cases | Permanent Storage Applications",
});

export default function UseCasesIndexPage() {
  const useCases = getUseCasesForNav();

  return (
    <main className={`${SITE_CONTAINER_CLASS} py-16`}>
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Use Cases</h1>
          <p className="mt-4 text-lg text-fd-muted-foreground">
            Explore how ar.io enables permanent, decentralized solutions across industries.
          </p>
        </div>

        {useCases.length === 0 ? (
          <div className="rounded-2xl border border-fd-border bg-fd-card p-12 text-center">
            <p className="text-fd-muted-foreground">
              No use cases yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase) => {
              const slugKey = useCase.slug.join("/");
              const metadata = USE_CASE_METADATA[slugKey];
              const Icon = metadata?.icon;
              
              return (
                <article
                  key={slugKey}
                  className="group relative overflow-hidden rounded-2xl border border-fd-border bg-fd-card transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  <Link href={`/use-cases/${slugKey}`} className="block">
                    <div className="p-6">
                      {Icon && (
                        <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-lg bg-fd-primary/10">
                          <Icon className="size-6 text-fd-primary" />
                        </div>
                      )}
                      <h2 className="text-xl font-semibold tracking-tight line-clamp-2 group-hover:text-fd-primary transition-colors">
                        {useCase.title}
                      </h2>
                      <p className="mt-2 text-sm text-fd-muted-foreground line-clamp-3">
                        {metadata?.shortDescription || useCase.description}
                      </p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        )}
    </main>
  );
}