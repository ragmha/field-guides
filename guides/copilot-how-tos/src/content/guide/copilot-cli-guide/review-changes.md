---
kind: lesson
title: Inspect the complete diff
description: Compare every change with the task and starting state.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
---

## Steps

1. Run `git status --short` and `git diff` in another terminal or after the agent finishes. Also inspect any staged changes with `git diff --cached`.
2. Open untracked files separately: ordinary `git diff` does not display their contents.
3. Compare each changed file with the recorded starting state. Check edge cases, interfaces, error handling, and whether the test asserts the intended behavior.
4. Request a focused correction or remove only changes you understand to be unwanted. Repeat the inspection.

## Expected result

You can account for every changed and new file, including changes made before the session. A plausible summary or passing test does not replace reading the code.
