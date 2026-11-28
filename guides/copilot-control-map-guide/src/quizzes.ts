interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    {
      prompt: 'Which statement about the Copilot governance surfaces is accurate?',
      options: [
        'Higher layers always override the lower layers in the stack',
        'Each surface answers its own question; none overrides another',
        'Policies alone determine what clients and agents are able to do',
      ],
      answer: 1,
      explanation: 'Policies, managed settings, network routing, rulesets, budgets and audit logs each answer a different question.',
    },
    {
      prompt: 'Who does a server-managed settings file in the .github-private repository apply to?',
      options: [
        'Users licensed for Copilot by the enterprise',
        'Anyone who signs in on a managed laptop',
        'Every user on the corporate network',
      ],
      answer: 0,
      explanation: 'The server file reaches enterprise-licensed users; machine configuration reaches anyone on the device.',
    },
    {
      prompt: 'What does the enterprise audit log not show?',
      options: [
        'Changes to Copilot policies and settings',
        'Agent activity on the GitHub website',
        'Prompts typed into a local client',
      ],
      answer: 2,
      explanation: 'GitHub documents that audit logs cover GitHub website activity, not local client actions.',
    },
    {
      prompt: 'Without extra permissions, what can an AI manager holding Manage enterprise AI controls not reach?',
      options: [
        'Copilot policies on the AI controls tab',
        'Agent and MCP settings under AI controls',
        'Billing and Copilot access management',
      ],
      answer: 2,
      explanation: 'AI managers cannot access Copilot access management, Billing or Metrics unless granted.',
    },
    {
      prompt: 'Why record the accountable owner separately from the configuring role?',
      options: [
        'The person changing a setting may not own the risk',
        'GitHub requires two approvers for every policy setting',
        'Configuring roles are never able to read the audit log',
      ],
      answer: 0,
      explanation: 'Accountability for a requirement and permission to change a setting often sit with different teams.',
    },
  ],
  [
    {
      prompt: 'An enterprise sets a policy to disabled. What can an organization owner do?',
      options: [
        'Enable the policy for their own organization',
        'Enable it for repositories they administer',
        'Nothing; only delegated policies are open',
      ],
      answer: 2,
      explanation: 'Organizations choose only when the enterprise selects Let organizations decide.',
    },
    {
      prompt: 'A user is licensed by two organizations that disagree on a policy. What should you do first?',
      options: [
        'Assume the most restrictive value applies',
        'Check that policy in the conflict reference',
        'Assume the enterprise-level value applies',
      ],
      answer: 1,
      explanation: 'The least restrictive value usually wins within an enterprise, with listed exceptions.',
    },
    {
      prompt: 'What do the default availability policies control?',
      options: [
        'Whether unconfigured GA features and models are on',
        'Which organizations can purchase additional seats',
        'Which repositories the cloud agent is able to access',
      ],
      answer: 0,
      explanation: 'Two default availability policies decide whether unconfigured generally available features and models are available.',
    },
    {
      prompt: 'How do organization rulesets relate to an enterprise branch ruleset?',
      options: [
        'They replace it for that organization',
        'They add to it and cannot override it',
        'They apply only to Copilot pull requests',
      ],
      answer: 1,
      explanation: 'Organization and repository rulesets add to the enterprise baseline.',
    },
    {
      prompt: 'By default, what happens to workflows on a pull request Copilot opens?',
      options: [
        'They run immediately on GitHub-hosted runners',
        'They are skipped until the pull request merges',
        'They wait for approval from a user with write access',
      ],
      answer: 2,
      explanation: 'Workflows are blocked until approved by default; repository administrators can change this.',
    },
  ],
  [
    {
      prompt: 'For most keys, which managed settings source has the highest precedence?',
      options: [
        'The server-managed file',
        'The local system file',
        'Device management',
      ],
      answer: 2,
      explanation: 'Precedence is device management, then server, then file, then user settings.',
    },
    {
      prompt: 'A server file denies a shell command and a local file allows it. What is the effect?',
      options: [
        'The command is denied',
        'The command is allowed',
        'The user picks the rule',
      ],
      answer: 0,
      explanation: 'Permission rules combine in the most restrictive direction, with deny over ask over allow.',
    },
    {
      prompt: 'Which source reaches Copilot in the cloud?',
      options: [
        'Device management profiles',
        'The server-managed file',
        'A file in the system path',
      ],
      answer: 1,
      explanation: 'Only the server-managed file applies to all supported clients, including Copilot in the cloud.',
    },
    {
      prompt: 'Which endpoint should the corporate firewall block to prevent personal plans?',
      options: [
        '*.business.githubcopilot.com',
        '*.individual.githubcopilot.com',
        '*.enterprise.githubcopilot.com',
      ],
      answer: 1,
      explanation: 'Allow the plan endpoints the organization uses and block the individual endpoint.',
    },
    {
      prompt: 'Which traffic is outside the cloud agent firewall?',
      options: [
        'Processes started through Bash',
        'The built-in Playwright MCP server',
        'Other MCP servers and setup steps',
      ],
      answer: 2,
      explanation: 'The firewall covers Bash-started processes and the built-in Playwright MCP, not other MCP servers or setup steps.',
    },
  ],
  [
    {
      prompt: 'How should content exclusion be recorded in the inventory?',
      options: [
        'As a file system security boundary',
        'As reduced exposure with known gaps',
        'As a rule every MCP server honors',
      ],
      answer: 1,
      explanation: 'GitHub states content exclusion is not a security boundary and is not guaranteed for third-party MCP servers.',
    },
    {
      prompt: 'Who is affected by a repository-level content exclusion rule?',
      options: [
        'Only the repository administrator who set it',
        'Only users seated through that organization',
        'Enterprise Copilot users in that repository',
      ],
      answer: 2,
      explanation: 'Repository rules affect any Copilot user in the enterprise working in that repository.',
    },
    {
      prompt: 'Which budget always enforces a hard stop?',
      options: [
        'A user-level budget',
        'An organization budget',
        'An enterprise budget',
      ],
      answer: 0,
      explanation: 'User-level budgets always stop; spending budgets stop only if Stop usage is enabled.',
    },
    {
      prompt: 'What does an enterprise budget not cap?',
      options: [
        'Metered agent usage',
        'Seat license fees',
        'Cost center overages',
      ],
      answer: 1,
      explanation: 'The enterprise budget covers metered charges, not license fees.',
    },
    {
      prompt: 'What keeps working when a user reaches an enforced budget limit?',
      options: [
        'Inline completions and next edit suggestions',
        'Agent sessions in Copilot in the cloud',
        'Requests to premium models in Copilot Chat',
      ],
      answer: 0,
      explanation: 'Inline completions and next edit suggestions do not consume AI credits.',
    },
  ],
  [
    {
      prompt: 'How long does the enterprise audit log retain events?',
      options: [
        '180 days',
        '90 days',
        '365 days',
      ],
      answer: 0,
      explanation: 'The audit log keeps 180 days; stream to a SIEM for longer history.',
    },
    {
      prompt: 'Which field marks an audit event as performed by an AI agent?',
      options: [
        'agent_session_id',
        'actor_is_agent',
        'copilot_actor_type',
      ],
      answer: 1,
      explanation: 'actor_is_agent is true for agentic events; agent_session_id links to the session when applicable.',
    },
    {
      prompt: 'What is the documented path for evidence of local client activity?',
      options: [
        'Searching the enterprise audit log',
        'The agent sessions view in AI controls',
        'OpenTelemetry via managed settings',
      ],
      answer: 2,
      explanation: 'The audit log excludes client session data; the telemetry key exports client data to an OpenTelemetry backend.',
    },
    {
      prompt: 'When is usage metrics data for a given day available?',
      options: [
        'Within one hour of activity',
        'Within two full UTC days',
        'At the end of the billing cycle',
      ],
      answer: 1,
      explanation: 'Data is available within two full UTC days after the day closes.',
    },
    {
      prompt: 'Why should organization metric totals not be summed?',
      options: [
        'Organizations report in different time zones',
        'One user can belong to several organizations',
        'Organization totals exclude all agent activity',
      ],
      answer: 1,
      explanation: 'Organization-level metrics can overlap, so their sum overstates the enterprise total.',
    },
  ],
  [
    {
      prompt: 'What does an empty row in a risk-to-control matrix indicate?',
      options: [
        'The risk is already fully mitigated',
        'The risk belongs to a sibling team',
        'No layer controls that risk yet',
      ],
      answer: 2,
      explanation: "An empty row needs a new control or an owner's explicit risk acceptance.",
    },
    {
      prompt: 'Which inventory field most often reveals hidden exposure?',
      options: [
        'Known gaps',
        'Release status',
        'Review date',
      ],
      answer: 0,
      explanation: 'Documented gaps, such as unsupported clients or unlicensed users, show where a control does not reach.',
    },
    {
      prompt: 'Why prefer the managed settings MCP allowlist over a custom MCP registry?',
      options: [
        'The registry reaches more clients',
        'Users cannot override the allowlist',
        'The allowlist needs no settings file',
      ],
      answer: 1,
      explanation: 'GitHub recommends the managed settings allowlist; the registry method has weaker enforcement and is public preview.',
    },
    {
      prompt: 'When does GitHub recommend setting an enterprise default to disabled?',
      options: [
        'Only for non-negotiable requirements',
        'For every new feature until reviewed',
        'Whenever any organization requests it',
      ],
      answer: 0,
      explanation: 'Reserve enterprise-wide disables for non-negotiables and scope other restrictions to sensitive organizations.',
    },
    {
      prompt: 'A requirement must reach contractors using personal plans on managed laptops. Which source fits?',
      options: [
        'The server-managed file only',
        'An organization-level policy',
        'Device management or a file',
      ],
      answer: 2,
      explanation: 'Machine-level sources apply regardless of license source; the server file reaches only licensed users.',
    },
  ],
];

export const quizReviewLessons: string[][] = [
  ['control-layer-stack', 'control-layer-stack', 'control-layer-stack', 'control-owner-map', 'control-owner-map'],
  ['enterprise-org-policies', 'enterprise-org-policies', 'enterprise-org-policies', 'repository-controls', 'repository-controls'],
  ['client-managed-settings', 'client-managed-settings', 'client-managed-settings', 'network-access-layer', 'network-access-layer'],
  ['content-exclusion-layer', 'content-exclusion-layer', 'billing-budget-layer', 'billing-budget-layer', 'billing-budget-layer'],
  ['audit-log-evidence', 'audit-log-evidence', 'audit-log-evidence', 'usage-metrics-evidence', 'usage-metrics-evidence'],
  ['control-inventory-risks', 'control-inventory-risks', 'layer-selection', 'layer-selection', 'layer-selection'],
];
