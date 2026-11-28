---
title: Design a small set of adoption KPIs
section: Adoption KPIs Without Surveillance
order: 18
description: Build KPIs with clear numerators, denominators, windows and decisions, using group-level data.
verified: "2026-11-27"
diagram: kpi-design
checks:
  - question: Where should the denominator for a weekly-active-to-license ratio come from?
    answer: The Copilot user management API, because usage reports measure activity and do not include license or seat data.
  - question: Why is acceptance rate a weak headline KPI on its own?
    answer: It reflects whether suggestions were accepted, not code quality, satisfaction or outcomes, so it needs context from other evidence.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics
  - https://docs.github.com/en/rest/copilot/copilot-user-management
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## What you will learn

- Write a KPI definition that another analyst could reproduce.
- Separate adoption KPIs from outcome measures.

## The KPI sheet

A useful adoption KPI states five things: numerator, denominator, window, scope and the decision it informs. Examples:

| KPI | Numerator | Denominator | Decision |
| --- | --- | --- | --- |
| Weekly reach | `weekly_active_users`, enterprise | Assigned seats on the same day | Where to focus enablement |
| Sustained use | Users active in each of the last four weeks | Users active in the first of those weeks | Whether onboarding sticks |
| Breadth | Users in Phases 1 to 3 | Monthly active users | Whether agent training is needed |
| Coverage | Users with client telemetry present | Daily active users | Whether the data can be trusted |

The [interpretation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics) describes a weekly-active-to-license ratio above 60 percent as healthy. The [trial tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success) suggests that 70 to 90 percent of trial licenses showing usage in the first month indicates good activation. Seat counts come from the [Copilot user management API](https://docs.github.com/en/rest/copilot/copilot-user-management), because [usage metrics](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) measure activity, not license assignments.

The [company goals tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals) warns that usage signals show only whether people are using the tool. A higher acceptance rate does not establish code quality or satisfaction, and more generated code does not establish better test coverage. Choose an engineering outcome first, then the adoption KPIs that help explain it.

Recommended: keep the headline set to three or four adoption KPIs, each linked to a named decision and owner. Retire a KPI that no longer informs a decision.

## Worked example: from twelve charts to four

**Hypothetical starting state:** The fictional Alpine Ski House platform team publishes twelve charts, including lines of code accepted per developer. Managers have started asking why specific people are low.

The team rebuilds the set as the four KPIs above, all at team level or above, and removes per-developer charts. Lines of code move to a quarterly appendix with a caveat.

**Outcome:** Review meetings discuss enablement and coverage rather than individuals, and each KPI has an owner who acts on it.

## Practice: write two KPI definitions

**Prerequisites:** The KPI table above and access to sandbox reports, or the field list in the reference.

1. Choose one reach KPI and one breadth KPI.
2. Write the numerator, denominator, window and scope for each.
3. Name the decision each informs and who owns it.
4. Add the coverage caveat that applies.

**Expected result:** Two KPI definitions that another analyst could reproduce from the same files.

<details>
<summary>Model answer</summary>

Reach: enterprise `weekly_active_users` on Monday divided by assigned seats from the user management API on the same day; owner is the enablement lead; decides where to run training. Breadth: users in Phases 1 to 3 divided by monthly active users, trailing 28 days, enterprise; owner is the developer experience team; decides whether to fund agent workshops. Both note the day's missing client telemetry count.
</details>
