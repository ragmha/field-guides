---
title: Session records versus audit logs
section: Session Records and Audit Evidence
order: 22
description: Compare who owns, sees and can delete session records and audit events.
verified: "2026-11-27"
diagram: session-vs-audit-log
checks:
  - question: Does the enterprise audit log include prompts a user sends to Copilot locally?
    answer: No. Client session data needs a custom solution, such as hooks that send CLI events to a logging service.
  - question: Who can see a synced local session by default?
    answer: Only the user who started it; administrators do not get access by enabling syncing.
  - question: Which audit log search term shows agent activity?
    answer: actor:Copilot.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
---

## What you will learn

- Compare session records and audit events by purpose, owner, content, access and retention.
- Identify questions that neither record answers on its own.

## Two different records

The [audit log how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) says the enterprise audit log records changes to your Copilot plan, such as settings, policies and licenses, and agent activity on the GitHub website. It does **not** include client session data such as the prompts a user sends to Copilot locally; a custom solution is required for that, for example hooks that send Copilot CLI events to your own logging service. Use `action:copilot` for plan events and `actor:Copilot` for agent activity.

The [agentic audit event reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) lists key fields: `action`, `actor_is_agent` (always `true` for these events), `agent_session_id`, which appears only when an agent session produced the event, and `user`, the person who initiated it.

| | Session record | Audit log event |
| --- | --- | --- |
| Purpose | Resume, review, share, query work | Accountability for actions and changes |
| Content | Prompts, responses, tools, file changes | Action, actor, user, session link |
| Owner and default access | The user; private unless shared or an Actions cloud session | Enterprise administrators |
| Can the user delete it? | Often yes, as Part 5 shows | No user control is documented |
| Retention | Until deleted, for most session types | 180 days, or longer if streamed |

The [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) is explicit that enabling sync does not give administrators access to sessions. A session record is the user's working history, not a tamper-evident trail.

Administrators have other views. The **AI controls** page shows recent agent sessions with filters, and audit log streaming of agent session events is in **public preview**, limited to enterprises using Enterprise Managed Users or data residency, according to the [monitoring how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity). Client telemetry options on the same page are a separate topic.

## Worked example: an investigation request

**Hypothetical starting state:** A pull request created by Copilot changed a deployment file unexpectedly. The security team asks for "the Copilot logs."

The administrator searches the audit log with `actor:Copilot` and finds a `pull_request.create` event with a `user` and an `agent_session_id`. That shows who started the agent and links to the session. The session's reasoning and prompts live in the session record, which for a cloud agent session is visible to people with repository access.

**Outcome:** The audit event answers who and what; the session log answers why. If the work had been a local, unsynced CLI session, neither the audit log nor GitHub would hold the prompts.

## Practice: route three questions

**Prerequisites:** The table above. No settings need to be changed.

1. Route each question to session record, audit log or neither: (a) who changed the cloud session storage policy; (b) what prompt led a cloud agent to edit a file; (c) what a user typed in an unsynced local CLI session.
2. For "neither," name the kind of custom solution the documentation mentions.
3. In an authorized sandbox enterprise, run an `actor:Copilot` search. Without one, compare with the model answer.

**Expected result:** Three routings with the gap identified.

<details>
<summary>Model answer</summary>

(a) Audit log: policy changes are recorded. (b) Session record, reached through `agent_session_id`. (c) Neither by default: it stays on the user's machine; organizations needing it use a custom solution such as hooks that send CLI events to their own logging service.

</details>
