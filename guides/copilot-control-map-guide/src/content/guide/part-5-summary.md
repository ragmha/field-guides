---
title: Evidence layers summary
section: Evidence Layers
order: 20
description: Pair every control with evidence and record what that evidence cannot show.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## Key Takeaways

- The audit log records configuration changes and agent activity on GitHub for 180 days; stream it for longer history.
- It does not include local client session data; OpenTelemetry export through managed settings is the documented path.
- Agent session and usage record streaming are public preview with enterprise-type limits.
- Usage metrics show effects with a two-day delay and overlapping organization totals.
- Viewing metrics and reading audit logs are separate permissions from changing controls.
