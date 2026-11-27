import { cpSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { guides } from '../guides.mjs';

const sites = [{ name: 'hub', type: 'astro' }, ...guides];
const sourceOf = name => (name === 'hub' ? 'hub' : `guides/${name}`);
const locales = existsSync('i18n') ? readdirSync('i18n').filter(locale => /^[a-z]{2}$/.test(locale)) : [];
const language = { fi: 'Suomeksi', en: 'In English' };

function build(root, out, base) {
  for (const { name, type } of sites) {
    const source = join(root, sourceOf(name));
    const target = name === 'hub' ? out : join(out, name);
    if (type === 'astro') {
      const result = spawnSync('bun', ['run', 'build'], { cwd: source, stdio: 'inherit', env: { ...process.env, SITE_BASE: base } });
      if (result.error) throw result.error;
      if (result.status !== 0) process.exit(result.status ?? 1);
      cpSync(join(source, 'dist'), target, { recursive: true });
    } else {
      // ponytail: static guides need copying, not a bundler.
      mkdirSync(target, { recursive: true });
      for (const entry of readdirSync(source)) {
        if (/\.(html|css|js)$/.test(entry) || ['assets', 'licenses'].includes(entry)) {
          cpSync(join(source, entry), join(target, entry), { recursive: true });
        }
      }
    }
  }
}

// Translations are an overlay: i18n/<locale>/ mirrors source paths, and untranslated files fall back to English.
function buildLocale(locale) {
  const work = resolve('.i18n-build', locale);
  const links = sites.map(({ name }) => join(work, sourceOf(name), 'node_modules'));
  const unlink = () => links.forEach(path => { try { if (lstatSync(path).isSymbolicLink()) unlinkSync(path); } catch {} });
  unlink();
  rmSync(work, { recursive: true, force: true });
  try {
    for (const entry of ['guides.mjs', 'shared', 'hub', 'guides']) {
      cpSync(entry, join(work, entry), { recursive: true, filter: path => !/[\\/](node_modules|dist|\.astro)$/.test(path) });
    }
    for (const { name } of sites) {
      const modules = resolve(sourceOf(name), 'node_modules');
      if (existsSync(modules)) symlinkSync(modules, join(work, sourceOf(name), 'node_modules'), 'junction');
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
  return html
    .replace('</head>', `<link rel="alternate" hreflang="${to}" href="${url}" /></head>`)
    .replace('</body>', `<a class="lang-switch" href="${url}" hreflang="${to}" lang="${to}" style="position:fixed;right:12px;bottom:12px;z-index:50;padding:6px 12px;border:1px solid var(--rule,#d0d7de);border-radius:4px;background:var(--surface,#fff);color:var(--ink,#1f2328);font:600 13px/1.4 system-ui,sans-serif;text-decoration:none">${language[to]}</a></body>`);
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
build('.', 'dist', '/field-guides');
for (const locale of locales) {
  buildLocale(locale);
  for (const page of pages('dist')) {
    const translated = join('dist', locale, page);
    if (!existsSync(translated)) continue;
    writeFileSync(join('dist', page), link(readFileSync(join('dist', page), 'utf8'), locale, `${locale}/${page}`));
    writeFileSync(translated, link(readFileSync(translated, 'utf8').replace('<html lang="en"', `<html lang="${locale}"`), 'en', page));
  }
}
