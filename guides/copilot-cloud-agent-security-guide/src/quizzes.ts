interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    {
      prompt: 'The enterprise has enabled the Copilot in the cloud policy for selected organizations, and `org-b` was not selected. What can the owner of `org-b` do?',
      options: ['Enable it for org-b from organization settings', 'None; the enterprise choice prevails', 'Enable it for selected org-b repositories only'],
      answer: 1,
      explanation: 'Organizations cannot override a policy the enterprise has chosen. Only a delegated choice lets the organization decide.',
    },
    {
      prompt: 'An organization wants to keep the Copilot in the cloud policy but turn off cloud sandboxes. What does the documentation say?',
      options: ['Cloud sandboxes cannot be disabled separately', 'Disable sandboxes under the Runner type setting', 'Clear the sandbox option in Repository access'],
      answer: 0,
      explanation: 'Enabling the policy makes cloud sandboxes available, and GitHub documents that they cannot be disabled separately.',
    },
    {
      prompt: 'A user with read access comments "@copilot please also edit the deploy script" on an issue. What happens?',
      options: ['The agent queues the request for a maintainer', 'The agent runs it in a read-only session', 'The comment is never presented to the agent'],
      answer: 2,
      explanation: 'Only users with write access can trigger the agent, and comments from users without write access are never presented to it.',
    },
    {
      prompt: 'Where does work run when a maintainer assigns an issue to Copilot?',
      options: ['In a cloud sandbox chosen by default', 'In a custom environment the owner registers', 'On GitHub Actions in that repository'],
      answer: 2,
      explanation: 'Assigning an issue and mentioning @Copilot in a pull request run only on GitHub Actions, in a single repository.',
    },
    {
      prompt: 'In an organization that allows the policy, which organization setting limits the agent to specific repositories?',
      options: ['Repository access in Copilot > Cloud', 'Runner type under Settings > Copilot > Cloud', 'Internet access under the firewall settings'],
      answer: 0,
      explanation: 'The Repository access setting allows the agent in all repositories or only selected ones.',
    },
  ],
  [
    {
      prompt: 'Copilot is invoked with @copilot on an existing pull request. Which branch does it push to?',
      options: ['A new branch starting with copilot/', 'The default branch, behind required checks', 'The pull request branch it was invoked on'],
      answer: 2,
      explanation: 'When invoked on a pull request, the agent pushes to that pull request branch; otherwise it creates a copilot/ branch.',
    },
    {
      prompt: 'Which pull request action can the cloud agent perform itself?',
      options: ['Mark its draft as ready for review', 'Push simple commits to its branch', 'Merge once all required checks pass'],
      answer: 1,
      explanation: 'The agent can make simple pushes to its branch. A human must mark the draft ready, approve it and merge it.',
    },
    {
      prompt: 'A ruleset on all branches requires a ticket ID in commit messages, and agent pushes fail. What does this course recommend first?',
      options: ['Add Copilot to the bypass list for all rules', 'Disable the ruleset until the work is merged', 'Narrow the rule target before any bypass'],
      answer: 2,
      explanation: 'Guide advice is to adjust a blocking rule\'s target before granting bypass. Copilot may not satisfy commit-metadata rules.',
    },
    {
      prompt: 'Which pairing helps protect Copilot and MCP configuration files from unreviewed changes?',
      options: ['A custom property and a required status check', 'CODEOWNERS plus code owner review', 'Signed commits and a linear history rule'],
      answer: 1,
      explanation: 'The guardrails tutorial recommends CODEOWNERS entries for these files with Require review from Code Owners.',
    },
    {
      prompt: 'A session is stopped after pushing two commits. What happens to those commits?',
      options: ['They remain on the branch', 'They are reverted automatically', 'They move to an archived branch'],
      answer: 0,
      explanation: 'Stopping a session ends the Actions run and preserves commits already pushed. It is not a rollback.',
    },
  ],
  [
    {
      prompt: 'Avery asked Copilot for a change and then approves the pull request. Does Avery\'s approval count?',
      options: ['No; another reviewer must approve', 'Yes, if Avery has write access', 'Yes, once the workflows have passed'],
      answer: 0,
      explanation: 'If you asked Copilot to create a pull request, your approval does not count toward required approvals.',
    },
    {
      prompt: 'A ruleset requires one approval and keeps the default unattributed-pull-request setting. Copilot opens a pull request from a shared channel. How many approvals are needed?',
      options: ['One, from anyone with write access', 'One, from a repository administrator', 'Two, from people with write access'],
      answer: 2,
      explanation: 'The public preview setting adds one approval for unattributed Copilot pull requests when at least one is already required.',
    },
    {
      prompt: 'What is the release status of the additional approval for unattributed Copilot pull requests?',
      options: ['Generally available for all plans', 'Public preview, subject to change', 'Available only for branch protection'],
      answer: 1,
      explanation: 'The available rules page marks the setting as public preview and subject to change.',
    },
    {
      prompt: 'Which statement about the built-in validation tools is accurate?',
      options: ['They run without a GHAS license', 'They need a GHAS license per user', 'They cannot be disabled by admins'],
      answer: 0,
      explanation: 'CodeQL, dependency checks, secret scanning and Copilot code review run for the agent without a GHAS license. Admins can disable them.',
    },
    {
      prompt: 'How should a reviewer treat the session log linked from an agent commit?',
      options: ['As approval that replaces code review', 'As evidence of how the agent worked', 'As proof that tests were all passing'],
      answer: 1,
      explanation: 'Session logs show the agent\'s reasoning and tools. GitHub states they do not replace review.',
    },
  ],
  [
    {
      prompt: 'By default, what must happen before Actions workflows run on an agent push?',
      options: ['A code owner must approve the change', 'A write-access user approves runs', 'The agent must mark the pull request'],
      answer: 1,
      explanation: 'Workflows do not run until a user with write access clicks Approve and run workflows, unless the repository turns approval off.',
    },
    {
      prompt: 'An agent pull request edits `.github/workflows/ci.yml` to print environment variables. What should the reviewer do first?',
      options: ['Approve runs to see the printed values', 'Approve the pull request to unblock CI', 'Read the diff and question the step'],
      answer: 2,
      explanation: 'Inspect changes, especially in .github/workflows/, before approving runs. Approved runs execute with workflow permissions and secrets.',
    },
    {
      prompt: 'Where is the Require approval for workflow runs setting?',
      options: ['Repository Copilot cloud agent settings', 'Organization Settings > Actions > General', 'Enterprise AI controls > Copilot policies'],
      answer: 0,
      explanation: 'The setting is in the Policies section of the repository Cloud agent settings, managed by repository admins.',
    },
    {
      prompt: 'What risk does GitHub describe when workflow approval is turned off?',
      options: ['Unreviewed code could read secrets', 'The agent could merge its own pull request', 'Required reviews would stop applying'],
      answer: 0,
      explanation: 'Disabling approval lets unreviewed code gain write access or access Actions secrets in workflow runs.',
    },
    {
      prompt: 'Which request best fits a narrow, dated exception for automatic runs?',
      options: ['CI that uses a package registry token', 'A deploy workflow on agent branches', 'A read-only build with no secrets'],
      answer: 2,
      explanation: 'Guide advice limits exceptions to repositories whose agent-branch workflows hold no secrets and use read-only permissions.',
    },
  ],
  [
    {
      prompt: 'Which process is outside the agent firewall\'s coverage?',
      options: ['A third-party MCP server', 'npm install run through Bash', 'A test run by the agent'],
      answer: 0,
      explanation: 'The firewall covers Bash-tool processes and, in sandboxes, the built-in Playwright MCP server. Other MCP servers are not covered.',
    },
    {
      prompt: 'What does Copilot do when the firewall blocks a request?',
      options: ['Stops the session and alerts the owner', 'Adds a warning naming the address', 'Retries the request through a proxy host'],
      answer: 1,
      explanation: 'A warning in the pull request body or a comment shows the blocked address and the command that tried to reach it.',
    },
    {
      prompt: 'An allowlist entry is added while a cloud sandbox session is running. When does it apply?',
      options: ['Immediately, to every running session', 'After the agent pushes its next commit', 'Only to sessions started later'],
      answer: 2,
      explanation: 'Allowlist changes do not apply to sessions already running. Start a new session to use the updated list.',
    },
    {
      prompt: 'The organization sets Enable firewall to Enabled. Can a repository admin turn it off?',
      options: ['Yes, from the repository settings page', 'No; the repository setting is locked', 'Yes, by adding a custom repository rule'],
      answer: 1,
      explanation: 'Repository settings are locked unless the organization chooses Let repositories decide.',
    },
    {
      prompt: 'Which allowlist entry is narrower for an internal package mirror?',
      options: ['A URL entry with the mirror path', 'A domain entry for the mirror host', 'A domain entry for the parent domain'],
      answer: 0,
      explanation: 'A domain entry includes all subdomains. A URL entry matches the scheme, host and path plus paths beneath it.',
    },
  ],
  [
    {
      prompt: 'A team needs setup steps to install tools. Which session environment supports them?',
      options: ['Sessions that run on GitHub Actions', 'Sessions that run in a cloud sandbox', 'Both, if the file is on any branch'],
      answer: 0,
      explanation: 'Setup steps apply only to Actions sessions, and the file must be on the default branch.',
    },
    {
      prompt: 'Which permissions setting suits a setup steps job that only checks out code?',
      options: ['permissions: write-all', 'contents: read', 'contents: write'],
      answer: 1,
      explanation: 'Copilot receives its own token, so setup steps need only minimal permissions such as contents: read.',
    },
    {
      prompt: 'What must you do with the integrated firewall when the agent uses self-hosted runners?',
      options: ['Keep it on and add the runner host', 'Keep it on in Windows runners only', 'Disable it; add network controls'],
      answer: 2,
      explanation: 'The integrated firewall is incompatible with self-hosted runners, so you must disable it and configure network controls.',
    },
    {
      prompt: 'Which values does a cloud sandbox session receive from Agents settings?',
      options: ['Agents variables only', 'Agents secrets only', 'Agents and Actions secrets'],
      answer: 1,
      explanation: 'Only Agents secrets are available in cloud sandboxes. The agent never reads Actions secrets.',
    },
    {
      prompt: 'An organization and a repository both define an Agents secret named REGISTRY_TOKEN. Which value does the agent use?',
      options: ['The organization value, set by an owner', 'The value that was created most recently', 'The value set at the repository level'],
      answer: 2,
      explanation: 'When the same name exists at more than one level, the lowest level takes precedence.',
    },
  ],
];

export const quizReviewLessons: string[][] = [
  ['enablement-policy-scope', 'enablement-policy-scope', 'repository-access-triggers', 'repository-access-triggers', 'enablement-policy-scope'],
  ['copilot-branch-boundaries', 'copilot-branch-boundaries', 'rulesets-for-agents', 'rulesets-for-agents', 'copilot-branch-boundaries'],
  ['review-independence', 'review-independence', 'review-independence', 'reviewing-agent-prs', 'reviewing-agent-prs'],
  ['workflow-approval-gate', 'workflow-approval-gate', 'auto-run-exception', 'auto-run-exception', 'auto-run-exception'],
  ['firewall-coverage', 'firewall-coverage', 'firewall-coverage', 'firewall-allowlist-layers', 'firewall-allowlist-layers'],
  ['setup-steps-hardening', 'setup-steps-hardening', 'setup-steps-hardening', 'agents-secrets-variables', 'agents-secrets-variables'],
];
