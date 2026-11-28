import type { GuideDefinition } from './manifest';

export type LessonRoute = {
  id: string;
  partIndex: number;
  lessonIndex: number;
  partNumber: number;
  lessonNumber: number;
  path: string;
};

export function lessonRoutes(guide: GuideDefinition): LessonRoute[] {
  return guide.parts.flatMap((part, partIndex) => part.lessons.map((lesson, lessonIndex) => ({
    id: lesson.id,
    partIndex,
    lessonIndex,
    partNumber: partIndex + 1,
    lessonNumber: lessonIndex + 1,
    path: `/${guide.slug}/part-${partIndex + 1}/${lessonIndex + 1}-${lesson.id}/`,
  })));
}

export function landingPath(guide: GuideDefinition) {
  return `/${guide.slug}/`;
}

export function sourcePath(guide: GuideDefinition) {
  return `/${guide.slug}/sources/`;
}

export function routeForLesson(guide: GuideDefinition, lessonId: string) {
  const lesson = lessonRoutes(guide).find(entry => entry.id === lessonId);
  if (!lesson) throw new Error(`Unknown lesson ${lessonId} in ${guide.slug}`);
  return lesson.path;
}

export function validateGuideWorkspace(
  guides: GuideDefinition[],
  entries: { id: string; data: { kind: string; title: string; description: string; reviewed: string; sources: string[] } }[],
) {
  const errors: string[] = [];
  const guideSlugs = new Set<string>();
  const resolvedRoutes = new Set<string>();
  const entryMap = new Map(entries.map(entry => [entry.id, entry]));

  for (const guide of guides) {
    if (guideSlugs.has(guide.slug)) errors.push(`Duplicate guide slug: ${guide.slug}`);
    guideSlugs.add(guide.slug);
    if (guide.parts.length !== 3) errors.push(`${guide.slug} must have exactly three parts`);
    if (!guide.artwork.src.startsWith('src/assets/') || guide.artwork.width <= 0 || guide.artwork.height <= 0 || !guide.artwork.alt.trim() || /placeholder|final descriptive/i.test(guide.artwork.alt)) {
      errors.push(`${guide.slug} has invalid artwork metadata`);
    }

    const lessonIds = new Set<string>();
    for (const [partIndex, part] of guide.parts.entries()) {
      if (part.lessons.length !== 2) errors.push(`${guide.slug} part ${partIndex + 1} must have exactly two lessons`);
      for (const lesson of part.lessons) {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.id)) errors.push(`${guide.slug} has invalid lesson id: ${lesson.id}`);
        if (lessonIds.has(lesson.id)) errors.push(`${guide.slug} has duplicate lesson id: ${lesson.id}`);
        lessonIds.add(lesson.id);
      }
    }

    const expected = new Set([`${guide.slug}/index`, ...[...lessonIds].map(id => `${guide.slug}/${id}`)]);
    for (const id of expected) {
      const entry = entryMap.get(id);
      if (!entry) {
        errors.push(`Missing content: ${id}`);
        continue;
      }
      const expectedKind = id.endsWith('/index') ? 'landing' : 'lesson';
      if (entry.data.kind !== expectedKind) errors.push(`${id} must have kind "${expectedKind}"`);
      if (expectedKind === 'landing' && (entry.data.title !== guide.title || entry.data.description !== guide.description)) {
        errors.push(`${id} title and description must match the guide manifest`);
      }
    }
    for (const entry of entries) {
      if (entry.id.startsWith(`${guide.slug}/`) && !expected.has(entry.id)) errors.push(`Unreferenced content: ${entry.id}`);
    }

    const paths = [landingPath(guide), ...lessonRoutes(guide).map(lesson => lesson.path), sourcePath(guide)];
    for (const path of paths) {
      if (resolvedRoutes.has(path)) errors.push(`Duplicate resolved route: ${path}`);
      resolvedRoutes.add(path);
    }
  }

  for (const entry of entries) {
    const slug = entry.id.split('/')[0];
    if (!guideSlugs.has(slug)) errors.push(`Content references an unregistered guide: ${entry.id}`);
  }

  if (errors.length) throw new Error(`Invalid Copilot how-to workspace:\n- ${errors.join('\n- ')}`);
}
