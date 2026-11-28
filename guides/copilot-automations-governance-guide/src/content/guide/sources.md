---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
---

## What you will learn

The links below are the primary documentation consulted for this draft. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Automations concepts | [About automations](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) | 2026-11-27 |
| Creating automations | [Create automations](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations) | 2026-11-27 |
| Automations launch | [Schedule and automate tasks changelog](https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/) | 2026-11-27 |
| Tools, triggers and cost controls | [Automations update changelog](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) | 2026-11-27 |
| Automations REST API | [Agent automations endpoints](https://docs.github.com/en/rest/agent-automations/agent-automations) | 2026-11-27 |
| Agent tasks REST API | [Agent tasks endpoints](https://docs.github.com/en/rest/agent-tasks/agent-tasks) | 2026-11-27 |
| Starting tasks by API | [Use cloud agent via the API](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-via-the-api) | 2026-11-27 |
| Starting sessions | [Start Copilot sessions](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions) | 2026-11-27 |
| CLI in Actions concepts | [Copilot CLI in GitHub Actions](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions) | 2026-11-27 |
| CLI in Actions setup | [Use Copilot CLI in Actions](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-in-actions) | 2026-11-27 |
| As-code workflows | [About GitHub Agentic Workflows](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-github-agentic-workflows) | 2026-11-27 |
| Risks and review | [Risks and mitigations](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) | 2026-11-27 |
| Guardrails | [Build guardrails for cloud agent](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) | 2026-11-27 |
| Repository settings | [Configure agent settings](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) | 2026-11-27 |
| Ruleset approvals | [Available rules for rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) | 2026-11-27 |
| Organization policy | [Manage Copilot in the cloud for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) | 2026-11-27 |
| Enterprise policy | [Manage Copilot in the cloud for an enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) | 2026-11-27 |
| Sessions | [Manage and track agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) | 2026-11-27 |
| Agent activity | [Monitor agentic activity](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) | 2026-11-27 |
| Audit events | [Agentic audit log events](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) | 2026-11-27 |
| API rate limits | [Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) | 2026-11-27 |

## Release status and scope

- Agent automations REST endpoints: **public preview**.
- Agent tasks REST endpoints: **public preview**.
- Issue status triggers and filters: **public preview**.
- Assigning issues to Copilot through the issues API: **public preview**.
- Ruleset rule requiring an additional approval for unattributed Copilot pull requests: **public preview**.
- Agent session audit streaming: **public preview**, limited to the enterprise types in the monitoring guide.
- Not covered because no public documentation was found: an automation-specific run-rate limit, audit events for creating or editing automation definitions, what happens to personal automations when the creator leaves, and how in-flight runs behave when a policy is turned off.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub.
