import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface UseCasePage {
  slug: string[];
  title: string;
  description: string;
  heroImage?: string;
  ogImage?: string;
  content: string;
}

export interface UseCasePageMeta {
  slug: string[];
  title: string;
  description: string;
  heroImage?: string;
  ogImage?: string;
}

const USE_CASES_DIR = path.join(process.cwd(), "content/use-cases");

function getMdxFiles(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMdxFiles(fullPath, baseDir));
    } else if (entry.name.endsWith(".mdx") && !entry.name.startsWith("_")) {
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files;
}

function filePathToSlug(filePath: string): string[] {
  const withoutExt = filePath.replace(/\.mdx$/, "");
  const segments = withoutExt.split(path.sep).filter(Boolean);
  if (segments[segments.length - 1] === "index") segments.pop();
  return segments;
}

export function getUseCaseSlugs(): string[][] {
  return getMdxFiles(USE_CASES_DIR).map(filePathToSlug);
}

export function getAllUseCases(): UseCasePageMeta[] {
  const files = getMdxFiles(USE_CASES_DIR);

  return files.map((file) => {
    const filePath = path.join(USE_CASES_DIR, file);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    const slug = filePathToSlug(file);

    return {
      slug,
      title: data.title || slug.join("/") || "Use Case",
      description: data.description || "",
      heroImage: data.heroImage,
      ogImage: data.ogImage,
    };
  });
}

export interface UseCaseNavItem {
  slug: string[];
  title: string;
  description: string;
}

export function getUseCasesForNav(): UseCaseNavItem[] {
  const all = getAllUseCases();
  
  // Sort by title alphabetically (what users see)
  return all
    .slice()
    .sort((a, b) => a.title.localeCompare(b.title))
    .map((u) => ({ slug: u.slug, title: u.title, description: u.description }));
}

export function getUseCase(slug: string[]): UseCasePage | null {
  let filePath = path.join(USE_CASES_DIR, ...slug) + ".mdx";
  if (!fs.existsSync(filePath)) {
    filePath = path.join(USE_CASES_DIR, ...slug, "index.mdx");
  }
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || slug.join("/") || "Use Case",
    description: data.description || "",
    heroImage: data.heroImage,
    ogImage: data.ogImage,
    content,
  };
}
