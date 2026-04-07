import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";

export type TwitterCardType = "summary" | "summary_large_image";

export interface BuildMetadataInput {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogAlt?: string;
  ogType?: "website" | "article";
  ogImageWidth?: number;
  ogImageHeight?: number;
  // Use Record<string, any> to allow any additional OpenGraph properties
  // (e.g., publishedTime, authors for articles)
  openGraphExtras?: Record<string, any>;
  twitterCard?: TwitterCardType;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const {
    title,
    description,
    canonical,
    ogImage,
    ogTitle,
    ogDescription,
    ogAlt,
    ogType = "website",
    ogImageWidth = 1200,
    ogImageHeight = 630,
    openGraphExtras,
    twitterCard = "summary_large_image",
    twitterTitle,
    twitterDescription,
    twitterImage,
  } = input;

  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedTwitterTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription ?? resolvedOgDescription;

  const resolvedOgImage = ogImage ?? twitterImage;
  const resolvedTwitterImage = twitterImage ?? ogImage;

  // Note: Do NOT use withBasePath() for OG/Twitter images when metadataBase is set.
  // Next.js automatically resolves relative paths against metadataBase (which includes basePath).
  // Using withBasePath() here would cause double basePath (e.g., /public-site/public-site/previews/...)
  const openGraphImages =
    resolvedOgImage
      ? [
          {
            url: resolvedOgImage,
            width: ogImageWidth,
            height: ogImageHeight,
            alt: ogAlt ?? resolvedOgTitle,
          },
        ]
      : undefined;

  const twitterImages = resolvedTwitterImage
    ? [resolvedTwitterImage]
    : undefined;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: resolvedOgTitle,
      description: resolvedOgDescription,
      type: ogType,
      siteName: "ar.io",
      ...(openGraphImages ? { images: openGraphImages } : {}),
      ...(openGraphExtras ?? {}),
    },
    twitter: {
      card: twitterCard,
      title: resolvedTwitterTitle,
      description: resolvedTwitterDescription,
      ...(twitterImages ? { images: twitterImages } : {}),
      creator: "@ar_io_network",
      site: "@ar_io_network",
    },
  };
}
