---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Cloud policy, enterprise | [Manage Copilot in the cloud for an enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) | 2026-11-27 |
| Cloud policy, organization | [Manage Copilot in the cloud for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) | 2026-11-27 |
| Sessions and environments | [Copilot on GitHub](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) | 2026-11-27 |
| Cloud sandboxes | [About cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) | 2026-11-27 |
| Built-in mitigations | [Risks and mitigations](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) | 2026-11-27 |
| Guardrail planning | [Build guardrails for cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) | 2026-11-27 |
| Rulesets and bypass | [Creating rulesets for a repository](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository) | 2026-11-27 |
| Review rules | [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) | 2026-11-27 |
| Reviewing output | [Review Copilot output](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output) | 2026-11-27 |
| Session logs and provenance | [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) | 2026-11-27 |
| Repository agent settings | [Configuring agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) | 2026-11-27 |
| Network filtering | [Customizing or disabling the firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | 2026-11-27 |
| Setup steps | [Configure the development environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) | 2026-11-27 |
| Runner selection | [Configure the runner for cloud agent](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent) | 2026-11-27 |
| Agents secrets | [Configure secrets and variables](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) | 2026-11-27 |

## Release status and scope

- Additional approval for unattributed Copilot pull requests: **public preview** and subject to change. It is on by default in rulesets.
- The single Copilot in the cloud policy replaced separate cloud agent and Chat policies; older pages and settings may still use earlier names.
- Setup steps, larger runners and self-hosted runners apply only to sessions on GitHub Actions, not to cloud sandboxes.
- Out of scope here and covered elsewhere: automations, MCP allowlists and managed settings, content controls, audit telemetry and metrics.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Diagrams

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained. Diagram outcomes use the hypothetical inputs from the corresponding lessons and are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub.