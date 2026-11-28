---
kind: lesson
title: Choose a bounded task
description: Set an outcome and a safe working boundary for agent mode.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Open a trusted practice project you are authorized to share. Inspect source control status and note any pre-existing edits.
2. Choose a task that crosses a small number of files, such as adding case-insensitive filtering and a test to a reading-list utility.
3. Write acceptance criteria: matching ignores case, the existing interface remains unchanged, and the relevant test passes.
4. Identify files or directories that should remain untouched and the command you normally use for the test.

## Verify and recover

Confirm the workspace is safe and the change is reversible. If you cannot identify a reliable test, first ask for an explanation or plan rather than authorizing a broad implementation.
