import { StartPage } from "@/components/start/StartPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Get Started — ArDrive",
  description:
    "Start using ArDrive on web, Android, iOS, or CLI. Permanent decentralized storage — you own your data and your keys.",
  canonical: "/start",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <StartPage />;
}
