import { DevelopersPage } from "@/components/developers/DevelopersPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "For Developers — Powering the Permanent Cloud",
  description:
    "Build on ArDrive with open-source APIs, SDKs, and developer tools. ArFS, Turbo bundler, and CLI make permanent storage as simple as familiar cloud workflows.",
  canonical: "/developers",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <DevelopersPage />;
}
