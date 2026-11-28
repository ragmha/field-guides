---
title: Effective-policy records summary
section: Effective-Policy Records
order: 24
description: Record every input, separate predictions from observations, and revalidate when inputs change.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## Key Takeaways

- An effective-policy record captures the enterprise state, seat sources, conflict rule, resource controls, surface and result.
- Mark results as predicted or observed, and mark values as explicit or inherited.
- Review who can change policies, including custom role holders.
- Use `action:copilot` audit log events as change evidence; retention is 180 days unless streamed.
- Revalidate records on a cycle and after any change to their inputs.
