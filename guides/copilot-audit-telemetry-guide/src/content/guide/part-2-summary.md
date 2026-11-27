---
title: Copilot audit events summary
section: Copilot Audit Events
order: 8
description: Read Copilot event families and agent fields without misattributing the cause.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
---

## Key Takeaways

- The `copilot` category covers seats, settings, content exclusion, memory opt-out, plan and access changes.
- Settings events carry previous and current values; plan events carry the old and new plan.
- The actor of a team-based seat event may not be the person who changed the team.
- Agent events carry `actor_is_agent: true`, the initiating `user`, and an `agent_session_id` when they come from a session.
- Attribute agent actions to both the agent and the initiator.
