import { HomePage } from "@/components/home/HomePage";
import { buildMetadata } from "@/lib/metadata";
import { getFeaturedEcosystemItems } from "@/lib/ecosystem-content";
import { getOrganizationSchema } from "@/lib/json-ld";

export const metadata = buildMetadata({
  title: "ar.io - Permanent Cloud Storage for Critical Data",
  description:
    "Protect critical data with ar.io's permanent, decentralized cloud storage. Ransomware-proof, always accessible, and pay once for forever access. Zero data lost since launch.",
  canonical: "/",
  ogImage: "/previews/home-og.jpg",
  ogAlt: "ar.io - Permanent cloud storage",
});

export default function Page() {
  const featuredItems = getFeaturedEcosystemItems();
  const organizationSchema = getOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <HomePage featuredItems={featuredItems} />
    </>
  );
}
