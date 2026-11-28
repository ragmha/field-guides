export const parts = [
  { title: 'The Control Map', pages: ['part-1-overview', 'control-layer-stack', 'control-owner-map', 'part-1-summary'] },
  { title: 'Platform Policy Layers', pages: ['part-2-overview', 'enterprise-org-policies', 'repository-controls', 'part-2-summary'] },
  { title: 'Client and Network Layers', pages: ['part-3-overview', 'client-managed-settings', 'network-access-layer', 'part-3-summary'] },
  { title: 'Data and Cost Layers', pages: ['part-4-overview', 'content-exclusion-layer', 'billing-budget-layer', 'part-4-summary'] },
  { title: 'Evidence Layers', pages: ['part-5-overview', 'audit-log-evidence', 'usage-metrics-evidence', 'part-5-summary'] },
  { title: 'Operating the Map', pages: ['part-6-overview', 'control-inventory-risks', 'layer-selection', 'part-6-summary'] },
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
