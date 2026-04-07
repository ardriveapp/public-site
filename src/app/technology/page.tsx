import { TechnologyPage } from "@/components/technology/TechnologyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ar.io Technology - Permanent Storage Architecture",
  description:
    "Learn how ar.io turns Arweave into a cloud you can build on. Understand the 3-layer architecture: storage (Arweave), compute (AO), and access (ar.io gateways, Wayfinder, ArNS).",
  canonical: "/technology",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Technology | Permanent Storage Architecture",
});

export default function Page() {
  return <TechnologyPage />;
}
