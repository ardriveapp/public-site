import { TokenPage } from "@/components/token/TokenPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ARIO Token - Acquire & Use the ar.io Network Token",
  description:
    "Learn how to acquire ARIO tokens through exchanges, swaps, bridging, and network participation. Power gateways, register ArNS names, and participate in ar.io network governance.",
  canonical: "/token",
  ogTitle: "ARIO Token | ar.io Network",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "ARIO Token | ar.io Network",
});

export default function Page() {
  return <TokenPage />;
}

