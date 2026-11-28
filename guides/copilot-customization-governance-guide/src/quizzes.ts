interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'Where do repository-wide custom instructions live?', options: ['In the organization Copilot settings page', 'In .github/copilot-instructions.md', 'In ~/.copilot/skills on each machine'], answer: 1, explanation: 'Repository-wide instructions live in .github/copilot-instructions.md; path-specific and agent instruction files sit alongside it.' },
    { prompt: 'Which experiences read organization custom instructions?', options: ['GitHub website experiences and code review', 'Every local IDE that has a Copilot seat', 'Only Copilot CLI sessions that have a user file'], answer: 0, explanation: 'Organization instructions apply to supported GitHub website experiences and Copilot code review, not local clients.' },
    { prompt: 'Where are organization-level custom agents stored?', options: ['In each member repository under the .github/prompts folder', 'In the personal user profile of an organization owner', 'In agents/ of the org .github or .github-private repo'], answer: 2, explanation: 'Organization agents live in the agents directory of the organization .github or .github-private repository.' },
    { prompt: 'Which surfaces support prompt files according to the cheat sheet?', options: ['GitHub.com and Copilot CLI only', 'Copilot code review and cloud agent', 'Supported IDEs such as VS Code'], answer: 2, explanation: 'Prompt files are listed for supported IDEs and are not supported on GitHub.com or in the CLI.' },
    { prompt: 'What does excludeAgent: "code-review" do in a path-specific file?', options: ['Stops Copilot code review from reading it', 'Stops all clients except code review reading it', 'Marks the file as a public preview feature'], answer: 0, explanation: 'The excludeAgent key removes a path-specific file from either code review or cloud agent.' },
  ],
  [
    { prompt: 'What does protecting agent files using rulesets allow?', options: ['Only enterprise owners edit; others open PRs', 'Anyone in the enterprise can push changes directly', 'Agent files become hidden from all members'], answer: 0, explanation: 'The ruleset restricts edits to enterprise owners while others can still open pull requests and bypass actors can merge.' },
    { prompt: 'Which branch does Copilot code review read instructions from on a PR?', options: ['The repository default branch only', 'The pull request head branch', 'The most recent release tag'], answer: 1, explanation: 'Code review reads instructions and skills from the head branch, so a PR can change its own review.' },
    { prompt: 'When does a new custom agent profile appear on GitHub?', options: ['As soon as a draft pull request opens', 'After an admin approves it in settings', 'After merge to the default branch'], answer: 2, explanation: 'Custom agent profiles must be committed and merged to the default branch.' },
    { prompt: 'When do Copilot CLI sessions pick up an edited instructions file?', options: ['Instantly, inside the running session', 'After resuming or starting a session', 'Only after the next CLI upgrade'], answer: 1, explanation: 'CLI changes apply when you resume the session or start a new one.' },
    { prompt: 'Which file should a plugin marketplace update to name its reviewers?', options: ['.github/CODEOWNERS', '.github/copilot-instructions.md', '.github/hooks/review.json'], answer: 0, explanation: 'The marketplace guidance asks maintainers to update CODEOWNERS, contribution instructions and templates.' },
  ],
  [
    { prompt: 'Where do you put an agent profile to test it privately?', options: ['In the agents/ directory of the governance repo', 'In each consuming repository root', 'In .github/agents of .github-private'], answer: 2, explanation: 'Profiles in .github/agents of .github-private are only usable for tasks started in that repository.' },
    { prompt: 'How do you release a tested agent to the whole organization?', options: ['Move the profile into agents/ and merge', 'Add the profile to personal instructions', 'Enable it in each user client settings'], answer: 0, explanation: 'Moving the profile to the agents directory and merging releases it.' },
    { prompt: 'What identifies a custom agent version?', options: ['A semantic version in the frontmatter', 'The Git commit SHA of the profile', 'The date the agent was first used'], answer: 1, explanation: 'Versioning is based on Git commit SHAs; a PR keeps the version used when the task was assigned.' },
    { prompt: 'What does gh skill update do with a pinned skill?', options: ['It skips the pinned skill', 'It upgrades to the newest tag', 'It deletes the skill provenance'], answer: 0, explanation: 'Pinned skills are skipped, so changes require a deliberate reinstall.' },
    { prompt: 'Why keep a marketplace name stable?', options: ['Names control which surfaces load plugins', 'Renaming deletes all published plugin versions', 'Plugin IDs include the marketplace name'], answer: 2, explanation: 'Plugin identifiers use PLUGIN-NAME@MARKETPLACE-NAME, so a rename changes every identifier.' },
  ],
  [
    { prompt: 'How do personal skills reach cloud agent sandbox sessions?', options: ['Automatically from ~/.copilot/skills on each laptop', 'Through .copilot/skills in a dotfiles repo', 'Through organization custom instructions'], answer: 1, explanation: 'Personal skills reach cloud sandbox sessions only via a dotfiles repository, not Actions-based sessions.' },
    { prompt: 'What does adding a marketplace do?', options: ['Installs and enables every plugin in it', 'Blocks plugins that come from other sources', 'Makes its plugins available to browse'], answer: 2, explanation: 'Adding a marketplace makes plugins available; install and enable are separate steps.' },
    { prompt: 'Can contributors override plugin defaults in .github/copilot/settings.json?', options: ['No, repository defaults are always enforced', 'Only enterprise owners can override them', 'Yes, locally on supported surfaces'], answer: 2, explanation: 'Repository defaults can be overridden locally; only managed settings require or block plugins.' },
    { prompt: 'What does GitHub say an approved marketplace provides?', options: ['A distribution control, not a safety guarantee', 'A verified security review of every listed plugin', 'Automatic pinning of all plugin versions'], answer: 0, explanation: 'An approved marketplace controls distribution but does not make its plugins safe.' },
    { prompt: 'Which customization approach does GitHub recommend starting with?', options: ['A plugin bundle for every new team rule', 'The smallest customization that works', 'An enterprise agent for all teams'], answer: 1, explanation: 'Comparing customizations recommends starting with the smallest customization.' },
  ],
  [
    { prompt: 'On GitHub.com Chat, which instruction layer ranks first?', options: ['Personal instructions', 'Organization instructions', 'Agent instruction files'], answer: 0, explanation: 'GitHub.com Chat ranks personal, then repository, then organization, while still providing all sets.' },
    { prompt: 'How does Copilot CLI combine instruction files?', options: ['Organization text always wins over files', 'It combines them without general order', 'Only the nearest instruction file is used'], answer: 1, explanation: 'The CLI combines files, removes identical duplicates and defines no general precedence order.' },
    { prompt: 'What is the recommended fix for conflicting instructions?', options: ['Add a rule telling Copilot to ignore one', 'Remove or narrow the conflicting rule', 'Raise the priority of the preferred file'], answer: 1, explanation: 'VS Code guidance says to remove or narrow the conflicting rule rather than add a compensating one.' },
    { prompt: 'A repository and enterprise agent share a filename. Which applies there?', options: ['The enterprise agent', 'Whichever was merged last', 'The repository agent'], answer: 2, explanation: 'The lowest level wins and profiles are deduplicated by filename.' },
    { prompt: 'What does an omitted tools field mean in an agent profile?', options: ['The agent can use all tools', 'The agent can use no tools', 'The agent inherits enterprise tools'], answer: 0, explanation: 'Omitting tools enables all tools; an empty list disables them.' },
  ],
  [
    { prompt: 'What does the totals_by_plugin metric count?', options: ['Every plugin component used in sessions', 'Plugin installs across the enterprise', 'Skill invocations only'], answer: 2, explanation: 'totals_by_plugin counts skill invocations only.' },
    { prompt: 'Which audit log filter does GitHub suggest for custom agent usage?', options: ['actor:Copilot', 'action:agent.run', 'repo:.github-private'], answer: 0, explanation: 'The agent testing page suggests filtering the organization audit log by actor:Copilot.' },
    { prompt: 'Why does VS Code recommend converting prompt files to skills?', options: ['Skills are verified by GitHub before use', 'Prompt files cannot be stored in Git', 'The Local harness is being removed'], answer: 2, explanation: 'Prompt files run only in the deprecated Local harness, scheduled for removal by February 2027.' },
    { prompt: 'Do original and migrated VS Code customizations stay in sync?', options: ['Yes, edits flow both ways automatically', 'No, they do not synchronize', 'Only for user-level instruction files'], answer: 1, explanation: 'Originals and migrated copies do not synchronize, so retire the original after verifying.' },
    { prompt: 'What should happen to a stale row with no owner?', options: ['Escalate it for an owner decision', 'Delete it during the next quarterly sweep', 'Leave it until a user complains'], answer: 0, explanation: 'Guide advice: escalate ownerless rows rather than deleting them without review.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['customization-layers', 'customization-layers', 'customization-layers', 'surface-support-check', 'surface-support-check'],
  ['ownership-model', 'change-review', 'change-review', 'change-review', 'ownership-model'],
  ['agent-release-path', 'agent-release-path', 'agent-release-path', 'skill-plugin-versioning', 'skill-plugin-versioning'],
  ['distribution-channels', 'managed-plugin-distribution', 'managed-plugin-distribution', 'managed-plugin-distribution', 'distribution-channels'],
  ['instruction-precedence', 'instruction-precedence', 'instruction-precedence', 'agent-name-collisions', 'agent-name-collisions'],
  ['stale-customization-review', 'stale-customization-review', 'retire-and-migrate', 'retire-and-migrate', 'stale-customization-review'],
];
