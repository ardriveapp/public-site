import { AboutPage } from "@/components/about/AboutPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About ArDrive - Our Story and Mission",
  description:
    "ArDrive is building permanent storage for everyone: user-owned, privacy-first, open source, and built with the Arweave community.",
  canonical: "/about",
  ogTitle: "About ArDrive - Permanent Storage for Everyone",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "About ArDrive - Permanent Storage for Everyone",
});

export default function Page() {
  return <AboutPage />;
}

