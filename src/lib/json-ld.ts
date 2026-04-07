const BASE_URL = "https://ar.io";
const LOGO_URL = `${BASE_URL}/brand/ario-full-black.svg`;

export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
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
    name: "ar.io",
    url: BASE_URL,
    logo: LOGO_URL,
    description: "Permanent cloud storage for the next generation of the web.",
    sameAs: [
      "https://twitter.com/ar_io_network",
      "https://discord.gg/ario",
      "https://github.com/ar-io",
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
      name: "ar.io",
    },
    publisher: {
      "@type": "Organization",
      name: "ar.io",
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
