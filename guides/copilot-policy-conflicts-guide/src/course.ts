export const parts = [
  { title: 'Policy Layers', pages: ['part-1-overview', 'enterprise-decision-states', 'delegation-and-defaults', 'part-1-summary'] },
  { title: 'Seat Sources', pages: ['part-2-overview', 'license-source-tracing', 'enterprise-assigned-users', 'part-2-summary'] },
  { title: 'Conflict Rules', pages: ['part-3-overview', 'least-restrictive-rule', 'most-restrictive-exceptions', 'part-3-summary'] },
  { title: 'Users and Resources', pages: ['part-4-overview', 'resource-scoped-controls', 'surface-coverage', 'part-4-summary'] },
  { title: 'Troubleshooting Visibility', pages: ['part-5-overview', 'feature-visibility-triage', 'model-availability-triage', 'part-5-summary'] },
  { title: 'Effective-Policy Records', pages: ['part-6-overview', 'effective-policy-records', 'drift-and-change-evidence', 'part-6-summary'] },
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
