---
kind: lesson
title: Inspect agent edits
description: Review every modified and new file before keeping the work.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Open the source control view and inspect each changed file against the original. Include new and staged files, not only the editor's visible changes.
2. Check that the implementation preserves the existing interface, handles the intended cases, and does not add unrelated edits.
3. Read the test: it should fail without the intended behavior and cover mixed-case input.
4. Keep or discard individual changes only after distinguishing them from pre-existing work. Ask for a correction when needed.

## Human verification

The editor's accept controls and an agent summary are not a correctness guarantee. Review the complete repository state as well as the agent's working set.
