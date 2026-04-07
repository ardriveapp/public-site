import "@/app/global.css";
import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { bodyFont, headingFont } from "@/lib/fonts";
import { withBasePath } from "@/lib/base-path";

const getMetadataBase = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ardrive.io";
  const basePath = process.env.BASE_PATH || "";
  return new URL(siteUrl + basePath);
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "ArDrive",
    template: "%s | ArDrive",
  },
  description: "Pay once. Store forever. Permanent, decentralized storage powered by Arweave.",
  icons: {
    icon: withBasePath("/brand/favicon.png"),
    shortcut: withBasePath("/brand/favicon.png"),
    apple: withBasePath("/brand/favicon.png"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <body
        className={`${bodyFont.className} flex flex-col min-h-screen bg-fd-background text-fd-foreground`}
      >
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
