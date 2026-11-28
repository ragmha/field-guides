---
title: Permissions and scope summary
section: Permissions & Scope
order: 12
description: Narrow tools, writes and input before an automation runs unattended.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
---

## Key Takeaways

- Tool selection is the main limit on what a run can do. GitHub tools stay in the repository; MCP tools reach what their server can.
- **Only this issue** limits event-triggered writes by GitHub tools. It does not limit MCP tools or scheduled runs.
- Keep the write-access actor filter on unless policy and the use case clearly justify opening it.
- Copilot-created events are excluded by default, and the agent cannot opt itself in. Allow them only on the trigger that needs them.
- Draw every chain and remove cycles. Workflow approval and human review still apply to chained pull requests.
