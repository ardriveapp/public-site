import { TechnologyPage } from "@/components/technology/TechnologyPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Access Tools - Wayfinder & ar.io Gateway Network",
  description:
    "Access tools like Wayfinder and the ar.io gateway network make permanent data easy to retrieve and verify. Discover, resolve, and access content across the permaweb.",
  canonical: "/technology/access",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ar.io Access Tools | Wayfinder & Gateway Network",
});

export default function Page() {
  return <TechnologyPage />;
}

