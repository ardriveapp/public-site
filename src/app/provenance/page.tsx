import { ProvenancePage } from "@/components/provenance/ProvenancePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Provenance - Independent Verification for AI and Media",
  description:
    "Ar.io creates cryptographically sealed, permanent records that can be verified independently of the system that produced them.",
  canonical: "/provenance",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "Provenance | Independent verification for AI and media",
});

export default function Page() {
  return <ProvenancePage />;
}

