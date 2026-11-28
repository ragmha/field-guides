---
title: Collect run evidence and audit events
section: Audit & Change Control
order: 2
description: Trace an automation run from its commit back to the session log, audit events and task record.
verified: "2026-11-27"
diagram: run-evidence-and-audit
checks:
  - question: Which audit log fields identify actions taken by an agent and link them to a session?
    answer: The actor_is_agent field flags agent actions, and agent_session_id links the event to the session.
  - question: How far back does the agent sessions view in enterprise AI controls show activity?
    answer: The last 24 hours. Use the audit log for a longer history.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/rest/agent-tasks/agent-tasks
  - https://docs.github.com/en/rest/agent-automations/agent-automations
---

## What you will learn

- Locate the evidence each automation run leaves behind.
- Join that evidence into one trace for a review or incident.

## Where evidence lives

- **Commits.** The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) says Copilot authors its commits with the requester as co-author. Commits are signed and show as verified, and the message links to the session log.
- **Session logs.** The [session view](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) shows what the agent did. Anyone with read access to the repository can see it. Sessions can be archived but not deleted.
- **Automation page.** Each automation lists its sessions and the credits they consumed. The [REST API](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) lists an automation's tasks.
- **Tasks API.** The [agent tasks API](https://docs.github.com/en/rest/agent-tasks/agent-tasks) (**public preview**) lists tasks by state, creator and time. States include queued, in progress, completed, failed, timed out and cancelled.
- **Enterprise views.** [Monitor agentic activity](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) describes the Agent sessions view under AI controls, with the last 24 hours of activity and filters. The audit log filter `actor:Copilot` covers 180 days.
- **Audit events.** The [agentic audit log reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) lists fields such as `action`, `actor_is_agent`, `agent_session_id` and `user`. Streaming agent session events is in **public preview** and limited to some enterprise types.

The documentation reviewed does not say whether creating or editing an automation produces an audit log event. Use revision history for those changes, as the next lesson covers.

## Worked example: an unexpected dependency bump

**Hypothetical starting state:** A dependency upgrade landed on the default branch overnight, and the security team asks who made it.

The analyst opens the merge commit, sees Copilot as author and follows the session log link. The session shows the automation name and trigger. The analyst searches the audit log for `actor:Copilot` and matches `agent_session_id` to the pull request events. The automation's task list confirms one run at that time.

**Outcome:** The change traces to one scheduled run, and the human approvals are visible on the pull request.

## Practice: build an evidence trace

**Prerequisites:** Read access to an authorized sandbox repository with at least one completed automation run.

1. Start from a commit and record the session log link.
2. Record the automation, trigger and credits used from the automation page.
3. Record the matching audit log events and any task state from the API.

**Expected result:** One trace that joins commit, session, automation, audit events and approvals.

<details>
<summary>Model answer</summary>

| Evidence | Value |
| --- | --- |
| Commit | Authored by Copilot, verified, links session |
| Session | Weekly dependency automation, schedule trigger |
| Credits | Shown on automation page |
| Audit | `pull_request.create` with `actor_is_agent` true |
| Approvals | Two reviewers on the pull request |

</details>
