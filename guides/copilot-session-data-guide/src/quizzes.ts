interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    {
      prompt: 'A developer syncs a local CLI session but does not share it. Who can view it?',
      options: ['Anyone with access to the repository', 'Only the developer who started it', 'Organization owners who enabled syncing'],
      answer: 1,
      explanation: 'Syncing stores a copy in the personal account. It is not sharing, and enabling sync gives administrators no access.',
    },
    {
      prompt: 'Which list matches the documented contents of session data?',
      options: ['Prompts, responses, tools used and file changes', 'Prompts, billing records and license changes', 'Responses, audit events and policy settings'],
      answer: 0,
      explanation: 'GitHub defines session data as the prompts, responses, tools used and file changes recorded for a session.',
    },
    {
      prompt: 'A GitHub Actions cloud session has finished. What remains?',
      options: ['The environment, kept as a billed snapshot', 'Nothing, because the environment is ephemeral', 'The session log on GitHub.com'],
      answer: 2,
      explanation: 'The Actions environment is destroyed at the end of the session, but the session log stays on GitHub.com.',
    },
    {
      prompt: 'A team wants a stopped cloud session to keep its working environment. Which type fits?',
      options: ['A GitHub Actions cloud session', 'A local CLI session with sync off', 'A cloud sandbox session'],
      answer: 2,
      explanation: 'Cloud sandboxes keep a snapshot while stopped, billed per GiB-month. Actions environments are destroyed.',
    },
    {
      prompt: 'What can happen when you ask /chronicle a question about your history?',
      options: ['Session data may be sent to the AI model', 'The session is shared with your organization', 'The audit log records the prompt text'],
      answer: 0,
      explanation: 'Querying history or using /chronicle may send prompts, context and responses to the AI model.',
    },
  ],
  [
    {
      prompt: 'Which item in the Copilot configuration directory is documented as safe to delete?',
      options: ['session-state/', 'session-store.db', 'logs/'],
      answer: 2,
      explanation: 'logs/ is safe to delete and re-created each session. The other two need caution.',
    },
    {
      prompt: 'What do you lose by deleting the session-state/ directory?',
      options: ['Synced copies of every session on GitHub', 'Local history and the ability to resume', 'Only process logs from recent runs'],
      answer: 1,
      explanation: 'session-state/ holds the complete local record. Deleting it removes local history and resume, but not synced copies.',
    },
    {
      prompt: 'What does /session cleanup do?',
      options: ['Deletes sessions older than 30 days', 'Shows a storage summary only', 'Rebuilds the session store and syncs'],
      answer: 1,
      explanation: '/session cleanup is a storage summary and deletes nothing.',
    },
    {
      prompt: 'After deleting session folders by hand, what should you run?',
      options: ['/chronicle reindex', '/session delete-all --yes', '/share off'],
      answer: 0,
      explanation: 'A reindex rebuilds the session store so it matches the remaining sessions.',
    },
    {
      prompt: 'A developer runs /session prune --older-than 90. What happens to synced copies?',
      options: ['They are deleted with the local copies', 'They are archived on GitHub.com', 'They are unaffected'],
      answer: 2,
      explanation: 'delete-all and prune affect only local sessions; synced data must be deleted separately.',
    },
  ],
  [
    {
      prompt: 'A CLI configuration has no remoteExport entry and the policy allows syncing. What happens?',
      options: ['Sessions sync, because the default is true', 'Sessions stay local until a flag is passed', 'Sessions sync only when shared'],
      answer: 0,
      explanation: 'remoteExport defaults to true, so sessions sync when syncing is available.',
    },
    {
      prompt: 'How do you sync one CLI run when remoteExport is false?',
      options: ['Set chat.sessionSync.enabled', 'Run /chronicle reindex first', 'Pass --sync-session=on'],
      answer: 2,
      explanation: '--sync-session=on or off overrides remoteExport for a single run.',
    },
    {
      prompt: 'A Business user has the cloud session storage policy not configured. Where do CLI sessions go?',
      options: ['To the organization account', 'Local only', 'To the user account, unshared'],
      answer: 1,
      explanation: 'If the policy is disabled or not configured, sessions remain local only.',
    },
    {
      prompt: 'What do administrators gain by enabling the "Store local sessions in the Cloud" policy?',
      options: ['Read access to synced sessions', 'Nothing beyond making sync available', 'Export rights for user sessions'],
      answer: 1,
      explanation: 'Enabling the policy controls availability only. Synced sessions are tied to personal accounts and private by default.',
    },
    {
      prompt: 'A VS Code user turns off session sync. What happens to sessions already synced?',
      options: ['They remain on GitHub.com until deleted', 'They are deleted after 28 days', 'They become shared with the repository'],
      answer: 0,
      explanation: 'Turning off sync does not delete synced data; delete it explicitly.',
    },
  ],
  [
    {
      prompt: 'Which session type is shared by default?',
      options: ['A synced local CLI session', 'A cloud agent session on GitHub Actions', 'A cloud sandbox session'],
      answer: 1,
      explanation: 'Actions cloud agent sessions are shared by default with people who have repository access.',
    },
    {
      prompt: 'What can a recipient of a shared session do?',
      options: ['Steer the session with new prompts', 'Query it with their own /chronicle', 'View prompts, responses and file changes'],
      answer: 2,
      explanation: 'Sharing is view-only, and shared sessions are not indexed in other users\' queries.',
    },
    {
      prompt: 'Which CLI share target cannot be used by Enterprise Managed Users?',
      options: ['/share gist', '/share link', '/share html'],
      answer: 0,
      explanation: 'Gists are unavailable for Enterprise Managed Users and GHE.com data residency.',
    },
    {
      prompt: 'What does running /share with no arguments do?',
      options: ['Opens a menu without sharing', 'Shares a link with the repository', 'Writes a Markdown file locally'],
      answer: 0,
      explanation: 'The bare command opens a menu; it does not share anything by itself.',
    },
    {
      prompt: 'After /share file, a developer deletes the session. What happens to the Markdown file?',
      options: ['It is deleted with the session', 'It remains and must be managed separately', 'It is converted to a private gist'],
      answer: 1,
      explanation: 'An exported file is a standalone copy outside GitHub\'s sharing and deletion controls.',
    },
  ],
  [
    {
      prompt: 'What can you do with a finished cloud agent session that ran on GitHub Actions?',
      options: ['Archive it, but not delete it', 'Delete it from the Agents tab', 'Prune it with /session prune'],
      answer: 0,
      explanation: 'Cloud agent sessions can be archived but not deleted.',
    },
    {
      prompt: 'Which local client prompts before deleting a synced copy?',
      options: ['The GitHub Copilot app', 'Copilot CLI', 'Neither client'],
      answer: 1,
      explanation: 'The CLI asks whether to delete the synced copy; the app deletes it immediately.',
    },
    {
      prompt: 'What does hiding a synced session on GitHub.com do?',
      options: ['Removes it from your index and query results', 'Deletes it from every device', 'Shares it with repository readers'],
      answer: 0,
      explanation: 'Hiding removes the session from your session index and query results.',
    },
    {
      prompt: 'How long are GitHub.com Copilot Chat messages kept?',
      options: ['Until you delete them manually', '180 days, like audit events', '28 days, then permanently deleted'],
      answer: 2,
      explanation: 'Chat keeps up to 100 conversations, and messages are deleted after 28 days.',
    },
    {
      prompt: 'A memory no longer appears in the settings list. What can you conclude?',
      options: ['It was permanently deleted', 'It may still be stored until it expires', 'It was moved to session history'],
      answer: 1,
      explanation: 'Hidden memories can remain stored until they expire; delete explicitly if needed.',
    },
  ],
  [
    {
      prompt: 'Does the enterprise audit log include prompts sent to Copilot locally?',
      options: ['Yes, for Copilot Enterprise only', 'Yes, when syncing is enabled', 'No, a custom solution is needed'],
      answer: 2,
      explanation: 'The audit log excludes client session data; companies use solutions such as hooks.',
    },
    {
      prompt: 'Which audit log search term shows agent activity?',
      options: ['action:session', 'user:agent', 'actor:Copilot'],
      answer: 2,
      explanation: 'Use actor:Copilot for agent activity and action:copilot for plan events.',
    },
    {
      prompt: 'Which field links an agentic audit event to its session?',
      options: ['actor_is_agent', 'agent_session_id', 'github_request_id'],
      answer: 1,
      explanation: 'agent_session_id appears when an agent session produced the event.',
    },
    {
      prompt: 'How long does the audit log keep events without streaming?',
      options: ['180 days', '28 days', 'Until deleted'],
      answer: 0,
      explanation: 'The audit log retains 180 days; streaming to a SIEM keeps longer history.',
    },
    {
      prompt: 'Where does a cloud agent commit point to its session?',
      options: ['In the pull request title', 'In the commit signature', 'In the commit message'],
      answer: 2,
      explanation: 'The commit message includes a link to the session logs.',
    },
  ],
];

export const quizReviewLessons: string[][] = [
  ['session-data-anatomy', 'session-data-anatomy', 'where-sessions-run', 'where-sessions-run', 'session-data-anatomy'],
  ['cli-session-directory', 'cli-session-directory', 'local-store-maintenance', 'local-store-maintenance', 'local-store-maintenance'],
  ['sync-controls', 'sync-controls', 'sync-policy-access', 'sync-policy-access', 'sync-controls'],
  ['share-visibility', 'share-visibility', 'export-formats', 'export-formats', 'export-formats'],
  ['delete-archive-hide', 'delete-archive-hide', 'delete-archive-hide', 'retention-windows', 'retention-windows'],
  ['session-vs-audit-log', 'session-vs-audit-log', 'evidence-tracing', 'evidence-tracing', 'evidence-tracing'],
];
