---
title: Metric surfaces and access summary
section: Metric Surfaces & Access
order: 4
description: Match each reporting question to a surface and grant the narrowest access that answers it.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
---

## Key Takeaways

- Dashboards suit quick review of rolling 28-day trends; the REST reports and NDJSON exports suit custom reporting and long-term storage.
- The usage metrics dashboard and its charts do not include Copilot CLI activity; the reports carry CLI fields separately.
- The usage metrics policy must be enabled before dashboards and report endpoints return data.
- Enterprise owners, billing managers and holders of the enterprise metrics permission can read enterprise reports; organization owners and holders of the organization metrics permission can read organization reports.
- Report endpoints return short-lived signed download links, so store the files, not the links.
- Guide advice: treat per-user report access as a privileged role and keep the list of holders short.
