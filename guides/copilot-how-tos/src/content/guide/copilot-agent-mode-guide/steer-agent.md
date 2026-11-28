---
kind: lesson
title: Steer an iteration
description: Use feedback to correct an agent's assumptions and keep work focused.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Read the agent's progress and any proposed changes as they appear.
2. If it changes an unrelated component, tell it: `Keep the original interface and remove only the unrelated change you introduced.`
3. If a test fails, provide the failure and ask for a targeted correction. Review the next command and diff again.
4. Stop the task if it exceeds the agreed boundary. Verify whether any running command has actually stopped.

## Expected result

The agent has an opportunity to correct course, but you still check the resulting files and output. If its behavior remains unclear, stop and finish the small change manually.
