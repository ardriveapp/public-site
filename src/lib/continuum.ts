import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ContinuumDoc {
  title: string;
  description?: string;
  date?: string;
  version?: string;
  authors?: string[];
  content: string;
}

const CONTINUUM_DIR = path.join(process.cwd(), "content/continuum");

/**
 * Get the continuum document
 */
export function getContinuumDoc(): ContinuumDoc | null {
  if (!fs.existsSync(CONTINUUM_DIR)) {
    return null;
  }

  // Find the first .mdx file in the continuum directory
  const files = fs.readdirSync(CONTINUUM_DIR);
  const docFile = files.find(
    (file) => file.endsWith(".mdx") && !file.startsWith("_")
  );

  if (!docFile) {
    return null;
  }

  const filePath = path.join(CONTINUUM_DIR, docFile);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  // Preprocess content to fix MDX parsing issues:
  // 1. Remove {#id} attributes from headings (rehype-slug will auto-generate IDs)
  // 2. Escape JSON objects by wrapping in code blocks to prevent MDX from parsing as JSX
  let processedContent = content.replace(/\{#[^}]+\}/g, '');
  
  // Find and escape JSON objects - match { followed by space and quote (JSON pattern)
  // Use a more robust pattern that handles the full JSON object
  processedContent = processedContent.replace(
    /\{\s*"[^"]+"\s*:[^}]+\}/g,
    (match) => {
      // This looks like a JSON object, wrap it in backticks to make it inline code
      // This prevents MDX from trying to parse it as JSX
      return `\`${match}\``;
    }
  );

  // Extract title from frontmatter or content
  let title = data.title;
  if (!title) {
    // Try to extract from first heading
    const headingMatch = processedContent.match(/^#+\s+(.+)$/m);
    if (headingMatch) {
      title = headingMatch[1].trim();
    } else {
      title = "Continuum Framework";
    }
  }

  return {
    title,
    description: data.description,
    date: data.date,
    version: data.version,
    authors: data.authors,
    content: processedContent,
  };
}
