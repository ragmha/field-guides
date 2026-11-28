---
title: Review gates and kill switches summary
section: Review Gates & Kill Switches
order: 20
description: Keep people in the merge path and know which switch stops what.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud
---

## Key Takeaways

- Automation output reaches the default branch only through branch rules you set. Require approvals so the extra approval rule (**public preview**) has effect.
- Keep workflow approval on for Copilot pull requests and treat the merge tool as high risk.
- Stop session ends one run. Disable stops one automation. Allow automations and repository access stop an organization's runs. The enterprise policy stops them everywhere.
- Pushed commits survive a stop, so cleanup is part of the runbook.
- Behavior of in-flight runs when a policy changes is not documented. Stop sessions explicitly and verify.
