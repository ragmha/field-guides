interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'Local sandboxing is off. What access do shell commands run by Copilot have?', options: ['Only the repository and its subdirectories', 'Your full user access to files, network and credentials', 'Read-only access outside the working directory'], answer: 1, explanation: 'Without local sandboxing, shell commands run with your full user access.' },
    { prompt: 'What does a Git worktree separate for an agent session?', options: ['Files for the task, not machine access', 'Network access for the task, not files', 'Credentials for the task, not files'], answer: 0, explanation: 'VS Code notes that a worktree separates files but does not limit machine access.' },
    { prompt: 'Which of these is never covered by local sandboxing?', options: ['Shell commands started by the agent', 'Local language servers for the session', 'Remote MCP servers used by the session'], answer: 2, explanation: 'Local sandboxing applies to local processes; remote MCP servers are never sandboxed.' },
    { prompt: 'Where should you avoid launching Copilot CLI, according to its documentation?', options: ['A reviewed project repository', 'A dedicated scratch directory', 'Your home directory'], answer: 2, explanation: 'GitHub advises launching only from trusted directories and not from your home directory.' },
    { prompt: 'What does VS Code Restricted Mode do for an untrusted workspace?', options: ['Disables agents, the terminal and tasks', 'Runs agents in a sandbox automatically', 'Allows agents but blocks file edits only'], answer: 0, explanation: 'Restricted Mode disables agents, the terminal, tasks, debugging and workspace settings until you trust the workspace.' },
  ],
  [
    { prompt: 'What does --allow-all (or --yolo) approve in Copilot CLI?', options: ['Tools only, while paths still prompt', 'Paths and URLs, while tools still prompt', 'All tools, paths and URLs together'], answer: 2, explanation: 'The flag combines tool, path and URL allow-all permissions, and an enterprise can block it.' },
    { prompt: 'In VS Code, does choosing Allow all turn off the agent sandbox?', options: ['Yes, for the rest of the session', 'No, sandbox limits still apply', 'Only for terminal commands'], answer: 1, explanation: 'Allow all changes approvals; sandbox restrictions remain when sandboxing is on.' },
    { prompt: 'A non-interactive run reaches a request that still needs approval. What happens?', options: ['It waits until a person approves it', 'The request is denied', 'It is approved after a timeout'], answer: 1, explanation: 'In autopilot and non-interactive runs, requests that still need approval are denied.' },
    { prompt: 'You approved rm for the rest of a CLI session. What can now run without a prompt?', options: ['Any rm command, such as rm -rf ./*', 'Only the exact rm command you approved', 'Only rm commands inside the temp directory'], answer: 0, explanation: 'A session approval covers the tool for the session, including broad arguments.' },
    { prompt: 'What does Reset Tool Confirmations in VS Code leave in place?', options: ['Session approvals for terminal commands', 'Always Allow approvals for tools', 'Auto-approval rules in User settings'], answer: 2, explanation: 'Resetting confirmations clears approvals but does not delete rules saved in User settings.' },
  ],
  [
    { prompt: 'A CLI tool matches both --allow-tool and --deny-tool. Which applies?', options: ['The deny rule', 'The allow rule', 'Whichever was listed first'], answer: 0, explanation: 'Deny rules take precedence over allow rules, even with --allow-all-tools.' },
    { prompt: 'Which paths can Copilot CLI use without approval by default?', options: ['Your whole home directory', 'The working directory, subdirectories and temp', 'Only files already open in the session'], answer: 1, explanation: 'Default path access is the working directory, its subdirectories and the system temporary directory.' },
    { prompt: 'In chat.tools.terminal.autoApprove, what does a rule set to false do?', options: ['Blocks the command entirely', 'Removes the command from the terminal', 'Makes the command ask for approval'], answer: 2, explanation: 'A false value means ask, not block.' },
    { prompt: 'Does a VS Code rule for npm run build also approve npm run deploy?', options: ['Yes, because both start with npm run', 'No, it covers build with extra arguments', 'Only when deploy runs in the sandbox'], answer: 1, explanation: 'Prefix matching allows arguments after npm run build, not a different script.' },
    { prompt: 'Why should auto-approval rules be paired with sandboxing?', options: ['Command matching is best effort', 'Rules only apply to URL requests', 'Rules are reset after every prompt'], answer: 0, explanation: 'VS Code calls matching best effort and recommends the sandbox for restriction.' },
  ],
  [
    { prompt: 'A path is granted read/write and also denied. What access results?', options: ['Read/write access', 'No access', 'Read-only access'], answer: 1, explanation: 'Denied access takes precedence over any grant.' },
    { prompt: 'Which command shows the effective sandbox policy without running a command?', options: ['/sandbox status', '/sandbox enable', '/sandbox policy COMMAND'], answer: 2, explanation: '/sandbox policy reports the effective policy for a command without running it.' },
    { prompt: 'What does a denied path that does not exist become when the sandbox starts?', options: ['A directory', 'An empty file', 'A broken symlink'], answer: 0, explanation: 'Missing denied paths are created as directories, so a missing .env becomes a folder.' },
    { prompt: 'You add one allow rule to CLI sandbox host rules. What changes?', options: ['Outbound access becomes an allowlist', 'Deny rules stop applying to hosts', 'Local network access is turned on'], answer: 0, explanation: 'Any allow rule turns outbound access into an allowlist, and deny rules still win.' },
    { prompt: 'Why are sandbox network restrictions weaker on Windows?', options: ['Windows blocks all outbound access', 'They rely on programs honoring proxy settings', 'Host rules are ignored on Windows'], answer: 1, explanation: 'On Windows, network restriction depends on programs honoring proxy settings.' },
  ],
  [
    { prompt: 'Where does the real token for a sandboxed gh command go?', options: ['Any host the command contacts over HTTPS', 'Only hosts in your network allowlist', 'Only github.com and its API and upload hosts'], answer: 2, explanation: 'The command sees a placeholder GH_TOKEN; the real token goes only to the three GitHub hosts.' },
    { prompt: 'What happens to credential masking when a sandbox bypass is approved?', options: ['Masking and the proxy are skipped', 'Masking stays on for that command', 'Only gh credentials stay masked'], answer: 0, explanation: 'An approved bypass skips masking and the proxy, so real secrets are present.' },
    { prompt: 'Why should a masked variable not also be listed in --secret-env-vars?', options: ['It would disable the sandbox', 'That removes the variable instead', 'It would send the value to every host'], answer: 1, explanation: 'Listing the variable in --secret-env-vars removes it rather than masking it.' },
    { prompt: 'GH_TOKEN is exported and you also used copilot login. Which token does Copilot CLI use?', options: ['The stored OAuth token from the keychain', 'The GitHub CLI token as a fallback', 'GH_TOKEN from the environment'], answer: 2, explanation: 'Environment variables silently override a stored OAuth token.' },
    { prompt: 'Which token type is not supported by Copilot CLI?', options: ['Fine-grained personal access token', 'Classic personal access token', 'OAuth token from copilot login'], answer: 1, explanation: 'Classic PATs are unsupported; fine-grained PATs need the Copilot Requests permission.' },
  ],
  [
    { prompt: 'Do local sandbox settings apply to a Copilot cloud sandbox session?', options: ['No, they are separate technologies', 'Yes, they sync when the session starts', 'Only the network host rules apply'], answer: 0, explanation: 'Settings, policies and commands for local and cloud sandboxes do not apply to each other.' },
    { prompt: 'What isolation does each codespace get?', options: ['A shared host with a separate user account', 'Its own virtual machine and isolated network', 'A container on your local machine'], answer: 1, explanation: 'Each codespace runs on its own newly built virtual machine with an isolated virtual network.' },
    { prompt: 'Why review devcontainer.json before creating a codespace for an unfamiliar repository?', options: ['It sets the codespace billing owner', 'It controls Copilot permission modes', 'It can run arbitrary setup commands'], answer: 2, explanation: 'devcontainer.json can install extensions and run arbitrary code such as postCreateCommand.' },
    { prompt: 'After an incident, is resetting tool approvals enough for exposed credentials?', options: ['Yes, it revokes tokens the agent used', 'No, exposed credentials must be rotated', 'Yes, if the sandbox was turned on later'], answer: 1, explanation: 'Resetting approvals changes future prompts; it does not revoke credentials.' },
    { prompt: 'What is the first step in the VS Code incident response sequence?', options: ['Stop the session', 'Rotate every credential', 'Restore files from Git'], answer: 0, explanation: 'Stop the session first, then inspect, review access, recover and rotate.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['local-trust-boundary', 'local-trust-boundary', 'local-trust-boundary', 'trusted-directories', 'trusted-directories'],
  ['permission-modes', 'permission-modes', 'permission-modes', 'approval-persistence', 'approval-persistence'],
  ['cli-tool-rules', 'cli-tool-rules', 'terminal-auto-approve', 'terminal-auto-approve', 'terminal-auto-approve'],
  ['sandbox-filesystem', 'sandbox-filesystem', 'sandbox-filesystem', 'sandbox-network', 'sandbox-network'],
  ['credential-masking', 'credential-masking', 'credential-masking', 'least-privilege-tokens', 'least-privilege-tokens'],
  ['isolation-tiers', 'isolation-tiers', 'isolation-tiers', 'local-incident-response', 'local-incident-response'],
];
