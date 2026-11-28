export const parts = [
  { title: 'MCP Policy Foundations', pages: ['part-1-overview', 'mcp-policy-scope', 'server-inventory', 'part-1-summary'] },
  { title: 'Allowlists and Registries', pages: ['part-2-overview', 'allowlist-evaluation', 'registry-tradeoffs', 'part-2-summary'] },
  { title: 'Local and Remote Servers', pages: ['part-3-overview', 'local-remote-servers', 'connectors-and-plugins', 'part-3-summary'] },
  { title: 'Credentials and Secrets', pages: ['part-4-overview', 'mcp-secret-scoping', 'github-server-access', 'part-4-summary'] },
  { title: 'Cloud Agent MCP', pages: ['part-5-overview', 'repository-mcp-config', 'personal-and-agent-servers', 'part-5-summary'] },
  { title: 'Onboarding to Offboarding', pages: ['part-6-overview', 'server-onboarding-review', 'monitoring-offboarding', 'part-6-summary'] },
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
