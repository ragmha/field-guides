---
title: Choose the right metrics surface
section: Metric Surfaces & Access
order: 2
description: Compare the usage, code generation and impact dashboards with the REST reports and NDJSON exports.
verified: "2026-11-27"
diagram: metrics-surfaces
checks:
  - question: Which surface should feed a two-year adoption trend?
    answer: Scheduled downloads from the report endpoints stored in your own warehouse, because dashboards show rolling windows and report history is limited to one year.
  - question: Does the usage metrics dashboard show Copilot CLI activity?
    answer: No. The dashboard charts exclude CLI; the reports carry CLI fields such as used_cli and daily_active_cli_users separately.
sources:
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-usage-and-adoption
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-code-generation
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
---

## What you will learn

- Name the three Copilot dashboards and the question each answers.
- Decide when to use the REST reports or NDJSON exports instead of a dashboard.

## Four surfaces, one dataset family

GitHub describes [Copilot usage metrics](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) as a set of dashboards plus APIs and exports.

- The **usage metrics dashboard** shows adoption and engagement: daily, weekly and total active users, agent adoption, acceptance rate, chat requests per active user and requests per chat mode. Its charts do not include Copilot CLI. You reach it from **Insights**, then **Copilot usage** ([view usage and adoption](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-usage-and-adoption)).
- The **code generation dashboard** shows lines of code suggested, added and deleted from IDE activity, including agent contribution over the last 28 days ([view code generation](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-code-generation)).
- The **impact dashboard** groups users into adoption cohorts and relates them to pull request output, with engagement trends over six months ([view the impact dashboard](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard)).
- The **report endpoints and NDJSON exports** provide daily and 28-day files at enterprise or organization scope, with aggregated, repository-level, user-level and user-team granularity ([REST reference](https://docs.github.com/en/rest/copilot/copilot-usage-metrics)).

Dashboards use a rolling 28-day window. Reports are daily or 28-day files that you download, store and query yourself. Some values, such as the potential ROI estimate and industry comparison, exist only in the dashboards ([metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics)).

Recommended: use dashboards for a quick review and the reports for anything you need to repeat, join or keep.

## Worked example: a quarterly review pack

**Hypothetical starting state:** The fictional platform team at Northwind Labs builds its quarterly adoption review by taking dashboard screenshots. Leaders ask for a 12-month trend, a CLI adoption figure and a team breakdown. The screenshots cannot answer any of the three.

The team keeps the dashboard for weekly checks. It schedules a daily download of the `enterprise-1-day` and `users-1-day` reports into its warehouse and reads CLI counts from the report fields. It builds team views by joining the user-teams report, which Part 3 covers.

**Outcome:** The review pack draws on stored daily files, so trends extend beyond the dashboard window, and CLI appears as its own line rather than missing.

## Practice: map questions to surfaces

**Prerequisites:** Read access to a sandbox or test enterprise or organization with the usage metrics policy enabled, and the REST reference open.

1. List five questions your stakeholders ask about Copilot usage.
2. For each question, note whether it needs a rolling view, a daily series, CLI activity, repository detail or team detail.
3. Assign each question to a dashboard, a report endpoint or both.
4. Mark any question that needs data the surfaces do not provide, such as license assignments.

**Expected result:** A table that matches every question to a surface and flags the gaps.

<details>
<summary>Model answer</summary>

"How many people used Copilot this month?" maps to the usage dashboard. "How has weekly activity changed since launch?" needs stored daily reports. "Is CLI adoption growing?" needs report fields because the dashboard charts exclude CLI. "How many seats are idle?" is a gap, because metrics measure activity and seat data comes from the Copilot user management API.
</details>
