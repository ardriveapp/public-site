import { ContactPage } from "@/components/contact/ContactPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Contact ar.io - Schedule Demo or Get Support",
  description:
    "Get in touch with the ar.io team. Schedule a demo to see permanent storage in action, submit a contact form for enterprise inquiries, or join our community on Discord.",
  canonical: "/contact",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "Contact ar.io | Schedule Demo",
});

export default function Page() {
  return <ContactPage />;
}