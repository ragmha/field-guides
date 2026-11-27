---
title: Client and network layers summary
section: Client and Network Layers
order: 12
description: Machine-level settings and network routing reach people that licensing-based controls do not.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
---

## Key Takeaways

- Server-managed settings reach enterprise-licensed users in all supported clients, including Copilot in the cloud.
- Device management and local files reach anyone on the machine, but only local clients.
- Precedence is device management, server, file, user, except for keys that combine most restrictively.
- Subscription-based routing blocks personal plans on the corporate network only.
- The cloud agent firewall is a separate, organization-owned control with documented gaps.
