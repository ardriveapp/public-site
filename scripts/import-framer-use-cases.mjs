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
  noLogos: args.includes('--no-logos'),
  slug: args.find((arg, i) => args[i - 1] === '--slug'),
  limit: parseInt(args.find((arg, i) => args[i - 1] === '--limit') || '0', 10),
};

// Stats
const stats = {
  created: 0,
  skipped: 0,
  failed: 0,
  assetsDownloaded: 0,
  assetsSkipped: 0,
  logosDownloaded: 0,
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
async function processInlineImages(html, slug, useCaseDir) {
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
    const targetPath = path.join(useCaseDir, filename);
    const localUrl = `/use-cases/${slug}/${filename}`;

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

// Helper: Parse Framer HTML export to extract logo/avatar images per slug
function extractLogosFromFramerHTML() {
  const htmlPath = path.join(rootDir, '.temp/framer-site-export/use-cases/page.html');
  
  if (!fs.existsSync(htmlPath)) {
    console.warn('⚠️  Framer HTML export not found, skipping logo extraction');
    return new Map();
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const $ = cheerio.load(html);
  const logosMap = new Map(); // slug → [imageUrls...]

  // Find all use-case links and their associated logo containers
  // The HTML structure has links like href="./decentralized-ai" followed by avatar divs
  $('a[href^="./"]').each((_, link) => {
    const href = $(link).attr('href');
    if (!href || href === './' || href === './get-started') return;
    
    const slug = href.replace('./', '').replace(/\/$/, '');
    if (!slug) return;

    // Look for the "Reviews" or "Avatars" container near this link
    // In the Framer export, logos are in nearby divs with data-framer-name="Avatars"
    const parentContent = $(link).closest('[data-framer-name="Content"]');
    const avatarsContainer = parentContent.find('[data-framer-name="Avatars"]');
    
    if (avatarsContainer.length > 0) {
      const logos = [];
      avatarsContainer.find('img').each((_, img) => {
        const src = $(img).attr('src');
        if (src && src.startsWith('https://framerusercontent.com/')) {
          logos.push(src);
        }
      });
      
      if (logos.length > 0) {
        logosMap.set(slug, logos);
      }
    }
  });

  console.log(`📸 Found logos for ${logosMap.size} use cases`);
  return logosMap;
}

// Helper: Download logos for a use case
async function downloadLogos(slug, logoUrls, useCaseDir) {
  if (!logoUrls || logoUrls.length === 0) return [];

  const logosDir = path.join(useCaseDir, 'logos');
  if (!flags.dryRun) {
    fs.mkdirSync(logosDir, { recursive: true });
  }

  const localLogos = [];

  for (let i = 0; i < logoUrls.length; i++) {
    const url = logoUrls[i];
    const hash = crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      const ext = getExtensionFromResponse(contentType, url);
      const filename = `logo-${i + 1}-${hash}.${ext}`;
      const targetPath = path.join(logosDir, filename);
      const localUrl = `/use-cases/${slug}/logos/${filename}`;

      if (!flags.dryRun) {
        await downloadImage(url, targetPath);
        stats.logosDownloaded++;
      } else {
        console.log(`    ↳ [DRY RUN] Would download logo: ${filename}`);
      }
      
      localLogos.push(localUrl);
    } catch (error) {
      console.warn(`    ⚠️  Failed to download logo: ${url} - ${error.message}`);
      // Continue with other logos even if one fails
    }
  }

  return localLogos;
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

// Main import function
async function importUseCase(row, logosMap) {
  const slug = row.Slug;
  const title = row.Title;
  const description = normalizeDescription(row.Description);
  const content = row.Content;

  // Validate required fields
  if (!slug || !title || !content) {
    console.error(`❌ Missing required fields for row: ${JSON.stringify(row)}`);
    stats.failed++;
    return;
  }

  const mdxPath = path.join(rootDir, 'content/use-cases', `${slug}.mdx`);
  
  // Skip if exists
  if (fs.existsSync(mdxPath)) {
    console.log(`⏭️  Skipped (exists): ${slug}`);
    stats.skipped++;
    return;
  }

  console.log(`\n📝 Processing: ${slug}`);

  const useCaseDir = path.join(rootDir, 'public/use-cases', slug);
  
  if (!flags.dryRun) {
    fs.mkdirSync(useCaseDir, { recursive: true });
  }

  // Download logos if available and not disabled
  let localLogos = [];
  if (!flags.noLogos && logosMap.has(slug)) {
    const logoUrls = logosMap.get(slug);
    console.log(`  📸 Found ${logoUrls.length} logo(s) for ${slug}`);
    localLogos = await downloadLogos(slug, logoUrls, useCaseDir);
  }

  // Process inline images
  let urlMap = new Map();
  if (!flags.dryRun) {
    urlMap = await processInlineImages(content, slug, useCaseDir);
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
  // Note: heroImage would be added here if we had a way to derive it
  frontmatter.push('---');
  frontmatter.push('');

  // Add logos section if we have any
  let logosSection = '';
  if (localLogos.length > 0) {
    logosSection = '<div className="not-prose flex gap-4 mb-8 flex-wrap">\n';
    for (const logoUrl of localLogos) {
      logosSection += `  <img src="${logoUrl}" alt="Project logo" className="h-12 w-12 object-contain rounded-lg border border-gray-800" />\n`;
    }
    logosSection += '</div>\n\n';
  }

  const mdxContent = frontmatter.join('\n') + logosSection + markdownContent;

  // Write MDX file
  if (!flags.dryRun) {
    fs.writeFileSync(mdxPath, mdxContent, 'utf8');
    console.log(`✅ Created: ${slug}.mdx`);
    stats.created++;
  } else {
    console.log(`    ↳ [DRY RUN] Would create: ${slug}.mdx`);
  }
}

// Main execution
async function main() {
  console.log('🚀 AR.IO Framer Use Cases Importer\n');
  
  if (flags.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be created\n');
  }

  if (flags.noLogos) {
    console.log('🚫 Logo extraction disabled\n');
  }

  const csvPath = path.join(rootDir, '.temp/articles/framer-use-cases-export.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  // Extract logos from Framer HTML export
  const logosMap = flags.noLogos ? new Map() : extractLogosFromFramerHTML();

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

  console.log(`📊 Processing ${rows.length} use case(s)...\n`);

  // Process each row
  for (const row of rows) {
    try {
      await importUseCase(row, logosMap);
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
  console.log(`   Failed: ${stats.failed}`);
  console.log(`   Assets Downloaded: ${stats.assetsDownloaded}`);
  console.log(`   Assets Skipped: ${stats.assetsSkipped}`);
  console.log(`   Logos Downloaded: ${stats.logosDownloaded}`);
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

