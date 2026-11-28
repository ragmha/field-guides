---
title: Local sandboxing summary
section: Local Sandboxing
order: 16
description: Narrow filesystem and network access, then verify the effective policy.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
---

## Key Takeaways

- Local sandboxing is off by default; turn it on deliberately or have it required.
- Denied paths beat grants, and developer tool access can expose configuration with registry credentials.
- Any allow rule makes outbound access an allowlist; check `/sandbox policy` for the effective result.
