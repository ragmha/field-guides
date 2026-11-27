---
kind: lesson
title: Choose durable guidance
description: Separate repeatable repository conventions from a single task's request.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. Inspect the repository's existing contributor documentation, instructions, and test scripts. Preserve any pre-existing guidance.
2. Select a few stable facts that help most tasks: where tests live, a verified test command, and an established error-handling convention.
3. Keep temporary acceptance criteria in the individual prompt instead. Do not copy secrets, customer data, or unsupported claims into the instruction file.
4. Decide whether each rule applies to the whole repository or just a specific file path.

## Verify and recover

Check each proposed instruction against the actual code and team conventions. If it is ambiguous or conflicts with an existing instruction, resolve that before adding it.
