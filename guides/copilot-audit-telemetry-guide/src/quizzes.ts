interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'A responder needs the prompt a developer typed into Copilot CLI. What does the Copilot audit log provide?', options: ['The full prompt text under the copilot category.', 'Nothing; local client session data is not included.', 'A hashed copy of the prompt in the user field.'], answer: 1, explanation: 'GitHub states that audit logs do not include client session data such as local prompts; a custom solution such as hooks is needed.' },
    { prompt: 'Which search shows actions performed by Copilot agents?', options: ['actor:Copilot', 'action:copilot', 'user:Copilot'], answer: 0, explanation: 'actor:Copilot shows agent activity; action:copilot shows plan and policy events.' },
    { prompt: 'Which access method can include API request events?', options: ['The audit log web interface', 'A JSON or CSV export', 'Streaming, if that option is enabled'], answer: 2, explanation: 'API request events are available only in streamed enterprise audit logs, and only when the option is enabled.' },
    { prompt: 'How long does the audit log keep Git events?', options: ['180 days, like web events', 'Only while a stream is active', 'Seven days'], answer: 2, explanation: 'Git events are kept for seven days; save them externally before they expire.' },
    { prompt: 'An analyst wants to search the audit log for a phrase from a commit message. What should they expect?', options: ['Text search is not supported; use qualifiers.', 'Text search works only in the API.', 'Text search works only for Copilot events.'], answer: 0, explanation: 'Audit log search uses qualifiers such as action, actor, created and repo, not free text.' },
  ],
  [
    { prompt: 'Which event records a change to Copilot content exclusion paths?', options: ['copilot.cfb_org_settings_changed', 'copilot.content_exclusion_changed', 'copilot.memory_user_opt_out'], answer: 1, explanation: 'copilot.content_exclusion_changed carries the excluded_paths field.' },
    { prompt: 'A copilot.cfb_seat_added event came from a team assignment. What should the analyst check before naming a cause?', options: ['Only the actor shown on the seat event', 'Only the plan_changed events that week', 'The team membership changes in that window'], answer: 2, explanation: 'GitHub warns the actor of cfb_seat_added may not be the account that changed the team membership.' },
    { prompt: 'In an agentic audit event, what does the user field identify?', options: ['The agent that performed the action', 'The person who initiated the agent work', 'The reviewer who approved the change'], answer: 1, explanation: 'user is the person who initiated the work; the actor is Copilot.' },
    { prompt: 'When is agent_session_id present on an agentic event?', options: ['Only when the event results from an agent session', 'On every event where actor_is_agent is true', 'Only on events streamed to a SIEM'], answer: 0, explanation: 'The reference says agent_session_id is present only when the event results from an agent session.' },
    { prompt: 'What does a copilot.access_revoked event record?', options: ['A seat scheduled to end at cycle end', 'A change to enterprise Copilot settings', 'Access ended, with a reason such as billing'], answer: 2, explanation: 'access_revoked covers ended subscriptions, billing issues, or spammy or suspended accounts, with a reason field.' },
  ],
  [
    { prompt: 'What does View all in the Agent sessions section list?', options: ['Every session from the last 180 days', 'Agent sessions from the last 24 hours', 'Only sessions that are in progress'], answer: 1, explanation: 'The section shows the three most recent sessions; View all lists the last 24 hours.' },
    { prompt: 'Which filter shows agent sessions a specific person started?', options: ['user:', 'actor:', 'organization:'], answer: 0, explanation: 'The user filter shows agent activity initiated by a specific user.' },
    { prompt: 'Which enterprises can stream Copilot usage records?', options: ['Any enterprise on GitHub Enterprise Cloud', 'Any organization on a Copilot Business plan', 'EMU enterprises or GHE.com data residency'], answer: 2, explanation: 'The public preview is limited to Enterprise Managed Users on GitHub.com or GitHub Enterprise Cloud with data residency.' },
    { prompt: 'Which policy must be enabled before configuring a usage records stream destination?', options: ['Copilot usage metrics', 'Copilot Usage Records Streaming', 'Copilot Usage Records API'], answer: 1, explanation: 'Enable Copilot Usage Records Streaming under Billing & usage; the REST endpoint needs Copilot Usage Records API.' },
    { prompt: 'Why should usage record bodies be treated as sensitive?', options: ['They contain enterprise billing card details.', 'They contain repository deploy keys by default.', 'They can contain prompts, code and responses.'], answer: 2, explanation: 'body holds the request or response body as a JSON string, which can include prompts, code and responses.' },
  ],
  [
    { prompt: 'Streaming is enabled during an incident. What history does it deliver?', options: ['The previous 180 days of web events', 'Only activity from when it was enabled', 'The previous seven days from the buffer'], answer: 1, explanation: 'Streaming includes only activity from the time you enable it; it does not recover earlier activity.' },
    { prompt: 'A stream was paused for ten days. Where does it resume?', options: ['From one week before it resumed', 'From the exact moment it was paused', 'From the start of a brand new stream'], answer: 0, explanation: 'Pauses longer than seven days resume from one week earlier; three weeks or more starts anew.' },
    { prompt: 'Why should a SIEM deduplicate streamed audit events?', options: ['Events are batched by organization.', 'Health checks resend every event daily.', 'Delivery is at least once.'], answer: 2, explanation: 'At-least-once delivery means the same event can arrive more than once.' },
    { prompt: 'After a health-check email reports a misconfigured stream, how long do owners have before events are dropped?', options: ['Twenty-four hours', 'Six days', 'Thirty days'], answer: 1, explanation: 'The stream must be fixed within six days to avoid dropped events.' },
    { prompt: 'The audit log page shows three months by default. How do you reach older events within 180 days?', options: ['Request them from GitHub Support.', 'Use the created qualifier with dates.', 'Switch to the organization audit log.'], answer: 1, explanation: 'Use the created qualifier to query older events within the 180-day window.' },
  ],
  [
    { prompt: 'In the guide playbook, what comes immediately after scoping the question?', options: ['Triage for anything still running', 'Write the bounded conclusion', 'Attribute actions to the initiator'], answer: 0, explanation: 'Triage checks the sessions view for active work before collection and attribution.' },
    { prompt: 'Why should a playbook record the exact queries it ran?', options: ['GitHub requires queries for exports.', 'So others can repeat them and see scope.', 'So the stream can replay matched events.'], answer: 1, explanation: 'Recorded queries make the investigation repeatable and expose coverage gaps.' },
    { prompt: 'What does a bounded finding include besides what the evidence shows?', options: ['A confidence score from the audit log', 'The full usage record body for each event', 'What it does not show and missing sources'], answer: 2, explanation: 'A bounded finding states what the evidence shows, what it does not show, and which sources were missing or out of range.' },
    { prompt: 'Which source does GitHub recommend for long-term history and alerts on Copilot audit events?', options: ['Weekly CSV exports', 'The Agent sessions view', 'Streaming to a SIEM'], answer: 2, explanation: 'The Copilot audit log guide recommends streaming to a SIEM for long-term history and alerts.' },
    { prompt: 'An alert counts agent events per user per hour. What should happen before counting?', options: ['Deduplicate the streamed events.', 'Drop events without a session ID.', 'Exclude events from organization owners.'], answer: 0, explanation: 'At-least-once delivery can produce duplicates that inflate counts.' },
  ],
  [
    { prompt: 'Where should github.copilot.nano_aiu be read to avoid double counting?', options: ['Summed across every chat span', 'From the root invoke_agent span only', 'From the execute_tool spans only'], answer: 1, explanation: 'The attribute is also stamped on child chat spans, so read it from the root span only.' },
    { prompt: 'What happens if the OTLP exporter resolves to an http:// endpoint?', options: ['Data is sent in cleartext with a warning.', 'Copilot CLI refuses to start.', 'Export is disabled; only a process-log warning.'], answer: 2, explanation: 'Export is disabled rather than sent in cleartext, and the only signal is a process-log warning.' },
    { prompt: 'What is github.copilot.cost?', options: ['A per-request billing multiplier', 'The request cost in US dollars', 'The token count for the turn'], answer: 0, explanation: 'The reference states it is a model multiplier used for billing, not a monetary value.' },
    { prompt: 'How should a join between gen_ai.conversation.id and agent_session_id be treated?', options: ['As confirmed, because both are session IDs', 'As unverified until tested in a sandbox', 'As invalid, because spans lack session IDs'], answer: 1, explanation: 'GitHub does not document that the two identifiers match; test before relying on the join.' },
    { prompt: 'An agent event names user: sam-dev. What does it show?', options: ['Sam initiated the agent work.', 'Sam approved the agent change.', 'Sam wrote the committed code.'], answer: 0, explanation: 'user identifies the initiator; approval needs separate evidence such as a review record.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['audit-surfaces', 'audit-surfaces', 'access-methods', 'access-methods', 'access-methods'],
  ['plan-policy-events', 'plan-policy-events', 'agent-audit-fields', 'agent-audit-fields', 'plan-policy-events'],
  ['agent-session-view', 'agent-session-view', 'usage-records-stream', 'usage-records-stream', 'usage-records-stream'],
  ['retention-windows', 'stream-operations', 'stream-operations', 'stream-operations', 'retention-windows'],
  ['investigation-playbook', 'investigation-playbook', 'investigation-playbook', 'alert-design', 'alert-design'],
  ['otel-correlation', 'otel-correlation', 'otel-correlation', 'otel-correlation', 'evidence-limits'],
];