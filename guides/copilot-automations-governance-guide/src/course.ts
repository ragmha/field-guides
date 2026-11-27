export const parts = [
  { title: 'Triggers & Entry Points', pages: ['part-1-overview', 'automation-trigger-inventory', 'api-and-assignment-entry-points', 'part-1-summary'] },
  { title: 'Identity & Ownership', pages: ['part-2-overview', 'personal-vs-shared-identity', 'ownership-and-continuity', 'part-2-summary'] },
  { title: 'Permissions & Scope', pages: ['part-3-overview', 'tool-and-write-scope', 'untrusted-input-and-chaining', 'part-3-summary'] },
  { title: 'Cost & Rate Limits', pages: ['part-4-overview', 'credit-limits-and-billing', 'run-volume-and-rate-control', 'part-4-summary'] },
  { title: 'Review Gates & Kill Switches', pages: ['part-5-overview', 'review-and-workflow-gates', 'pause-disable-and-revoke', 'part-5-summary'] },
  { title: 'Audit & Change Control', pages: ['part-6-overview', 'run-evidence-and-audit', 'automation-change-control', 'part-6-summary'] },
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
