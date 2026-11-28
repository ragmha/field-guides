import { describe, expect, test } from 'bun:test';
import { landingPath, lessonRoutes, sourcePath, validateGuideWorkspace } from '../src/course';
import { guides } from '../src/manifest';
import { guides as collection } from '../../../guides.mjs';
import { readFileSync } from 'node:fs';

function entriesFor(guide: (typeof guides)[number]) {
  return [
    { id: `${guide.slug}/index`, data: { kind: 'landing', title: guide.title, description: guide.description, reviewed: '2026-11-23', sources: ['https://example.com/'] } },
    ...guide.parts.flatMap(part => part.lessons.map(lesson => ({
      id: `${guide.slug}/${lesson.id}`,
      data: { kind: 'lesson', title: lesson.id, description: 'Lesson description', reviewed: '2026-11-23', sources: ['https://example.com/'] },
    }))),
  ];
}

describe('how-to route and content contract', () => {
  test('keeps the hub entries and illustration dimensions in sync with all guides', () => {
    const shared = collection.filter(guide => guide.workspace === 'copilot-how-tos');
    expect(shared.map(guide => guide.name).sort()).toEqual(guides.map(guide => guide.slug).sort());
    for (const guide of guides) {
      const card = shared.find(entry => entry.name === guide.slug);
      expect(card).toMatchObject({
        title: guide.title, description: guide.description, parts: guide.parts.length, type: 'astro',
      });
      const svg = readFileSync(new URL(`../${guide.artwork.src}`, import.meta.url), 'utf8');
      expect(svg).toMatch(new RegExp(`<svg\\b[^>]*\\bwidth="${guide.artwork.width}"[^>]*\\bheight="${guide.artwork.height}"`));
    }
  });

  test('registers the four workflow tracks with six distinct lessons each', () => {
    for (const slug of ['copilot-cli-guide', 'copilot-agent-mode-guide', 'copilot-instructions-guide', 'copilot-skills-agents-guide']) {
      const guide = guides.find(entry => entry.slug === slug);
      expect(guide).toBeDefined();
      const routes = lessonRoutes(guide!);
      expect(routes).toHaveLength(6);
      expect(new Set(routes.map(route => route.path)).size).toBe(6);
    }
  });

  test('creates landing, six ordered lesson, and source routes per guide', () => {
    const guide = guides[0];
    expect(landingPath(guide)).toBe('/copilot-ide-guide/');
    expect(lessonRoutes(guide).map(route => route.path)).toEqual([
      '/copilot-ide-guide/part-1/1-access-and-prerequisites/',
      '/copilot-ide-guide/part-1/2-install-sign-in-configure/',
      '/copilot-ide-guide/part-2/1-inline-suggestions/',
      '/copilot-ide-guide/part-2/2-ask-chat/',
      '/copilot-ide-guide/part-3/1-small-safe-change/',
      '/copilot-ide-guide/part-3/2-run-tests-review-diff/',
    ]);
    expect(sourcePath(guide)).toBe('/copilot-ide-guide/sources/');
  });

  test('rejects missing, unreferenced, and wrongly typed content before rendering', () => {
    const guide = guides[0];
    const validEntries = entriesFor(guide);
    expect(() => validateGuideWorkspace([guide], validEntries)).not.toThrow();
    expect(() => validateGuideWorkspace([guide], validEntries.slice(1))).toThrow(/Missing content/);
    expect(() => validateGuideWorkspace([guide], [...validEntries, {
      id: `${guide.slug}/orphan`,
      data: { kind: 'lesson', title: 'Orphan', description: 'Unused', reviewed: '2026-11-23', sources: ['https://example.com/'] },
    }])).toThrow(/Unreferenced content/);
    expect(() => validateGuideWorkspace([guide], validEntries.map(entry =>
      entry.id === `${guide.slug}/index` ? { ...entry, data: { ...entry.data, kind: 'lesson' } } : entry,
    ))).toThrow(/must have kind "landing"/);
  });
});
