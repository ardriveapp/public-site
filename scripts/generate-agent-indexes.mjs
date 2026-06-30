#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const BASE_URL = "https://ardrive.io";
const HELP_DIR = path.join(rootDir, "content", "help");
const PUBLIC_DIR = path.join(rootDir, "public");

function getMdxFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("_"));
}

function normalizeText(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function extractHeadings(content) {
  return normalizeText(content)
    .split("\n")
    .map((line) => line.match(/^(#{1,3})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      depth: match[1].length,
      text: normalizeText(match[2].replace(/[#*_`[\]()]/g, "")),
    }))
    .filter((heading) => heading.text.length > 0);
}

function sortArticles(articles) {
  return [...articles].sort((a, b) => {
    const category = a.category.localeCompare(b.category);
    if (category !== 0) return category;

    const section = a.section.localeCompare(b.section);
    if (section !== 0) return section;

    return a.title.localeCompare(b.title);
  });
}

function getHelpArticles() {
  const files = getMdxFiles(HELP_DIR);

  return sortArticles(
    files
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(HELP_DIR, file);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const pathname = `/help/${slug}/`;

        return {
          slug,
          title: normalizeText(data.title) || slug,
          description: normalizeText(data.description),
          category: normalizeText(data.category),
          section: normalizeText(data.section),
          updated: data.date ? normalizeText(data.date) : undefined,
          archived: data.archived === true,
          pathname,
          url: `${BASE_URL}${pathname}`,
          headings: extractHeadings(content),
          content: normalizeText(content),
        };
      })
      .filter((article) => !article.archived)
  );
}

function groupArticlesByCategory(articles) {
  const groups = new Map();

  for (const article of articles) {
    const category = article.category || "Help";
    const section = article.section || "General";

    if (!groups.has(category)) groups.set(category, new Map());

    const sections = groups.get(category);
    if (!sections.has(section)) sections.set(section, []);
    sections.get(section).push(article);
  }

  return groups;
}

function articleLink(article) {
  const description = article.description ? `: ${article.description}` : "";
  return `- [${article.title}](${article.url})${description}`;
}

function generateLlmsTxt(articles) {
  const groups = groupArticlesByCategory(articles);
  const lines = [
    "# ArDrive",
    "",
    "> ArDrive provides permanent, decentralized storage powered by Arweave. This file maps the public site and help center for AI agents and retrieval tools.",
    "",
    "## Core Pages",
    "",
    `- [Home](${BASE_URL}/): Pay once. Store forever.`,
    `- [Pricing](${BASE_URL}/pricing/): Estimate permanent storage costs.`,
    `- [Developers](${BASE_URL}/developers/): Developer resources for building with ArDrive.`,
    `- [Help](${BASE_URL}/help/): Product guides, FAQs, and troubleshooting.`,
    `- [Contact](${BASE_URL}/contact/): Contact ArDrive support.`,
    "",
    "## Machine-Readable Help",
    "",
    `- [Full help corpus](${BASE_URL}/llms-full.txt): All public help article bodies in markdown-oriented text.`,
    `- [Help JSON index](${BASE_URL}/help/index.json): Structured help article metadata.`,
  ];

  for (const [category, sections] of groups) {
    lines.push("", `## ${category}`, "");

    for (const [section, sectionArticles] of sections) {
      if (section !== "General") {
        lines.push(`### ${section}`, "");
      }

      lines.push(...sectionArticles.map(articleLink));
      lines.push("");
    }
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

function generateLlmsFullTxt(articles) {
  const lines = [
    "# ArDrive Help Corpus",
    "",
    "> Full public help content for AI agents and retrieval tools. Canonical URLs point to rendered help pages on ardrive.io.",
    "",
    "## Index",
    "",
    ...articles.map(articleLink),
  ];

  for (const article of articles) {
    lines.push(
      "",
      "---",
      "",
      `# ${article.title}`,
      "",
      `Canonical URL: ${article.url}`,
      `Category: ${article.category || "Help"}`,
      `Section: ${article.section || "General"}`,
    );

    if (article.description) {
      lines.push(`Description: ${article.description}`);
    }

    if (article.updated) {
      lines.push(`Updated: ${article.updated}`);
    }

    lines.push("", article.content);
  }

  return `${lines.join("\n").replace(/\n{3,}/g, "\n\n").trim()}\n`;
}

function generateHelpIndexJson(articles) {
  const manifest = {
    site: "ArDrive",
    baseUrl: BASE_URL,
    contentType: "help_article_index",
    articles: articles.map((article) => ({
      slug: article.slug,
      title: article.title,
      description: article.description,
      category: article.category,
      section: article.section,
      pathname: article.pathname,
      url: article.url,
      ...(article.updated ? { updated: article.updated } : {}),
      headings: article.headings,
    })),
  };

  return `${JSON.stringify(manifest, null, 2)}\n`;
}

function writeFile(relativePath, content) {
  const outputPath = path.join(PUBLIC_DIR, relativePath);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content, "utf8");
  console.log(`Output: ${outputPath}`);
}

function main() {
  console.log("Generating agent-friendly indexes...");

  const articles = getHelpArticles();

  writeFile("llms.txt", generateLlmsTxt(articles));
  writeFile("llms-full.txt", generateLlmsFullTxt(articles));
  writeFile(path.join("help", "index.json"), generateHelpIndexJson(articles));

  console.log(`Generated agent indexes for ${articles.length} help articles`);
}

main();
