import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface HelpArticle {
  slug: string;
  title: string;
  description: string;
  category: string;
  section: string;
  content: string;
}

export interface HelpArticleMeta {
  slug: string;
  title: string;
  description: string;
  category: string;
  section: string;
  archived?: boolean;
}

const HELP_DIR = path.join(process.cwd(), "content/help");

/**
 * Get all help article slugs for generateStaticParams
 */
export function getHelpSlugs(): string[] {
  if (!fs.existsSync(HELP_DIR)) {
    return [];
  }

  const files = fs.readdirSync(HELP_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all help articles, sorted for the index page.
 * By default, archived articles are excluded from the results.
 */
export function getAllHelpArticles(options?: { includeArchived?: boolean }): HelpArticleMeta[] {
  const slugs = getHelpSlugs();

  const items = slugs.map((slug) => {
    const filePath = path.join(HELP_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: (data.title as string) || slug,
      description: (data.description as string) || "",
      category: (data.category as string) || "",
      section: (data.section as string) || "",
      archived: Boolean(data.archived),
    };
  });

  const filtered = options?.includeArchived
    ? items
    : items.filter((item) => !item.archived);

  return sortHelpArticles(filtered);
}

/**
 * Get a single help article by slug
 */
export function getHelpArticle(slug: string): HelpArticle | null {
  const filePath = path.join(HELP_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    category: (data.category as string) || "",
    section: (data.section as string) || "",
    content,
  };
}

function sortHelpArticles(items: HelpArticleMeta[]): HelpArticleMeta[] {
  return [...items].sort((a, b) => {
    const c = a.category.localeCompare(b.category);
    if (c !== 0) return c;
    const s = a.section.localeCompare(b.section);
    if (s !== 0) return s;
    return a.title.localeCompare(b.title);
  });
}
