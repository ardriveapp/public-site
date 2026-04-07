#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import Papa from 'papaparse';
import TurndownService from 'turndown';
import * as cheerio from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
const flags = {
  dryRun: args.includes('--dry-run'),
  includeDrafts: args.includes('--include-drafts'),
  slug: args.find((arg, i) => args[i - 1] === '--slug'),
  limit: parseInt(args.find((arg, i) => args[i - 1] === '--limit') || '0', 10),
};

// Stats
const stats = {
  created: 0,
  skipped: 0,
  skippedDrafts: 0,
  failed: 0,
  assetsDownloaded: 0,
  assetsSkipped: 0,
};

// Configure Turndown for HTML → Markdown conversion
const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
});

// Keep some HTML elements as-is (video, complex structures)
turndown.keep(['video', 'iframe']);

// Helper: Get file extension from Content-Type or URL
function getExtensionFromResponse(contentType, url) {
  const mimeMap = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/avif': 'avif',
  };

  if (contentType && mimeMap[contentType.split(';')[0].trim()]) {
    return mimeMap[contentType.split(';')[0].trim()];
  }

  // Fallback to URL extension
  const urlExt = path.extname(new URL(url).pathname).slice(1).toLowerCase();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'].includes(urlExt)) {
    return urlExt;
  }

  return 'png'; // default
}

// Helper: Download image with strict error handling
async function downloadImage(url, targetPath) {
  if (fs.existsSync(targetPath)) {
    console.log(`    ↳ Skipped (exists): ${path.basename(targetPath)}`);
    stats.assetsSkipped++;
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    const tempPath = `${targetPath}.tmp`;
    
    // Write to temp file first
    fs.writeFileSync(tempPath, buffer);
    
    // Move to final location
    fs.renameSync(tempPath, targetPath);
    
    console.log(`    ↳ Downloaded: ${path.basename(targetPath)}`);
    stats.assetsDownloaded++;
  } catch (error) {
    console.error(`\n❌ Failed to download image: ${url}`);
    console.error(`   Error: ${error.message}`);
    throw new Error(`Strict mode: Image download failed for ${url}`);
  }
}

// Helper: Extract and download inline images from HTML
async function processInlineImages(html, slug, caseStudyDir) {
  const $ = cheerio.load(html);
  const images = $('img');
  const urlMap = new Map(); // original URL → local path

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const src = $(img).attr('src');
    
    if (!src || src.startsWith('/') || src.startsWith('#')) {
      continue; // Skip relative or anchor links
    }

    try {
      new URL(src); // Validate it's a full URL
    } catch {
      continue;
    }

    // Generate stable filename from URL hash
    const hash = crypto.createHash('md5').update(src).digest('hex').slice(0, 8);
    const response = await fetch(src, { method: 'HEAD' });
    const contentType = response.headers.get('content-type');
    const ext = getExtensionFromResponse(contentType, src);
    const filename = `img-${hash}.${ext}`;
    const targetPath = path.join(caseStudyDir, filename);
    const localUrl = `/case-studies/${slug}/${filename}`;

    await downloadImage(src, targetPath);
    urlMap.set(src, localUrl);
  }

  return urlMap;
}

// Helper: Rewrite image URLs in content
function rewriteImageUrls(content, urlMap) {
  let rewritten = content;
  for (const [originalUrl, localUrl] of urlMap.entries()) {
    // Escape special regex characters in URL
    const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    rewritten = rewritten.replace(new RegExp(escapedUrl, 'g'), localUrl);
  }
  return rewritten;
}

// Helper: Normalize description (collapse whitespace, trim)
function normalizeDescription(desc) {
  if (!desc) return '';
  
  // Collapse whitespace and newlines
  return desc
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300); // Reasonable meta description length
}

// Helper: Normalize date to YYYY-MM-DD format
function normalizeDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } catch {
    return dateString; // Return as-is if parsing fails
  }
}

// Main import function
async function importCaseStudy(row) {
  const slug = row.Slug;
  const title = row.Title;
  const description = normalizeDescription(row['Description text']);
  const content = row.Content;
  const date = normalizeDate(row.Date);
  const coverImageUrl = row.Cover;
  const isDraft = row[':draft'] === 'true';

  // Skip drafts unless --include-drafts is set
  if (isDraft && !flags.includeDrafts) {
    console.log(`⏭️  Skipped (draft): ${slug}`);
    stats.skippedDrafts++;
    return;
  }

  // Validate required fields
  if (!slug || !title || !content) {
    console.error(`❌ Missing required fields for row: ${JSON.stringify(row)}`);
    stats.failed++;
    return;
  }

  const mdxPath = path.join(rootDir, 'content/case-studies', `${slug}.mdx`);
  
  // Skip if exists
  if (fs.existsSync(mdxPath)) {
    console.log(`⏭️  Skipped (exists): ${slug}`);
    stats.skipped++;
    return;
  }

  console.log(`\n📝 Processing: ${slug}${isDraft ? ' (draft)' : ''}`);

  const caseStudyDir = path.join(rootDir, 'public/case-studies', slug);
  
  if (!flags.dryRun) {
    fs.mkdirSync(caseStudyDir, { recursive: true });
  }

  // Download cover image (hero)
  let heroImagePath = '';
  if (coverImageUrl) {
    try {
      const response = await fetch(coverImageUrl, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      const ext = getExtensionFromResponse(contentType, coverImageUrl);
      const heroFilename = `hero.${ext}`;
      const heroTargetPath = path.join(caseStudyDir, heroFilename);
      heroImagePath = `/case-studies/${slug}/${heroFilename}`;

      if (!flags.dryRun) {
        await downloadImage(coverImageUrl, heroTargetPath);
      } else {
        console.log(`    ↳ [DRY RUN] Would download hero: ${heroFilename}`);
      }
    } catch (error) {
      console.warn(`    ⚠️  Failed to download cover image: ${error.message}`);
      // Continue without hero image
    }
  }

  // Process inline images
  let urlMap = new Map();
  if (!flags.dryRun) {
    urlMap = await processInlineImages(content, slug, caseStudyDir);
  }

  // Fix React-incompatible HTML attributes before conversion
  let cleanedContent = content
    .replace(/playsinline=""/g, 'playsInline')
    .replace(/playsinline/g, 'playsInline')
    // Strip inline Framer-specific styles that are noisy
    .replace(/style="[^"]*--framer[^"]*"/g, '');

  // Convert HTML to Markdown
  let markdownContent = turndown.turndown(cleanedContent);
  
  // Rewrite image URLs in converted content
  markdownContent = rewriteImageUrls(markdownContent, urlMap);

  // Build frontmatter
  const frontmatter = [];
  frontmatter.push('---');
  frontmatter.push(`title: "${title.replace(/"/g, '\\"')}"`);
  frontmatter.push(`description: "${description.replace(/"/g, '\\"')}"`);
  if (date) {
    frontmatter.push(`date: "${date}"`);
  }
  if (heroImagePath) {
    frontmatter.push(`heroImage: "${heroImagePath}"`);
  }
  frontmatter.push('---');
  frontmatter.push('');

  const mdxContent = frontmatter.join('\n') + markdownContent;

  // Write MDX file
  if (!flags.dryRun) {
    // Ensure content/case-studies directory exists
    fs.mkdirSync(path.join(rootDir, 'content/case-studies'), { recursive: true });
    fs.writeFileSync(mdxPath, mdxContent, 'utf8');
    console.log(`✅ Created: ${slug}.mdx`);
    stats.created++;
  } else {
    console.log(`    ↳ [DRY RUN] Would create: ${slug}.mdx`);
  }
}

// Main execution
async function main() {
  console.log('🚀 AR.IO Framer Case Studies Importer\n');
  
  if (flags.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be created\n');
  }

  if (flags.includeDrafts) {
    console.log('📝 Including draft case studies\n');
  }

  const csvPath = path.join(rootDir, '.temp/framer-cms-exports/framer-case-studies-export.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  // Read and parse CSV
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const parsed = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
  });

  let rows = parsed.data;

  // Apply filters
  if (flags.slug) {
    rows = rows.filter(row => row.Slug === flags.slug);
    console.log(`🔎 Filtering to slug: ${flags.slug}\n`);
  }

  if (flags.limit > 0) {
    rows = rows.slice(0, flags.limit);
    console.log(`🔎 Limiting to first ${flags.limit} rows\n`);
  }

  console.log(`📊 Processing ${rows.length} case study(ies)...\n`);

  // Process each row
  for (const row of rows) {
    try {
      await importCaseStudy(row);
    } catch (error) {
      console.error(`\n❌ Failed to import ${row.Slug}:`);
      console.error(`   ${error.message}\n`);
      stats.failed++;
      
      // Exit in strict mode
      console.error('⛔ Exiting due to strict mode error');
      process.exit(1);
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 Import Summary:');
  console.log(`   Created: ${stats.created}`);
  console.log(`   Skipped: ${stats.skipped}`);
  console.log(`   Skipped (drafts): ${stats.skippedDrafts}`);
  console.log(`   Failed: ${stats.failed}`);
  console.log(`   Assets Downloaded: ${stats.assetsDownloaded}`);
  console.log(`   Assets Skipped: ${stats.assetsSkipped}`);
  console.log('='.repeat(60) + '\n');

  if (stats.failed > 0) {
    console.error('❌ Import completed with errors');
    process.exit(1);
  } else {
    console.log('✅ Import completed successfully!');
  }
}

main().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});

