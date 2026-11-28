---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Policy scope and drift | [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) | 2026-11-27 |
| Conflict rules | [Feature availability when policies conflict](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) | 2026-11-27 |
| Enterprise policies | [Manage enterprise policies](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies) | 2026-11-27 |
| Organization policies | [Manage organization policies](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) | 2026-11-27 |
| Default availability | [About default availability](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) | 2026-11-27 |
| Enterprise assignment | [Grant enterprise access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access) | 2026-11-27 |
| Organization assignment | [Grant organization access](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access) | 2026-11-27 |
| Multi-seat billing | [Seats and billing cycles](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles) | 2026-11-27 |
| License-based piloting | [Pilot a feature or model](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) | 2026-11-27 |
| Cloud policy (enterprise) | [Manage Copilot in the cloud](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) | 2026-11-27 |
| Cloud policy (organization) | [Manage Copilot in the cloud in an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) | 2026-11-27 |
| Unlicensed code review | [Enable Copilot code review](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/enable-copilot-code-review) | 2026-11-27 |
| Resource-scoped exclusions | [Content exclusion](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) | 2026-11-27 |
| Surface coverage | [Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) | 2026-11-27 |
| Client troubleshooting | [Troubleshoot common issues](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues) | 2026-11-27 |
| Cloud agent troubleshooting | [Troubleshoot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent) | 2026-11-27 |
| Model availability | [Manage availability of default models](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) | 2026-11-27 |
| Change evidence | [Review audit logs for Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) | 2026-11-27 |
| Delegated administration | [Establish AI managers](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) | 2026-11-27 |

## Release status and scope

- Enterprise custom roles, including Manage enterprise AI controls: **public preview - use with caution**.
- Enterprise teams mode for model availability: opt-in **preview - use with caution**. Switching deactivates organization-level model settings.
- Editor preview features cover capabilities in **public preview**; the default policy for new features does not apply to preview features.
- The lists of least- and most-restrictive policies and the supported surfaces table are reproduced as reviewed and change over time. This course does not attempt an exhaustive per-policy catalog, a per-user seat lookup API, managed client settings or MCP configuration.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Diagrams

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a decision-state matrix, decision flowcharts, a seat-source trace, a conflict matrix, layered rule tiers, a user and resource swimlane, a surface coverage matrix, a record layout and a review cycle. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent course is not affiliated with or endorsed by GitHub.
