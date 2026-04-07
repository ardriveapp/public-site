import { HomePage } from "@/components/home/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ArDrive - Pay Once. Store Forever.",
  description:
    "Pay once to store your files permanently on the blockchain. No subscriptions, no renewals, no data loss.",
  canonical: "/",
});

export default function Page() {
  return <HomePage />;
}
