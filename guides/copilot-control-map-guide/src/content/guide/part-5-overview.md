---
title: Evidence layers overview
section: Evidence Layers
order: 17
description: Audit logs prove configuration and agent actions on GitHub; metrics describe usage, not enforcement.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## What you will learn

A control map is only as good as its evidence. The [enterprise audit log](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) records changes to plans, settings, policies and licenses, and agent activity on GitHub. [Copilot usage metrics](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) describe how Copilot is used. Neither shows everything, and both have retention and timing limits. This part maps which evidence source can prove which control, and where you need a separate source.

- Pair each control with an audit action, a metric or an external log.
- Record retention, delay and preview status for each evidence source.
- Recognize where local client activity needs OpenTelemetry or another source.
