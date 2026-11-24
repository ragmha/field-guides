---
kind: lesson
title: Start an agent task
description: Select Agent in VS Code and give it a focused request.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Open Copilot Chat in VS Code and select **Agent** in the mode selector. If unavailable, check your client version, access, and settings against the linked documentation.
2. Submit: `Make title filtering case-insensitive without changing the existing interface. Add a focused test and run the relevant test. Limit edits to the filter and test; do not commit or push.`
3. Observe which files and tools the agent selects. Clarify any incorrect assumption before allowing further work.

## Expected result

The agent begins an interactive task, rather than merely answering a question. Your instruction not to publish is a request, not an access control; inspect actual actions.
