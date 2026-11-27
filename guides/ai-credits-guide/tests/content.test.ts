import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { chapters, coursePath, legacyRoutes } from '../src/course';

const readText = async (path: string) => (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');

test('optimization lesson precedes the summary and preserves its previous URL', () => {
  const lesson = chapters.findIndex(chapter => chapter.id === 'token-optimization');
  const summary = chapters.findIndex(chapter => chapter.id === 'part-3-summary');
  expect(lesson).toBeGreaterThanOrEqual(0);
  expect(summary).toBe(lesson + 1);
  expect(legacyRoutes['/part-3/5-summary']).toBe(`/${coursePath('part-3-summary')}/`);
});

test('guide pages have source provenance and preview mentions carry caution', async () => {
  const files = await readdir('src/content/guide');
  const registry = await readText('src/content/guide/sources.md');
  const previewFeatures = registry.split('\n')
    .filter((line) => line.startsWith('|') && line.includes('public preview - use with caution'))
    .map((line) => line.split('|')[1].trim().toLowerCase());
  expect(files.filter((file) => file.endsWith('.md')).sort()).toEqual(
    ['start.md', 'sources.md', ...chapters.map(chapter => `${chapter.id}.md`)].sort(),
  );
  for (const file of files) {
    const text = await readText(`src/content/guide/${file}`);
    expect(text).toMatch(/verified: "\d{4}-\d{2}-\d{2}"/);
    expect(text).toMatch(/sources:\n  - https:\/\//);
    if (file !== 'start.md' && !file.endsWith('-summary.md')) {
      expect(text).toContain('## What you will learn');
    }
    if (chapters.some(chapter => chapter.id === file.replace('.md', '') && chapter.kind === 'lesson')) {
      expect(text).toContain('checks:\n');
      expect(text.match(/  - question:/g)?.length).toBeGreaterThanOrEqual(2);
      expect(text.match(/  - question:/g)?.length).toBeLessThanOrEqual(3);
    }
    for (const feature of previewFeatures) {
      for (const line of text.split('\n').filter((line) => line.toLowerCase().includes(feature))) {
        expect(line.toLowerCase()).toContain('public preview - use with caution');
      }
    }
  }
});

test('visualisation pages retain their review date and register every source', async () => {
  const registry = await readText('src/content/guide/sources.md');
  for (const chapter of chapters.filter(chapter => chapter.part === 4)) {
    const text = await readText(`src/content/guide/${chapter.id}.md`);
    expect(text).toContain('verified: "2026-11-12"');
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)![1];
    const sources = [...frontmatter.matchAll(/^  - (https:\/\/.+)$/gm)].map(match => match[1]);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) expect(registry).toContain(`](${source})`);
  }
});
