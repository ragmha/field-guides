---
kind: lesson
title: Review tool requests
description: Inspect commands and their effects before allowing execution.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Read each proposed command in full, including arguments and working directory. Consider side effects and any scripts it invokes.
2. Allow the relevant test only when you understand and trust it. Reject commands that alter unrelated data, reach an unexpected service, or publish work.
3. Ask the agent to explain a confusing command or offer a narrower alternative. Do not approve it solely because the agent says it is safe.

## Limitations

Commands normally require approval, but editor settings or administrator configuration may permit some automatically. Review those settings before starting; tool permissions are not implied by the prompt.
