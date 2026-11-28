export const parts = [
  { title: 'Audit Evidence Map', pages: ['part-1-overview', 'audit-surfaces', 'access-methods', 'part-1-summary'] },
  { title: 'Copilot Audit Events', pages: ['part-2-overview', 'plan-policy-events', 'agent-audit-fields', 'part-2-summary'] },
  { title: 'Agent Activity Monitoring', pages: ['part-3-overview', 'agent-session-view', 'usage-records-stream', 'part-3-summary'] },
  { title: 'Retention & Streaming', pages: ['part-4-overview', 'retention-windows', 'stream-operations', 'part-4-summary'] },
  { title: 'Investigation & Alerting', pages: ['part-5-overview', 'investigation-playbook', 'alert-design', 'part-5-summary'] },
  { title: 'Correlating Telemetry', pages: ['part-6-overview', 'otel-correlation', 'evidence-limits', 'part-6-summary'] },
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
