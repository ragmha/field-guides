---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Copilot audit scope | [Review audit logs for Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) | 2026-11-27 |
| Agent audit fields and usage records | [Agentic audit log events](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) | 2026-11-27 |
| Agent sessions view | [Monitoring agentic activity](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) | 2026-11-27 |
| Session filters | [Available filters for agent sessions](https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters) | 2026-11-27 |
| Copilot event category | [Audit log events for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise) | 2026-11-27 |
| Access methods and retention | [Accessing the audit log for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise) | 2026-11-27 |
| Search qualifiers | [Searching the audit log for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise) | 2026-11-27 |
| Audit log API | [Using the audit log API for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/using-the-audit-log-api-for-your-enterprise) | 2026-11-27 |
| Streaming | [Streaming the audit log for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) | 2026-11-27 |
| Organization audit log | [Reviewing the audit log for your organization](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization) | 2026-11-27 |
| Usage records endpoint | [REST API endpoints for Copilot usage metrics](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) | 2026-11-27 |
| Telemetry concepts | [OpenTelemetry for Copilot](https://docs.github.com/en/copilot/concepts/enterprise/opentelemetry) | 2026-11-27 |
| Telemetry reference | [OpenTelemetry reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/opentelemetry-reference) | 2026-11-27 |
| Agent commits and session logs | [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) | 2026-11-27 |
| Custom client logging | [Hooks for GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/hooks) | 2026-11-27 |

## Release status and scope

- Copilot usage records streaming (agent session events): **public preview - use with caution**, limited to enterprises using Enterprise Managed Users on GitHub.com or GitHub Enterprise Cloud with data residency.
- Copilot usage records REST endpoint: **public preview - use with caution**, with the same enterprise-type limit and its own policy.
- Streaming to multiple endpoints: **public preview - use with caution**.
- Hooks in Visual Studio Code: **public preview**; supported hook events differ by surface.
- Usage metrics dashboards and reports, and the handling of session content, are outside this course's scope.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a layered source map, an access-method matrix, an event-family map, a record anatomy, a triage flow, a preview streaming swimlane, a retention timeline, a stream lifecycle, an investigation flowchart, an alert matrix, a span tree and an evidence-limits matrix. Their hypothetical inputs and limitations come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub.
