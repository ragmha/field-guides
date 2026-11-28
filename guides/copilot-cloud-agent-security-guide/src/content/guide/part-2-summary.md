---
title: Branch and ruleset summary
section: Branch and Ruleset Guardrails
order: 8
description: Keep agent changes on their own branch and under the same rules as people.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## Key Takeaways

- The agent pushes only to a copilot/ branch or the pull request branch it was invoked on, and cannot merge.
- Rulesets apply to Copilot; check commit-metadata rules before granting any bypass.
- Protect agent configuration files with CODEOWNERS and Require review from Code Owners.
