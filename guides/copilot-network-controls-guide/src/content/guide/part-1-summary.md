---
title: Network paths summary
section: Network Paths
order: 4
description: Separate paths and owners before changing any network rule.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
---

## Key Takeaways

- Client egress, browser streaming and agent-environment egress are different paths.
- Corporate allowlist rules are separate from the agent firewall inside GitHub's environment.
- Give each network control one owner, a configuration location and a review trigger.
