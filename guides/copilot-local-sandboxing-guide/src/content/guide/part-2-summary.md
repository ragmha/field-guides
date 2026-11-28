---
title: Approval modes summary
section: Approval Modes
order: 8
description: Choose a mode deliberately and keep approval lifetimes short.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands
  - https://code.visualstudio.com/docs/agents/run/approvals
---

## Key Takeaways

- Manual, assisted and allow-all differ in who approves; none of them contains a command.
- Non-interactive and autopilot runs deny requests that still need approval.
- Session and persistent approvals cover every later use of a tool until they are reset.
