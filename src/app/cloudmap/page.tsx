import { CloudmapPage } from "@/components/cloudmap/CloudmapPage"
import { SITE_CONTAINER_CLASS } from "@/components/site-container"
import { buildMetadata } from "@/lib/metadata"

export const metadata = buildMetadata({
  title: "ar.io Cloudmap - Development Roadmap & Progress",
  description:
    "Track the development progress of core ar.io initiatives. View our public roadmap, see what's shipped, in progress, and planned for gateways, ArNS, and the permaweb ecosystem.",
  canonical: "/cloudmap",
  ogTitle: "ar.io Cloudmap - Development Roadmap",
  ogDescription:
    "Track the development progress of core ar.io initiatives.",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Cloudmap | Development Roadmap",
});

export default function Page() {
  return (
    <div className="py-8">
      <div className={SITE_CONTAINER_CLASS}>
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-fd-foreground mb-6">
            Cloudmap
          </h1>
          <p className="text-xl text-fd-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
            Track the development progress of core ar.io initiatives.
          </p>

          <div className="text-sm text-fd-foreground/60">
            Last updated: January 2026
          </div>
        </div>

        <CloudmapPage />
      </div>
    </div>
  )
}
