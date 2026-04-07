import { PricingPage } from "@/components/pricing/PricingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Pricing — Pay Once, Store Forever",
  description:
    "ArDrive uses a one-time payment model powered by Arweave. Pay once per file and store it permanently — no subscriptions, no data caps, no additional fees.",
  canonical: "/pricing",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <PricingPage />;
}
