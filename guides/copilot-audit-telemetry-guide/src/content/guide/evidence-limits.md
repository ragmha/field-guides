---
title: State what evidence proves
section: Correlating Telemetry
order: 23
description: Separate what each Copilot record shows from what it cannot establish.
verified: "2026-11-27"
diagram: evidence-limits
scenarioDiagram: audit-surfaces
checks:
  - question: Does an agent audit event with a `user` field prove that the user approved the agent's change?
    answer: No. It shows who initiated the work. Approval needs separate evidence, such as a review record.
  - question: Does an empty search result in the audit log prove an action did not occur?
    answer: No. The action may be outside the source's coverage, retention window or access method.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/copilot/concepts/customizations/hooks
---

## What you will learn

- List what each Copilot evidence source can and cannot establish.
- Write conclusions with explicit limits.

## Proves, does not prove

| Record | Shows | Does not show |
| --- | --- | --- |
| `copilot.*` settings event | A setting changed, by whom, from what to what | Why it changed, or whether it was approved |
| `copilot.cfb_seat_added` | A seat was added | Necessarily who caused a team-based grant |
| Agent event (`actor:Copilot`) | An agent performed an action; who initiated it | That the initiator reviewed or approved the result |
| Usage record (public preview) | A request or response passed through an endpoint | Complete content when `truncated` is true |
| OTel span | What a client reported, if export worked | Activity on clients without telemetry, or on misconfigured exporters |
| Hook log | What your hook script recorded | Anything the script did not capture, or events the surface does not support |
| Empty result | Nothing matched in this source and window | That nothing happened |

The basis for these limits is in the docs. The [Copilot audit log guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) excludes client session data such as local prompts and warns about the seat-event actor. The [agentic events reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) defines `user` as the initiator and documents `truncated`. [Streaming](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) delivers at least once and only from when it was enabled. [Hooks](https://docs.github.com/en/copilot/concepts/customizations/hooks) run your own code, and GitHub warns not to assume the same events work unchanged across surfaces.

Guide advice: write every finding in three parts: what the evidence shows, what it does not show, and which sources were missing or out of range.

## Worked example: an overstated finding

**Hypothetical starting state:** A draft report at the fictional Woodgrove Studio says: "Sam approved the agent's change to the billing module, as shown by the audit log." The only evidence is an agent event with `user: sam-dev`.

The reviewer checks the table. The event shows that Copilot acted in work Sam initiated, not that Sam approved the change. The reviewer looks for the pull request review record, finds a different approver, and rewrites the finding.

**Outcome:** "Copilot created the change in a session initiated by Sam. The pull request was approved by Priya. No local client telemetry was available."

## Practice: rewrite three findings

**Prerequisites:** The table above and three draft findings, from an authorized sandbox investigation or fictional.

1. For each finding, identify the record it relies on.
2. Compare the claim with the "Does not show" column.
3. Rewrite the finding in the shows, does not show, missing sources format.

**Expected result:** Three findings with no claim beyond what their records support.

<details>
<summary>Model answer</summary>

"No audit event, so the agent never ran" becomes "No `actor:Copilot` event matched in the 180-day window; local sessions are not in the audit log." "The owner added the seat" becomes "The seat event names the owner as actor; team membership history is needed to confirm the cause." "Usage record shows the full prompt" becomes "The record was truncated; the full body is not available."

</details>
