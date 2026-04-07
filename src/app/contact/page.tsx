import { ContactPage } from "@/components/contact/ContactPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact — ArDrive",
  description:
    "Get in touch with the ArDrive team. Developer docs, Discord support, and email.",
  canonical: "/contact",
  ogImage: "/previews/general-og.jpg",
});

export default function Page() {
  return <ContactPage />;
}
