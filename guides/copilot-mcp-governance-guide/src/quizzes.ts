interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'What is the default value of the MCP servers in Copilot policy?', options: ['Enabled for all governed seats', 'Disabled by default', 'Enabled only for the cloud agent'], answer: 1, explanation: 'GitHub documents the policy as disabled by default for governed seats.' },
    { prompt: 'Which users does the MCP servers in Copilot policy govern?', options: ['Business and Enterprise seats from the configuring owner', 'Every Copilot user, including those on Free and Pro plans', 'Only users who run Copilot CLI on enterprise-managed devices'], answer: 0, explanation: 'Copilot Free, Pro, Pro+ and Max users are not governed by it.' },
    { prompt: 'Enabling the policy answers which question?', options: ['Which specific servers are allowed to run', 'Which secrets a configured server can read', 'Whether MCP servers can run at all'], answer: 2, explanation: 'Allowlists, denylists or a registry decide which servers run.' },
    { prompt: 'Which location do managed-settings allow and deny lists not reach?', options: ['Servers defined in repository settings', 'Servers defined in personal user settings', 'Repository custom agent profiles'], answer: 2, explanation: 'GitHub excludes repository custom agent profiles; firewall settings can prevent them.' },
    { prompt: 'Where does Copilot CLI store user-level MCP servers?', options: ['~/.copilot/mcp-config.json', 'The repository .github folder only', 'The enterprise .github-private repository'], answer: 0, explanation: 'Commands such as copilot mcp add write to the user configuration file.' },
  ],
  [
    { prompt: 'A server matches an allow entry and a deny entry. What happens?', options: ['It runs because it is allowlisted.', 'It is blocked because deny wins.', 'The newest entry decides the result.'], answer: 1, explanation: 'Deny rules always take precedence over allow rules.' },
    { prompt: 'Two managed sources each define an allowlist. Which servers can run?', options: ['Servers allowed by every source', 'Servers allowed by any source', 'Servers allowed by the MDM source only'], answer: 0, explanation: 'Allowlists intersect, while denylists combine as a union.' },
    { prompt: 'How does a client treat a malformed managed-settings file?', options: ['It ignores the file and allows all servers.', 'It uses the last file it received.', 'It treats it as an empty allowlist.'], answer: 2, explanation: 'An empty allowlist blocks every server except built-in defaults.' },
    { prompt: 'Why does GitHub prefer managed-settings allowlists to custom registries?', options: ['Registries cannot list any remote MCP servers at all.', 'Registries require MDM delivery to every developer device.', 'Registries match by name and can be bypassed.'], answer: 2, explanation: 'Registries are public preview, match by name or ID only, and users can edit config files.' },
    { prompt: 'Which surface does registry enforcement not support?', options: ['Copilot in the cloud', 'Copilot CLI 1.0.11 or later', 'VS Code 1.109.3 or later'], answer: 0, explanation: 'The enforcement reference lists Copilot in the cloud as not supported.' },
  ],
  [
    { prompt: 'Which matcher pins the identity of a local stdio server?', options: ['serverUrl with a wildcard path prefix', 'serverName written in lowercase letters', 'serverCommand with exact arguments'], answer: 2, explanation: 'serverCommand matches the exact command and each argument; serverName is user-chosen.' },
    { prompt: 'Does sandboxMcpServers contain a remote MCP server?', options: ['No, remote servers stay outside it.', 'Yes, all MCP server traffic is sandboxed.', 'Only when the server URL uses a wildcard.'], answer: 0, explanation: 'It requires local MCP servers to run in the sandbox; remote servers do not run there.' },
    { prompt: 'An allowlist exists without connector URLs. Are connectors usable?', options: ['Yes, connectors always bypass allowlists.', 'No, unmatched connectors are blocked.', 'Only inside GitHub Actions agent sessions.'], answer: 1, explanation: 'Connectors are remote servers matched by serverUrl.' },
    { prompt: 'What does strictPluginOnlyCustomization with mcp change?', options: ['It limits MCP config sources.', 'It replaces allow and deny lists.', 'It enables the MCP policy for all seats.'], answer: 0, explanation: 'It restricts sources to plugins and managed settings; it does not replace allow and deny lists.' },
    { prompt: 'A team file replaces an overridable strictPluginOnlyCustomization value. What must it include?', options: ['Every category that should stay restricted', 'Only the categories that the team wants lifted', 'A complete copy of the enterprise allowlist'], answer: 0, explanation: 'The team value replaces the entire overridable default.' },
  ],
  [
    { prompt: 'Which values can a cloud agent MCP server read in a cloud sandbox?', options: ['COPILOT_MCP_ variables and secrets', 'COPILOT_MCP_ secrets only', 'Any Actions secret in the repository'], answer: 1, explanation: 'Only secrets are available in a cloud sandbox, and only prefixed values reach MCP servers.' },
    { prompt: 'An organization and a repository secret share a name. Which wins?', options: ['The organization secret', 'The secret created first', 'The repository secret'], answer: 2, explanation: 'The lowest level wins when names collide.' },
    { prompt: 'Who should own credentials used by repository MCP configuration?', options: ['A service account', 'The repository administrator personally', 'The first developer to need it'], answer: 0, explanation: 'Anyone with write access uses repository configuration, so GitHub recommends a service account.' },
    { prompt: 'What access does the built-in GitHub MCP server have by default in a cloud session?', options: ['Write access to every repository in the organization', 'Read access to all repositories the user can see', 'Read-only access to the current repository'], answer: 2, explanation: 'It uses a specially scoped read-only token for the current repository.' },
    { prompt: 'Which credential does GitHub recommend to widen GitHub MCP server access?', options: ['A classic token with repo scope', 'A fine-grained read-only token', 'The Actions GITHUB_TOKEN'], answer: 1, explanation: 'Store it as COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN, or use a GitHub App.' },
  ],
  [
    { prompt: 'Why does GitHub strongly recommend listing specific tools?', options: ['Configured tools run without approval.', 'Wildcard tool lists fail validation on save.', 'Only five tools can load for each server.'], answer: 0, explanation: 'Once configured, the cloud agent uses tools autonomously.' },
    { prompt: 'What must each tool declare for Copilot code review to use it?', options: ['A COPILOT_MCP_ secret for each tool', 'A readOnlyHint set to true', 'An OAuth client ID and redirect URL'], answer: 1, explanation: 'Code review requires annotations.readOnlyHint set to true.' },
    { prompt: 'Where do you confirm a server started in a cloud agent session?', options: ['The repository Insights traffic tab', 'The Start MCP Servers log step', 'The enterprise billing usage page'], answer: 1, explanation: 'The session log lists the tools under Start MCP Servers.' },
    { prompt: 'A personal and a repository server share a name. Which is used?', options: ['The personal server', 'Both, under numbered names', 'The repository server'], answer: 2, explanation: 'A repository-level server overrides a personal server with the same name.' },
    { prompt: 'Which source is processed last in a cloud agent session?', options: ['Repository settings', 'The custom agent profile', 'The built-in defaults'], answer: 0, explanation: 'Order is defaults, custom agent, then repository settings; later overrides earlier.' },
  ],
  [
    { prompt: 'Which areas does GitHub say to review for a third-party server?', options: ['Pricing, branding and the public roadmap', 'Popularity, repository stars and license', 'Tools, authentication and data access'], answer: 2, explanation: 'These are the review areas in the MCP best practices.' },
    { prompt: 'Where are server-managed settings errors shown?', options: ['In Copilot settings validation', 'In the README of each repository', 'In each user personal settings page'], answer: 0, explanation: 'AI controls, Agents tab, Copilot settings validation shows errors and warnings.' },
    { prompt: 'Recommended: what should happen before a server is configured?', options: ['A wildcard tool list is added', 'It is reviewed and allowlisted', 'Its secret is shared to all repos'], answer: 1, explanation: 'Guide advice: controls should exist before access is granted.' },
    { prompt: 'Recommended: what is the first offboarding step?', options: ['Delete the repository configuration', 'Wait for users to remove it', 'Add a matching deny entry'], answer: 2, explanation: 'A deny blocks the server wherever managed settings apply, even if copies remain.' },
    { prompt: 'A client cannot fetch updated policy. What does it enforce?', options: ['No policy at all until it reconnects', 'The previously enforced policy', 'Only the built-in default servers'], answer: 1, explanation: 'Retained policy can become more restrictive but not less.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['mcp-policy-scope', 'mcp-policy-scope', 'mcp-policy-scope', 'server-inventory', 'server-inventory'],
  ['allowlist-evaluation', 'allowlist-evaluation', 'allowlist-evaluation', 'registry-tradeoffs', 'registry-tradeoffs'],
  ['local-remote-servers', 'local-remote-servers', 'connectors-and-plugins', 'connectors-and-plugins', 'connectors-and-plugins'],
  ['mcp-secret-scoping', 'mcp-secret-scoping', 'mcp-secret-scoping', 'github-server-access', 'github-server-access'],
  ['repository-mcp-config', 'repository-mcp-config', 'repository-mcp-config', 'personal-and-agent-servers', 'personal-and-agent-servers'],
  ['server-onboarding-review', 'server-onboarding-review', 'server-onboarding-review', 'monitoring-offboarding', 'monitoring-offboarding'],
];