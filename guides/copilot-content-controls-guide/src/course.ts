export const parts = [
  { title: 'Exclusion Foundations', pages: ['part-1-overview', 'what-exclusion-does', 'exclusion-scope-levels', 'part-1-summary'] },
  { title: 'Writing Path Rules', pages: ['part-2-overview', 'repository-path-rules', 'organization-repository-references', 'part-2-summary'] },
  { title: 'Surfaces & Limitations', pages: ['part-3-overview', 'surface-support-matrix', 'exclusion-limitations', 'part-3-summary'] },
  { title: 'Testing & Change Evidence', pages: ['part-4-overview', 'propagation-and-testing', 'change-review-and-api', 'part-4-summary'] },
  { title: 'Public Code Matching', pages: ['part-5-overview', 'public-code-policy', 'code-referencing-review', 'part-5-summary'] },
  { title: 'Complementary Controls', pages: ['part-6-overview', 'repository-access-layer', 'secret-push-protection', 'part-6-summary'] },
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
