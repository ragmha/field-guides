export const parts = [
  { title: 'What Managed Settings Control', pages: ['part-1-overview', 'managed-settings-keys', 'client-support-matrix', 'part-1-summary'] },
  { title: 'Server-Managed Deployment', pages: ['part-2-overview', 'github-private-source', 'team-overrides', 'part-2-summary'] },
  { title: 'Device Deployment', pages: ['part-3-overview', 'mdm-delivery', 'file-based-delivery', 'part-3-summary'] },
  { title: 'Precedence and Composition', pages: ['part-4-overview', 'deployment-precedence', 'restrictive-composition', 'part-4-summary'] },
  { title: 'Verification and Drift', pages: ['part-5-overview', 'endpoint-verification', 'drift-detection', 'part-5-summary'] },
  { title: 'Change Management and Rollback', pages: ['part-6-overview', 'change-review', 'rollback-plan', 'part-6-summary'] },
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
