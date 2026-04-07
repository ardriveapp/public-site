import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  authors?: string[];
  tags?: string[];
  heroImage?: string;
  ogImage?: string;
  archived?: boolean;
  content: string;
}

export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  authors?: string[];
  tags?: string[];
  heroImage?: string;
  ogImage?: string;
  archived?: boolean;
}

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

/**
 * Get all article slugs for generateStaticParams
 */
export function getArticleSlugs(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all articles, sorted by date descending
 * By default, archived articles are excluded from the results
 */
export function getAllArticles(options?: { includeArchived?: boolean }): ArticleMeta[] {
  const slugs = getArticleSlugs();

  const articles = slugs.map((slug) => {
    const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      authors: data.authors,
      tags: Array.isArray(data.tags) ? data.tags : data.tags ? [String(data.tags)] : undefined,
      heroImage: data.heroImage,
      ogImage: data.ogImage,
      archived: data.archived || false,
    };
  });

  // Filter out archived articles unless explicitly requested
  const filteredArticles = options?.includeArchived
    ? articles
    : articles.filter((article) => !article.archived);

  // Sort by date descending (newest first)
  return filteredArticles.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single article by slug
 */
export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: data.date || "",
    authors: data.authors,
    tags: data.tags,
    heroImage: data.heroImage,
    ogImage: data.ogImage,
    archived: data.archived || false,
    content,
  };
}

