---
kind: lesson
title: Steer the session
description: Correct assumptions and keep the agent on the intended task.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
---

## Steps

1. Watch the agent's progress and tool requests. If it proposes a new dependency or unrelated refactor, tell it to stop and retain the existing API.
2. Supply a correction such as: `Only change the filter and its test; leave formatting and unrelated files alone.`
3. If a test fails, ask for the failure and a targeted fix, not a claim that the work is complete. Read the output yourself.
4. If the session loses useful context, restate the goal and constraints. Use the documented resume mechanism only when you understand the workspace state.

## Expected result

The task remains limited and unexpected choices are surfaced. A request to stop is not a substitute for checking whether a running command actually stopped.

## Recovery

If work goes outside scope, inspect the diff and restore only changes you can identify as unwanted. Preserve unrelated pre-existing edits.
