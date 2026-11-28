---
title: Map the audit and telemetry surfaces
section: Audit Evidence Map
order: 2
description: Distinguish audit log events, agent session views, usage records, client telemetry and hooks.
verified: "2026-11-27"
diagram: audit-surfaces
checks:
  - question: Does the Copilot audit log include prompts that a developer typed into a local client?
    answer: No. GitHub states that audit logs do not include client session data such as local prompts; a custom solution such as hooks is needed.
  - question: Which audit log search filter narrows results to activity performed by Copilot agents?
    answer: "`actor:Copilot` shows agent activity; `action:copilot` shows Copilot plan and policy events."
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
  - https://docs.github.com/en/copilot/concepts/enterprise/opentelemetry
  - https://docs.github.com/en/copilot/concepts/customizations/hooks
---

## What you will learn

- Name the distinct places where Copilot evidence is recorded.
- Match an investigation question to the source most likely to answer it.

## Five sources, five scopes

GitHub's guide to [reviewing Copilot audit logs](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) says the audit log covers changes to your Copilot plan, such as settings, policies and license gains or losses, and agent activity on the GitHub website. It does **not** include client session data such as prompts sent to Copilot locally; GitHub says a custom solution such as hooks is needed for that.

The other sources fill different gaps:

| Source | What it records | Typical question |
| --- | --- | --- |
| Audit log, `action:copilot` | Plan, policy, seat and settings changes | Who changed a Copilot setting? |
| Audit log, `actor:Copilot` | Actions agents took on GitHub | Did an agent open this pull request? |
| Agent sessions view | Recent agent sessions from AI controls | What is running right now? |
| Usage records (public preview) | Request and response records from Copilot clients | What did a session send and receive? |
| OpenTelemetry and hooks | Client-side spans, events or custom logs | What happened inside a local session? |

The [agent monitoring guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) describes the session view, streaming and optional OpenTelemetry. [OpenTelemetry for Copilot](https://docs.github.com/en/copilot/concepts/enterprise/opentelemetry) exports traces, metrics and events from supported clients. [Hooks](https://docs.github.com/en/copilot/concepts/customizations/hooks) run commands at points such as session start, prompt submission and tool use, and GitHub lists audit logging for compliance as one use.

Guide advice: write down which source answers each recurring question before you need it. A source you have not enabled cannot be consulted later.

## Worked example: a missing prompt

**Hypothetical starting state:** The fictional Lantern Analytics security team receives a report that a developer asked Copilot CLI to print a production configuration file. The analyst opens the enterprise audit log and filters by `action:copilot`, expecting to find the prompt.

The results show only seat and policy changes. The analyst checks the source map: local prompts are client session data and are not in the audit log. Lantern has not configured hooks or OpenTelemetry content capture, so no record of that prompt exists in any central system.

**Outcome:** The team records a coverage gap rather than a negative finding. "No audit event" here means "not recorded by this source", not "did not happen".

## Practice: build a source map

**Prerequisites:** The table above and read access, in an authorized sandbox, to an enterprise or organization audit log, or the fictional scenario if you have no access.

1. List three questions your security team asks about Copilot, such as a policy change, an agent pull request and a local prompt.
2. For each, name the source from the table that could answer it and whether it is enabled in your sandbox.
3. Mark any question with no enabled source as a gap and note the owner who would decide whether to close it.

**Expected result:** A three-row map in which every question has a named source or an explicit gap, and no question relies on the audit log for local prompts.

<details>
<summary>Model answer</summary>

Policy change: audit log filtered with `action:copilot`. Agent pull request: audit log filtered with `actor:Copilot`. Local prompt: not in the audit log; it requires hooks, OpenTelemetry content capture or eligible usage records, each needing its own approval. If none is enabled, record the gap and its decision owner instead of reporting that nothing happened.

</details>
