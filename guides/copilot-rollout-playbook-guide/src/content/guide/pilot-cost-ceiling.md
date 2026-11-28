---
title: Set a pilot cost ceiling
section: Pilot Design
order: 7
description: Estimate metered usage beyond the included pool and cap it with a budget that stops usage when needed.
verified: "2026-11-27"
diagram: pilot-cost-ceiling
checks:
  - question: How many credits per license per month does Copilot Business include in the tutorial's example?
    answer: 1,900 credits per license per month, pooled across the licenses.
  - question: Is an organization budget a hard stop by default?
    answer: No. It caps metered charges only if "Stop usage when budget limit is reached" is enabled. A universal user-level budget is always a hard stop.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
---

## What you will learn

- Estimate metered spend for a pilot from people, expected usage and the included pool.
- Choose a budget type that behaves the way your ceiling intends.

## Pool, overage and budget

The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) estimates cost as the number of people multiplied by expected heavy usage, minus the included pool. In its example, Copilot Business includes 1,900 credits per license per month, and usage beyond the pool is billed at $0.01 per credit. It suggests setting the ceiling slightly above the estimate.

Budget behavior matters. The tutorial notes that an organization budget caps metered charges only, applies after the pooled included usage is exhausted, and is not a hard stop unless **Stop usage when budget limit is reached** is enabled. The [budgets concept page](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) explains that user-level budgets are always a hard stop and that a cost center budget does not override a user-level budget. Spending nothing early in a pilot is expected while usage is still inside the pool.

Guide advice: record the estimate, the ceiling and the budget setting in the pilot record, and name the finance owner from your RACI as accountable for the ceiling. The budget figures below are illustrative; confirm current prices and included amounts before relying on them.

## Worked example: 20 Business users

**Hypothetical starting state:** Twenty developers on Copilot Business will pilot an agentic feature. Finance wants a fixed upper limit for the month.

The rollout owner assumes heavy usage of 3,000 credits per person: 60,000 credits. The included pool is 20 × 1,900 = 38,000 credits, leaving 22,000 metered credits, or $220 at $0.01 per credit. The ceiling is set slightly higher at $250 on an organization budget with **Stop usage when budget limit is reached** enabled.

**Outcome:** Metered spend in the pilot cannot exceed the ceiling, and finance knows that $0 early in the cycle is not a sign of failure. The numbers are hypothetical.

## Practice: calculate a ceiling

**Prerequisites:** A pilot headcount, a plan, and current included-usage and overage figures from GitHub documentation. Use hypothetical numbers if needed. No settings need to be changed.

1. Multiply headcount by your expected heavy usage per person.
2. Subtract the included pool for the plan.
3. Multiply the remainder by the overage rate and round up to a ceiling.
4. Choose the budget scope and decide whether usage should stop at the limit.

**Expected result:** A written ceiling with the formula, the budget scope and the stop setting.

<details>
<summary>Model answer</summary>

For 20 Business users at 3,000 credits: 60,000 − 38,000 = 22,000 metered credits, about $220, with a ceiling of $250. Use an organization budget with stop usage enabled if the ceiling must be firm. If individual users must never exceed a limit, a user-level budget is the documented hard stop.

</details>
