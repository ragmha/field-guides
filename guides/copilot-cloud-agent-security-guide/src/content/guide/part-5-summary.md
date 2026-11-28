---
title: Agent firewall summary
section: Agent Firewall
order: 20
description: Use the firewall as one layer, with known gaps owned by other controls.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
---

## Key Takeaways

- The firewall covers Bash-tool processes and, in cloud sandboxes, the built-in Playwright MCP server, but not other MCP servers or setup steps.
- Organization settings lock repository firewall choices unless set to Let repositories decide.
- Prefer narrow URL entries over broad domain entries in custom allowlists.
