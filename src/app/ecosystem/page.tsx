import { EcosystemPage } from "@/components/ecosystem/EcosystemPage"
import { SITE_CONTAINER_CLASS } from "@/components/site-container"
import { buildMetadata } from "@/lib/metadata"
import { getAllEcosystemItems } from "@/lib/ecosystem-content"

export const metadata = buildMetadata({
  title: "ar.io Ecosystem - Projects & Partners",
  description:
    "Explore the vibrant ecosystem of projects, tools, and partners building with ar.io. Discover applications, integrations, and services leveraging permanent decentralized storage.",
  canonical: "/ecosystem",
  ogTitle: "ar.io Ecosystem - Projects & Partners",
  ogDescription:
    "Explore the vibrant ecosystem of projects, tools, and partners building with ar.io.",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Ecosystem | Projects & Partners",
});

export default function Page() {
  const items = getAllEcosystemItems();

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

        <EcosystemPage items={items} />
      </div>
    </div>
  )
}
