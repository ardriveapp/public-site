import { AboutPage } from "@/components/about/AboutPage";
import { buildMetadata } from "@/lib/metadata";
import { getOrganizationSchema } from "@/lib/json-ld";
import { ABOUT_FAQS } from "@/lib/about-faq-config";

export const metadata = buildMetadata({
  title: "About ArDrive - Permanent Storage, Not a Subscription",
  description:
    "ArDrive is a permanent storage app that keeps your files, sites and apps on Arweave for a one-time payment. Built by Permanent Data Solutions, Inc.",
  canonical: "/about",
  ogTitle: "About ArDrive - Permanent Storage, Not a Subscription",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "About ArDrive - Permanent Storage, Not a Subscription",
});

function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ABOUT_FAQS.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export default function Page() {
  const organizationSchema = getOrganizationSchema();
  const faqSchema = getFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AboutPage />
    </>
  );
}

