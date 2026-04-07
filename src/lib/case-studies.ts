import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  date: string;
  heroImage?: string;
  ogImage?: string;
  archived?: boolean;
  content: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  heroImage?: string;
  ogImage?: string;
  archived?: boolean;
}

const CASE_STUDIES_DIR = path.join(process.cwd(), "content/case-studies");

/**
 * Get all case study slugs for generateStaticParams
 */
export function getCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(CASE_STUDIES_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all case studies, sorted by date descending
 * By default, archived case studies are excluded from the results
 */
export function getAllCaseStudies(options?: { includeArchived?: boolean }): CaseStudyMeta[] {
  const slugs = getCaseStudySlugs();

  const caseStudies = slugs.map((slug) => {
    const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
      heroImage: data.heroImage,
      ogImage: data.ogImage,
      archived: data.archived || false,
    };
  });

  // Filter out archived case studies unless explicitly requested
  const filteredCaseStudies = options?.includeArchived
    ? caseStudies
    : caseStudies.filter((caseStudy) => !caseStudy.archived);

  // Sort by date descending (newest first)
  return filteredCaseStudies.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single case study by slug
 */
export function getCaseStudy(slug: string): CaseStudy | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);

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
    heroImage: data.heroImage,
    ogImage: data.ogImage,
    archived: data.archived || false,
    content,
  };
}

