---
kind: lesson
title: Iterate, verify, and review
description: Make targeted follow-ups, run meaningful checks, and inspect the final change before relying on it.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
  - https://docs.github.com/en/copilot/tutorials/review-ai-generated-code
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/context-management
checks:
  - question: What is a good follow-up prompt?
    answer: It identifies the unmet criterion or observed failure, asks for a bounded adjustment, and preserves the requirements already satisfied.
  - question: What should you review after checks pass?
    answer: The diff, behavior, scope, test quality, and any assumptions or dependencies—not only the test summary.
---

Good prompting is a loop, not a one-shot trick. If the first answer is close but incomplete, identify the gap and ask for a small correction. Then run the relevant checks and inspect the resulting change. GitHub recommends experimenting and iterating when an answer is not what you wanted, and reviewing AI-generated code with the same care you would apply to a colleague's work.

## Before and after

Suppose Copilot adds the spaces-only regression test but also changes unrelated response formatting:

```text
Before:
This isn't right. Try again.
```

Describe the exact mismatch, preserve what was correct, and request a narrow adjustment:

```text
After:
The spaces-only regression test is useful, but the diff also changes the
response JSON for unrelated invalid fields. Keep the new test and validation
behavior. Revert only the unrelated response-formatting change so the
established JSON shape remains unchanged. Do not modify other routes.

Then show the updated diff summary and state whether you ran
`pnpm vitest run tests/routes/labels.test.ts`. If you did not run it, say so.
```

### Expected result

The follow-up should retain the useful test, remove the unrelated formatting change, and report test execution truthfully. The new diff should be smaller and still meet the original acceptance criteria. If the requested rollback would also undo required behavior, Copilot should explain the conflict instead of concealing it.

## Iterate with evidence

When a result misses:

1. Compare it with the acceptance criteria and identify the specific gap.
2. Give the relevant observed output, diff hunk, or test result.
3. Ask for one targeted change while restating constraints that must remain true.
4. Check the new result against the original criteria—not just the latest request.

If a conversation has become long or collected unrelated discussion, start a clean task with a concise summary and the files, decisions, and evidence that still matter. Context controls differ by Copilot surface; some clients provide ways to inspect or manage context, but do not assume every client has the same commands or history behavior.

## Human verification

Use the repository's documented test, lint, type-check, or build commands that are relevant to the change. Inspect the final diff and ask:

- Does each acceptance criterion have evidence?
- Do tests exercise meaningful behavior, including the reported regression?
- Were unrelated files, dependencies, public behavior, or generated files changed?
- Were existing tests preserved rather than skipped, deleted, or weakened?
- Did the answer distinguish checks it ran from checks it only recommends?

GitHub's code-review guidance recommends running functional checks and checking for alignment with requirements and project architecture. A passing suite is useful, but it does not replace judgment about correctness, security, maintainability, or product intent. For consequential changes, get a second human review.

## Limitations and recovery

An agent's report can be incomplete or mistaken, and a test can pass while missing a defect. If a command fails, preserve the actual output and ask for an explanation of that failure before changing the test or reducing coverage. If a change cannot be verified in the available environment, say what remains unverified. When the evidence does not establish a product decision, pause and get that decision rather than having Copilot invent one.
