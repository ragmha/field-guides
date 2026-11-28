import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inspectPage, inventory } from './check-freshness.mjs';

const page = (date, sources = '  - https://docs.github.com/example') =>
  `---\ntitle: Example\nverified: "${date}"\nsources:\n${sources}\n---\nContent`;
const inspect = (content) => inspectPage('guide.md', content, 'astro', '2026-11-27');

test('flags old, future and invalid dates, including the 30-day boundary', () => {
  assert.equal(inspect(page('2026-10-28')).status, 'within-window');
  assert.equal(inspect(page('2026-10-27')).status, 'overdue');
  assert.equal(inspect(page('2026-11-28')).status, 'future-date');
  assert.equal(inspect(page('2026-02-30')).status, 'invalid-date');
  assert.equal(inspect(page('')).status, 'unverified');
});

test('reports missing, invalid, and duplicate metadata without claiming coverage', () => {
  assert.equal(inspect('no frontmatter').status, 'invalid-metadata');
  assert.ok(inspect(page('2026-11-27', '  - http://example.com')).problems.length);
  assert.ok(inspect(page('2026-11-27', '  - https://user:pass@example.com')).problems.length);
  assert.ok(inspect(page('2026-11-27').replace('sources:', 'verified: "2026-11-26"\nsources:')).problems.length);
});

test('static pages require a review date and report candidate links', () => {
  const html = '<a href="https://example.com/a?x=1&amp;y=2">Source</a>';
  const unreviewed = inspectPage('guide.html', html, 'static', '2026-11-27');
  assert.equal(unreviewed.status, 'unverified');
  assert.deepEqual(unreviewed.sources, ['https://example.com/a?x=1&y=2']);
  const reviewed = inspectPage('guide.html', `<!-- freshness-verified: 2026-11-27 -->\n${html}`, 'static', '2026-11-27');
  assert.equal(reviewed.status, 'within-window');
  assert.equal(reviewed.problems.length, 0);
});

test('inventories nested Astro content and the static pages published by the build', () => {
  const root = mkdtempSync(join(tmpdir(), 'guide-freshness-'));
  try {
    const astro = join(root, 'guides', 'astro-guide', 'src', 'content', 'guide', 'nested');
    const staticGuide = join(root, 'guides', 'static-guide');
    mkdirSync(astro, { recursive: true });
    mkdirSync(staticGuide, { recursive: true });
    writeFileSync(join(astro, 'page.md'), page('2026-11-27'));
    writeFileSync(join(staticGuide, 'index.html'), '<a href="https://example.com/">Source</a>');
    const report = inventory(root, [
      { name: 'astro-guide', type: 'astro' },
      { name: 'static-guide', type: 'static' },
    ], '2026-11-27');
    assert.deepEqual(report.pages.map((item) => item.path), [
      'guides/astro-guide/src/content/guide/nested/page.md',
      'guides/static-guide/index.html',
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
