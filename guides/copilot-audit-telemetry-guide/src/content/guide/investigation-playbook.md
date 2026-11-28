---
title: Write an investigation playbook
section: Investigation & Alerting
order: 18
description: Move from a question to a bounded finding through triage, collection, attribution and corroboration.
verified: "2026-11-27"
diagram: investigation-playbook
scenarioDiagram: agent-audit-fields
checks:
  - question: Why should a playbook record the exact queries it ran?
    answer: So another responder can repeat them and see the same scope, and so gaps in coverage are visible.
  - question: What can a responder use to move from an agent's commit to its session record?
    answer: Cloud agent commit messages link to the session logs, and agent audit events can carry an `agent_session_id`.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
---

## What you will learn

- Structure a Copilot investigation into five repeatable stages.
- Write findings that state what the evidence shows and what it does not.

## Five stages

Guide advice: a playbook keeps responders consistent and makes gaps visible. Use these stages:

1. **Scope.** Write the question, time window, organizations and repositories in scope.
2. **Triage.** Check the Agent sessions view for anything still running and contain it first.
3. **Collect.** Search the audit log or your stream. The [Copilot audit log guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) uses `action:copilot` for plan and policy events and `actor:Copilot` for agent activity. Keep the exact queries.
4. **Attribute.** Use `actor_is_agent`, `user` and `agent_session_id` from the [agentic events reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events). [Audit log search](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise) confirms `user` is the person the agent acted for. [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) says cloud agent commits name the initiator as co-author and link to the session logs.
5. **Conclude.** Write a bounded finding: what is shown, what is not, and which sources were unavailable.

## Worked example: a disabled policy

**Hypothetical starting state:** At the fictional Proseware Health, a team notices that an organization-level Copilot setting changed overnight. The security team opens an investigation.

**Scope:** one organization, the previous 48 hours. **Triage:** no agent session is in progress. **Collect:** `action:copilot.cfb_org_settings_changed created:>=2026-11-25` returns one event from an organization owner, with previous and current values. **Attribute:** `actor_is_agent` is absent and the actor is a person. **Conclude:** the owner changed the setting at the recorded time. The record does not explain why, so the team contacts the owner and attaches the reply.

**Outcome:** A short finding that lists the query, the event, the attribution and the open question of intent.

## Practice: draft a playbook card

**Prerequisites:** The five stages above and, in an authorized sandbox, read access to the audit log, or the fictional scenario.

1. Choose one scenario: an unexpected agent pull request or a seat granted to an unknown user.
2. Write one line per stage, including the exact search for Collect.
3. Write the bounded finding template with "shows", "does not show" and "unavailable sources" fields.

**Expected result:** A card that another responder could follow without asking you questions.

<details>
<summary>Model answer</summary>

Agent pull request. Scope: repository and 7 days. Triage: sessions view filtered by repository. Collect: `actor:Copilot action:pull_request.create repo:<owner>/<repo>`. Attribute: `user`, `agent_session_id`, commit co-author and session log link. Conclude: "Copilot created the pull request in a session started by <user>; this does not show who approved the content. Local client telemetry was unavailable."

</details>
