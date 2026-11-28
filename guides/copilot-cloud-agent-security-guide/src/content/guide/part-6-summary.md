---
title: Environment and secrets summary
section: Environment and Secrets
order: 24
description: Give the agent a minimal, reviewed environment and only the secrets it needs.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
---

## Key Takeaways

- Setup steps run only on Actions, before the agent and outside firewall coverage; keep their permissions minimal.
- Prefer GitHub-hosted runners; self-hosted runners must be ephemeral and need their own network controls.
- Agents secrets are separate from Actions secrets; cloud sandboxes receive secrets but not variables.
