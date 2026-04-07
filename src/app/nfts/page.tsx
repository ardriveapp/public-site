import { NftsPage } from "@/components/nfts/NftsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "NFT Storage — Be Unruggable | ArDrive",
  description:
    "Permanent NFT asset storage on Arweave. Pay once, store forever — no subscriptions, no rug pulls. Trusted by RTFKT, Full of Eyes, and more.",
  canonical: "/nfts",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <NftsPage />;
}
