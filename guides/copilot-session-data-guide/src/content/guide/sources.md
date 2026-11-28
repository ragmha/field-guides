---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
---

## What you will learn

The links below are the primary documentation consulted for this course. Review dates record source inspection, not product approval or a guarantee that a behavior applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Session data concepts | [About GitHub Copilot session data](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) | 2026-11-27 |
| CLI resume, share, chronicle and delete | [Using GitHub Copilot CLI session data](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle) | 2026-11-27 |
| CLI configuration directory | [GitHub Copilot CLI configuration directory](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) | 2026-11-27 |
| Agent sessions on GitHub | [Managing agent sessions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) | 2026-11-27 |
| GitHub Copilot app sessions | [Working with agent sessions in the GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) | 2026-11-27 |
| Cloud sandboxes | [About cloud sandboxes for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) | 2026-11-27 |
| Copilot in the cloud policy | [Managing GitHub Copilot in the cloud for your enterprise or organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) | 2026-11-27 |
| GitHub.com Chat retention | [Asking GitHub Copilot questions in GitHub](https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github) | 2026-11-27 |
| Copilot Memory expiry | [About GitHub Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) | 2026-11-27 |
| Audit log scope and retention | [Reviewing audit logs for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) | 2026-11-27 |
| Agentic audit fields | [Audit log events for agents](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) | 2026-11-27 |
| Agent session filters | [Available filters for agent sessions](https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters) | 2026-11-27 |
| Monitoring agentic activity | [Monitoring agentic activity in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) | 2026-11-27 |
| Audit log streaming | [Streaming the audit log for your enterprise](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) | 2026-11-27 |
| VS Code session history and sync | [Save, sync, and query session history](https://code.visualstudio.com/docs/agents/run/sessions/session-history) | 2026-11-27 |
| VS Code session list | [Manage agent sessions in VS Code](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions) | 2026-11-27 |
| Session sync announcement | [Gain insights across your agent sessions with /chronicle](https://github.blog/changelog/2026-06-02-gain-insights-across-your-agent-sessions-with-chronicle/) | 2026-11-27 |

## Release status and scope

- Audit log streaming of Copilot agent session events: **public preview**, only for enterprises using Enterprise Managed Users or data residency.
- Cloud sandbox sessions in JetBrains IDEs: **public preview**.
- VS Code session sync (`chat.sessionSync.*`): **experimental** in VS Code and off by default.
- Values of the "Store local sessions in the Cloud" policy other than the documented minimum, "View from cloud," are not described in this course.
- IDE-specific local storage locations are not covered; GitHub documents them as specific to each IDE.
- Support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a record-anatomy layer map, a persistence matrix, a directory tree, a maintenance decision flowchart, a sync decision flowchart, a responsibility map, a sharing matrix, an export comparison, a control matrix, a retention timeline, a side-by-side comparison and an evidence trace. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration.

This independent guide is not affiliated with or endorsed by GitHub.
