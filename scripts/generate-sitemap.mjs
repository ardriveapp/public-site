#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const BASE_URL = "https://ardrive.io";

// Static pages with their routes
const STATIC_PAGES = [
  "/",
  "/about/",
  "/pricing/",
  "/developers/",
  "/articles/",
  "/nfts/",
  "/enterprise/",
  "/contact/",
  "/help/",
  "/brand-kit/",
  "/tos-and-privacy/",
];

/**
 * Get all MDX files from a directory (non-recursive)
 */
function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

/**
 * Get MDX files recursively (for use-cases nested structure)
 */
function getMdxFilesRecursive(dir, baseDir = dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFilesRecursive(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files;
}

/**
 * Read frontmatter date from an MDX file
 */
function getDateFromMdx(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    return data.date || null;
  } catch {
    return null;
  }
}

/**
 * Check if content is archived
 */
function isArchived(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const { data } = matter(content);
    return data.archived === true;
  } catch {
    return false;
  }
}

/**
 * Format date for sitemap (YYYY-MM-DD)
 */
function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.toISOString().split("T")[0];
  } catch {
    return null;
  }
}

/**
 * Generate a single URL entry for the sitemap
 */
function generateUrlEntry(loc, lastmod = null, priority = "0.8") {
  let entry = `  <url>\n    <loc>${loc}</loc>\n`;
  if (lastmod) {
    entry += `    <lastmod>${lastmod}</lastmod>\n`;
  }
  entry += `    <priority>${priority}</priority>\n  </url>`;
  return entry;
}

/**
 * Main sitemap generation
 */
function generateSitemap() {
  const urls = [];
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  for (const page of STATIC_PAGES) {
    const priority = page === "/" ? "1.0" : "0.8";
    urls.push(generateUrlEntry(`${BASE_URL}${page}`, today, priority));
  }

  // Articles (excluding archived)
  const articlesDir = path.join(rootDir, "content/articles");
  const articleFiles = getMdxFiles(articlesDir);
  for (const file of articleFiles) {
    const filePath = path.join(articlesDir, file);
    if (isArchived(filePath)) continue;

    const slug = file.replace(/\.mdx$/, "");
    const date = getDateFromMdx(filePath);
    const lastmod = formatDate(date) || today;
    urls.push(generateUrlEntry(`${BASE_URL}/articles/${slug}/`, lastmod, "0.7"));
  }

  // Help (Zendesk-sourced support articles)
  const helpDir = path.join(rootDir, "content/help");
  const helpFiles = getMdxFiles(helpDir);
  for (const file of helpFiles) {
    const filePath = path.join(helpDir, file);
    const slug = file.replace(/\.mdx$/, "");
    const lastmod = getDateFromMdx(filePath) || today;
    urls.push(generateUrlEntry(`${BASE_URL}/help/${slug}/`, formatDate(lastmod) || today, "0.65"));
  }

  // Build XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  return xml;
}

// Main execution
function main() {
  console.log("Generating sitemap.xml...");

  const sitemap = generateSitemap();
  const outputPath = path.join(rootDir, "public/sitemap.xml");

  fs.writeFileSync(outputPath, sitemap, "utf8");

  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`Generated sitemap with ${urlCount} URLs`);
  console.log(`Output: ${outputPath}`);
}

main();
