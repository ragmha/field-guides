---
title: Layer conflicts summary
section: Layer Conflicts
order: 20
description: Review instruction combination rules and agent name collision behavior.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
  - https://docs.github.com/en/copilot/reference/custom-agents-configuration
---

## Key Takeaways

- Instruction precedence depends on the surface. GitHub.com Chat ranks personal, repository, then organization but sends all; most local clients combine without a general order. See [About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions).
- Resolve instruction conflicts by removing or narrowing a rule, not by adding a counter-rule.
- For custom agents, the lowest level wins and profiles are deduplicated by filename, as documented in the [custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration).
- Guide advice: reserve names for shared agents and check repositories for shadowing files.

## Questions to discuss

- Which topics are covered by more than one instruction layer today?
- Should repositories be allowed to override enterprise agents?
