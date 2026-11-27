---
title: Troubleshooting visibility summary
section: Troubleshooting Visibility
order: 20
description: Triage in a fixed order and stop at the step that explains the report.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
---

## Key Takeaways

- Rule out the signed-in account, client version, plan and propagation before tracing policy.
- The user's features page is useful first-hand evidence.
- Then trace the enterprise state, seat sources, conflict rule, resource controls and surface coverage.
- Model statuses decide whether the released-model default applies; Unconfigured models do not follow it.
- Enterprise teams mode, a **preview**, replaces organization model settings and cannot enable an enterprise-disabled model.
