---
title: Auto-approval rules summary
section: Auto-Approval Rules
order: 12
description: Keep allow rules narrow, deny or ask for risky commands, and pair rules with a sandbox.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
  - https://code.visualstudio.com/docs/agents/run/approvals
---

## Key Takeaways

- In Copilot CLI, deny rules beat allow rules, and paths and URLs are separate permission layers.
- In VS Code, a false rule asks rather than blocks, and any part of a chain can trigger a prompt.
- Command matching is best effort; use the sandbox for actual restriction.
