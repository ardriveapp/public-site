import { InstitutionsPage } from "@/components/institutions/InstitutionsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Institutional Archives - OAIS-Aligned Permanent Storage",
  description:
    "Archive and safeguard institutional data that must remain available today and decades from now. OAIS-aligned, verifiable long-term archival with ar.io. Pay once, access forever.",
  canonical: "/institutions",
  ogImage: "/previews/institutions-og.jpg",
  ogAlt: "Institutional Archives | ar.io",
});

export default function Page() {
  return <InstitutionsPage />;
}

