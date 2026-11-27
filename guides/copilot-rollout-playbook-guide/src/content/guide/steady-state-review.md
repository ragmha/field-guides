---
title: Run steady-state governance reviews
section: Outcomes and Steady State
order: 23
description: Review spend, adoption, policy drift and new releases on a regular cadence after the rollout ends.
verified: "2026-11-27"
diagram: steady-state-review
checks:
  - question: Where does GitHub suggest monitoring for new Copilot features and models?
    answer: The GitHub blog and the GitHub changelog filtered for Copilot.
  - question: How long does the audit log retain events, and what does GitHub recommend for longer retention?
    answer: 180 days; stream audit logs to a SIEM for longer retention.
  - question: Which permission holders does the policies overview suggest reviewing to prevent drift?
    answer: Enterprise owners, holders of Manage enterprise AI controls and organization owners.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption
---

## What you will learn

- Define the inputs a steady-state review needs.
- Set weekly, monthly and quarterly reviews with owners.

## Inputs and cadence

Copilot changes often. GitHub's guidance on [new features and models](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models) suggests monitoring the GitHub blog and the [Copilot changelog](https://github.blog/changelog/?label=copilot), reviewing documentation and policies for each new feature, and considering a pilot. Features move through private preview, public preview and general availability.

The [policies overview](https://docs.github.com/en/copilot/concepts/enterprise/policies) recommends preventing drift by regularly reviewing who has policy access and using the audit log to monitor changes. The [audit log how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) notes that events are kept for 180 days and that client session data, such as local prompts, is not included. The [adoption tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption) recommends ongoing review of metrics, follow-up with inactive users and iteration on feedback.

Guide advice: use four inputs (changelog, audit log, usage metrics, spend and budgets) and three cadences. Weekly operations check spend against budget and support themes. A monthly adoption review covers metrics, inactive licenses and exceptions nearing expiry. A quarterly governance review compares the baseline table with configured settings and the changelog, samples the audit log, reviews who holds policy permissions and refreshes the RACI. Feed each quarter into a short leadership report.

## Worked example: the first quarterly review

**Hypothetical starting state:** The rollout is complete. Three months later, two features have reached general availability and one exception has passed its expiry.

The AI managers compare the baseline table with the changelog and propose enabling the two features after a short pilot. An `action:copilot` sample shows one unplanned policy change by an organization owner; it is reverted and the owner is reminded of the exception process. The expired exception is closed. The RACI is updated after a change of finance contact.

**Outcome:** The baseline, permissions and RACI match reality again, and leadership receives a one-page summary. The scenario is hypothetical.

## Practice: build a review calendar

**Prerequisites:** Your baseline table, RACI and exception register. No settings need to be changed.

1. List the four inputs and who can read each.
2. Assign each check to the weekly, monthly or quarterly review.
3. Name an owner for each review.
4. Define what the quarterly review sends to leadership.

**Expected result:** A calendar with inputs, checks, owners and a leadership output.

<details>
<summary>Model answer</summary>

Weekly (rollout owner): spend against budget, support themes. Monthly (AI managers): metrics, inactive licenses, exception expiries. Quarterly (rollout owner accountable): baseline against configuration and changelog, audit log sample within the 180-day window, policy permission holders, RACI refresh. Output: a one-page leadership report with decisions needed.

</details>
