---
title: Isolation and response summary
section: Isolation and Response
order: 24
description: Match isolation to trust, and rotate credentials after incidents.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://code.visualstudio.com/docs/agents/run/security
---

## Key Takeaways

- Local sandboxing runs as you; use a codespace or cloud sandbox for untrusted repositories.
- Dev containers and `devcontainer.json` commands need their own review.
- In an incident, stop, inspect, review access, recover and rotate; resetting approvals is not revocation.
