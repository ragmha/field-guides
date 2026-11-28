export const parts = [
  { title: 'Customization Estate', pages: ['part-1-overview', 'customization-layers', 'surface-support-check', 'part-1-summary'] },
  { title: 'Ownership & Review', pages: ['part-2-overview', 'ownership-model', 'change-review', 'part-2-summary'] },
  { title: 'Versioning & Release', pages: ['part-3-overview', 'agent-release-path', 'skill-plugin-versioning', 'part-3-summary'] },
  { title: 'Distribution', pages: ['part-4-overview', 'distribution-channels', 'managed-plugin-distribution', 'part-4-summary'] },
  { title: 'Layer Conflicts', pages: ['part-5-overview', 'instruction-precedence', 'agent-name-collisions', 'part-5-summary'] },
  { title: 'Retirement', pages: ['part-6-overview', 'stale-customization-review', 'retire-and-migrate', 'part-6-summary'] },
];
export const chapters = parts.flatMap((part, partIndex) => part.pages.map((id, index) => {
  const kind = id.endsWith('-overview') ? 'overview' : id.endsWith('-summary') ? 'summary' : 'lesson';
  return {
    id, kind, part: partIndex + 1, partTitle: part.title,
    number: `${partIndex + 1}.${index + 1}`,
    path: `part-${partIndex + 1}/${index + 1}-${kind === 'lesson' ? id : kind}`,
  };
}));

export function coursePath(id: string) {
  if (id === 'start') return '';
  if (id === 'sources') return 'sources';
  const chapter = chapters.find(entry => entry.id === id);
  if (!chapter) throw new Error(`Unknown course page: ${id}`);
  return chapter.path;
}
