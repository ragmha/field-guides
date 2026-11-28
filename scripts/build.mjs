import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { guides, platformReferences } from '../guides.mjs';
import { copyOutput } from './copy-output.mjs';

const sites = [{ name: 'hub', type: 'astro' }, ...guides, ...platformReferences];
const sourceOf = guide => (guide.name === 'hub' ? 'hub' : `guides/${guide.workspace ?? guide.name}`);
const locales = existsSync('i18n') ? readdirSync('i18n').filter(locale => /^[a-z]{2}$/.test(locale)) : [];

function build(root, out, base) {
  mkdirSync(out, { recursive: true });
  cpSync(join(root, 'shared/reading-progress.js'), join(out, 'reading-progress.js'));
  const builtWorkspaces = new Set();
  for (const guide of sites) {
    const { name, type } = guide;
    const source = join(root, sourceOf(guide));
    if (builtWorkspaces.has(source)) continue;
    builtWorkspaces.add(source);
    const target = name === 'hub' || guide.workspace ? out : join(out, name);
    if (type === 'astro') {
      const result = spawnSync('bun', ['run', 'build'], { cwd: source, stdio: 'inherit', env: { ...process.env, SITE_BASE: base } });
      if (result.error) throw result.error;
      if (result.status !== 0) process.exit(result.status ?? 1);
      if (guide.workspace) {
        for (const entry of guides.filter(entry => entry.workspace === guide.workspace)) {
          if (!existsSync(join(source, 'dist', entry.name, 'index.html'))) {
            throw new Error(`Missing output for ${entry.name} in ${source}/dist`);
          }
        }
      }
      copyOutput(join(source, 'dist'), target);
    } else {
      // ponytail: static guides need copying, not a bundler.
      mkdirSync(target, { recursive: true });
      for (const entry of readdirSync(source)) {
        if (/\.(html|css|js)$/.test(entry) || ['assets', 'licenses'].includes(entry)) {
          cpSync(join(source, entry), join(target, entry), { recursive: true });
        }
      }
    }
    if (target !== out) cpSync(join(root, 'shared/reading-progress.js'), join(target, 'reading-progress.js'));
  }
}

// Translations are an overlay: i18n/<locale>/ mirrors source paths, and untranslated files fall back to English.
function buildLocale(locale) {
  const work = resolve('.i18n-build', locale);
  const packageSources = [...new Set(sites.filter(guide => guide.type === 'astro').map(sourceOf))];
  const links = packageSources.map(source => join(work, source, 'node_modules'));
  const unlink = () => links.forEach(path => { try { if (lstatSync(path).isSymbolicLink()) unlinkSync(path); } catch {} });
  unlink();
  rmSync(work, { recursive: true, force: true });
  try {
    for (const entry of ['guides.mjs', 'shared', 'hub', 'guides']) {
      cpSync(entry, join(work, entry), { recursive: true, filter: path => !/[\\/](node_modules|dist|\.astro)$/.test(path) });
    }
    cpSync('guides.mjs', join(work, 'guides.en.mjs'));
    for (const source of packageSources) {
      const modules = resolve(source, 'node_modules');
      if (existsSync(modules)) symlinkSync(modules, join(work, source, 'node_modules'), 'junction');
    }
    cpSync(join('i18n', locale), work, { recursive: true });
    build(work, join('dist', locale), `/field-guides/${locale}`);
  } finally {
    unlink();
  }
}

function pages(directory, relative = '') {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const path = relative ? `${relative}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return relative === '' && locales.includes(entry.name) ? [] : pages(join(directory, entry.name), path);
    return entry.name.endsWith('.html') ? [path] : [];
  });
}

function link(html, to, href) {
  const url = `/field-guides/${href.replace(/(^|\/)index\.html$/, '$1')}`;
  const current = to === 'en' ? 'fi' : 'en';
  const hasHeader = /<header(?:\s|>)/i.test(html);
  const assets = hasHeader
    ? '<link rel="stylesheet" href="/field-guides/language-switch.css" /><script type="module" src="/field-guides/language-switch.js"></script>'
    : '';
  const control = `<div class="language-switch" data-language-switch data-language="${current}" data-target="${url}"><a class="language-switch-fallback" href="${url}" hreflang="${to}">${to === 'fi' ? 'Suomeksi' : 'In English'}</a></div>`;
  return html
    .replace('</head>', `<link rel="alternate" hreflang="${to}" href="${url}" />${assets}</head>`)
    .replace(/<\/header>/i, `${control}</header>`);
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
build('.', 'dist', '/field-guides');
if (locales.length) {
  const bundle = spawnSync('bun', ['build', 'shared/language-switch.jsx', '--target=browser', '--minify', '--define', 'process.env.NODE_ENV="production"', '--outfile=dist/language-switch.js'], { stdio: 'inherit' });
  if (bundle.error) throw bundle.error;
  if (bundle.status !== 0) process.exit(bundle.status ?? 1);
  cpSync('shared/language-switch.css', 'dist/language-switch.css');
}
for (const locale of locales) {
  buildLocale(locale);
  for (const page of pages('dist')) {
    const translated = join('dist', locale, page);
    if (!existsSync(translated)) continue;
    writeFileSync(join('dist', page), link(readFileSync(join('dist', page), 'utf8'), locale, `${locale}/${page}`));
    writeFileSync(translated, link(readFileSync(translated, 'utf8').replace('<html lang="en"', `<html lang="${locale}"`), 'en', page));
  }
}
