import { EnterprisePage } from "@/components/enterprise/EnterprisePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Enterprise Data Protection - Ransomware-Proof Storage",
  description:
    "Protect critical enterprise data from ransomware, outages, and access failures. ar.io's permanent cloud storage keeps business-critical data online, immutable, and always accessible.",
  canonical: "/enterprise",
  ogImage: "/previews/enterprise-og.jpg",
  ogAlt: "Enterprise Data Protection | ar.io",
});

export default function Page() {
  return <EnterprisePage />;
}
