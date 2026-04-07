import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "@/lib/mdx";
import { getUseCase, getUseCaseSlugs, getUseCasesForNav } from "@/lib/use-cases";
import { BaseImage } from "@/components/base-image";
import { buildMetadata } from "@/lib/metadata";
import { UseCasePagination } from "@/components/use-cases/use-case-pagination";
import { UseCaseSideNav } from "@/components/use-cases/use-case-side-nav";
import { SITE_CONTAINER_CLASS } from "@/components/site-container";
import { ContactUsButton } from "@/components/mdx/ContactUsButton";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateStaticParams() {
  const slugs = getUseCaseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUseCase(slug);

  if (!page) return { title: "Page Not Found" };

  const ogImage = page.ogImage || page.heroImage || "/previews/general-og.jpg";

  return buildMetadata({
    title: page.title,
    description: page.description,
    canonical: `/use-cases/${slug.join("/")}`,
    ogType: "website",
    ogImage,
    ogAlt: page.title,
  });
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getUseCase(slug);

  if (!page) notFound();

  const { Content } = await compileMDX(page.content, { ContactUsButton });
  const nav = getUseCasesForNav();
  const currentIndex = nav.findIndex((item) => item.slug.join("/") === slug.join("/"));
  const previous = currentIndex > 0 ? nav[currentIndex - 1] : undefined;
  const next =
    currentIndex >= 0 && currentIndex < nav.length - 1 ? nav[currentIndex + 1] : undefined;
  const navItems = nav.map((item) => ({
    href: `/use-cases/${item.slug.join("/")}`,
    title: item.title,
  }));
  const currentHref = `/use-cases/${slug.join("/")}`;

  return (
    <main className={`${SITE_CONTAINER_CLASS} py-16`}>
      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <UseCaseSideNav items={navItems} currentHref={currentHref} />

        <div className="min-w-0">
          {page.heroImage && (
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-2xl md:h-96">
              <BaseImage
                src={page.heroImage}
                alt={page.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority
              />
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight mb-4">{page.title}</h1>

          {page.description && (
            <p className="text-xl text-fd-muted-foreground mb-8">
              {page.description}
            </p>
          )}

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <Content />
          </div>

          <UseCasePagination
            previous={
              previous
                ? {
                    href: `/use-cases/${previous.slug.join("/")}`,
                    title: previous.title,
                    direction: "previous",
                  }
                : undefined
            }
            next={
              next
                ? {
                    href: `/use-cases/${next.slug.join("/")}`,
                    title: next.title,
                    direction: "next",
                  }
                : undefined
            }
          />
        </div>
      </div>
    </main>
  );
}


