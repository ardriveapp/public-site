import { notFound } from "next/navigation";
import { getLegalDocument } from "@/lib/legal";
import { compileMDX } from "@/lib/mdx";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Terms of Service & Privacy Policy — ArDrive",
  description:
    "ArDrive Terms of Service and Privacy Policy — the agreement governing your use of the ArDrive platform.",
  canonical: "/tos-and-privacy",
  ogImage: "/previews/general-og.jpg",
});

export default async function TosAndPrivacyPage() {
  const doc = getLegalDocument("terms-of-service-and-privacy-policy");

  if (!doc) notFound();

  const { Content } = await compileMDX(doc.content);

  return (
    <main className="min-h-screen px-4 py-16" style={{ background: "#080808" }}>
      <div className="mx-auto max-w-3xl">
        <h1
          className="text-3xl font-extrabold leading-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}
        >
          {doc.title}
        </h1>
        {doc.date && (
          <p className="mt-3 text-sm" style={{ color: "rgba(250,250,250,0.35)" }}>
            Last updated{" "}
            {new Date(doc.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
        <div className="prose mt-10 max-w-none">
          <Content />
        </div>
      </div>
    </main>
  );
}
