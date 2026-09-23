const BASE_URL = "https://ardrive.io";
const LOGO_URL = `${BASE_URL}/brand/ArDrive-Logo.png`;
const ORGANIZATION_NAME = "ArDrive";

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  parentOrganization: {
    "@type": "Organization";
    name: string;
  };
  sameAs: string[];
}

export interface ArticleSchema {
  "@context": "https://schema.org";
  "@type": "Article";
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  author: {
    "@type": "Organization";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
}

export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: BASE_URL,
    logo: LOGO_URL,
    description:
      "ArDrive is a permanent file storage app built on Arweave. You pay once to upload a file and it stays stored, with no subscription.",
    parentOrganization: {
      "@type": "Organization",
      name: "Permanent Data Solutions, Inc.",
    },
    sameAs: [
      "https://x.com/ardriveapp",
      "https://discord.com/invite/ya4hf2H",
      "https://github.com/ardriveapp",
    ],
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  date: string;
  heroImage?: string;
}

export function getArticleSchema(article: ArticleSchemaInput): ArticleSchema {
  const schema: ArticleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: ORGANIZATION_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };

  if (article.heroImage) {
    schema.image = `${BASE_URL}${article.heroImage}`;
  }

  return schema;
}
