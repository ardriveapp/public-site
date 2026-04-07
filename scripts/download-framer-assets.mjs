#!/usr/bin/env node
/**
 * download-framer-assets.mjs
 *
 * Scans Framer HTML exports, extracts all framerusercontent.com image URLs,
 * and downloads them to public/<page>/ directories.
 *
 * Usage:
 *   node scripts/download-framer-assets.mjs              # all pages
 *   node scripts/download-framer-assets.mjs --page home  # homepage only
 *   node scripts/download-framer-assets.mjs --dry-run    # preview only
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const PAGE_FILTER = args.find((a, i) => args[i - 1] === '--page');

// Map of HTML filename (without .html) → public output directory
const PAGE_MAP = {
  'index':       'home',
  'developers':  'developers',
  'pricing':     'pricing',
  'learn':       'learn',
  'enterprise':  'enterprise',
  'contact':     'contact',
  'start':       'start',
  'arfs':        'arfs',
  'manifests':   'manifests',
  'pins':        'pins',
  'ardrive-difference': 'ardrive-difference',
  'universal-data-license': 'universal-data-license',
};

const stats = { downloaded: 0, skipped: 0, failed: 0 };

function getExtension(contentType, url) {
  const mime = {
    'image/png': 'png', 'image/jpeg': 'jpg', 'image/jpg': 'jpg',
    'image/gif': 'gif', 'image/webp': 'webp',
    'image/svg+xml': 'svg', 'image/avif': 'avif',
  };
  if (contentType) {
    const base = contentType.split(';')[0].trim();
    if (mime[base]) return mime[base];
  }
  const ext = path.extname(new URL(url).pathname).slice(1).toLowerCase();
  return ['png','jpg','jpeg','gif','webp','svg','avif'].includes(ext) ? ext : 'png';
}

async function downloadAsset(url, destPath) {
  if (fs.existsSync(destPath)) {
    console.log(`  ⏭  skip  ${path.basename(destPath)}`);
    stats.skipped++;
    return;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const tmp = destPath + '.tmp';
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, destPath);
    console.log(`  ✅ saved  ${path.basename(destPath)}  (${(buf.length / 1024).toFixed(0)} KB)`);
    stats.downloaded++;
  } catch (err) {
    console.error(`  ❌ fail   ${url}\n     ${err.message}`);
    stats.failed++;
  }
}

function extractImageUrls(html) {
  const seen = new Set();
  const urls = [];
  // Match framerusercontent image URLs (base URL only — strip query params)
  const re = /https:\/\/framerusercontent\.com\/images\/([A-Za-z0-9_\-\.]+\.(png|jpg|jpeg|gif|webp|svg|avif))/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const base = `https://framerusercontent.com/images/${m[1]}`;
    if (!seen.has(base)) {
      seen.add(base);
      urls.push(base);
    }
  }
  return urls;
}

async function processPage(htmlFile, outputDir) {
  const html = fs.readFileSync(htmlFile, 'utf8');
  const urls = extractImageUrls(html);

  if (urls.length === 0) {
    console.log(`  (no images found)`);
    return;
  }

  console.log(`  Found ${urls.length} unique image(s)`);

  if (!DRY_RUN) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const url of urls) {
    const filename = path.basename(new URL(url).pathname);

    if (DRY_RUN) {
      console.log(`  [dry] ${filename}`);
      continue;
    }

    // HEAD request to get content-type for correct extension
    let ext;
    try {
      const head = await fetch(url, { method: 'HEAD' });
      ext = getExtension(head.headers.get('content-type'), url);
    } catch {
      ext = getExtension(null, url);
    }

    // Use the Framer hash as the filename — no collisions, stable across runs
    const hashBase = filename.replace(/\.[^.]+$/, ''); // strip extension
    const destPath = path.join(outputDir, `${hashBase}.${ext}`);
    await downloadAsset(url, destPath);
  }
}

async function main() {
  const exportsDir = path.join(rootDir, '.temp/framer-exports/ardrive.io');

  if (!fs.existsSync(exportsDir)) {
    console.error(`❌ Exports directory not found: ${exportsDir}`);
    process.exit(1);
  }

  if (DRY_RUN) console.log('🔍 DRY RUN — no files will be written\n');

  const entries = Object.entries(PAGE_MAP).filter(([slug]) =>
    PAGE_FILTER ? slug === PAGE_FILTER : true
  );

  for (const [slug, outDir] of entries) {
    const htmlPath = path.join(exportsDir, `${slug}.html`);

    if (!fs.existsSync(htmlPath)) {
      // Some pages use index.html inside a subdirectory
      const altPath = path.join(exportsDir, slug, 'index.html');
      if (!fs.existsSync(altPath)) {
        console.log(`⚠️  ${slug}.html not found — skipping`);
        continue;
      }
    }

    const resolvedHtml = fs.existsSync(path.join(exportsDir, `${slug}.html`))
      ? path.join(exportsDir, `${slug}.html`)
      : path.join(exportsDir, slug, 'index.html');

    const outputPath = path.join(rootDir, 'public', outDir);
    console.log(`\n📄 ${slug} → public/${outDir}/`);
    await processPage(resolvedHtml, outputPath);
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`Downloaded: ${stats.downloaded}  Skipped: ${stats.skipped}  Failed: ${stats.failed}`);
  console.log('─'.repeat(50));
}

main().catch(err => {
  console.error('💥', err);
  process.exit(1);
});
