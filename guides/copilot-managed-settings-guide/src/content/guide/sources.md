---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
---

## What you will learn

The links below are the primary documentation consulted for this draft. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Supported keys and client matrix | [Enterprise managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) | 2026-11-27 |
| Getting started | [Get started with managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) | 2026-11-27 |
| Deployment methods | [Deploy managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) | 2026-11-27 |
| Team overrides | [Override settings for teams](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams) | 2026-11-27 |
| Business-only enterprises | [Managed settings for Copilot Business](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/copilot-business-only) | 2026-11-27 |
| Settings repository | [Create a .github-private repository](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo) | 2026-11-27 |
| MCP allowlist evaluation | [Configure an enterprise MCP allowlist](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) | 2026-11-27 |
| Plugin standards | [About enterprise-managed plugin standards](https://docs.github.com/en/copilot/concepts/enterprise/plugin-standards) | 2026-11-27 |
| Plugin and marketplace settings | [Manage plugin marketplaces and plugins](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) | 2026-11-27 |
| General availability | [Changelog: managed-settings.json is generally available](https://github.blog/changelog/2026-07-01-enterprise-managed-settings-json-is-generally-available/) | 2026-11-27 |
| Copilot app support | [Changelog: managed settings apply to the Copilot app](https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/) | 2026-11-27 |
| VS Code AI settings | [Manage AI settings in VS Code](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) | 2026-11-27 |
| VS Code device policies | [VS Code enterprise policies](https://code.visualstudio.com/docs/enterprise/policies) | 2026-11-27 |
| VS Code troubleshooting | [Troubleshoot VS Code enterprise policies](https://code.visualstudio.com/docs/enterprise/troubleshooting) | 2026-11-27 |

## Release status and scope

- `managed-settings.json`: generally available for GitHub Enterprise Cloud from 2026-07-01, initially for Copilot CLI and VS Code; the Copilot app and cloud agent were added on 2026-07-27.
- `features.browserUse`: **public preview - use with caution**.
- Custom MCP registry: **public preview - use with caution**. Managed-settings MCP allowlists and denylists are generally available on supported clients.
- The older `.github/copilot/settings.json` location remains supported for backward compatibility; new work in this course uses `copilot/managed-settings.json`.
- Key support differs by client and minimum version. Absence of a preview tag here is not a guarantee of availability or approval.
- Sandbox, MCP, model, network and telemetry design are covered only as managed-settings keys; their policy design belongs to companion courses.

## Upstream and attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use layered stacks, support and composition matrices, deployment flowcharts, device swimlanes, a drift timeline and a change lifecycle. Their hypothetical inputs and limitations come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub or Microsoft.
