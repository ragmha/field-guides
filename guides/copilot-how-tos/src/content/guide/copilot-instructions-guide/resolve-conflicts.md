---
kind: lesson
title: Resolve conflicting guidance
description: Find overlapping instructions and remove ambiguity.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. Inventory applicable repository-wide, path-specific, and agent instruction files. GitHub documents `AGENTS.md` as another supported instruction mechanism on relevant surfaces.
2. Compare rules that describe the same behavior. For example, two different test commands for the same directory need an explicit resolution.
3. Consult current client documentation for supported formats and precedence; do not assume all clients load the same files.
4. Edit the conflicting source of guidance with the repository owners and rerun a representative task.

## Expected result

The intended rule is clear to a human reader and no longer relies on guessing which instruction wins. Preserve unrelated contributors' work.
