import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const guidesRoot = resolve(root, 'guides');
const errors = [];
const guideEntries = await readdir(guidesRoot, { withFileTypes: true });

async function findLegacyFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name === '.astro') continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) await findLegacyFiles(path);
    else if (/\.excalidraw(?:\.json)?$/i.test(entry.name)) errors.push(`Legacy drawing asset: ${path.slice(root.length + 1)}`);
  }
}

function inspectSvg(svg, label) {
  const opening = svg.match(/<svg\b[^>]*>/i)?.[0];
  if (!opening) {
    errors.push(`${label}: missing SVG root`);
    return;
  }
  const body = svg.slice(svg.indexOf(opening) + opening.length);
  const title = body.match(/^\s*<title\b[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/title>/i);
  const desc = body.match(/^\s*<title\b[^>]*>[\s\S]*?<\/title>\s*<desc\b[^>]*id="([^"]+)"[^>]*>[\s\S]*?<\/desc>/i);
  const labelledBy = opening.match(/\baria-labelledby="([^"]+)"/i)?.[1]?.split(/\s+/) ?? [];
  if (!/\brole="img"/i.test(opening) || labelledBy.length !== 2 || !title || !desc ||
      title[1] !== labelledBy[0] || desc[1] !== labelledBy[1]) {
    errors.push(`${label}: SVG needs a first-child title, description and matching accessible name`);
  }
}

async function inspectDiagramFolder(folder) {
  const files = new Set(await readdir(folder));
  for (const name of files) {
    if (!/\.(?:light|dark)\.(?:html|svg)$/i.test(name)) continue;
    const match = name.match(/^(.*)\.(light|dark)\.(html|svg)$/i);
    const [, slug, theme, extension] = match;
    if (!files.has(`${slug}.${theme === 'light' ? 'dark' : 'light'}.${extension}`)) {
      errors.push(`${folder.slice(root.length + 1)}\\${name}: missing paired theme asset`);
    }

    const content = await readFile(resolve(folder, name), 'utf8');
    if (/excalidraw/i.test(content)) errors.push(`${folder.slice(root.length + 1)}\\${name}: legacy Excalidraw reference`);
    if (extension === 'svg') {
      inspectSvg(content, `${folder.slice(root.length + 1)}\\${name}`);
    } else if (slug === 'grafana-dashboard') {
      if (!/class="dashboard-figure"/.test(content) || /<script\b/i.test(content)) {
        errors.push(`${folder.slice(root.length + 1)}\\${name}: dashboard must remain a static semantic HTML figure`);
      }
    } else {
      const svg = content.match(/<svg\b[\s\S]*?<\/svg>/i)?.[0];
      if (!svg || !/overflow-x:\s*auto/i.test(content)) {
        errors.push(`${folder.slice(root.length + 1)}\\${name}: expected inline SVG and a local scroll container`);
      } else {
        inspectSvg(svg, `${folder.slice(root.length + 1)}\\${name}`);
      }
      if (/<script\b|<iframe\b/i.test(content) || /<(?:img|script|iframe)\b[^>]*(?:src|href)="https?:/i.test(content)) {
        errors.push(`${folder.slice(root.length + 1)}\\${name}: diagram must be static and self-contained`);
      }
    }
  }

  for (const name of files) {
    if (!/^(.*)\.(light|dark)\.svg$/i.test(name)) continue;
    const [, slug, theme] = name.match(/^(.*)\.(light|dark)\.svg$/i);
    if (!files.has(`${slug}.${theme}.html`)) errors.push(`${folder.slice(root.length + 1)}\\${name}: missing HTML source`);
  }
}

await findLegacyFiles(guidesRoot);
for (const guide of guideEntries.filter((entry) => entry.isDirectory())) {
  const folder = resolve(guidesRoot, guide.name, 'public', 'diagrams');
  try {
    await inspectDiagramFolder(folder);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

for (const manifest of [
  resolve(root, 'package.json'),
  ...guideEntries.filter((entry) => entry.isDirectory()).map((guide) => resolve(guidesRoot, guide.name, 'package.json')),
]) {
  try {
    const pkg = JSON.parse(await readFile(manifest, 'utf8'));
    if (pkg.dependencies?.['@excalidraw/excalidraw'] || pkg.devDependencies?.['@excalidraw/excalidraw']) {
      errors.push(`${manifest.slice(root.length + 1)}: remove the Excalidraw package dependency`);
    }
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Diagram source/theme pairs, accessible SVGs, self-contained embeds and legacy-asset checks passed.');
}
