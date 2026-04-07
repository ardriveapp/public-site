import { PlatformsPage } from "@/components/platforms/PlatformsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Platform Data Protection - Permanent User Data Storage",
  description:
    "Ensure user and AI-generated data remains accessible, intact, and independent of platform failure. Permanent storage that separates data access from infrastructure dependency. Pay once, access forever.",
  canonical: "/platforms",
  ogImage: "/previews/platforms-og.jpg",
  ogAlt: "Platform Data Protection | ar.io",
});

export default function Page() {
  return <PlatformsPage />;
}
