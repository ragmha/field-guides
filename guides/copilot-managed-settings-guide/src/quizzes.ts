interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: "Which file holds the enterprise default for server-managed settings?", options: ["copilot/managed-settings.json in .github-private", ".vscode/settings.json in each repository", "A settings file in each user profile folder"], answer: 0, explanation: "Server-managed settings live in copilot/managed-settings.json in the enterprise .github-private repository." },
    { prompt: "What does an empty allowedMcpServers array mean?", options: ["The key is ignored by every client", "Every MCP server is allowed", "Complete lockdown of non-built-in servers"], answer: 2, explanation: "An explicit empty array is a complete lockdown, not an unmanaged policy." },
    { prompt: "Which client does the reference matrix list as not supporting permissions.deny?", options: ["Copilot CLI", "JetBrains IDEs", "VS Code"], answer: 1, explanation: "The matrix marks permissions.deny as unsupported in JetBrains IDEs and cloud Actions sessions." },
    { prompt: "Why check client versions as well as the support matrix?", options: ["Versions only affect the user interface", "Some keys need a minimum client version", "Older clients enforce stricter defaults"], answer: 1, explanation: "Several keys, such as autoTier and fusionTier, have minimum client versions." },
    { prompt: "What should you assume for a client that does not support a key?", options: ["The key gives no protection on that client", "It blocks Copilot until it is upgraded", "It enforces the most restrictive value"], answer: 0, explanation: "A key only applies on clients that support it; plan a compensating control or an upgrade." },
  ],
  [
    { prompt: "Who can edit the .github-private settings repository by default?", options: ["Every enterprise member", "Enterprise owners and AI managers", "Any repository collaborator"], answer: 1, explanation: "The repository is internal, and edits are restricted to enterprise administrators and AI managers." },
    { prompt: "Which wrapper lets enterprise teams replace a default value?", options: ["{ \"overridable\": VALUE }", "{ \"default\": VALUE }", "{ \"team\": VALUE }"], answer: 0, explanation: "Server-managed keys that support it accept an overridable wrapper; team files then replace the value." },
    { prompt: "A team file sets a new permissions.deny list. What happens to the default rules?", options: ["They merge with the team rules", "They apply only to non-members", "The team list replaces the whole default"], answer: 2, explanation: "A team value replaces the entire overridable default, so include every rule you want to keep." },
    { prompt: "Which file maps enterprise teams to team settings files?", options: ["copilot/teams/index.json", "copilot/managed-settings.json", "copilot/team-mappings.json"], answer: 2, explanation: "team-mappings.json maps enterprise team slugs to files under copilot/teams/." },
    { prompt: "How long can server-managed changes take to reach supported clients?", options: ["Up to a full working day", "About an hour, unless restarted", "Only after the next client update"], answer: 1, explanation: "Clients apply updates within about an hour; restart or sign-in refreshes immediately." },
  ],
  [
    { prompt: "Which device delivery method needs no client restart to pick up changes?", options: ["A file placed by a script", "A file copied by a user", "Native MDM policy values"], answer: 2, explanation: "MDM-managed clients check for updated policies hourly without a restart." },
    { prompt: "How do clients load an updated file-based managed settings file?", options: ["After an hourly background check", "After the client restarts", "Immediately when the file changes"], answer: 1, explanation: "File-based delivery is read at startup, so users restart supported clients." },
    { prompt: "Which VS Code command forces an account policy check for testing?", options: ["Developer: Sync Account Policy", "Developer: Reload Window", "Preferences: Open Policy File"], answer: 0, explanation: "The deployment page names Developer: Sync Account Policy for testing." },
    { prompt: "Device-based settings apply to which users?", options: ["All users with them on that machine", "Only users on the enterprise plan", "Only users in a mapped team"], answer: 0, explanation: "MDM and file deployments apply to everyone with the settings installed, regardless of plan." },
    { prompt: "What is a known risk of device-only delivery?", options: ["It cannot set permissions keys", "It overrides user settings too late", "Unmanaged machines are unrestricted"], answer: 2, explanation: "Machines without the profile or file receive no device-delivered settings." },
  ],
  [
    { prompt: "Which source has the highest precedence for a replaceable key?", options: ["Native MDM", "Server-managed", "User settings"], answer: 0, explanation: "Documented precedence is MDM, then server-managed, then file-based, then user settings." },
    { prompt: "Where does file-based delivery sit in the precedence order?", options: ["Above MDM and server", "Below server, above user", "Below user settings"], answer: 1, explanation: "File-based settings rank below server-managed and above user settings." },
    { prompt: "Server sets disableBypassPermissionsMode to \"disable\"; MDM omits it. What applies?", options: ["Bypass is allowed by MDM", "Bypass mode stays disabled", "Users choose the value"], answer: 1, explanation: "The most restrictive value across layers wins; a disable from any layer cannot be relaxed." },
    { prompt: "Server and MDM each supply MCP allowlists. What is allowed?", options: ["Servers on the MDM list", "Servers on either list", "Servers on both lists"], answer: 2, explanation: "Allowlists from multiple managed sources intersect." },
    { prompt: "Why avoid combining delivery methods without a reason?", options: ["Effective policy is harder to reason about", "Clients reject mixed sources", "It disables team overrides"], answer: 0, explanation: "The docs warn that combining methods makes the effective policy harder to understand." },
  ],
  [
    { prompt: "What does the validator check in the settings repository?", options: ["Client versions on each device", "Settings, mappings and team files", "Every user settings file"], answer: 1, explanation: "Validation covers managed-settings.json, team-mappings.json and referenced team files." },
    { prompt: "What proves a deny rule works on an endpoint?", options: ["A merged pull request", "A passing validator run", "A blocked test operation"], answer: 2, explanation: "Only a test on the client shows the effective behavior." },
    { prompt: "What should you test besides a blocked operation?", options: ["A permitted operation", "A disabled account", "A deleted repository"], answer: 0, explanation: "Testing a permitted action shows the rule is not broader than intended." },
    { prompt: "Which is a common source of drift?", options: ["A reverted pull request", "A team mapping validation", "An unmanaged or outdated client"], answer: 2, explanation: "Unsupported versions and machines outside device management drift from intended policy." },
    { prompt: "With forceRemoteSettingsRefresh, what happens if a refresh fails?", options: ["Cached policy is used", "Affected operations are restricted", "Restrictions are lifted"], answer: 1, explanation: "Clients cannot fall back to cache, so the policy stays unconfirmed and operations are restricted." },
  ],
  [
    { prompt: "Which controls can restrict changes to .github-private?", options: ["User settings", "Device profiles", "Rulesets and code owners"], answer: 2, explanation: "Repository rulesets and code owners restrict who can change the settings files." },
    { prompt: "Where should a change be piloted first?", options: ["On a mapped pilot team", "On all clients at once", "On production repositories"], answer: 0, explanation: "An overridable key with a pilot team file stages the change for a small group." },
    { prompt: "How do you roll back a server-managed change?", options: ["Delete the repository", "Ask users to edit settings", "Revert the default-branch commit"], answer: 2, explanation: "Reverting the commit on the default branch restores the previous settings." },
    { prompt: "You revert a server deny rule, but MDM carries it too. What happens?", options: ["The deny rule is removed", "The deny rule still applies", "Users can choose to keep it"], answer: 1, explanation: "Deny rules from any managed source apply; roll back each source." },
    { prompt: "How do clients pick up a rolled-back settings file?", options: ["After a client restart", "On the next hourly check", "At the next sign-out"], answer: 0, explanation: "File-based settings load at startup, so users restart supported clients." },
  ],
];

export const quizReviewLessons: string[][] = [
  ["managed-settings-keys", "managed-settings-keys", "client-support-matrix", "client-support-matrix", "client-support-matrix"],
  ["github-private-source", "team-overrides", "team-overrides", "team-overrides", "github-private-source"],
  ["mdm-delivery", "file-based-delivery", "mdm-delivery", "mdm-delivery", "file-based-delivery"],
  ["deployment-precedence", "deployment-precedence", "restrictive-composition", "restrictive-composition", "deployment-precedence"],
  ["endpoint-verification", "endpoint-verification", "endpoint-verification", "drift-detection", "drift-detection"],
  ["change-review", "change-review", "rollback-plan", "rollback-plan", "rollback-plan"],
];
