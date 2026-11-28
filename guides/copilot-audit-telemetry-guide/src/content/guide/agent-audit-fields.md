---
title: Interpret agent audit fields
section: Copilot Audit Events
order: 7
description: Use actor, actor_is_agent, agent_session_id and user to attribute agent actions correctly.
verified: "2026-11-27"
diagram: agent-audit-fields
checks:
  - question: In an agentic audit event, which field names the person who initiated the agent's work?
    answer: The `user` field. The actor is Copilot, and `actor_is_agent` is true.
  - question: Is `agent_session_id` present on every event where `actor_is_agent` is true?
    answer: No. It is present only when the event results from an agent session.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
---

## What you will learn

- Read the four fields that distinguish agent actions from human actions.
- Link an agent's audit event to its session and initiator.

## Anatomy of an agent record

The [agentic audit log events reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) says you can filter with `actor:Copilot` to see agent activity from the last 180 days. Key fields:

- `action` is what happened, for example `pull_request.create`.
- `actor_is_agent` is always `true` for agentic events.
- `agent_session_id` is present only when the event results from an agent session.
- `user` is the person who initiated the work.

[Audit log search](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise) confirms that when an agent performed an action, the `user` qualifier refers to the user the agent acted for. You can combine actors, as in `actor:octocat actor:Copilot`, or exclude agents with `-actor:Copilot`.

Repository history adds a second trail. [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) says cloud agent commits are authored by Copilot with the initiating person as co-author, and their messages link to the session logs.

Guide advice: attribute agent actions to two parties. Copilot performed the action; the `user` started the work that led to it. Neither alone tells the full story.

## Worked example: who opened the pull request?

**Hypothetical starting state:** At the fictional Contoso Rail, a reviewer questions a pull request that changed a deployment script. The pull request page shows Copilot as the author.

The analyst searches `actor:Copilot action:pull_request.create repo:contoso-rail/deploy-tools`. The event shows `actor_is_agent: true`, an `agent_session_id` and `user: dana-ops`. The commit lists Dana as co-author, and its message links to the session log. The analyst records both the agent and the initiator and links the session ID for later correlation.

**Outcome:** The finding states that Copilot created the pull request in a session started by Dana. It does not state that Dana wrote the change or approved its content.

## Practice: attribute an agent event

**Prerequisites:** The field list above and, in an authorized sandbox, an agent-created pull request or the fictional scenario.

1. Search for the creation event with `actor:Copilot` and the repository, including its owner.
2. Record `action`, `actor_is_agent`, `agent_session_id` and `user`.
3. Compare `user` with the commit co-author and note any disagreement.

**Expected result:** A short attribution note naming the agent, the initiator and the session ID, or recording that no session ID was present.

<details>
<summary>Model answer</summary>

"Copilot (`actor_is_agent: true`) performed `pull_request.create` in session <id>, initiated by `user` dana-ops. The commit lists the same person as co-author." If `agent_session_id` is missing, state that the event did not result from an agent session rather than inventing one.

</details>
