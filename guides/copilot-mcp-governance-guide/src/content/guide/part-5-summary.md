---
title: Cloud agent MCP summary
section: Cloud Agent MCP
order: 20
description: Allowlist tools and validate in a session log.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
---

## Key Takeaways

- Once configured, the cloud agent uses MCP tools autonomously, so list specific read-only tools instead of using a wildcard.
- Code review requires each tool to declare a read-only hint.
- Custom agent profiles are not covered by managed-settings allow and deny lists; plan compensating controls.
