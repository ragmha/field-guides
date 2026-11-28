export const parts = [
  { title: 'Session Data Map', pages: ['part-1-overview', 'session-data-anatomy', 'where-sessions-run', 'part-1-summary'] },
  { title: 'Local Storage', pages: ['part-2-overview', 'cli-session-directory', 'local-store-maintenance', 'part-2-summary'] },
  { title: 'Syncing and Policy', pages: ['part-3-overview', 'sync-controls', 'sync-policy-access', 'part-3-summary'] },
  { title: 'Sharing and Export', pages: ['part-4-overview', 'share-visibility', 'export-formats', 'part-4-summary'] },
  { title: 'Retention and Deletion', pages: ['part-5-overview', 'delete-archive-hide', 'retention-windows', 'part-5-summary'] },
  { title: 'Session Records and Audit Evidence', pages: ['part-6-overview', 'session-vs-audit-log', 'evidence-tracing', 'part-6-summary'] },
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
