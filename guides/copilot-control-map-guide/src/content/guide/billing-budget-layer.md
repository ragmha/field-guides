---
title: Billing and budget layer
section: Data and Cost Layers
order: 15
description: Record which budget caps which spending, which budgets stop usage and who owns each one.
verified: "2026-11-27"
diagram: budget-evaluation
checks:
  - question: Is "Stop usage when budget limit is reached" on by default for enterprise, cost center and organization budgets?
    answer: No. It is off by default; without it, charges continue to accrue past the limit.
  - question: Does an enterprise budget cap license fees?
    answer: No. The enterprise budget covers metered charges, not license fees.
  - question: Which user-level budget applies when a user has an individual budget and belongs to a cost center with a user-level budget?
    answer: The individual budget, because the most specific user-level budget wins.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption
---

## What you will learn

- Distinguish user-level budgets from cost center, organization and enterprise budgets.
- Record which budgets stop usage and which only alert.
- Assign finance and administrative owners to each budget row.

## What each budget caps

The [budgets concept page](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) describes two families.

**User-level budgets** cap how many AI credits one user can consume in a billing cycle. They come in three types: universal, cost center and individual. The most specific wins, and they always enforce a hard stop.

**Spending budgets** cap metered charges for a cost center, an organization or the enterprise. They stop usage only if "Stop usage when budget limit is reached" is enabled, which is off by default. Organization budgets are the only budget option for organization owners and can only restrict further. The enterprise budget does not cap license fees. Cost centers can also use included usage controls, which cap included usage to the credits funded by their licenses.

Three facts change how you read a budget row. When a user is licensed by several organizations, GitHub bills one organization chosen at random each cycle, so their spending may land on an unexpected organization budget. Reaching a limit blocks features that consume AI credits, but inline completions and next edit suggestions continue. And, per the [billing concept page](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing), budget restrictions do not remove seats.

The [adoption governance tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) notes that spending limits interact with policies: a feature can be enabled by policy yet unusable because of a budget. Record both rows so support teams can tell the difference.

## Worked example: an alert that was meant to stop

**Hypothetical starting state:** Fictional Larkspur Freight sets a cost center budget for its Research team and assumes usage will stop at the limit.

The governance lead checks the budget and finds "Stop usage when budget limit is reached" unchecked, so the budget only alerts. The finance partner decides Research should stop at the limit, and the enterprise owner enables the option. A universal user-level budget is added as a per-user baseline.

**Outcome:** The inventory row changes from "cap" to "hard stop", with the finance partner as accountable owner and the enterprise owner as configuring role.

## Practice: classify budget rows

**Prerequisites:** The descriptions above.

1. Classify each as "always stops", "stops if enabled" or "does not cap": universal user-level budget, organization budget, enterprise budget for license fees.

**Expected result:** Three classifications with the rule that justifies each.

<details>
<summary>Model answer</summary>

Universal user-level budget: always stops, because user-level budgets enforce a hard stop. Organization budget: stops if enabled. Enterprise budget for license fees: does not cap, because the enterprise budget covers metered charges only.

</details>
