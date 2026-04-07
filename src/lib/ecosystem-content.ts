import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { EcosystemItem } from "./ecosystem";

const ECOSYSTEM_DIR = path.join(process.cwd(), "content/ecosystem");

/**
 * Get all ecosystem slugs for build-time operations
 */
export function getEcosystemSlugs(): string[] {
  if (!fs.existsSync(ECOSYSTEM_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ECOSYSTEM_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all ecosystem items, sorted by title
 * By default, archived items are excluded from the results
 */
export function getAllEcosystemItems(options?: { includeArchived?: boolean }): EcosystemItem[] {
  const slugs = getEcosystemSlugs();

  const items = slugs.map((slug) => {
    const filePath = path.join(ECOSYSTEM_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      categories: data.categories || [],
      logoPath: data.logoPath,
      logoNeedsDarkBackground: data.logoNeedsDarkBackground === true,
      websiteUrl: data.websiteUrl,
      developer: data.developer,
      goip: data.goip,
      featured: data.featured,
    };
  });

  // Filter out archived items unless explicitly requested
  const filteredItems = options?.includeArchived
    ? items
    : items.filter((item) => {
        const filePath = path.join(ECOSYSTEM_DIR, `${item.slug}.mdx`);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);
        return data.archived !== true;
      });

  // Sort by title for consistent ordering
  return filteredItems.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get ecosystem items marked as featured with logos
 * Only returns items where featured=true and logoPath exists
 */
export function getFeaturedEcosystemItems(): EcosystemItem[] {
  const allItems = getAllEcosystemItems();
  
  return allItems.filter(item => {
    // Must be featured and have a logo
    return item.featured === true && item.logoPath;
  });
}