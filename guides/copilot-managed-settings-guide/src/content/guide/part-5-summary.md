---
title: Verification summary
section: Verification and Drift
order: 20
description: Evidence over assumptions.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://code.visualstudio.com/docs/enterprise/troubleshooting
---

## Key Takeaways

- Validation errors appear under **Copilot settings validation**; the section is hidden when there are no issues.
- Server-managed changes reach clients within about an hour; restart or sign-in refreshes immediately.
- In VS Code, **Developer: Policy Diagnostics** shows effective values and sources.
- Test one allowed and one blocked operation; a reported value does not prove enforcement.
- `forceRemoteSettingsRefresh` trades availability for freshness; deliver it by MDM or file.
