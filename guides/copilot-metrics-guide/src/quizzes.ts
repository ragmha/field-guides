interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'Leaders want a two-year Copilot adoption trend. Which source supports it?', options: ['The usage metrics dashboard over its rolling window', 'Daily report files stored in your own warehouse', 'The impact dashboard engagement trend chart'], answer: 1, explanation: 'Dashboards show limited windows and report history is limited to one year, so store daily files yourself.' },
    { prompt: 'Where do you find Copilot CLI adoption?', options: ['In report fields such as used_cli', 'In the usage metrics dashboard charts', 'In the code generation dashboard only'], answer: 0, explanation: 'The usage dashboard charts exclude CLI; the reports carry CLI fields separately.' },
    { prompt: 'Which surface shows adoption cohorts related to pull request output?', options: ['The code generation dashboard', 'The user-teams daily report', 'The impact dashboard'], answer: 2, explanation: 'The impact dashboard groups users into adoption cohorts and relates them to pull request output.' },
    { prompt: 'An analyst needs one organization\'s metrics without owner rights. What fits best?', options: ['Share an owner\'s classic token with them', 'Grant enterprise billing manager', 'A custom metrics role'], answer: 2, explanation: 'The View organization Copilot metrics permission can be granted through a custom organization role.' },
    { prompt: 'What should a scheduled job do with the download_links it receives?', options: ['Post them for later use by others', 'Download the files promptly', 'Store the links as the record'], answer: 1, explanation: 'The links are signed URLs with a limited expiry, so download and keep the files.' },
  ],
  [
    { prompt: 'What makes a user active in the usage reports?', options: ['A user-initiated interaction count over 0', 'An assigned Copilot seat on that day', 'Any accepted suggestion in an IDE on that day'], answer: 0, explanation: 'Active means user_initiated_interaction_count is greater than zero.' },
    { prompt: 'What window does weekly_active_users use?', options: ['The current calendar week', 'The current calendar month', 'The trailing 7 days'], answer: 2, explanation: 'Weekly active users are counted over the trailing 7 days.' },
    { prompt: 'Why should you not sum 28 daily active user values?', options: ['Daily values exclude chat activity', 'Repeat users count again', 'Daily values are only estimates'], answer: 1, explanation: 'Summing daily counts double-counts anyone active on more than one day.' },
    { prompt: 'How is engagement with a feature defined for adoption phases?', options: ['Use on 2+ days in 28 days', 'Ten or more prompts in one week', 'Any use in the calendar month'], answer: 0, explanation: 'Engagement is use on at least two distinct days in a trailing 28-day window.' },
    { prompt: 'A user is engaged with the CLI and the cloud agent. Which phase applies?', options: ['Phase 2, agent first only', 'Phase 3, multi-agent', 'Phase 1, code first only'], answer: 1, explanation: 'Engagement with two or more agent surfaces places a user in Phase 3.' },
  ],
  [
    { prompt: 'Which report deduplicates users across organizations?', options: ['The organization 28-day report', 'The repository daily report', 'The enterprise report'], answer: 2, explanation: 'Enterprise reports deduplicate users; organization reports do not.' },
    { prompt: 'A seated user belongs to two organizations. Where are they attributed?', options: ['Only to the seat\'s source', 'To both organizations', 'To neither organization'], answer: 1, explanation: 'Attribution follows membership across every organization in the enterprise.' },
    { prompt: 'Which keys join daily user-teams and per-user reports?', options: ['User ID, day and entity ID', 'User login and the team name', 'Team ID and the report end day'], answer: 0, explanation: 'Join on user_id, day and the enterprise or organization ID.' },
    { prompt: 'Why do team totals often fall below the entity total?', options: ['Small teams are excluded', 'Team reports only count chat users', 'Team reports lag the entity reports by one week'], answer: 0, explanation: 'Teams with fewer than five seated Copilot users are excluded from the user-teams report.' },
    { prompt: 'Which join should you never make?', options: ['Daily per-user with daily user-teams', 'Team list left-joined to daily usage', '28-day users with daily teams'], answer: 2, explanation: 'The 28-day per-user report must not be joined to the daily user-teams report.' },
  ],
  [
    { prompt: 'When is a day\'s Copilot usage data reliably available?', options: ['One hour after the day closes', 'Within two full UTC days after', 'At the end of the calendar week'], answer: 1, explanation: 'Data is available within two full UTC days after the day closes.' },
    { prompt: 'How far back can report endpoints return data?', options: ['Seven years from the current date', 'Ninety days from the current date', 'One year, from Oct 10, 2025'], answer: 2, explanation: 'Reports start on October 10, 2025, with up to one year of history.' },
    { prompt: 'What should you do with an export taken the morning after a day?', options: ['Publish it as the final record', 'Delete it and wait one month', 'Re-export after the window'], answer: 2, explanation: 'Exports reflect data at export time, so re-export after the processing window.' },
    { prompt: 'What does client_telemetry_present set to false indicate?', options: ['Only server-side activity', 'The user has no Copilot seat', 'The user opted out of Copilot'], answer: 0, explanation: 'It means only server-side activity was seen, so client breakdowns are missing.' },
    { prompt: 'Which is a documented cause of missing IDE metrics?', options: ['Using more than one organization', 'A proxy blocking the endpoint', 'Using agent mode in chat'], answer: 1, explanation: 'Disabled telemetry, blocked endpoints and unsupported clients reduce coverage.' },
  ],
  [
    { prompt: 'Where should a seat denominator come from?', options: ['The user management API', 'The 28-day usage report file', 'The impact dashboard ROI view'], answer: 0, explanation: 'Usage metrics measure activity, not license assignments.' },
    { prompt: 'How should a weekly-active-to-license ratio above 60 percent be used?', options: ['As a target for each developer', 'As context for group adoption', 'As proof of productivity gains'], answer: 1, explanation: 'GitHub describes it as healthy; it is context for groups, not a target for individuals.' },
    { prompt: 'Which KPI element names why the metric exists?', options: ['The decision it informs', 'The chart color used on slides', 'The export file format chosen'], answer: 0, explanation: 'Each KPI should link to a named decision and owner.' },
    { prompt: 'What minimum group size does the guide recommend for published views?', options: ['One person', 'Three people', 'Five people'], answer: 2, explanation: 'Guide advice matches the product\'s five-user team floor.' },
    { prompt: 'Can customization fields verify that only approved customizations are used?', options: ['Yes, they list every use', 'Yes, for MCP servers only', 'No, they can undercount'], answer: 2, explanation: 'GitHub advises against this use because the data comes from client telemetry and can undercount.' },
  ],
  [
    { prompt: 'Acceptance rate fell while weekly users rose. What is a sound next step?', options: ['Report a decline in code quality', 'Pause the rollout immediately', 'Ask developers how use changed'], answer: 2, explanation: 'Use metrics to raise questions and feedback to explain them.' },
    { prompt: 'What should accompany a quoted survey result?', options: ['Counts and dates', 'Names of each respondent', 'Only the highest score'], answer: 0, explanation: 'Report respondent counts, population and dates with each result.' },
    { prompt: 'What comes first in an impact report?', options: ['A chart of lines of code', 'The decision it informs', 'The industry comparison'], answer: 1, explanation: 'Start from the decision the report informs.' },
    { prompt: 'Why is the adoption multiplier not a before-and-after effect?', options: ['It uses billing data only', 'It compares other groups', 'It omits pull request data'], answer: 1, explanation: 'It compares engaged cohorts with chat-first users, so differences can reflect the people and their work.' },
    { prompt: 'Where should Copilot spending figures come from?', options: ['Billing data', 'Usage telemetry', 'Survey estimates'], answer: 0, explanation: 'Use billing data, not telemetry, for spending.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['metrics-surfaces', 'metrics-surfaces', 'metrics-surfaces', 'metrics-access', 'metrics-access'],
  ['active-user-definitions', 'active-user-definitions', 'active-user-definitions', 'adoption-phases', 'adoption-phases'],
  ['org-attribution-dedup', 'org-attribution-dedup', 'team-level-joins', 'team-level-joins', 'team-level-joins'],
  ['latency-and-windows', 'latency-and-windows', 'latency-and-windows', 'coverage-gaps', 'coverage-gaps'],
  ['kpi-design', 'kpi-design', 'kpi-design', 'privacy-safe-reporting', 'privacy-safe-reporting'],
  ['qualitative-evidence', 'qualitative-evidence', 'impact-reporting', 'impact-reporting', 'impact-reporting'],
];