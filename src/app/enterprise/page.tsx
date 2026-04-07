import { EnterprisePage } from "@/components/enterprise/EnterprisePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Enterprise — ArDrive",
  description:
    "Enterprise-grade permanent storage. Never lose your data again. Expert support, premium onboarding, and scalable decentralized infrastructure.",
  canonical: "/enterprise",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <EnterprisePage />;
}
