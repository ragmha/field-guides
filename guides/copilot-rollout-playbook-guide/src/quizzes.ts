interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'Which teams do GitHub’s approval resources say you will likely need signoff from?', options: ['Only the engineering managers whose teams use Copilot', 'Legal, compliance and cybersecurity', 'Finance alone, because Copilot is billed'], answer: 1, explanation: 'The approval resources group questions for legal, compliance and cybersecurity teams.' },
    { prompt: 'How many accountable owners should each RACI row have?', options: ['Exactly one', 'One per team that is consulted on the decision', 'None until the pilot finishes'], answer: 0, explanation: 'Guide advice: one accountable owner per decision lets the decision close.' },
    { prompt: 'What does a RACI change in GitHub?', options: ['It assigns enterprise roles to the people named as responsible', 'It grants AI managers access to billing settings', 'Nothing; it is an organizational agreement'], answer: 2, explanation: 'A RACI records accountability. Permissions are granted separately in GitHub.' },
    { prompt: 'What is the release status of enterprise custom roles used for AI managers?', options: ['Generally available for all plans and enterprise types', 'Private preview available only by request to GitHub', 'Public preview'], answer: 2, explanation: 'GitHub’s AI managers tutorial labels enterprise custom roles as public preview.' },
    { prompt: 'Which settings stay outside the AI manager role unless more permissions are granted?', options: ['Access management, Billing and Metrics settings', 'All AI controls, including policies and model settings', 'Only the enterprise audit log'], answer: 0, explanation: 'AI managers manage AI controls but not access management, Billing or Metrics settings by default.' },
  ],
  [
    { prompt: 'Why does the choice of licensing organization define the pilot boundary?', options: ['Repository access is automatically granted together with each Copilot license', 'Features are enabled per org for licensed users', 'Budgets apply only to the licensing organization'], answer: 1, explanation: 'Features and models are enabled at organization level for people licensed through that organization.' },
    { prompt: 'What is a drawback of a dedicated pilot organization?', options: ['It cannot have a budget', 'Copilot policies cannot be set on it at all', 'It needs duplicated repo access'], answer: 2, explanation: 'The tutorial notes duplicated repository access and possible limits for the cloud agent.' },
    { prompt: 'How long should a pilot run, according to the tutorial?', options: ['At least one full billing cycle', 'Exactly one week of usage data', 'Until spend first exceeds zero dollars'], answer: 0, explanation: 'At least one full billing cycle, typically four to six weeks, gives cost data.' },
    { prompt: 'When is an organization budget a hard stop?', options: ['Always, as soon as it is created for the organization', 'Never, because organization budgets only send alerts', 'When "Stop usage when budget limit is reached" is on'], answer: 2, explanation: 'Organization budgets stop usage only with that setting; user-level budgets always stop usage.' },
    { prompt: 'Twenty Business users expect 3,000 credits each. How many credits are metered after the pool?', options: ['60,000 credits, because the pool is not shared', '22,000', '38,000 credits, which is the size of the pool'], answer: 1, explanation: '60,000 − (20 × 1,900) = 22,000 metered credits.' },
  ],
  [
    { prompt: 'What comes before enabling a feature for the pilot organization?', options: ['Configuring its policies', 'Enabling it for the whole enterprise as a default', 'Writing the outcome report for leadership'], answer: 0, explanation: 'The tutorial configures policies first so nobody sees the feature with unreviewed settings.' },
    { prompt: 'When does GitHub suggest disabling a policy by default at enterprise level?', options: ['For every new feature until a full review is complete', 'For any feature that has a cost', 'Only for non-negotiable restrictions'], answer: 2, explanation: 'Keep default availability enabled and scope restrictions to sensitive organizations.' },
    { prompt: 'How do organization rulesets relate to the enterprise baseline?', options: ['They replace enterprise rulesets for that organization', 'They add to it and never override it', 'They apply only when the enterprise has no rulesets'], answer: 1, explanation: 'Organization rulesets add to the enterprise baseline.' },
    { prompt: 'Which audit log search finds Copilot-related setting changes?', options: ['Searching by repository name across the enterprise', 'action:copilot', 'Searching local IDE prompts captured from clients'], answer: 1, explanation: 'Use action:copilot; the audit log excludes client session data such as local prompts.' },
    { prompt: 'What should happen when an exception reaches its expiry?', options: ['Renew after reassessment, or revert and confirm', 'Nothing; exceptions remain until someone complains', 'Expand it to the enterprise to simplify the baseline'], answer: 0, explanation: 'Guide advice: exceptions end with a fresh decision and audit evidence.' },
  ],
  [
    { prompt: 'In GitHub’s example timeline, when are champions trained?', options: ['On launch day, alongside the support channel', 'About 45 days before launch', 'After the first quarterly review'], answer: 1, explanation: 'Preparation, about 45 days out, includes success metrics and training champions.' },
    { prompt: 'Who should developers contact first about proxy or firewall problems?', options: ['An internal network contact', 'The GitHub changelog team, through the blog comments', 'The finance owner listed in the RACI'], answer: 0, explanation: 'The tutorial recommends an internal point of contact, escalating to GitHub Support when needed.' },
    { prompt: 'Where does an organization owner approve built-in Copilot access requests?', options: ['The enterprise audit log, by approving each event', 'The billing page, under metered usage', 'The Requests from members page'], answer: 2, explanation: 'Members click Ask admin for access; owners approve on Requests from members.' },
    { prompt: 'What does an API-backed request flow make possible?', options: ['Bypassing license costs entirely for every requested seat', 'Near-instant assignment after automated checks', 'Granting enterprise ownership to requesters'], answer: 1, explanation: 'Your portal can check conditions, then call the seat assignment endpoint.' },
    { prompt: 'What expectation does the adoption tutorial suggest communicating?', options: ['That metrics will rank individual developers publicly', 'That inactive licenses may be revoked', 'That exceptions are never granted for any reason'], answer: 1, explanation: 'The tutorial gives revoking licenses from inactive users as an example expectation.' },
  ],
  [
    { prompt: 'What should you do when cohort data for an agentic feature is still short?', options: ['Expand anyway if spend is low', 'Stop the pilot and remove all licenses', 'Extend the pilot'], answer: 2, explanation: 'Without stable adoption, cohort data, a billing cycle and feedback, extend.' },
    { prompt: 'Spend is $0 in the first week of a pilot. What does the tutorial say?', options: ['It indicates the feature is broken for participants', 'It is expected while usage is in the pool', 'It means the budget was set incorrectly'], answer: 1, explanation: 'Included usage is consumed first, so early spend is often $0.' },
    { prompt: 'Which three recommendations does the pilot report end with?', options: ['Expand, hold or stop', 'Approve, escalate to GitHub Support, or archive', 'Buy, build or outsource the capability'], answer: 0, explanation: 'The tutorial’s report recommends expand, hold or stop.' },
    { prompt: 'What does the tutorial say to do with budgets as more organizations are enabled?', options: ['Remove them so usage is not blocked', 'Raise or add them', 'Leave the pilot budget unchanged for everyone'], answer: 1, explanation: 'Expansion should raise or add budgets to match the larger population.' },
    { prompt: 'Which step is part of a clean rollback?', options: ['Confirm no usage remains', 'Delete the pilot data to avoid confusion', 'Leave the policy on but stop announcing it'], answer: 0, explanation: 'Turn off the policy, tell participants, confirm no usage, review the budget and keep the data.' },
  ],
  [
    { prompt: 'What does GitHub’s impact tutorial define first?', options: ['The lines of code written with Copilot', 'The number of seats to buy next year', 'The decision the report supports'], answer: 2, explanation: 'Step 1 is the decision; the comparison and evidence follow.' },
    { prompt: 'Should estimated time saved be converted into financial return?', options: ['Yes, using average salary costs', 'No', 'Yes, but only for teams with high adoption'], answer: 1, explanation: 'GitHub’s guidance advises against converting lines of code or time saved into financial returns.' },
    { prompt: 'What does the impact dashboard compare?', options: ['Cohorts of users', 'Before-and-after periods for the same teams', 'Spend across competing AI tools'], answer: 0, explanation: 'The company goals tutorial notes the dashboard compares cohorts, not before and after.' },
    { prompt: 'How long are audit log events retained?', options: ['30 days unless an owner exports them manually', '180 days', 'Indefinitely for every enterprise plan'], answer: 1, explanation: 'Retention is 180 days; streaming to a SIEM supports longer reviews.' },
    { prompt: 'Which review does this course place the RACI refresh in?', options: ['The weekly operations check of spend', 'The monthly adoption review of metrics', 'The quarterly governance review'], answer: 2, explanation: 'Guide advice: refresh the RACI quarterly with the baseline and permission review.' },
  ],
];

export const quizReviewLessons = [
  ['rollout-raci', 'rollout-raci', 'rollout-raci', 'ai-manager-delegation', 'ai-manager-delegation'],
  ['pilot-group-selection', 'pilot-group-selection', 'pilot-group-selection', 'pilot-cost-ceiling', 'pilot-cost-ceiling'],
  ['pre-enable-baseline', 'pre-enable-baseline', 'pre-enable-baseline', 'exception-handling', 'exception-handling'],
  ['enablement-timeline', 'enablement-timeline', 'license-request-flow', 'license-request-flow', 'license-request-flow'],
  ['go-no-go-decision', 'go-no-go-decision', 'go-no-go-decision', 'stage-gates', 'stage-gates'],
  ['outcome-reporting', 'outcome-reporting', 'outcome-reporting', 'steady-state-review', 'steady-state-review'],
];
