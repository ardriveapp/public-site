import { AboutPage } from "@/components/about/AboutPage";
import { buildMetadata } from "@/lib/metadata";
import { getOrganizationSchema } from "@/lib/json-ld";

export const metadata = buildMetadata({
  title: "About ArDrive - Permanent Storage, Not a Subscription",
  description:
    "ArDrive is a permanent storage platform that stores files, apps, and pages on Arweave for a one-time payment. Built by Permanent Data Solutions, Inc.",
  canonical: "/about",
  ogTitle: "About ArDrive - Permanent Storage, Not a Subscription",
  ogImage: "/previews/general-og.jpg",
  ogAlt: "About ArDrive - Permanent Storage, Not a Subscription",
});

const FAQ_ENTRIES: Array<{ question: string; answer: string }> = [
  {
    question: "Is ArDrive a subscription?",
    answer:
      "No. You pay once per file when you upload it. There's no recurring bill to keep a file accessible.",
  },
  {
    question: "What happens to my files if ArDrive shuts down?",
    answer:
      "Your files stay on Arweave, the decentralized network ArDrive stores data on, not on ArDrive's own servers. They remain retrievable through Arweave gateways even if ArDrive the company stops operating.",
  },
  {
    question: "Can I delete a file after I upload it?",
    answer:
      "No. Once an upload is confirmed on Arweave, it can't be removed by you, by ArDrive, or by anyone else. You can hide a file from your own view in the app, or choose not to share it, but the underlying data stays on the network.",
  },
  {
    question: "Who can see my files?",
    answer:
      "Anyone can see a file in a public drive once it's uploaded. Files in a private drive are encrypted and visible only to you and anyone you explicitly share a key with.",
  },
  {
    question: "Do I need to already own cryptocurrency to use ArDrive?",
    answer:
      "No. ArDrive can pay for uploads with a credit or debit card through Turbo. You still get an Arweave wallet to sign your uploads, and ArDrive can generate one for you.",
  },
  {
    question: "What can I store on ArDrive?",
    answer:
      "ArDrive accepts most common file types, including documents, photos, video, audio, and zipped folders, plus static sites and apps you want to publish with a permanent link.",
  },
  {
    question: "What is the permaweb?",
    answer:
      "The permaweb is the network of pages and files stored permanently on Arweave and served through gateways. ArDrive is one of the apps that lets you publish to it and manage what you store there.",
  },
];

function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ENTRIES.map((entry) => ({
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

