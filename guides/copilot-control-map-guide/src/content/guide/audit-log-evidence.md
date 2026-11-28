---
title: Audit log evidence
section: Evidence Layers
order: 18
description: Use the audit log, agent session views and OpenTelemetry to show that controls are in place and unchanged.
verified: "2026-11-27"
diagram: evidence-retention
checks:
  - question: How long does the enterprise audit log retain events?
    answer: 180 days. GitHub recommends streaming to a SIEM for longer history and alerting.
  - question: Does the audit log include prompts a user sends to Copilot in a local client?
    answer: No. Client session data is not included; a separate source such as OpenTelemetry export is needed.
  - question: Which audit log field marks an event as performed by an AI agent?
    answer: actor_is_agent, with agent_session_id linking the event to the agent session when applicable.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
---

## What you will learn

- Choose the audit search that proves a given control change.
- Record retention and streaming options for each evidence source.
- Identify where local client evidence must come from instead.

## Three evidence sources

**Enterprise audit log.** It records Copilot plan, setting, policy and license changes, and agent activity on GitHub. Search `action:copilot` for configuration changes and `actor:Copilot` for agent activity. It keeps 180 days of events, and GitHub recommends streaming to a SIEM. It does not include client session data such as local prompts. See [reviewing audit logs](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs). The [agentic events reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) documents fields including `actor_is_agent` and `agent_session_id`. Streaming of Copilot usage records is public preview and limited to Enterprise Managed Users or data residency.

**Agent sessions view.** The [monitoring how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) shows recent agent sessions under AI controls, covering the last 24 hours. Streaming agent session events is public preview with the same enterprise limits.

**OpenTelemetry from clients.** The managed settings `telemetry` key can export client data to an OpenTelemetry backend. Content capture classes default to off, and the `identity` class adds the account, operating system user and machine name. This is the documented path for evidence of local client activity, and it is itself a control that needs an owner and a privacy review.

The [audit and telemetry deep dive](https://ragmha.github.io/field-guides/copilot-audit-telemetry-guide/) covers queries and pipelines in detail.

## Worked example: proving a policy did not drift

**Hypothetical starting state:** Fictional Larkspur Freight's auditors ask for proof that "MCP servers in Copilot" stayed disabled for the last year.

The administrator can search the audit log for Copilot policy changes, but only for 180 days. Because the enterprise streamed its audit log to a SIEM, the older events are available there. The answer combines a current screenshot of the policy, an audit search for changes in the window and the SIEM record for the earlier months.

**Outcome:** The evidence column for this policy lists "audit log (180 days) plus SIEM stream", with the security operations lead as evidence owner.

## Practice: pick the evidence source

**Prerequisites:** The three sources above.

1. For each control, name the evidence source: a content exclusion change; a cloud agent pull request; a CLI user running a denied shell command on a laptop.

**Expected result:** Three different sources, one of which is not the audit log.

<details>
<summary>Model answer</summary>

Content exclusion change: audit log, `copilot.content_exclusion_changed`. Cloud agent pull request: audit log filtered by `actor:Copilot`, plus the agent sessions view for the last 24 hours. Denied shell command on a laptop: not in the audit log; requires OpenTelemetry export configured through managed settings, if approved.

</details>
