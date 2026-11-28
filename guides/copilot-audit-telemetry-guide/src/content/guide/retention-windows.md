---
title: Plan around retention windows
section: Retention & Streaming
order: 14
description: Compare the 24-hour, 7-day and 180-day windows and decide what to keep externally.
verified: "2026-11-27"
diagram: retention-windows
checks:
  - question: Will enabling audit log streaming during an incident recover events from the previous month?
    answer: No. Streaming includes only activity from the time you enable it.
  - question: How long does the audit log keep Git events?
    answer: Seven days. Save them to external storage before they expire if you need them longer.
  - question: The enterprise audit log page shows only three months by default. How do you see older events within the 180-day range?
    answer: Use the `created` qualifier with an explicit date range.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/using-the-audit-log-api-for-your-enterprise
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## What you will learn

- List the retention window of each Copilot evidence source.
- Decide what must be kept outside GitHub, and from when.

## Windows that close

| Source | Window |
| --- | --- |
| Agent sessions "View all" list | Last 24 hours |
| Git events in the audit log | 7 days |
| Audit log web interface, exports and API | 180 days |
| Streamed events | Your destination's retention policy |

[Accessing the enterprise audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise) gives the 180-day and 7-day windows and warns that streaming includes only activity from the time you enable it, so enabling it during an incident does not recover earlier activity. To prepare for incident response, the same page recommends enabling enterprise audit log streaming, API request event streaming and source IP address disclosure, then setting an appropriate retention period that responders can access.

[The audit log API page](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/using-the-audit-log-api-for-your-enterprise) notes that the default view shows three months; use the `created` qualifier to reach older events within the 180 days. The [Copilot audit log guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) recommends streaming to a SIEM for long-term history and alerts.

Guide advice: write retention as a decision with a named owner. A destination's default retention is not an approved policy.

## Worked example: the eight-month question

**Hypothetical starting state:** The fictional Alpine Ledger compliance team receives an auditor's request: show every Copilot policy change in the past eight months. The enterprise enabled streaming four months ago.

The analyst can show four months from the SIEM. For the earlier months, the 180-day window covers about two more, but not the full range. The analyst documents the gap with dates, the reason (streaming started later) and the change that now prevents it.

**Outcome:** The auditor receives evidence for six months and a written explanation for the remainder, rather than an unsupported claim of completeness.

## Practice: draw your retention timeline

**Prerequisites:** The table above and, in an authorized sandbox, knowledge of your stream start date and destination retention, or fictional values.

1. Draw a timeline from today backward 12 months.
2. Mark the 24-hour, 7-day and 180-day windows and the date streaming began.
3. Shade periods where no source holds Copilot audit events and name the owner who approved the destination retention.

**Expected result:** A timeline that shows coverage and gaps, with a retention owner, and no claim of history before the stream started except within the 180-day window.

<details>
<summary>Model answer</summary>

Today minus 180 days: covered by GitHub. From the stream start date onward: covered by the SIEM for its approved retention, for example 13 months set by the security owner. Earlier than both: a gap. Git events older than seven days exist only if they were streamed or exported in time.

</details>
