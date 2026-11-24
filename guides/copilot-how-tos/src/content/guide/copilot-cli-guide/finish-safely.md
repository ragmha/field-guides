---
kind: lesson
title: Verify and close out
description: Run the relevant checks and make publication a separate decision.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
---

## Steps

1. Run the project's targeted test command yourself, or inspect the agent's actual command, exit status, and output. Record failures and checks that could not run.
2. Exercise an uppercase query and a mixed-case title; verify the result matches the stated acceptance criteria.
3. Inspect status and diff again after tests. Confirm no generated files or unrelated edits appeared.
4. End the session using the current CLI interface. Decide separately whether to commit or share the work; this exercise does neither automatically.

## Recovery

If tests fail, fix or clearly report the failure before considering the task done. If you cannot distinguish an edit from someone else's work, do not discard it.
