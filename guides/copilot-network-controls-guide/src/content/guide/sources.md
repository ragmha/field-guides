---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Client endpoints | [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) | 2026-11-27 |
| Restricted networks | [Allowing access to GitHub's services from a restricted network](https://docs.github.com/en/get-started/using-github/allowing-access-to-githubs-services-from-a-restricted-network) | 2026-11-27 |
| Firewall troubleshooting | [Troubleshoot firewall settings](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-firewall-settings) | 2026-11-27 |
| Proxies and certificates | [Network settings for Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings) | 2026-11-27 |
| Editor configuration | [Configure network settings](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings) | 2026-11-27 |
| Editor networking | [VS Code network connections](https://code.visualstudio.com/docs/setup/network) | 2026-11-27 |
| Plan-based routing | [Manage network access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access) | 2026-11-27 |
| Agent firewall | [Customize the firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | 2026-11-27 |
| Cloud sandboxes | [About cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) | 2026-11-27 |
| Agent environment | [Customize the agent environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) | 2026-11-27 |
| Runner type | [Configure the runner for the cloud agent](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent) | 2026-11-27 |
| Private networking | [Azure private networking for GitHub-hosted runners](https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/configuring-private-networking-for-hosted-compute-products/about-azure-private-networking-for-github-hosted-runners-in-your-enterprise) | 2026-11-27 |
| Network errors | [Troubleshoot network errors](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors) | 2026-11-27 |
| Logs | [View logs](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/view-logs) | 2026-11-27 |
| Editor troubleshooting | [VS Code AI troubleshooting](https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting) | 2026-11-27 |

## Release status and scope

- Starting cloud agent sessions in a cloud sandbox from JetBrains IDEs: **public preview - use with caution**. This course does not depend on it.
- The JetBrains agent debug panel mentioned in GitHub's logging documentation: **public preview - use with caution**. The course uses only generally documented log locations.
- Out of scope: custom agent environments built on prerelease tooling, MCP server governance, local sandboxing, content exclusion and audit logging. Related courses in this collection cover those topics.
- Voice features that use Foundry Local have their own Azure endpoints in the allowlist reference; this course does not list them.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a layered path map, an ownership matrix, allowlist and runner decision flowcharts, a WebSocket swimlane, a proxy selection flowchart, a certificate trust stack, a plan endpoint matrix, a routing change timeline, a firewall settings stack, a coverage matrix and a troubleshooting lifecycle. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub.
