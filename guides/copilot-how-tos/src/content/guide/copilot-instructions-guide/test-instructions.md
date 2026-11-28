---
kind: lesson
title: Test the instructions
description: Exercise representative requests and inspect the resulting behavior.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
---

## Steps

1. Start a fresh chat in a supported client with the repository open. Ask for a small test change without repeating the convention you want to check.
2. Inspect the response and any instruction references the client exposes. Compare the output with the instruction and actual project conventions.
3. Repeat with a file outside the path-specific glob. Check that a local-only rule is not unintentionally treated as universal.
4. If the behavior is inconsistent, check the file location, syntax, client settings, and support. Revise one instruction at a time and retry.

## Human verification

An instruction reference is evidence of context, not proof the agent followed it. Review code and run the project's checks independently.
