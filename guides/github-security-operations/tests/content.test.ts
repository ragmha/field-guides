import { expect, test } from 'bun:test';
import { readdir, readFile } from 'node:fs/promises';
import { chapterNumber, chapters, parts } from '../src/course';
import { quizzes } from '../src/quizzes';
import { canOpenChapter, scoreQuiz } from '../src/progress';

const readText = async (path: string) => (await readFile(path, 'utf8')).replace(/\r\n/g, '\n');

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
    for (const feature of previewFeatures) {
      for (const line of text.split('\n').filter((line) => line.toLowerCase().includes(feature))) {
        expect(line.toLowerCase()).toContain('public preview - use with caution');
      }
    }
  }
});

test('eight parts have five answerable questions per chapter', () => {
  expect(parts).toHaveLength(8);
  expect(Object.keys(quizzes).sort()).toEqual(chapters.map(chapter => chapter.id).sort());
  for (const chapter of chapters) {
    expect(quizzes[chapter.id]).toHaveLength(5);
    for (const [question, answer, wrong1, wrong2, explanation] of quizzes[chapter.id]) {
      expect(question.trim()).not.toBe('');
      expect(explanation.trim()).not.toBe('');
      expect(new Set([answer, wrong1, wrong2]).size).toBe(3);
    }
  }
});

test('single-page parts use part labels while multiple pages use section numbers', () => {
  expect(chapters.find(chapter => chapter.id === 'secrets')).toMatchObject({
    number: 'Part 4:',
    path: 'part-4/1-secrets',
  });
  expect(chapters.find(chapter => chapter.id === 'coverage')?.number).toBe('Part 2:');
  expect(chapters.find(chapter => chapter.id === 'operating-model')?.number).toBe('1.1');
  expect(chapters.find(chapter => chapter.id === 'route')?.number).toBe('1.2');
  expect([1, 2, 3].map(section => chapterNumber(4, section, 3))).toEqual(['4.1', '4.2', '4.3']);
});

test('quiz scoring and chapter prerequisites require four correct answers', () => {
  const correct = ['a', 'b', 'c', 'd', 'e'];
  expect(scoreQuiz(['a', 'b', 'c', 'd', 'wrong'], correct)).toBe(4);
  expect(scoreQuiz(['a', 'b', 'c', undefined, 'wrong'], correct)).toBe(3);
  expect(canOpenChapter(['a', 'b', 'c'], ['a'], 1)).toBe(true);
  expect(canOpenChapter(['a', 'b', 'c'], ['a'], 2)).toBe(false);
  expect(canOpenChapter(['a', 'b', 'c'], ['a', 'b'], 2)).toBe(true);
  expect(canOpenChapter(['a', 'b', 'c'], [], 0)).toBe(true);
});

test('every chapter has a review date and registers every source', async () => {
  const registry = await readText('src/content/guide/sources.md');
  for (const chapter of chapters) {
    const text = await readText(`src/content/guide/${chapter.id}.md`);
    expect(text).toMatch(/verified: "\d{4}-\d{2}-\d{2}"/);
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)![1];
    const sources = [...frontmatter.matchAll(/^  - (https:\/\/.+)$/gm)].map(match => match[1]);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) expect(registry).toContain(`](${source})`);
  }
});

test('chapter figures resolve to accessible SVGs without decorating appendices', async () => {
  const diagrams = await readdir('src/diagrams');
  const used = new Set<string>();
  for (const chapter of chapters) {
    const text = await readText(`src/content/guide/${chapter.id}.md`);
    const frontmatter = text.match(/^---\n([\s\S]*?)\n---/)![1];
    const primary = frontmatter.match(/^diagram: ([a-z0-9-]+)$/m)?.[1];
    const additions = frontmatter.match(/^additionalDiagrams:\n((?:  - [a-z0-9-]+\n)+)/m)?.[1] ?? '';
    const names = [...(primary ? [primary] : []), ...[...additions.matchAll(/^  - ([a-z0-9-]+)$/gm)].map(match => match[1])];
    for (const name of names) {
      expect(diagrams).toContain(`${name}.svg`);
      expect(used.has(name)).toBe(false);
      used.add(name);
      const svg = await readText(`src/diagrams/${name}.svg`);
      expect(svg).toContain('role="img"');
      expect(svg).toContain(`id="${name}-title"`);
      expect(svg).toContain(`id="${name}-desc"`);
    }
    if (chapter.id !== 'faq') expect(names.length).toBeGreaterThan(0);
    else expect(names).toHaveLength(0);
  }
  expect(used.size).toBe(11);
  const sources = await readText('src/content/guide/sources.md');
  expect(sources).not.toMatch(/^(diagram|additionalDiagrams):/m);
});
