---
title: Workflow approval summary
section: Workflow Approval
order: 16
description: Keep a human checkpoint before agent code runs in Actions.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
---

## Key Takeaways

- Workflows do not run on agent pushes until a write-access user approves them, unless a repository turns approval off.
- Inspect changes, especially under .github/workflows/, before approving a run.
- Treat automatic runs as a dated, conditional exception for repositories without secrets.
