---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this deep dive and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/governance-controls
---

## What you will learn

The links below are the primary documentation consulted for this deep dive. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Governance surfaces | [Governance controls for Copilot](https://docs.github.com/en/copilot/concepts/enterprise/governance-controls) | 2026-11-27 |
| Governance index | [Enterprise AI governance](https://docs.github.com/en/copilot/get-started/enterprise-ai-governance) | 2026-11-27 |
| Policy scope | [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) | 2026-11-27 |
| Organization policies | [Manage organization policies](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) | 2026-11-27 |
| Policy surfaces | [Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) | 2026-11-27 |
| Default availability | [Default availability of features and models](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) | 2026-11-27 |
| Policy conflicts | [Policy conflicts reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) | 2026-11-27 |
| Delegation | [Establish AI managers](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) | 2026-11-27 |
| Adoption posture | [Govern for adoption](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) | 2026-11-27 |
| Pilots | [Pilot a feature or model](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) | 2026-11-27 |
| Cloud agent access | [Add the cloud agent to an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/add-copilot-cloud-agent) | 2026-11-27 |
| Cloud agent guardrails | [Build guardrails for the cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) | 2026-11-27 |
| Rulesets baseline | [Maintain codebase standards](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards) | 2026-11-27 |
| Cloud agent firewall | [Customize the firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) | 2026-11-27 |
| Managed settings | [Get started with managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) | 2026-11-27 |
| Managed settings delivery | [Deploy managed settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) | 2026-11-27 |
| Managed settings keys | [Enterprise managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) | 2026-11-27 |
| MCP allowlists | [MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) | 2026-11-27 |
| Network routing | [Manage network access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access) | 2026-11-27 |
| Allowlist | [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) | 2026-11-27 |
| Content exclusion | [Content exclusion](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) | 2026-11-27 |
| Content exclusion setup | [Exclude content from Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | 2026-11-27 |
| Content exclusion changes | [Review content exclusion changes](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes) | 2026-11-27 |
| Budgets | [Budgets for Copilot](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) | 2026-11-27 |
| Billing | [Copilot billing](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/billing) | 2026-11-27 |
| Audit log | [Review audit logs](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) | 2026-11-27 |
| Agentic events | [Agentic audit log events](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) | 2026-11-27 |
| Agent monitoring | [Monitor agentic activity](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) | 2026-11-27 |
| Usage metrics | [Copilot usage metrics](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) | 2026-11-27 |
| Metrics fields | [Usage metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics) | 2026-11-27 |
| Copilot CLI | [Administer Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/administer-copilot-cli-for-your-enterprise) | 2026-11-27 |

## Release status and scope

- Enterprise custom roles used for AI managers: **public preview - use with caution**.
- Custom MCP registry as an allowlist method: **public preview - use with caution**; the managed settings allowlist is generally available.
- Streaming of agent session events and Copilot usage records from the audit log: **public preview - use with caution**, limited to enterprises using Enterprise Managed Users or data residency.
- Browser use in managed settings (`features.browserUse`): **public preview - use with caution**.
- Subscription-based network routing is not supported for enterprises hosted on GHE.com.
- Managed settings key support varies by client; check the reference for each key before relying on it.

This deep dive covers breadth across layers. Detailed configuration of each layer is left to the linked documentation and sibling deep dives. Settings not documented in the sources above, including editor-specific enterprise policies, are out of scope.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a layer stack, a responsibility map, a delegation flow, a guardrail ring, a precedence ladder, a boundary map, a scope map, a budget evaluation trace, a retention timeline, a signal map, a risk matrix and a decision flowchart. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.
