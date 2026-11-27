---
title: Trace from event to session
section: Session Records and Audit Evidence
order: 23
description: Follow an agent session ID across the audit log, the Agents tab and the commit, and record what you could not see.
verified: "2026-11-27"
diagram: evidence-tracing
checks:
  - question: What field links an agentic audit event to its session?
    answer: agent_session_id, present only when an agent session produced the event.
  - question: Where does a cloud agent commit point to its session?
    answer: The commit message includes a link to the session logs.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## What you will learn

- Follow an agent session across the audit log, the AI controls view, the Agents tab and the commit.
- Record access limits and retention limits as part of the evidence.

## Links between records

Several documented links connect an agent's actions to its session:

- **Audit event:** `agent_session_id` identifies the agent session that generated the event, and `user` names who started it, per the [agentic audit event reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events).
- **AI controls:** the enterprise "Agent sessions" view supports [filters](https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters) such as `agent`, `organization`, `repository`, `status`, `timeframe` and `user`.
- **Commit:** cloud agent commits are authored by Copilot with the person who started the session as co-author, are signed, and include a link to the session logs in the commit message, according to the [agent management how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents).
- **Agents tab:** the session log shows progress, token usage, session length, reasoning and tools used.

Two limits shape any trace. The audit log keeps events for 180 days, per the [audit log how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs). [Streaming Copilot agent session events](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) is in **public preview** and only available to enterprises using Enterprise Managed Users or data residency. And session access follows session rules: a synced local session is private to its owner unless shared.

Guide advice: write each trace as a chain of identifiers with the source of each, and record any hop you could not complete and why. A missing hop is a finding, not a failure.

## Worked example: following one change

**Hypothetical starting state:** The platform team reviews a signed commit on `main` authored by Copilot, co-authored by a developer. The change was made 40 days ago.

The reviewer opens the session log link in the commit message. They search the audit log with `actor:Copilot` and the repository, and find the `pull_request.create` event with the same `agent_session_id`. The session is a cloud agent session, so it is visible to people with repository access and cannot have been deleted, only archived.

**Outcome:** Commit, session log and audit event agree on the session and user. The trace notes that an event older than 180 days would need a SIEM copy, which this enterprise would only have if it had streamed events.

## Practice: write a trace record

**Prerequisites:** An authorized sandbox repository with a cloud agent pull request, or the worked example.

1. Record the commit SHA, the session link from the commit message and the session's user.
2. Record the audit event's `action`, `user` and `agent_session_id`.
3. Note each hop's retention or access limit. Without a sandbox, fill the record from the worked example.

**Expected result:** A chain of identifiers that match, with limits recorded.

<details>
<summary>Model answer</summary>

Commit SHA, then the session link in the commit message, then the session on the Agents tab, then the audit event `pull_request.create` with the matching `agent_session_id` and `user`. Limits: 180-day audit retention without streaming; session visibility follows repository access for cloud agent sessions.

</details>
