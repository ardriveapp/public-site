import { TechnologyPage } from "@/components/technology/TechnologyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ar.io Gateways - Fast Access to Permanent Data",
  description:
    "Gateways provide fast, resilient access to permanent data on Arweave through the ar.io network. Global distribution ensures low latency and high availability for your permanent content.",
  canonical: "/technology/gateways",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Gateways | Fast Access to Permanent Data",
});

export default function Page() {
  return <TechnologyPage />;
}

