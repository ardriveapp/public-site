import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EcosystemPage } from "@/components/ecosystem/EcosystemPage";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { getAllEcosystemItems, getEcosystemSlugs } from "@/lib/ecosystem-content";
import { buildMetadata } from "@/lib/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getEcosystemSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const items = getAllEcosystemItems();
  const item = items.find((i) => i.slug === slug);

  if (!item) {
    return {
      title: "Project Not Found",
    };
  }

  return buildMetadata({
    title: `${item.title} - ar.io Ecosystem`,
    description: item.description,
    canonical: `/ecosystem/${slug}`,
    ogTitle: `${item.title} | ar.io Ecosystem`,
    ogDescription: item.description,
    ogImage: "/previews/general-og.jpg",
    ogAlt: `${item.title} | ar.io Ecosystem`,
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const items = getAllEcosystemItems();

  if (!items.some((i) => i.slug === slug)) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className={SITE_CONTAINER_CLASS}>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-fd-foreground mb-6">
            Ecosystem
          </h1>
          <p className="text-xl text-fd-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Explore the vibrant ecosystem of projects, tools, and partners building with ar.io.
          </p>
        </div>

        <EcosystemPage items={items} initialFocusSlug={slug} />
      </div>
    </div>
  );
}

