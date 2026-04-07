#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Parse CLI args
const args = process.argv.slice(2);
const flags = {
  dryRun: args.includes('--dry-run'),
  verbose: args.includes('--verbose'),
};

// Stats
const stats = {
  processed: 0,
  logosReused: 0,
  logosDownloaded: 0,
  failed: 0,
};

// Helper: Parse CSV manually (handles quoted fields with embedded commas/newlines)
function parseCSV(csvContent) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;
  let i = 0;

  while (i < csvContent.length) {
    const char = csvContent[i];
    const nextChar = csvContent[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i += 2;
        continue;
      }
      // Toggle quotes
      inQuotes = !inQuotes;
      i++;
      continue;
    }

    if (!inQuotes && char === ',') {
      // End of field
      currentRow.push(currentField);
      currentField = '';
      i++;
      continue;
    }

    if (!inQuotes && (char === '\n' || char === '\r')) {
      // End of row
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \r\n
      }
      currentRow.push(currentField);
      if (currentRow.some(f => f.trim())) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
      i++;
      continue;
    }

    currentField += char;
    i++;
  }

  // Handle last field/row
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    if (currentRow.some(f => f.trim())) {
      rows.push(currentRow);
    }
  }

  // Convert to objects using first row as headers
  if (rows.length === 0) return [];
  const headers = rows[0];
  const data = rows.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });

  return data;
}

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
  try {
    const urlExt = path.extname(new URL(url).pathname).slice(1).toLowerCase();
    if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'avif'].includes(urlExt)) {
      return urlExt;
    }
  } catch {
    // Invalid URL, fallback to default
  }

  return 'png'; // default
}

// Helper: Compute SHA-256 hash of buffer
function computeHash(buffer) {
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

// Helper: Slugify text (for logo filename matching)
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Helper: Find existing logo by name or hash
async function findExistingLogo(slug, title, logoBuffer) {
  const logosDir = path.join(rootDir, 'public/ecosystem-logos');
  
  if (!fs.existsSync(logosDir)) {
    return null;
  }

  const existingFiles = fs.readdirSync(logosDir).filter(f => f.startsWith('logo-'));

  // Strategy 1: Try name match by slug
  const slugMatch = existingFiles.find(f => f.startsWith(`logo-${slug}.`));
  if (slugMatch) {
    if (flags.verbose) console.log(`    ↳ Found by slug match: ${slugMatch}`);
    return slugMatch;
  }

  // Strategy 2: Try name match by kebab-case title
  const titleSlug = slugify(title);
  const titleMatch = existingFiles.find(f => f.startsWith(`logo-${titleSlug}.`));
  if (titleMatch) {
    if (flags.verbose) console.log(`    ↳ Found by title match: ${titleMatch}`);
    return titleMatch;
  }

  // Strategy 3: Hash-based dedupe
  const logoHash = computeHash(logoBuffer);
  
  for (const file of existingFiles) {
    const filePath = path.join(logosDir, file);
    try {
      const existingBuffer = fs.readFileSync(filePath);
      const existingHash = computeHash(existingBuffer);
      
      if (existingHash === logoHash) {
        if (flags.verbose) console.log(`    ↳ Found by hash match: ${file}`);
        return file;
      }
    } catch (err) {
      // Skip files we can't read
      continue;
    }
  }

  return null;
}

// Helper: Download and dedupe logo
async function downloadLogo(url, slug, title) {
  if (!url || !url.startsWith('http')) {
    return null;
  }

  try {
    // Download logo
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const logoBuffer = Buffer.from(await response.arrayBuffer());

    // Check for existing logo (name or hash match)
    const existingFile = await findExistingLogo(slug, title, logoBuffer);
    
    if (existingFile) {
      stats.logosReused++;
      return `/ecosystem-logos/${existingFile}`;
    }

    // No match - save new logo
    const logosDir = path.join(rootDir, 'public/ecosystem-logos');
    if (!flags.dryRun) {
      fs.mkdirSync(logosDir, { recursive: true });
    }

    const contentType = response.headers.get('content-type');
    const ext = getExtensionFromResponse(contentType, url);
    const filename = `logo-${slug}.${ext}`;
    const targetPath = path.join(logosDir, filename);

    if (!flags.dryRun) {
      fs.writeFileSync(targetPath, logoBuffer);
      console.log(`    ↳ Downloaded: ${filename}`);
    } else {
      console.log(`    ↳ [DRY RUN] Would download: ${filename}`);
    }

    stats.logosDownloaded++;
    return `/ecosystem-logos/${filename}`;

  } catch (error) {
    console.warn(`    ⚠️  Failed to download logo: ${url} - ${error.message}`);
    return null;
  }
}

// Helper: Normalize and process a CSV row
async function processRow(row) {
  const slug = row.Slug?.trim();
  const title = row.Title?.trim();
  const logoUrl = row.Logo?.trim();
  const description = row['Supporting text']?.trim() || row.Description?.trim() || '';
  const categoriesRaw = row.Categories?.trim() || '';
  const websiteUrl = row['Website link']?.trim() || '';
  const developer = row.Developer?.trim() || '';
  const goip = row.GOIP?.trim().toLowerCase() === 'true';

  if (!slug || !title) {
    console.warn(`⚠️  Skipping row with missing slug or title: ${JSON.stringify(row).slice(0, 100)}`);
    stats.failed++;
    return null;
  }

  console.log(`📦 Processing: ${slug}`);

  // Parse categories (comma-separated)
  const categories = categoriesRaw
    ? categoriesRaw.split(',').map(c => c.trim()).filter(Boolean)
    : [];

  // Download/dedupe logo
  const logoPath = await downloadLogo(logoUrl, slug, title);

  stats.processed++;

  return {
    slug,
    title,
    description,
    categories,
    logoPath,
    websiteUrl,
    developer,
    goip,
  };
}

// Helper: Generate TypeScript file
function generateTypeScriptFile(items) {
  const lines = [];
  
  lines.push('// Generated by scripts/import-framer-ecosystem.mjs');
  lines.push('// DO NOT EDIT MANUALLY - regenerate by running the import script');
  lines.push('');
  lines.push('export interface EcosystemItem {');
  lines.push('  slug: string;');
  lines.push('  title: string;');
  lines.push('  description: string;');
  lines.push('  categories: string[];');
  lines.push('  logoPath?: string;');
  lines.push('  websiteUrl?: string;');
  lines.push('  developer?: string;');
  lines.push('  goip?: boolean;');
  lines.push('}');
  lines.push('');
  lines.push('export const ecosystemData: EcosystemItem[] = [');
  
  items.forEach((item, idx) => {
    lines.push('  {');
    lines.push(`    slug: ${JSON.stringify(item.slug)},`);
    lines.push(`    title: ${JSON.stringify(item.title)},`);
    lines.push(`    description: ${JSON.stringify(item.description)},`);
    lines.push(`    categories: ${JSON.stringify(item.categories)},`);
    if (item.logoPath) {
      lines.push(`    logoPath: ${JSON.stringify(item.logoPath)},`);
    }
    if (item.websiteUrl) {
      lines.push(`    websiteUrl: ${JSON.stringify(item.websiteUrl)},`);
    }
    if (item.developer) {
      lines.push(`    developer: ${JSON.stringify(item.developer)},`);
    }
    if (item.goip) {
      lines.push(`    goip: true,`);
    }
    lines.push(`  }${idx < items.length - 1 ? ',' : ''}`);
  });
  
  lines.push('];');
  lines.push('');
  
  // Extract unique categories
  const allCategories = new Set();
  items.forEach(item => {
    item.categories.forEach(cat => allCategories.add(cat));
  });
  const sortedCategories = Array.from(allCategories).sort();
  
  lines.push('export const ecosystemCategories = [');
  sortedCategories.forEach((cat, idx) => {
    lines.push(`  ${JSON.stringify(cat)}${idx < sortedCategories.length - 1 ? ',' : ''}`);
  });
  lines.push('] as const;');
  lines.push('');
  
  return lines.join('\n');
}

// Main execution
async function main() {
  console.log('🚀 AR.IO Framer Ecosystem Importer\n');
  
  if (flags.dryRun) {
    console.log('🔍 DRY RUN MODE - no files will be created\n');
  }

  // Read CSV
  const csvPath = path.join(rootDir, '.temp/framer-cms-exports/framer-ecosystem-export.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const rows = parseCSV(csvContent);
  
  console.log(`📊 Found ${rows.length} rows in CSV\n`);

  // Process each row
  const items = [];
  for (const row of rows) {
    const item = await processRow(row);
    if (item) {
      items.push(item);
    }
  }

  // Generate TypeScript file
  if (items.length > 0) {
    const tsContent = generateTypeScriptFile(items);
    const tsPath = path.join(rootDir, 'src/lib/ecosystem.ts');
    
    if (!flags.dryRun) {
      fs.writeFileSync(tsPath, tsContent, 'utf8');
      console.log(`\n✅ Generated: src/lib/ecosystem.ts`);
    } else {
      console.log(`\n✅ [DRY RUN] Would generate: src/lib/ecosystem.ts`);
    }
  }

  // Print stats
  console.log('\n📈 Import Summary:');
  console.log(`   Processed: ${stats.processed}`);
  console.log(`   Logos reused: ${stats.logosReused}`);
  console.log(`   Logos downloaded: ${stats.logosDownloaded}`);
  console.log(`   Failed: ${stats.failed}`);
  console.log(`   Total items: ${items.length}`);
  console.log('');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
