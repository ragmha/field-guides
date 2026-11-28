---
title: Respect latency and history windows
section: Latency, Coverage & Limits
order: 14
description: Schedule downloads around the processing window, retention limit and signed link expiry.
verified: "2026-11-27"
diagram: latency-and-windows
checks:
  - question: On which day is Monday's data reliably complete in UTC terms?
    answer: After two full UTC days have passed since Monday closed, so from Thursday 00:00 UTC.
  - question: Why should a team store downloaded reports instead of relying on the API for history?
    answer: Report history is limited to one year from the current date and starts on October 10, 2025.
  - question: What should you do with an export taken the morning after the reported day?
    answer: Treat it as provisional and re-export after the two-day processing window.
sources:
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success
---

## What you will learn

- Decide when a day's report is final.
- Design a download schedule that keeps history beyond the API limit.

## Three clocks

Three time limits apply to Copilot reports.

1. **Processing.** Data for a day is available within two full UTC days after that day closes ([concepts page](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics)). The [reconciliation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) adds that exports reflect data at the time of export, so an early export can be incomplete. Re-export after the processing window.
2. **History.** The [REST reference](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) says reports start from October 10, 2025, and history is available for up to one year from the current date. Daily endpoints take a `day` parameter and return `report_day`; the 28-day endpoints return `report_start_day` and `report_end_day`. The repository report can return no content for a day.
3. **Link expiry.** Each response returns `download_links`, signed URLs with a limited expiration time. Download the files in the same job that requests them.

The [trial measurement tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success) recommends a scheduled job that calls the API at regular intervals and stores results in a database or warehouse.

Recommended: run a daily job that requests the day three days back, overwrites any earlier provisional copy and records the report day and download time. Keep the raw files under your own retention policy.

## Worked example: the Monday dip

**Hypothetical starting state:** The fictional Woodgrove Bank team publishes a dashboard each Tuesday morning that includes Monday. Every week Monday looks 30 percent lower than the other weekdays.

The analyst compares Tuesday's export of Monday with a re-export taken on Friday. The later file has the expected volume. The dip was processing latency, not behavior.

**Outcome:** The job now requests data three days back and marks the two most recent days as provisional on any chart that includes them.

## Practice: design a download schedule

**Prerequisites:** Read access to the report endpoints in an authorized sandbox, or the REST reference alone if you design on paper.

1. Choose the reports you need daily, such as enterprise and per-user.
2. Set the offset between the run date and the requested `day`.
3. Define where files are stored and how long they are kept.
4. Define how a re-export replaces an earlier copy.

**Expected result:** A one-page schedule covering offset, storage, retention and replacement.

<details>
<summary>Model answer</summary>

A daily job at 06:00 UTC requests the day three days back for the enterprise and per-user reports, downloads files immediately from the signed links, stores them by report day with a download timestamp, and replaces earlier copies for the same day. Retention follows the organization's data policy, which may exceed the API's one-year history.
</details>
