---
kind: lesson
title: Evaluate tool permissions
description: Make a deliberate decision for each requested action.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools
  - https://docs.github.com/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
---

## Steps

1. When prompted, read the complete tool name, arguments, target paths, and stated purpose. A test command can execute project code; review it like any other command.
2. Approve only an action you understand and need. Prefer a one-time approval while learning rather than granting a tool for the session or saving approval for the location.
3. Deny a command that changes unrelated files, accesses an unexpected URL, deletes data, or publishes work. Ask the agent to explain or propose a safer alternative.
4. If approvals were saved accidentally, consult the [permissions documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools) for inspecting and resetting them; session and saved location approvals have different lifetimes.

## Verify and recover

CLI settings and administrator rules affect which requests appear. A lack of a prompt is not evidence that an action is harmless. Avoid broad all-tools approvals for this exercise, and stop if you cannot determine an action's effect.
