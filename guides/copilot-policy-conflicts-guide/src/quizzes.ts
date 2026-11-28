interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'An enterprise owner has disabled a policy everywhere. What can an organization owner do?', options: ['Enable it for their own members only.', 'Nothing that overrides it; the enterprise decision applies.', 'Enable it by setting the organization default to enabled.'], answer: 1, explanation: 'Organization owners cannot override a specific enterprise selection.' },
    { prompt: 'When does an organization setting become a deciding input for a policy?', options: ['When the enterprise lets organizations decide that policy.', 'Whenever the organization setting is more recent.', 'Only for preview features.'], answer: 0, explanation: 'Only delegation hands the decision to organization owners.' },
    { prompt: 'A policy is enabled for selected organizations. A member of an unselected organization is seated only there. What is predicted?', options: ['Enabled, because one organization is selected.', 'Decided by the unselected organization owner.', 'Not enabled for that user.'], answer: 2, explanation: 'The enterprise chose the scope; an organization owner cannot add their organization.' },
    { prompt: 'Does the default policy for new features and clients apply to features in preview?', options: ['Yes, if the enterprise default is enabled.', 'Yes, at the organization level only.', 'No.'], answer: 2, explanation: 'The documentation states the default policy does not apply to preview features.' },
    { prompt: 'The enterprise default for new features is disabled everywhere. An unconfigured GA feature arrives. What happens?', options: ['It is disabled for all Copilot users, and organizations cannot enable it.', 'Each organization default decides.', 'It stays unconfigured until someone acts.'], answer: 0, explanation: 'Disabled everywhere applies to unconfigured GA features and cannot be overridden by organizations.' },
  ],
  [
    { prompt: 'Which list usually decides which delegated policies apply to a user?', options: ['The organizations that grant the user a Copilot license.', 'Every organization the user belongs to.', 'The organization shown first on the user profile.'], answer: 0, explanation: 'Policies generally follow the license source, not membership.' },
    { prompt: 'A user is seated by two organizations in one enterprise. How is the enterprise billed?', options: ['Twice, once per organization.', 'Not at all until the user is active.', 'Once, with one organization selected.'], answer: 2, explanation: 'The detailed usage report shows the selected organization.' },
    { prompt: 'A pilot organization enables a feature, but a pilot member is seated by a different organization. What follows?', options: ['The pilot settings apply because the user is a member.', 'The pilot settings do not govern that user.', 'The enterprise-assigned default applies.'], answer: 1, explanation: 'Most policies apply based on which organization assigns the license.' },
    { prompt: 'Which setting decides delegated policies for users seated directly by the enterprise?', options: ['The least-restrictive organization setting', 'Policies for enterprise-assigned users', 'The billing organization setting'], answer: 1, explanation: 'Let organizations decide does not apply to enterprise-assigned users.' },
    { prompt: 'A user is removed from an enterprise team that was assigned Copilot. When does access end?', options: ['At the end of the billing cycle, unless another seat source exists.', 'Immediately.', 'Only when an organization owner removes it.'], answer: 0, explanation: 'Team-assigned users keep access until the end of the billing cycle.' },
  ],
  [
    { prompt: 'One licensing organization enables Copilot CLI and another disables it. What is predicted?', options: ['Disabled everywhere.', 'Enabled only in the enabling organization.', 'Enabled for the user everywhere.'], answer: 2, explanation: 'Copilot CLI is listed as least restrictive.' },
    { prompt: 'Which policy follows the most-restrictive rule across organizations?', options: ['Copilot can search the web', 'Suggestions matching public code', 'Copilot code review'], answer: 1, explanation: 'Suggestions matching public code is a privacy policy on the most-restrictive list.' },
    { prompt: 'Semantic indexing for non-GitHub repositories is Enabled in one organization and Unconfigured in another. Is it available?', options: ['No; every organization must explicitly enable it.', 'Yes; least restrictive applies.', 'Yes; Unconfigured follows the default.'], answer: 0, explanation: 'Unconfigured behaves as disabled for this policy.' },
    { prompt: 'Across multiple enterprises, which rule usually applies?', options: ['Most restrictive.', 'Least restrictive.', 'The enterprise that billed most recently.'], answer: 0, explanation: 'Most restrictive usually applies across enterprises, with documented exceptions.' },
    { prompt: 'Which is a documented exception to the multi-enterprise most-restrictive rule?', options: ['Copilot CLI', 'Copilot Metrics API', 'AI credit paid usage'], answer: 2, explanation: 'AI credit paid usage applies to each enterprise rather than the user; GitHub Spark is the other exception.' },
  ],
  [
    { prompt: 'A repository administrator excludes a folder from Copilot. Who is affected?', options: ['Only users seated by the repository’s organization.', 'Any Copilot user in the enterprise working in that repository.', 'Only users with admin permission.'], answer: 1, explanation: 'Repository-level exclusions are resource-scoped.' },
    { prompt: 'How can you tell a policy governs a setting for everyone rather than only licensed users?', options: ['Its name contains “all users”.', 'It appears in the organization settings.', 'The policy description highlights it.'], answer: 2, explanation: 'GitHub highlights this behavior in the policy description.' },
    { prompt: 'A user has Copilot in the cloud enabled but cannot delegate in one repository. What should you check?', options: ['The owning organization’s repository access setting.', 'The user’s billing organization.', 'The editor version.'], answer: 0, explanation: 'Organization owners can block the agent in some or all repositories.' },
    { prompt: 'Does the editor preview features policy apply in Copilot CLI?', options: ['Yes, on every surface.', 'No; it is listed for IDEs only.', 'Only in the cloud sandbox.'], answer: 1, explanation: 'Check the supported surfaces reference before treating a result as a conflict.' },
    { prompt: 'Why can an @Copilot pull request task behave differently from an IDE session under the same policy?', options: ['Pull request tasks ignore policies.', 'It runs on GitHub Actions, where coverage can differ.', 'Pull requests always use the cloud sandbox.'], answer: 1, explanation: 'Some interfaces run only on GitHub Actions, and coverage varies between environments.' },
  ],
  [
    { prompt: 'What should you check before tracing any policy for a missing feature?', options: ['That the signed-in account holds the license and the client is current.', 'The audit log for the last year.', 'The model picker.'], answer: 0, explanation: 'Account and client issues are common and cheap to rule out.' },
    { prompt: 'Where can a user see whether Copilot cloud agent is enabled for them?', options: ['In the enterprise AI controls tab.', 'On github.com/settings/copilot/features.', 'In the repository README.'], answer: 1, explanation: 'The features page is first-hand evidence from the user.' },
    { prompt: 'How long can content exclusion changes take to reach IDEs?', options: ['Until the next billing cycle.', 'Immediately.', 'Up to 30 minutes.'], answer: 2, explanation: 'Wait for propagation before concluding a change failed.' },
    { prompt: 'Does a model with status Unconfigured follow the default availability for released models?', options: ['No.', 'Yes, always.', 'Only in enterprise teams mode.'], answer: 0, explanation: 'Unconfigured models, such as preview models, do not follow the default.' },
    { prompt: 'In enterprise teams mode, a model is disabled at the enterprise. Can a team enable it?', options: ['Yes, if any of the user’s teams enables it.', 'Yes, through the organization model settings.', 'No.'], answer: 2, explanation: 'Teams mode is additive below the enterprise baseline and deactivates organization model settings.' },
  ],
  [
    { prompt: 'Why mark a value in an effective-policy record as inherited from a default?', options: ['Inherited values cannot change.', 'Defaults only apply to preview features.', 'It can change when the default changes, without editing the policy.'], answer: 2, explanation: 'Inherited values drift when defaults change.' },
    { prompt: 'A record’s result has not been observed on the surface. How should it be labeled?', options: ['As a prediction to be confirmed.', 'As verified.', 'As a conflict.'], answer: 0, explanation: 'A prediction from rules is not an observation.' },
    { prompt: 'Which audit log filter narrows results to Copilot events?', options: ['actor:Copilot', 'action:copilot', 'org:copilot'], answer: 1, explanation: 'actor:Copilot shows agent activity, not all Copilot events.' },
    { prompt: 'How long are Copilot audit log events retained without streaming?', options: ['30 days', 'Indefinitely', '180 days'], answer: 2, explanation: 'Stream to a SIEM for longer retention.' },
    { prompt: 'Who can change enterprise Copilot policies besides enterprise owners?', options: ['Any organization member', 'Holders of the Manage enterprise AI controls permission', 'Anyone with Read enterprise audit logs'], answer: 1, explanation: 'Enterprise custom roles are in public preview; review who holds them.' },
  ],
];

export const quizReviewLessons = [
  ['enterprise-decision-states', 'enterprise-decision-states', 'enterprise-decision-states', 'delegation-and-defaults', 'delegation-and-defaults'],
  ['license-source-tracing', 'license-source-tracing', 'license-source-tracing', 'enterprise-assigned-users', 'enterprise-assigned-users'],
  ['least-restrictive-rule', 'most-restrictive-exceptions', 'most-restrictive-exceptions', 'most-restrictive-exceptions', 'most-restrictive-exceptions'],
  ['resource-scoped-controls', 'resource-scoped-controls', 'resource-scoped-controls', 'surface-coverage', 'surface-coverage'],
  ['feature-visibility-triage', 'feature-visibility-triage', 'feature-visibility-triage', 'model-availability-triage', 'model-availability-triage'],
  ['effective-policy-records', 'effective-policy-records', 'drift-and-change-evidence', 'drift-and-change-evidence', 'drift-and-change-evidence'],
];
