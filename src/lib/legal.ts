import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface LegalDocument {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

export interface LegalDocumentMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

const LEGAL_DIR = path.join(process.cwd(), "content/legal");

/**
 * Get all legal document slugs for generateStaticParams
 */
export function getLegalSlugs(): string[] {
  if (!fs.existsSync(LEGAL_DIR)) {
    return [];
  }

  const files = fs.readdirSync(LEGAL_DIR);
  return files
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Get metadata for all legal documents, sorted by date descending
 */
export function getAllLegalDocuments(): LegalDocumentMeta[] {
  const slugs = getLegalSlugs();

  const documents = slugs.map((slug) => {
    const filePath = path.join(LEGAL_DIR, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || "",
      date: data.date || "",
    };
  });

  // Sort by date descending (newest first)
  return documents.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * Get a single legal document by slug
 */
export function getLegalDocument(slug: string): LegalDocument | null {
  const filePath = path.join(LEGAL_DIR, `${slug}.mdx`);

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
    content,
  };
}

