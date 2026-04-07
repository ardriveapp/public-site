import { BrandKitPage } from "@/components/brand/BrandKitPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Brand Kit",
  description:
    "Official ArDrive logos, color tokens, and typography. Use these assets when referencing or building on ArDrive.",
  canonical: "/brand-kit",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <BrandKitPage />;
}
