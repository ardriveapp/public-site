export interface FaqEntry {
  question: string;
  answer: string;
}

/** FAQ on /about. Rendered on the page and emitted as FAQPage JSON-LD, so both read this list. */
export const ABOUT_FAQS: FaqEntry[] = [
  {
    question: "Is ArDrive a subscription?",
    answer:
      "No. You pay once per file when you upload it. There's no recurring bill to keep a file accessible.",
  },
  {
    question: "What happens to my files if ArDrive shuts down?",
    answer:
      "Your files stay on Arweave, the decentralized network ArDrive stores data on, not on ArDrive's own servers. They remain retrievable through Arweave gateways even if ArDrive stops operating.",
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
