import "@/app/global.css";
import type { Metadata } from "next";
import Script from "next/script";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AskArieWidget } from "@/components/ask-arie/AskArieWidget";
import { bodyFont, headingFont } from "@/lib/fonts";
import { withBasePath } from "@/lib/base-path";
import { getUseCasesForNav } from "@/lib/use-cases";

const getMetadataBase = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ar.io";
  const basePath = process.env.BASE_PATH || "";
  return new URL(siteUrl + basePath);
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: "ar.io",
    template: "%s | ar.io",
  },
  description: "Permanent cloud storage for the next generation of the web.",
  icons: {
    icon: withBasePath("/brand/favicon.png"),
    shortcut: withBasePath("/brand/favicon.png"),
    // Apple touch icons generally expect PNG; keep the existing PNG for that use.
    apple: withBasePath("/brand/ario-white-transparent.png"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const useCasesNav = getUseCasesForNav();

  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${headingFont.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* X conversion tracking base code */}
        <Script id="x-conversion" strategy="beforeInteractive">
          {`!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
twq('config','pf4mi');`}
        </Script>
        {/* End X conversion tracking base code */}
      </head>
      <body
        className={`${bodyFont.className} flex flex-col min-h-screen bg-fd-background text-fd-foreground`}
      >
        {/* Privacy-friendly analytics by Plausible */}
        <Script
          src="https://plausible.io/js/pa-stMaAIQIV1W6DFRIy37KQ.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-init" strategy="afterInteractive">
          {`window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init();`}
        </Script>
        <SiteHeader useCasesNav={useCasesNav} />
        <div className="flex-1">{children}</div>
        <SiteFooter useCasesNav={useCasesNav} />
        <AskArieWidget />
      </body>
    </html>
  );
}
