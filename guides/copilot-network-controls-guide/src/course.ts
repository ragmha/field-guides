export const parts = [
  { title: 'Network Paths', pages: ['part-1-overview', 'copilot-traffic-paths', 'network-ownership-map', 'part-1-summary'] },
  { title: 'Client Allowlists', pages: ['part-2-overview', 'build-client-allowlist', 'websockets-data-residency', 'part-2-summary'] },
  { title: 'Proxies & Certificates', pages: ['part-3-overview', 'proxy-configuration', 'tls-inspection-certificates', 'part-3-summary'] },
  { title: 'Plan-Based Routing', pages: ['part-4-overview', 'subscription-routing', 'routing-change-plan', 'part-4-summary'] },
  { title: 'Agent Firewall', pages: ['part-5-overview', 'firewall-settings-hierarchy', 'firewall-coverage-limits', 'part-5-summary'] },
  { title: 'Runners & Diagnosis', pages: ['part-6-overview', 'private-runner-networking', 'connectivity-troubleshooting', 'part-6-summary'] },
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
