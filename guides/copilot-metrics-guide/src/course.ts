export const parts = [
  { title: 'Metric Surfaces & Access', pages: ['part-1-overview', 'metrics-surfaces', 'metrics-access', 'part-1-summary'] },
  { title: 'Metric Definitions', pages: ['part-2-overview', 'active-user-definitions', 'adoption-phases', 'part-2-summary'] },
  { title: 'Scope & Deduplication', pages: ['part-3-overview', 'org-attribution-dedup', 'team-level-joins', 'part-3-summary'] },
  { title: 'Latency, Coverage & Limits', pages: ['part-4-overview', 'latency-and-windows', 'coverage-gaps', 'part-4-summary'] },
  { title: 'Adoption KPIs Without Surveillance', pages: ['part-5-overview', 'kpi-design', 'privacy-safe-reporting', 'part-5-summary'] },
  { title: 'Pairing Metrics with Evidence', pages: ['part-6-overview', 'qualitative-evidence', 'impact-reporting', 'part-6-summary'] },
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
