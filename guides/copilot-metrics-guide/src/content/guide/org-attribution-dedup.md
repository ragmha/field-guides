---
title: Attribute users across organizations
section: Scope & Deduplication
order: 10
description: Explain membership-based attribution and why only enterprise reports deduplicate users.
verified: "2026-11-27"
diagram: org-attribution-dedup
checks:
  - question: A developer with one seat belongs to three organizations in the enterprise. How many organization reports include them?
    answer: All three, because attribution follows organization membership rather than the organization that assigned the seat.
  - question: Where should an enterprise-wide distinct active user count come from?
    answer: The enterprise report, which deduplicates users, rather than a sum of organization reports.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
---

## What you will learn

- Predict which organization reports include a given user.
- Choose the correct source for an enterprise-wide count.

## Attribution follows membership

The [reconciliation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) explains that a user who holds a Copilot seat anywhere in the enterprise is attributed to every organization in that enterprise they are a member of. The seat's source organization does not limit attribution. As a result:

- Enterprise reports deduplicate users, so each person counts once.
- Organization reports do not deduplicate across organizations, so the same person can appear in several.
- Organization-level reports are available from December 12, 2025.

The [concepts page](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) says organization totals overlap and should not be added. Some enterprise-level daily values, such as `missing_client_telemetry_user_count` and `below_usage_metrics_minimum_user_count`, are computed independently at the enterprise level ([metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics)), so they also should not be rebuilt from organization files.

Pull request metrics follow repositories. They can appear for users with no IDE data, and moving a repository or organization changes where activity is attributed.

Recommended: publish the enterprise figure as the single headline, and show organization figures as overlapping views with a note that they do not sum.

## Worked example: a 112 percent enterprise

**Hypothetical starting state:** The fictional Adventure Works enterprise has three organizations. A slide adds their monthly active users, 300, 260 and 140, to report 700 active users against 625 seats, which is 112 percent.

The analyst pulls the enterprise 28-day report, which shows 540 distinct monthly active users. Most developers belong to both the platform and product organizations, so they appear in both organization reports.

**Outcome:** The slide reports 540 of 625 seats as the enterprise figure and lists organization counts in a table marked "overlapping; do not sum".

## Practice: reconcile a sum of parts

**Prerequisites:** Enterprise and organization aggregated reports for the same day from an authorized sandbox, or the numbers in the worked example.

1. Sum the organization active user counts.
2. Compare the sum with the enterprise count for the same field and day.
3. Estimate the overlap as the difference.
4. Write one sentence explaining the gap for a non-specialist reader.

**Expected result:** A short reconciliation note with the overlap estimate and explanation.

<details>
<summary>Model answer</summary>

Using the worked example, 700 minus 540 gives an overlap of about 160 user attributions. A suitable sentence: "Developers who belong to more than one organization appear in each organization's report, so the enterprise report, which counts each person once, is the correct total."
</details>
