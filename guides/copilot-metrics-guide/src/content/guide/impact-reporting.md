---
title: Write an impact report that holds up
section: Pairing Metrics with Evidence
order: 23
description: Structure a Copilot impact report around a decision, a fair comparison and clearly separated conclusions.
verified: "2026-11-27"
diagram: impact-reporting
checks:
  - question: Why does the impact dashboard's adoption multiplier not show the effect of adopting Copilot on the same people?
    answer: It compares different populations, engaged cohorts against chat-first users, so differences can reflect the people and their work as well as Copilot use.
  - question: Where should a report take Copilot spending figures from?
    answer: Billing data, not usage telemetry.
  - question: Should a report convert lines of code or estimated time saved into a financial return?
    answer: No. GitHub's guidance advises against it; the dashboard ROI figure is a directional estimate only.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/communicate-copilot-impact
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics
---

## What you will learn

- Follow a repeatable structure for impact reports.
- Keep observations, associations and conclusions apart.

## A five-step structure

The [impact communication tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/communicate-copilot-impact) sets out a sequence:

1. **Define the decision** the report informs, such as expanding to another business unit.
2. **Establish the comparison:** scope, dates, baseline, population and known confounders.
3. **Assemble evidence:** adoption, cost from billing data, code generation, delivery, quality and developer feedback with respondent counts.
4. **Separate observations from conclusions.**
5. **Write the narrative**, including the next review.

The [company goals tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals) adds four checks: align scope and period, check what else changed, check quality alongside speed, and investigate before attributing results. Describe changes as associations unless other evidence supports a causal claim.

The [impact dashboard](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard) offers an adoption multiplier and a potential ROI estimate. The [interpretation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics) notes that the multiplier compares different populations and that industry comparison values are not targets. ROI figures are directional estimates, and the communication tutorial advises against converting lines of code or time saved into financial returns.

Recommended: give every report the same headings so readers can compare quarters, and keep a short "what this does not show" section.

## Worked example: expanding to a new unit

**Hypothetical starting state:** The fictional Wide World Importers platform team must recommend whether to extend Copilot from its 400-person product unit to its 250-person operations unit. A draft slide claims "Copilot saved 9,000 hours".

The team rewrites the report. Decision: extend or wait. Comparison: product unit, two quarters before and after rollout, with a reorganization noted as a confounder. Evidence: weekly reach of 68 percent, rising pull request throughput with stable change failure rate, and a survey with 151 respondents. Spending comes from billing. The hours claim is removed.

**Outcome:** The report recommends a staged extension with a review in 90 days, and states that throughput gains are associated with, not proven to result from, Copilot use.

## Practice: restructure a draft report

**Prerequisites:** A draft adoption update from your organization or a fictional one, reviewed in an authorized sandbox context.

1. Write the decision in one sentence at the top.
2. List the comparison: scope, dates, baseline, population and confounders.
3. Sort each statement into observation or conclusion.
4. Remove or caveat any financial conversion of lines of code or time saved.
5. Add a next review date.

**Expected result:** A restructured report with five headed sections and no unsupported causal or financial claims.

<details>
<summary>Model answer</summary>

The rewritten report opens with "Decide whether to extend Copilot to operations in Q3." Observations list reach, throughput, quality and survey results with sources and counts. Conclusions use association language and name confounders. Spending is quoted from billing. A "what this does not show" note covers coverage gaps, and the review date is fixed.
</details>
