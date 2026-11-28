export const parts = [
  { title: 'Model Landscape', pages: ['part-1-overview', 'model-inventory', 'release-stages', 'part-1-summary'] },
  { title: 'Availability Policies', pages: ['part-2-overview', 'availability-baseline', 'delegation-modes', 'part-2-summary'] },
  { title: 'Hosting & Data Terms', pages: ['part-3-overview', 'provider-hosting', 'retention-exceptions', 'part-3-summary'] },
  { title: 'Automatic Routing', pages: ['part-4-overview', 'auto-selection', 'fusion-routing', 'part-4-summary'] },
  { title: 'Cost & Custom Models', pages: ['part-5-overview', 'model-cost-signals', 'bring-your-own-key', 'part-5-summary'] },
  { title: 'Review & Approval', pages: ['part-6-overview', 'model-review-intake', 'model-lifecycle-review', 'part-6-summary'] },
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
