---
title: Usage metrics evidence
section: Evidence Layers
order: 19
description: Use Copilot usage metrics to see whether controls shape usage, while respecting their coverage limits.
verified: "2026-11-27"
diagram: metrics-signals
checks:
  - question: Can you add organization-level metric totals to get an enterprise total?
    answer: No. The same user can belong to several organizations, so organization totals can overlap.
  - question: Should usage metrics be used to count license assignments?
    answer: No. They measure activity, not licenses; use the Copilot user management API for seats.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
---

## What you will learn

- Explain what usage metrics can and cannot show about a control.
- Record the delay, overlap and coverage limits in the evidence column.
- Separate the permission to view metrics from the permission to change controls.

## Metrics show effects, not settings

The [usage metrics concept page](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) describes four views: the usage dashboard for adoption and engagement, the code generation dashboard for code produced by users and agents, the impact dashboard for adoption depth and pull request output, and repository insights for pull request and code review activity. APIs and NDJSON exports support custom reporting and long-term storage.

For a control map, metrics answer "did the control change behavior?" rather than "is the control set?". A model policy change should show in model usage; a budget hard stop may show as reduced agent activity for affected users. The concept page lists limits to record:

- Metrics combine telemetry from IDEs, Copilot CLI and other surfaces and are not a complete record. Detailed IDE breakdowns need supported clients with telemetry enabled.
- Data for a day is available within two full UTC days after the day closes.
- Organization totals can overlap, so do not add them to estimate an enterprise total.
- Metrics measure activity, not license assignments.
- Impact comparisons show association, not causation.

The [metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics) defines each field. Access is its own control: the [AI managers tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) lists "View Enterprise Copilot Metrics" as a separate permission. The [metrics deep dive](https://ragmha.github.io/field-guides/copilot-metrics-guide/) covers reporting design.

## Worked example: did the model restriction land?

**Hypothetical starting state:** Fictional Larkspur Freight disabled one model for its Finance organization on a Monday and wants confirmation on Tuesday.

The analyst waits, because data for Monday arrives within two full UTC days. On Thursday the Finance organization's model breakdown shows no use of the disabled model after the change. The analyst does not add Finance and Platform totals, because one shared user appears in both.

**Outcome:** The evidence column reads "audit log for the change; usage metrics for the effect, two-day delay, organization view only".

## Practice: write an evidence note

**Prerequisites:** The limits above.

1. Write a two-sentence evidence note for a budget hard stop on agent usage.
2. Include one limit from the list.

**Expected result:** A note that treats metrics as indirect evidence.

<details>
<summary>Model answer</summary>

The configuration is proven by the budget settings and audit log; usage metrics show whether agent activity for affected users fell after the stop. Metrics arrive within two full UTC days and are not a complete record, so a drop is supporting evidence, not proof of enforcement.

</details>
