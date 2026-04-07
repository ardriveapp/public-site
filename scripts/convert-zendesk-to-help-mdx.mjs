#!/usr/bin/env node
/**
 * One-shot migration: Zendesk HTML export -> content/help/*.mdx
 * Source: .temp/Zendesk support/zendesk-export (or ZENDESK_EXPORT_DIR)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";
import TurndownService from "turndown";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const DEFAULT_EXPORT_DIR = path.join(
  rootDir,
  ".temp",
  "Zendesk support",
  "zendesk-export"
);
const OUT_DIR = path.join(rootDir, "content", "help");

const HELP_HOST = "help.ardrive.io";
const ARTICLE_PATH_RE = /\/hc\/[^/]*\/articles\/(\d+)-([^"'?#\s]+)/gi;

function humanizeFilenameBase(name) {
  return name
    .replace(/\.html$/i, "")
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w))
    .join(" ");
}

function humanizePathSegment(segment) {
  return segment
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function pathToSlug(relPath) {
  return relPath
    .replace(/\.html$/i, "")
    .split(/[/\\]+/)
    .filter(Boolean)
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function normalizeZendeskSuffix(tail) {
  try {
    tail = decodeURIComponent(tail);
  } catch {
    /* ignore */
  }
  return tail
    .replace(/_/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function walkHtmlFiles(dir, base = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walkHtmlFiles(full, base, acc);
    else if (name.toLowerCase().endsWith(".html")) acc.push(path.relative(base, full));
  }
  return acc;
}

function buildSuffixToSlugMap(htmlFiles) {
  /** @type {Map<string, string[]>} */
  const suffixToSlugs = new Map();

  for (const rel of htmlFiles) {
    const slug = pathToSlug(rel);
    const base = path.basename(rel, path.extname(rel));
    const key = normalizeZendeskSuffix(base);
    if (!suffixToSlugs.has(key)) suffixToSlugs.set(key, []);
    suffixToSlugs.get(key).push(slug);
  }

  /** @type {Map<string, string>} */
  const primary = new Map();
  for (const [key, slugs] of suffixToSlugs) {
    if (slugs.length > 1) {
      console.warn(
        `[convert-help] Ambiguous Zendesk suffix "${key}" -> ${slugs.length} articles; first wins for internal links`
      );
    }
    primary.set(key, slugs[0]);
  }
  return primary;
}

function extractYoutubeId(src) {
  if (!src) return null;
  const m = String(src).match(
    /(?:youtube-nocookie\.com\/embed\/|youtube\.com\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  return m ? m[1] : null;
}

function stripHtmlForDescription(html) {
  const $ = cheerio.load(html);
  $("script, style").remove();
  const text = $.text().replace(/\s+/g, " ").trim();
  return text.length > 200 ? `${text.slice(0, 197)}…` : text;
}

function cleanupDom($) {
  $("script, style").remove();
  $("div.cell.aside").remove();
  $("div.confluence-information-macro:empty").remove();
}

function rewriteHelpLinks(markdown, suffixToSlug) {
  let out = markdown;

  const replaceUrl = (fullUrl) => {
    try {
      const u = new URL(fullUrl);
      if (!u.hostname.includes(HELP_HOST)) return fullUrl;
      ARTICLE_PATH_RE.lastIndex = 0;
      const m = ARTICLE_PATH_RE.exec(u.pathname + u.hash);
      if (!m) return fullUrl;
      const tail = normalizeZendeskSuffix(m[2]);
      const slug = suffixToSlug.get(tail);
      if (!slug) return fullUrl;
      return `/help/${slug}/`;
    } catch {
      return fullUrl;
    }
  };

  out = out.replace(/\]\((https?:\/\/[^)]+)\)/g, (all, url) => {
    const next = replaceUrl(url);
    return next === url ? all : `](${next})`;
  });

  out = out.replace(/^<(https?:\/\/[^>\s]+)>$/gm, (all, url) => {
    const next = replaceUrl(url);
    return next === url ? all : `<${next}>`;
  });

  return out;
}

function htmlToMdxBody(html, suffixToSlug) {
  const $ = cheerio.load(html);
  cleanupDom($);

  $("iframe").each((_, el) => {
    const src = $(el).attr("src") || "";
    const id = extractYoutubeId(src.startsWith("//") ? `https:${src}` : src);
    if (id) {
      // Turndown drops MDX/unknown tags; plain text survives and is swapped below.
      $(el).replaceWith(`<p>YOUTUBE__${id}__END</p>`);
    }
  });

  const td = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
    bulletListMarker: "-",
  });

  td.addRule("strikethrough", {
    filter: ["del", "s"],
    replacement: (content) => `~~${content}~~`,
  });

  let md = td.turndown($.html() || "");

  // Turndown escapes underscores: YOUTUBE\_\_id\_\_END
  md = md.replace(
    /YOUTUBE(?:\\_)+([a-zA-Z0-9_-]+)(?:\\_)+END/g,
    (_m, vid) => `\n\n<YouTubeEmbed videoId="${vid}" />\n\n`
  );
  md = md.replace(
    /YOUTUBE__([a-zA-Z0-9_-]+)__END/g,
    (_m, vid) => `\n\n<YouTubeEmbed videoId="${vid}" />\n\n`
  );

  md = rewriteHelpLinks(md, suffixToSlug);

  // MDX parses `<Foo>` as JSX and `{foo}` as expressions — neutralize common Zendesk placeholders
  md = md.replace(/<Transaction\s+ID>/gi, "`Transaction ID`");

  md = md.replace(/\n{3,}/g, "\n\n").trim();

  return md;
}

function main() {
  const exportDir = process.env.ZENDESK_EXPORT_DIR
    ? path.resolve(process.cwd(), process.env.ZENDESK_EXPORT_DIR)
    : DEFAULT_EXPORT_DIR;

  if (!fs.existsSync(exportDir)) {
    console.error(`Export directory not found: ${exportDir}`);
    process.exit(1);
  }

  const htmlFiles = walkHtmlFiles(exportDir);
  if (htmlFiles.length === 0) {
    console.error(`No HTML files under ${exportDir}`);
    process.exit(1);
  }

  const suffixToSlug = buildSuffixToSlugMap(htmlFiles);

  fs.mkdirSync(OUT_DIR, { recursive: true });

  let wrote = 0;
  for (const rel of htmlFiles) {
    const slug = pathToSlug(rel);
    const fullPath = path.join(exportDir, rel);
    const raw = fs.readFileSync(fullPath, "utf8");

    const parts = rel.replace(/\\/g, "/").split("/");
    const fileBase = parts.pop() || "";
    const sectionFolder = parts.pop() || "";
    const categoryFolder = parts.pop() || "";

    const title = humanizeFilenameBase(fileBase);
    const section = sectionFolder ? humanizePathSegment(sectionFolder) : "";
    const category = categoryFolder ? humanizePathSegment(categoryFolder) : "";

    const description = stripHtmlForDescription(raw) || title;

    const body = htmlToMdxBody(raw, suffixToSlug);

    const fm = [
      "---",
      `title: ${JSON.stringify(title)}`,
      `description: ${JSON.stringify(description)}`,
      `category: ${JSON.stringify(category)}`,
      `section: ${JSON.stringify(section)}`,
      "---",
      "",
      body,
      "",
    ].join("\n");

    const outPath = path.join(OUT_DIR, `${slug}.mdx`);
    fs.writeFileSync(outPath, fm, "utf8");
    wrote += 1;
    console.log(`Wrote ${path.relative(rootDir, outPath)}`);
  }

  console.log(`\nDone. ${wrote} files -> ${path.relative(rootDir, OUT_DIR)}`);
}

main();
