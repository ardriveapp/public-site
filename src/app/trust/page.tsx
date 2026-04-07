import { TrustPage } from "@/components/trust/TrustPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Trust - Verifiable by Design",
  description:
    "Don't trust us — verify it. Cryptographic proof of data integrity, independently verifiable by any third party. No vendor contact, no API keys, no trust required.",
  canonical: "/trust",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "Trust | ar.io",
});

export default function Page() {
  return <TrustPage />;
}
