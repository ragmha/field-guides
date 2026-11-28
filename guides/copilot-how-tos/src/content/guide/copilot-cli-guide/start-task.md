---
kind: lesson
title: Start and describe the task
description: Launch an interactive session with a concrete outcome and boundaries.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
---

## Steps

1. From the trusted project directory, run `copilot` and follow any sign-in or directory-trust prompts. Decline if you do not trust the directory.
2. Submit: `Add case-insensitive title filtering to the reading-list helper. Keep the existing API. Add a focused test, run the relevant test command, and summarize the diff. Do not commit or push.`
3. If the project uses different names or commands, supply the relevant file and test command instead of assuming the example fits.
4. Read the agent's response and subsequent requests. Clarify the task when it proposes work beyond the intended boundary.

## Expected result

The session has a specific change, test expectation, and explicit publication boundary. The exact interface and available features may vary; consult the current CLI documentation.

## Human verification

The prompt limits the task but does not enforce a security boundary. Review actual tool requests and changes; never assume the agent has obeyed every constraint.
