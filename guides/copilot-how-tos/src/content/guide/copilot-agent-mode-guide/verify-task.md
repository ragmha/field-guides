---
kind: lesson
title: Verify the task
description: Check the real test output and exercise the acceptance criteria.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/use-copilot-agents/use-agent-mode
---

## Steps

1. Inspect the actual test command, exit status, and output. If it did not run, run the trusted project command yourself.
2. Try a mixed-case title and query; check the actual result against the stated behavior.
3. Review source control status again for generated, staged, and untracked files.
4. Record any failed or unavailable checks and correct them before treating the work as ready. Commit or share only as a separate, intentional action.

## Expected result

You can explain what was changed and how it was verified. Passing tests are useful evidence, not proof that every edge case is correct.
