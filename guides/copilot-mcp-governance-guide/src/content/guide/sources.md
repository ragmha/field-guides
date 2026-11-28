---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| MCP concepts | [Model Context Protocol (MCP)](https://docs.github.com/en/copilot/concepts/customizations/mcp) | 2026-11-27 |
| Enterprise MCP management | [MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) | 2026-11-27 |
| Allowlist configuration | [Configure an enterprise MCP allowlist](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) | 2026-11-27 |
| Managed settings keys | [Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) | 2026-11-27 |
| Managed settings rollout | [Getting started with enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) | 2026-11-27 |
| Deployment methods | [Choosing how to deploy enterprise-managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) | 2026-11-27 |
| Team overrides | [Overriding enterprise-managed settings for enterprise teams](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams) | 2026-11-27 |
| Registry hosting | [Configure an MCP registry](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry) | 2026-11-27 |
| Registry enforcement | [MCP private registry enforcement](https://docs.github.com/en/copilot/reference/enterprise-administrators/mcp-private-registry-enforcement) | 2026-11-27 |
| Registry restriction | [Restrict MCP based on a registry](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry) | 2026-11-27 |
| Copilot CLI servers | [Adding MCP servers for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) | 2026-11-27 |
| Repository configuration | [Configure MCP servers for your repository](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) | 2026-11-27 |
| Agents secrets | [Configure secrets and variables for the cloud agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) | 2026-11-27 |
| Firewall boundary | [Customize the agent firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | 2026-11-27 |

## Release status and scope

- Custom MCP registries and registry-based restriction: **public preview**. GitHub describes them as not prioritized for development and recommends managed-settings allowlists, which are generally available on supported clients.
- Copilot connectors: **public preview**, and subject to the Editor preview features policy.
- GitHub MCP Registry: **public preview**.
- Registry enforcement in Eclipse, JetBrains and Xcode relies on pre-release client versions; Copilot in the cloud is not supported for registry enforcement.
- Managed-settings MCP allow and deny keys are not supported for Copilot in the cloud running on GitHub Actions, per the reference table.
- Local sandboxing, network firewalls, audit logs and policy conflicts are covered only where they bound MCP decisions; see the sibling courses for depth. Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Notices

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use decision flowcharts, a coverage matrix, a comparison matrix, a transport swimlane, layered credential and configuration stacks, and lifecycle and timeline maps. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent course is not affiliated with or endorsed by GitHub.
