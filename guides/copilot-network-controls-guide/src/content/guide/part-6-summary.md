---
title: Runners and diagnosis summary
section: Runners & Diagnosis
order: 24
description: Own egress on private runners and diagnose with evidence first.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors
---

## Key Takeaways

- Runner settings apply only to sessions on Actions, not cloud sandboxes.
- Self-hosted runners need the integrated firewall disabled and your own egress controls.
- Test the ping endpoints, classify the error and collect redacted logs before changing rules.
