---
title: Latency, coverage and limits summary
section: Latency, Coverage & Limits
order: 16
description: Publish metrics only when they are final, and state what they cannot see.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/usage-metrics-coverage
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
---

## Key Takeaways

- A day's data is available within two full UTC days after the day closes; exports reflect data at export time, so re-export after the window.
- Reports are available from October 10, 2025, with up to one year of history, so store what you need to keep.
- Signed download links expire; download and store the files promptly.
- Metrics depend on client telemetry from supported versions; disabled telemetry, blocked network endpoints and unsupported clients reduce coverage.
- Server-side telemetry still identifies some active users, so totals can exceed the sum of breakdowns.
- Missing data from known attribution issues cannot be backfilled, and billing is unaffected.
