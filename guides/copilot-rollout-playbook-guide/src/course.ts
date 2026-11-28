export const parts = [
  { title: 'Stakeholders and Ownership', pages: ['part-1-overview', 'rollout-raci', 'ai-manager-delegation', 'part-1-summary'] },
  { title: 'Pilot Design', pages: ['part-2-overview', 'pilot-group-selection', 'pilot-cost-ceiling', 'part-2-summary'] },
  { title: 'Baseline Policies', pages: ['part-3-overview', 'pre-enable-baseline', 'exception-handling', 'part-3-summary'] },
  { title: 'Enablement and Training', pages: ['part-4-overview', 'enablement-timeline', 'license-request-flow', 'part-4-summary'] },
  { title: 'Staged Expansion', pages: ['part-5-overview', 'go-no-go-decision', 'stage-gates', 'part-5-summary'] },
  { title: 'Outcomes and Steady State', pages: ['part-6-overview', 'outcome-reporting', 'steady-state-review', 'part-6-summary'] },
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
