import { BrandKitPage } from "@/components/brand/BrandKitPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Brand Kit",
  description:
    "Download ar.io brand assets including logos, color palette, and typography guidelines for use in your projects.",
  canonical: "/brand-kit",
  ogTitle: "Brand Kit | ar.io",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "Brand Kit | ar.io",
});

export default function Page() {
  return <BrandKitPage />;
}
