import { AboutPage } from "@/components/about/AboutPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About ar.io - Our Mission for Permanent Data Access",
  description:
    "Providing permanent access to data that matters is our mission. We exist to ensure that the data society relies on remains accessible, trustworthy, and usable over time.",
  canonical: "/about",
  ogTitle: "About ar.io - Permanent Access to Data That Matters",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "About ar.io - Permanent Access to Data That Matters",
});

export default function Page() {
  return <AboutPage />;
}

