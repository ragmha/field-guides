---
title: Retention and streaming summary
section: Retention & Streaming
order: 16
description: Keep history before you need it, and operate the stream with its limits in mind.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
---

## Key Takeaways

- GitHub keeps audit events for 180 days and Git events for seven; the sessions list covers 24 hours.
- Streaming captures activity only from the moment it is enabled.
- Delivery is at least once; deduplicate in the destination.
- Pauses beyond seven days lose events, and three weeks or more starts a new stream.
- Fix health-check failures within six days, and set the destination region before enabling.
