---
title: Credentials and secrets summary
section: Credentials and Secrets
order: 16
description: Keep MCP credentials narrow, owned and replaceable.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables
---

## Key Takeaways

- Only COPILOT_MCP_ prefixed values reach MCP servers, and in a cloud sandbox only secrets are available, not variables.
- Repository secrets override organization secrets with the same name.
- The built-in GitHub MCP server uses a read-only token scoped to the current repository; widen it only with a fine-grained, read-only credential.
