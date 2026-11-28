---
title: Identity and ownership summary
section: Identity & Ownership
order: 8
description: Fix the type deliberately and keep every automation owned.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
---

## Key Takeaways

- The type is fixed at creation. Personal automations act as and bill the creator. Shared automations act as Copilot and bill the repository owner.
- Personal automations are invisible to others, but their runs are not. Use visible runs to find routines you cannot list.
- Shared automations survive creator departure. Anyone with write access can edit them, so they need change review.
- Moving a routine to team ownership means recreating it. Ask creators to disable or hand over personal automations before they leave.
