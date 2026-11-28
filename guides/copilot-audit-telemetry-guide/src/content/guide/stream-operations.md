---
title: Operate an audit log stream
section: Retention & Streaming
order: 15
description: Handle destinations, pauses, duplicates, health checks and data residency for a reliable stream.
verified: "2026-11-27"
diagram: stream-operations
checks:
  - question: A stream was paused for ten days. Where does it resume?
    answer: From one week earlier, because the pause exceeded the seven-day buffer; events older than that are not delivered.
  - question: Why should a SIEM deduplicate streamed audit events?
    answer: Delivery is at least once, so the same event can arrive more than once.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
---

## What you will learn

- Choose a destination and configure it for data residency.
- Plan for pauses, duplicates and health-check failures.

## How the stream behaves

[Streaming the enterprise audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) streams audit and Git events for every organization in the enterprise, from the time the stream is enabled. Supported destinations are Amazon S3, Azure Blob Storage, Azure Event Hubs, Datadog, Google Cloud Storage, Microsoft Agent 365, Microsoft Purview and Splunk. Agent 365 and Purview receive only Copilot agent session events. Streaming to multiple endpoints is **public preview**.

Operational facts to design for:

- **Delivery** is at least once, so duplicates are possible.
- **Format** for storage destinations is compressed JSON files with paths like `YYYY/MM/DD/HH/MM/<uuid>.json.log.gz`.
- **Pauses**: GitHub buffers seven days. A pause longer than seven days resumes from one week earlier. A pause of three weeks or more starts a new stream with no backfill.
- **Health checks** run daily. If the stream is misconfigured, enterprise owners receive an email, and the problem must be fixed within six days to avoid dropped events.
- **Data residency**: configure the destination region before enabling the stream. An Amazon S3 destination can be outside your data residency region.

## Worked example: a pause during a migration

**Hypothetical starting state:** The fictional Wingtip Payments team pauses its Splunk stream while moving to a new index. The migration slips, and the stream resumes after twelve days.

The analyst works out what was lost: the stream resumes from seven days before the restart, so about five days of events never arrived. Those days are still inside GitHub's 180-day window, so the analyst exports them through the audit log API with a `created` range and loads them, deduplicating against events the SIEM already holds.

**Outcome:** The gap is closed from the API, and the runbook now caps planned pauses at less than seven days.

## Practice: write a stream runbook

**Prerequisites:** The facts above and, in an authorized sandbox, a test destination or the fictional scenario. Do not pause a production stream.

1. Name the destination, its region and its retention owner.
2. Write the steps for a planned pause, including the maximum duration.
3. Write the response to a health-check email, including the six-day deadline and the backfill method.

**Expected result:** A runbook covering destination, pause limit, deduplication and health-check response.

<details>
<summary>Model answer</summary>

Destination: Azure Event Hubs in the same region as the enterprise data, retention owned by security operations. Pauses: under seven days, with a ticket and an end date. Health-check email: fix within six days; if events were missed, backfill from the API within the 180-day window. The SIEM deduplicates because delivery is at least once.

</details>
