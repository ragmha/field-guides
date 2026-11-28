export const parts = [
  { title: 'Local Risk Model', pages: ['part-1-overview', 'local-trust-boundary', 'trusted-directories', 'part-1-summary'] },
  { title: 'Approval Modes', pages: ['part-2-overview', 'permission-modes', 'approval-persistence', 'part-2-summary'] },
  { title: 'Auto-Approval Rules', pages: ['part-3-overview', 'cli-tool-rules', 'terminal-auto-approve', 'part-3-summary'] },
  { title: 'Local Sandboxing', pages: ['part-4-overview', 'sandbox-filesystem', 'sandbox-network', 'part-4-summary'] },
  { title: 'Credential Exposure', pages: ['part-5-overview', 'credential-masking', 'least-privilege-tokens', 'part-5-summary'] },
  { title: 'Isolation and Response', pages: ['part-6-overview', 'isolation-tiers', 'local-incident-response', 'part-6-summary'] },
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
