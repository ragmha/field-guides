---
title: Local and remote servers summary
section: Local and Remote Servers
order: 12
description: Pick the matcher and containment that fit the transport.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
---

## Key Takeaways

- Use serverCommand for local stdio servers and serverUrl for remote servers; serverName is a user-chosen label.
- Sandbox settings can contain local MCP servers, but remote servers do not run in the local sandbox.
- Connectors are remote servers matched by URL; plugin-only rules complement, not replace, allow and deny lists.
