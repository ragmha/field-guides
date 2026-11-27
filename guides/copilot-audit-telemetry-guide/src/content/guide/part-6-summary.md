---
title: Correlating telemetry summary
section: Correlating Telemetry
order: 24
description: Join sources carefully and keep every conclusion within its evidence.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/opentelemetry-reference
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## Key Takeaways

- Copilot OTel produces an `invoke_agent` root span with `chat` and `execute_tool` children.
- Read AI units from the root span only; `github.copilot.cost` is not money.
- An `http://` endpoint silently disables export.
- Test identifier joins before relying on them; otherwise label identity-and-time joins as probable.
- Every finding states what it shows, what it does not, and which sources were missing.
