import { DevelopersPage } from "@/components/developers/DevelopersPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "For Developers - Build on the Permanent Cloud",
  description:
    "Build on ArDrive with open-source APIs, SDKs, and developer tools. ArFS, Turbo, and the CLI work like familiar cloud workflows.",
  canonical: "/developers",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <DevelopersPage />;
}
