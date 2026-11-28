---
title: Audit and change control summary
section: Audit & Change Control
order: 24
description: Keep a trace for every run and a review for every definition change.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/rest/agent-automations/agent-automations
---

## Key Takeaways

- Commits, session logs, the automation page, the tasks API and audit events together explain a run.
- Audit events carry `actor_is_agent` and `agent_session_id` to join them to sessions.
- Automation definitions live outside Git. Use revision history and scheduled snapshots to review changes.
- Proposed improvements still need an owner decision. Treat new tools or triggers as a new review.
- Where pull request review of definitions is required, consider GitHub Agentic Workflows.
