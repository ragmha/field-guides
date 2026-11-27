export const parts = [
  { title: 'Enablement and Scope', pages: ['part-1-overview', 'enablement-policy-scope', 'repository-access-triggers', 'part-1-summary'] },
  { title: 'Branch and Ruleset Guardrails', pages: ['part-2-overview', 'copilot-branch-boundaries', 'rulesets-for-agents', 'part-2-summary'] },
  { title: 'Required Reviews', pages: ['part-3-overview', 'review-independence', 'reviewing-agent-prs', 'part-3-summary'] },
  { title: 'Workflow Approval', pages: ['part-4-overview', 'workflow-approval-gate', 'auto-run-exception', 'part-4-summary'] },
  { title: 'Agent Firewall', pages: ['part-5-overview', 'firewall-coverage', 'firewall-allowlist-layers', 'part-5-summary'] },
  { title: 'Environment and Secrets', pages: ['part-6-overview', 'setup-steps-hardening', 'agents-secrets-variables', 'part-6-summary'] },
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
