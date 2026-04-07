import { TechnologyPage } from "@/components/technology/TechnologyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ArNS - Arweave Name System for Permanent URLs",
  description:
    "ArNS (the Arweave Name System) enables friendly, permanent names for apps and data on the permaweb. Create human-readable URLs that never expire and always resolve.",
  canonical: "/technology/arns",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ArNS | Arweave Name System",
});

export default function Page() {
  return <TechnologyPage />;
}

