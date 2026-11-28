---
title: What can managed settings control?
section: What Managed Settings Control
order: 1
description: Map the managed-settings keys to the clients that actually honor them.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
---

## What you will learn

Enterprise-managed settings are a JSON configuration that supported Copilot clients read and enforce: permission rules, model defaults, plugin and marketplace restrictions, MCP server allowlists and denylists, sandbox restrictions, telemetry and refresh behavior. This part separates what each key does from where it applies. Support varies by client, and some keys only set a starting default rather than a lock.
