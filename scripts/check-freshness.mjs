import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { guides } from '../guides.mjs';

const DAY = 24 * 60 * 60 * 1000;
const MAX_AGE_DAYS = 30;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function dateStatus(value, today) {
  if (!value) return { status: 'unverified', ageDays: null };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return { status: 'invalid-date', ageDays: null };
  const timestamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    return { status: 'invalid-date', ageDays: null };
  }
  const ageDays = Math.floor((Date.parse(`${today}T00:00:00Z`) - timestamp) / DAY);
  return { status: ageDays < 0 ? 'future-date' : ageDays > MAX_AGE_DAYS ? 'overdue' : 'within-window', ageDays };
}

function isHttpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function inspectPage(path, content, format, today) {
  let verified;
  let sources;
  const problems = [];
  if (format === 'astro') {
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)?.[1];
    if (!frontmatter) {
      return { path, format, verified: null, status: 'invalid-metadata', ageDays: null, sources: [], problems: ['Missing frontmatter'] };
    }
    const dates = [...frontmatter.matchAll(/^verified:\s*["']?([^"'\s]+)["']?\s*$/gm)];
    if (dates.length > 1) problems.push('Multiple verified dates');
    verified = dates[0]?.[1] ?? null;
    const blocks = [...frontmatter.matchAll(/^sources:\s*\r?\n((?:[ \t]+.*\r?\n?)*)/gm)];
    if (blocks.length !== 1) problems.push('Expected one sources list');
    const lines = (blocks[0]?.[1] ?? '').split(/\r?\n/).filter((line) => line.trim());
    sources = lines.map((line) => line.match(/^\s+-\s+["']?([^"'\s]+)["']?\s*$/)?.[1] ?? '');
    if (sources.length === 0 || sources.some((url) => !isHttpsUrl(url))) {
      problems.push('Missing, invalid or non-HTTPS source');
    }
  } else {
    const dates = [...content.matchAll(/<!--\s*freshness-verified:\s*([^\s]+)\s*-->/g)];
    if (dates.length > 1) problems.push('Multiple freshness-verified dates');
    verified = dates[0]?.[1] ?? null;
    sources = [...new Set([...content.matchAll(/\bhref\s*=\s*["'](https?:\/\/[^"']+)["']/gi)]
      .map((match) => match[1].replaceAll('&amp;', '&')))];
    if (sources.length === 0 || sources.some((url) => !isHttpsUrl(url))) {
      problems.push('Missing, invalid or non-HTTPS candidate link');
    }
  }
  const date = dateStatus(verified, today);
  return { path, format, verified, ...date, sources, problems };
}

function pageFiles(directory, suffix, recursive) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (recursive && entry.isDirectory()) return pageFiles(path, suffix, true);
    return entry.isFile() && entry.name.endsWith(suffix) ? [path] : [];
  }).sort();
}

export function inventory(base, guideList, today = new Date().toISOString().slice(0, 10)) {
  const pages = [];
  for (const guide of guideList) {
    const directory = guide.type === 'astro'
      ? join(base, 'guides', guide.name, 'src', 'content', 'guide')
      : join(base, 'guides', guide.name);
    if (!['astro', 'static'].includes(guide.type)) throw new Error(`Unknown guide type: ${guide.type}`);
    const suffix = guide.type === 'astro' ? '.md' : '.html';
    const files = pageFiles(directory, suffix, guide.type === 'astro');
    if (!files.length) throw new Error(`No ${suffix} pages found in ${directory}`);
    for (const path of files) {
      pages.push(inspectPage(relative(base, path).replaceAll('\\', '/'), readFileSync(path, 'utf8'), guide.type, today));
    }
  }
  return { checkedOn: today, maxAgeDays: MAX_AGE_DAYS, pages };
}

function main() {
  const args = process.argv.slice(2);
  if (args.some((arg) => arg !== '--json')) throw new Error('Usage: node scripts/check-freshness.mjs [--json]');
  const report = inventory(root, guides);
  const flagged = report.pages.filter((page) => page.status !== 'within-window' || page.problems.length);
  if (args.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    for (const page of flagged) {
      console.log(`${page.path}: ${page.status}${page.problems.length ? ` (${page.problems.join('; ')})` : ''}`);
    }
    console.log(`${flagged.length} of ${report.pages.length} pages require attention; dates do not prove source accuracy.`);
  }
  if (flagged.length) process.exitCode = 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    main();
  } catch (error) {
    console.error(`Freshness check failed: ${error.message}`);
    process.exitCode = 1;
  }
}
