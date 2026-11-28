---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Exclusion concepts and limitations | [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) | 2026-11-27 |
| Exclusion configuration | [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) | 2026-11-27 |
| Exclusion change review | [Reviewing changes to content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes) | 2026-11-27 |
| Exclusion REST API | [Copilot content exclusion management](https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management) | 2026-11-27 |
| App and CLI support | [Content exclusions generally available in Copilot app and CLI](https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli/) | 2026-11-27 |
| Policy surface support | [Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) | 2026-11-27 |
| Individual public code policy | [Managing Copilot policies as an individual](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies) | 2026-11-27 |
| Organization policies | [Managing policies for your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) | 2026-11-27 |
| Policy precedence | [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) | 2026-11-27 |
| Policy conflicts | [Policy conflicts](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) | 2026-11-27 |
| Code references | [Copilot in IDEs](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-in-ides) | 2026-11-27 |
| Finding matching code | [Finding public code that matches suggestions](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code) | 2026-11-27 |
| Repository roles | [Repository roles for an organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization) | 2026-11-27 |
| Push protection | [About push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) | 2026-11-27 |
| Secret scanning | [About secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) | 2026-11-27 |
| Code review secret detection | [Copilot code review: adaptive effort, secret detection and more](https://github.blog/changelog/2026-11-17-copilot-code-review-adaptive-effort-secret-detection-and-more) | 2026-11-27 |

## Release status and scope

- Content exclusion REST API: **public preview - use with caution**. It documents organization endpoints only, drops comments and keeps only the last duplicate key.
- Push protection for AI-detected secrets: **public preview - use with caution**. Not available for REST API or GitHub MCP server interactions.
- Secret detection in Copilot code review: **public preview - use with caution**.
- Content exclusion in the Copilot app and CLI is generally available for Copilot Business and Copilot Enterprise.
- Out of scope: model, MCP, network, cloud agent and audit telemetry controls, which are covered by other courses in this collection.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use effect, responsibility, decision, matrix, layered, timeline, lifecycle and swimlane diagrams. Their hypothetical inputs and limitations come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent course is not affiliated with or endorsed by GitHub.
