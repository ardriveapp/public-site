import { HomePage } from "@/components/home/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "ArDrive - Pay Once. Store Forever.",
  description:
    "Pay once to store your files permanently. No subscriptions, no renewals, no data loss.",
  canonical: "/",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <HomePage />;
}
