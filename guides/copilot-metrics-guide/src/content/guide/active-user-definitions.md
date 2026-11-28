---
title: Define active users precisely
section: Metric Definitions
order: 6
description: Separate the daily, weekly, monthly and calendar-month active user counts and the rules behind them.
verified: "2026-11-27"
diagram: active-user-definitions
checks:
  - question: A team adds 28 daily active user values to get a monthly figure. What is wrong?
    answer: The same person is counted once for every day they were active. Use the 28-day distinct count, monthly_active_users, instead.
  - question: Why can the dashboard's total active users differ from monthly_active_users in a 28-day report?
    answer: The dashboard total covers licensed users active in the current calendar month, while monthly_active_users uses a trailing 28-day window.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## What you will learn

- Read the active user counts by their windows.
- Recognize the activity rule that makes a user active.

## Windows and rules

The [metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) defines several active user counts in the aggregated reports:

- `daily_active_users` counts distinct users active on the report day.
- `weekly_active_users` counts distinct users active in the trailing 7 days.
- `monthly_active_users` counts distinct users active in the trailing 28 days.
- `monthly_active_chat_users` and `monthly_active_agent_users` narrow the same window to chat or agent activity.
- Separate counts exist for the cloud agent and code review; active code review takes precedence over passive review.

The usage metrics dashboard adds **total active users**, defined as licensed users active in the current calendar month, and **agent adoption**, the share of those users who tried an agent this month.

The [reconciliation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) aligns the rule: a user is active when `user_initiated_interaction_count` is greater than zero. That field counts explicit prompts only. Code generation and acceptance are counted in separate fields, and acceptance rate is acceptance activity divided by generation activity. CLI counts such as `daily_active_cli_users` are reported separately from IDE counts.

The dashboard uses a 28-day rolling view; reports and NDJSON files are daily. Summing daily counts double-counts anyone active on more than one day.

Recommended: label every chart with its field name and window, for example "Weekly active users (trailing 7 days, enterprise)".

## Worked example: two numbers, one month

**Hypothetical starting state:** The fictional Contoso Robotics team reports 410 monthly users from the dashboard and 445 from the 28-day report on the same day. A director asks which number is wrong.

The analyst checks the definitions. The dashboard total counts licensed users active since the first of the calendar month, which is 19 days. The report uses the trailing 28 days, which includes users active only late last month.

**Outcome:** Both numbers are correct for their windows. The team picks the trailing 28-day count for trends and labels the window on every chart.

## Practice: label a metrics sheet

**Prerequisites:** One enterprise or organization aggregated report from an authorized sandbox, or the sample fields in the reference.

1. List each active user field in the report.
2. Write its window and scope beside it.
3. Mark which fields are safe to compare week over week.
4. Note which fields must never be summed across days.

**Expected result:** A labeled field list that prevents mixing windows.

<details>
<summary>Model answer</summary>

Daily, weekly and monthly active user counts are each distinct counts for their window and must not be summed across report days. Weekly and monthly counts are suitable for trends when compared at the same day of the week. CLI counts sit on their own line. Dashboard totals are labeled "calendar month" to keep them separate from trailing windows.
</details>
