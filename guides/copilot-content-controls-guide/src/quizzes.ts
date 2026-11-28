interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    {
      prompt: 'Which of these is a documented effect of excluding a file?',
      options: ['The file is hidden from people with read access', 'The file no longer informs Copilot responses', 'The file is deleted from the default branch'],
      answer: 1,
      explanation: 'Exclusion stops the file informing suggestions and responses; it does not change human access or repository content.',
    },
    {
      prompt: 'What happens to an excluded file during Copilot code review?',
      options: ['It is not reviewed by Copilot code review', 'It is reviewed with a warning banner added', 'It is reviewed only by repository admins'],
      answer: 0,
      explanation: 'GitHub documents that affected files are not reviewed in a Copilot code review.',
    },
    {
      prompt: 'Which Copilot plans support content exclusion?',
      options: ['Copilot Free and Copilot Pro only', 'Every plan, including individual plans', 'Copilot Business and Copilot Enterprise'],
      answer: 2,
      explanation: 'The concept page lists Copilot Business and Copilot Enterprise as the supported plans.',
    },
    {
      prompt: 'Which users does an organization-level exclusion reach?',
      options: ['All members of the enterprise account', 'Anyone who can read the repositories', 'Users assigned a seat by that organization'],
      answer: 2,
      explanation: 'Organization rules apply only to users with a Copilot seat assigned by that organization.',
    },
    {
      prompt: 'How do inherited organization rules appear on a repository settings page?',
      options: ['As gray boxes the repository admin cannot edit', 'As editable entries above repository rules', 'They are hidden from repository administrators'],
      answer: 0,
      explanation: 'Inherited organization and enterprise exclusions show as read-only gray boxes on the repository page.',
    },
  ],
  [
    {
      prompt: 'What does the repository pattern "secrets.json" match?',
      options: ['A file named secrets.json anywhere in the repo', 'Only a secrets.json file at the repository root', 'Every JSON file whose name contains secrets'],
      answer: 0,
      explanation: 'Without a leading slash, a file name pattern matches that name anywhere in the repository.',
    },
    {
      prompt: 'How are exclusion patterns matched?',
      options: ['With regular expressions, case sensitive', 'With exact paths only, no wildcards allowed', 'With fnmatch rules, case insensitive'],
      answer: 2,
      explanation: 'GitHub documents fnmatch matching rules that are case insensitive.',
    },
    {
      prompt: 'Which pattern excludes everything under the root scripts directory?',
      options: ['"scripts.*" as a file name pattern', '"/scripts/**" with a leading slash', '"*scripts" with a trailing name match'],
      answer: 1,
      explanation: 'The leading slash anchors to the root and ** matches everything below the directory.',
    },
    {
      prompt: 'What does the "*" key mean in an organization rule?',
      options: ['Apply only to repositories with no rules', 'Apply its paths to all repositories', 'Apply only to repositories owned by admins'],
      answer: 1,
      explanation: 'The "*" key applies its paths to every repository and other file locations.',
    },
    {
      prompt: 'A repository is cloned over HTTPS and SSH. How many rule entries are needed?',
      options: ['One entry, because protocol is ignored', 'Two entries, one for each clone protocol', 'One entry per developer who clones it'],
      answer: 0,
      explanation: 'Matching works regardless of the clone protocol, and user@ and port are ignored.',
    },
  ],
  [
    {
      prompt: 'Which tool supports exclusion for inline suggestions but not chat?',
      options: ['Visual Studio Code', 'JetBrains IDEs', 'Xcode'],
      answer: 2,
      explanation: 'Xcode and Eclipse support exclusion for inline suggestions but not for chat or agent features.',
    },
    {
      prompt: 'Which editor in the matrix does not support exclusion for inline suggestions?',
      options: ['Azure Data Studio', 'Vim/Neovim', 'Visual Studio'],
      answer: 0,
      explanation: 'Azure Data Studio is listed as not supported for inline suggestions.',
    },
    {
      prompt: 'Is content exclusion a filesystem security boundary?',
      options: ['Yes, it blocks every process on the machine', 'No, it is a guardrail for GitHub tools', 'Yes, but only inside the Copilot CLI'],
      answer: 1,
      explanation: 'GitHub describes exclusion as a guardrail for GitHub-controlled tools, not a substitute for OS permissions.',
    },
    {
      prompt: 'Which of these do exclusions not apply to?',
      options: ['Symbolic links in the repository', 'Files opened in VS Code', 'Pull requests in code review'],
      answer: 0,
      explanation: 'GitHub documents that exclusions do not apply to symlinks or repositories on remote filesystems.',
    },
    {
      prompt: 'How do agents in the IDE, CLI and app handle excluded files?',
      options: ['They ignore exclusions entirely in all cases', 'They copy excluded files to a safe location', 'They block tool access but may miss indirect access'],
      answer: 2,
      explanation: 'Agents block access through Copilot tools and check identifiable paths, but may miss indirect access.',
    },
  ],
  [
    {
      prompt: 'How long can an exclusion change take to reach IDEs with loaded settings?',
      options: ['Up to 24 hours after saving', 'Up to 30 minutes after saving', 'Until the next Copilot release'],
      answer: 1,
      explanation: 'GitHub states changes can take up to 30 minutes in IDEs that already loaded settings.',
    },
    {
      prompt: 'Why open a non-excluded control file before testing the excluded one?',
      options: ['To refresh the exclusion policy cache', 'To register the file with the audit log', 'To prove suggestions work in that client'],
      answer: 2,
      explanation: 'A control result shows that missing suggestions are due to the rule, not a sign-in or client problem.',
    },
    {
      prompt: 'Which audit log action records exclusion changes?',
      options: ['copilot.content_exclusion_changed', 'repo.copilot_settings_updated', 'org.update_content_policy'],
      answer: 0,
      explanation: 'The review page filters the audit log to copilot.content_exclusion_changed.',
    },
    {
      prompt: 'What happens to rule comments when you PUT exclusions through the REST API?',
      options: ['Existing comments are deleted', 'Comments move to the audit log', 'Comments are kept unchanged'],
      answer: 0,
      explanation: 'The preview API does not support comments; GET omits them and PUT deletes existing ones.',
    },
    {
      prompt: 'What does the excluded_paths value in an audit entry show?',
      options: ['The settings before the change', 'The settings after the change', 'Only the paths that were removed'],
      answer: 1,
      explanation: 'GitHub documents that excluded_paths shows the settings after the change.',
    },
  ],
  [
    {
      prompt: 'What does the Block option do on supported surfaces?',
      options: ['Hides suggestions matching public code', 'Hides suggestions from private repos', 'Hides suggestions in excluded files'],
      answer: 0,
      explanation: 'Block checks suggestions against public code on GitHub and does not show a match or near match.',
    },
    {
      prompt: 'Where does an organization-assigned user on GitHub Enterprise Cloud get this policy?',
      options: ['From their personal account settings', 'From their organization or enterprise', 'From the repository settings page'],
      answer: 1,
      explanation: 'Organization-assigned users cannot set it personally; it is inherited from the organization or enterprise.',
    },
    {
      prompt: 'Which surface is not listed as supporting the public code policy?',
      options: ['Copilot in VS Code', 'Copilot in JetBrains', 'Copilot CLI'],
      answer: 2,
      explanation: 'The supported surfaces reference does not list the CLI, app, cloud sandbox or code review.',
    },
    {
      prompt: 'Which inline suggestions are logged with code references?',
      options: ['Every suggestion the client displays', 'Accepted suggestions left unchanged', 'Suggestions the user rejects outright'],
      answer: 1,
      explanation: 'Only suggestions that are accepted unchanged are checked and logged with references.',
    },
    {
      prompt: 'Where are code references shown in VS Code?',
      options: ['Output panel, Code References log', 'Settings sync conflict viewer', 'Source control history view'],
      answer: 0,
      explanation: 'VS Code shows them in the Output panel under GitHub Copilot Log (Code References).',
    },
  ],
  [
    {
      prompt: 'Why does repository access sit beneath content exclusion?',
      options: ['Exclusion removes repository read access', 'Access settings override Copilot plans', 'Exclusion does not decide who can read files'],
      answer: 2,
      explanation: 'Exclusion limits what Copilot uses; roles and base permissions decide who can reach the content.',
    },
    {
      prompt: 'What does GitHub warn about deploy keys?',
      options: ['They expire when a user leaves', 'Holders keep access after removal', 'They only grant read access'],
      answer: 1,
      explanation: 'Anyone with the private key can still read or write, depending on settings, after removal from the organization.',
    },
    {
      prompt: 'What does repository push protection require?',
      options: ['A Copilot Enterprise subscription', 'GitHub Secret Protection', 'A custom repository role'],
      answer: 1,
      explanation: 'Repository push protection requires GitHub Secret Protection and is off by default.',
    },
    {
      prompt: 'What alert results from bypassing with "I\'ll fix it later"?',
      options: ['An open secret scanning alert', 'A closed alert marked false positive', 'No alert and no audit log entry'],
      answer: 0,
      explanation: 'That reason creates an open alert; bypasses are also recorded in the audit log.',
    },
    {
      prompt: 'Which of these is in public preview?',
      options: ['User push protection on public repos', 'Repository roles for organizations', 'Secret detection in Copilot code review'],
      answer: 2,
      explanation: 'The November 2026 changelog announced code review secret detection in public preview.',
    },
  ],
];

export const quizReviewLessons: string[][] = [
  ['what-exclusion-does', 'what-exclusion-does', 'what-exclusion-does', 'exclusion-scope-levels', 'exclusion-scope-levels'],
  ['repository-path-rules', 'repository-path-rules', 'repository-path-rules', 'organization-repository-references', 'organization-repository-references'],
  ['surface-support-matrix', 'surface-support-matrix', 'exclusion-limitations', 'exclusion-limitations', 'exclusion-limitations'],
  ['propagation-and-testing', 'propagation-and-testing', 'change-review-and-api', 'change-review-and-api', 'change-review-and-api'],
  ['public-code-policy', 'public-code-policy', 'public-code-policy', 'code-referencing-review', 'code-referencing-review'],
  ['repository-access-layer', 'repository-access-layer', 'secret-push-protection', 'secret-push-protection', 'secret-push-protection'],
];
