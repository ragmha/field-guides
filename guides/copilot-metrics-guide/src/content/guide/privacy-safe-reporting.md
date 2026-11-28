---
title: Report adoption without watching individuals
section: Adoption KPIs Without Surveillance
order: 19
description: Apply minimum group sizes, restricted raw data and stated purposes so metrics support teams rather than monitor people.
verified: "2026-11-27"
diagram: privacy-safe-reporting
checks:
  - question: A manager asks for a list of developers with zero Copilot activity last month to discuss with each of them. What does the guide recommend?
    answer: Decline the individual list and offer team-level adoption with enablement options, because the purpose would turn usage metrics into individual performance monitoring.
  - question: Can customization fields prove that only approved MCP servers or agents are in use?
    answer: No. GitHub advises against using customization data for that purpose because it comes from client telemetry and can undercount.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/team-level-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/industry-comparisons
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard
---

## What you will learn

- Set guardrails for who sees per-user data and what it is used for.
- Publish group-level views that support enablement.

## Product facts and guide advice

Per-user reports include `user_id`, `user_login` and activity fields ([metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics)). Anyone with report access can see them, so the product does not prevent individual-level use. Several GitHub features already lean toward aggregation:

- Teams with fewer than five seated Copilot users are excluded from team reports ([team-level metrics](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/team-level-metrics)).
- [Industry comparisons](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/industry-comparisons) are opt-in, contribute only summary scores, suppress small cohorts and are not available in exports or the API. The policy is disabled by default ([impact dashboard](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard)).
- The [interpretation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics) advises against using customization data to verify that only approved customizations are in use.

Guide advice, as a short charter:

1. **Purpose.** State that Copilot usage metrics support enablement, rollout and investment decisions, not individual performance reviews.
2. **Minimum group size.** Publish no view for fewer than five people, matching the product's team floor.
3. **Restricted raw data.** Limit per-user files to a small named group of analysts, keep them in access-controlled storage and apply a retention period.
4. **No rankings.** Do not publish leaderboards, per-person charts or lists of inactive individuals.
5. **Review.** Consult your privacy, legal and employee representative functions before launch, and record their input.

Guide advice: when someone needs individual follow-up, such as offering help to people who have never activated, use a seat-holder outreach message to everyone in the group rather than a targeted list.

## Worked example: the inactive list request

**Hypothetical starting state:** At the fictional Lucerne Publishing, a director asks the metrics team for names of developers with no activity in 28 days so their managers can raise it in one-to-ones.

The team refers to its charter. It provides team-level activation rates, flags two teams with low reach, and offers an opt-in clinic announced to all seat holders. Seat reclamation for unused licenses follows the separate license process, not the metrics report.

**Outcome:** The director gets an actionable view, and usage data stays out of performance conversations.

## Practice: draft a reporting charter

**Prerequisites:** The five charter points above and your organization's data handling policy.

1. Write a one-sentence purpose statement.
2. Set a minimum group size and list where it applies.
3. Name who may access per-user files and the retention period.
4. List three uses you will not support.

**Expected result:** A one-page charter that a privacy reviewer could approve or challenge.

<details>
<summary>Model answer</summary>

Purpose: "Copilot usage metrics inform enablement and rollout decisions for groups." Minimum group size: five, applied to every chart, export and slide. Access: two named analysts, 13-month retention in restricted storage. Not supported: individual performance review, rankings and inactive-person lists for managers.
</details>
