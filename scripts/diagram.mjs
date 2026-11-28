// Derive a lesson diagram's dark HTML and both SVG exports from its hand-authored light HTML.
// Usage (from a guide directory): node ../../scripts/diagram.mjs <slug> [--png <out.png>]
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const [slug, flag, png] = process.argv.slice(2);
if (!slug) throw new Error('Usage: node ../../scripts/diagram.mjs <slug> [--png <out.png>]');
const colors = [
  ['#f3f5f7', '#07090d'], ['#ffffff', '#0d1117'], ['#1f2328', '#f0f6fc'],
  ['#59636e', '#9198a1'], ['#1a7f37', '#3fb950'], ['#eaf6ed', '#102219'],
  ['#d1d9e0', '#3d444d'],
];
const { title, description } = JSON.parse(readFileSync('src/diagrams.json', 'utf8'))[slug] ?? {};
if (!title) throw new Error(`${slug} is missing from src/diagrams.json`);
const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const light = readFileSync(`public/diagrams/${slug}.light.html`, 'utf8');
for (const expected of [`<title id="${slug}-light-title">${escape(title)}</title>`, `<desc id="${slug}-light-desc">${escape(description)}</desc>`, `aria-labelledby="${slug}-light-title ${slug}-light-desc"`]) {
  if (!light.includes(expected)) throw new Error(`${slug}.light.html must contain ${expected}`);
}
let dark = light.replaceAll(`${slug}-light-`, `${slug}-dark-`);
for (const [from, to] of colors) dark = dark.replaceAll(from, to);
writeFileSync(`public/diagrams/${slug}.dark.html`, dark);

for (const [theme, html] of [['light', light], ['dark', dark]]) {
  const svg = html.match(/<svg\b[\s\S]*<\/svg>/)?.[0];
  if (!svg || !/viewBox="0 0 704 \d+"/.test(svg)) throw new Error(`${slug}.${theme}: needs one <svg viewBox="0 0 704 H">`);
  const prefix = `${slug}-${theme}-`;
  const ids = [...svg.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]).filter(id => !id.startsWith(prefix));
  let out = svg.replace('<svg ', `<svg id="${prefix}root" `);
  for (const id of ids) out = out.replaceAll(`id="${id}"`, `id="${prefix}${id}"`).replaceAll(`url(#${id})`, `url(#${prefix}${id})`);
  writeFileSync(`public/diagrams/${slug}.${theme}.svg`, `<?xml version="1.0" encoding="UTF-8"?>\n${out}\n`);
}

if (flag === '--png') {
  // Local visual check only: Puppeteer from the global mermaid-cli install with Edge.
  const require = createRequire(`${process.env.APPDATA}/npm/node_modules/@mermaid-js/mermaid-cli/`);
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  const page = await browser.newPage();
  await page.setViewport({ width: 704, height: 400, deviceScaleFactor: 2 });
  await page.goto(`file:///${process.cwd().replaceAll('\\', '/')}/public/diagrams/${slug}.light.svg`);
  await page.screenshot({ path: png, fullPage: true });
  await browser.close();
}
console.log(`${slug}: dark HTML and SVG exports written`);
