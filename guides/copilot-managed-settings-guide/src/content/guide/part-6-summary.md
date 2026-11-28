---
title: Change management summary
section: Change Management and Rollback
order: 24
description: Review, stage, and plan the reversal.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
---

## Key Takeaways

- Restrict who can edit `.github-private` and require pull-request review through rulesets.
- Pilot changes with an enterprise team before widening scope.
- Each delivery method has its own rollback path and timing.
- Removing or reverting a key restores lower-precedence behavior; it does not undo restrictive composition from other sources.
- Record expected propagation time and the verification you will repeat after rollback.
