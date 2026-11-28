---
title: Cost and rate limits summary
section: Cost & Rate Limits
order: 16
description: Name the payer, cap every run and design for predictable volume.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
---

## Key Takeaways

- Runs use AI credits, paid by the creator or the repository owner, and Actions minutes, paid by the repository owner.
- The per-run limit stops a run. Daily, weekly and monthly limits only block new runs, so set both kinds.
- No automation-specific run-rate limit is documented. Control volume with cadence, filters, serialization and credit limits.
- Scripts that start runs must follow REST rate-limit guidance. A 404 right after a run request does not mean the run failed.
- Organization-billed CLI usage bypasses user budgets. Use cost centers and dashboards for it.
