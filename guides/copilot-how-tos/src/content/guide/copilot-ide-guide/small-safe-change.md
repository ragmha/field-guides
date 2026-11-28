---
kind: lesson
title: Make one small, safe change
description: Turn a clear acceptance criterion into a bounded edit and keep only code you can explain.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/chat-with-copilot/chat-in-ide
  - https://code.visualstudio.com/docs/setup/copilot
checks:
  - question: What makes a first Copilot edit low risk?
    answer: It has a narrow scope, explicit expected behavior, safe input, and a simple way to inspect and undo it.
  - question: Should you accept an edit you cannot explain because it looks reasonable?
    answer: No; ask for an explanation, revise it, or discard it.
---

Rin’s practice change is limited to the `estimateReadingMinutes` helper from the previous lesson. The function must estimate reading time at 200 words per minute, round up to a whole minute with a minimum of 1 for valid input, and return `null` for a negative or non-finite value. This is a local utility: it must not read files, call a service, or affect other behavior.

## Prerequisites

- A reviewed or hand-written `estimateReadingMinutes` function in the practice project.
- A known starting state and a way to undo local edits.
- The desired behavior written down before asking for a change.

## Acceptance criteria

- Only the intended helper or its focused test changes.
- The implementation matches the stated rounding and invalid-input rules.
- You can explain every changed line and can undo the change.

## Numbered steps

1. Inspect the helper and state the desired behavior in one sentence. If it already meets the criteria, do not create an unnecessary edit.
2. For a missing or incorrect helper, select the relevant function or position the cursor beside it. In inline chat or the editor, ask: `Implement only estimateReadingMinutes(wordCount): return null unless wordCount is a finite non-negative number; otherwise return at least 1 and round up wordCount / 200. Do not change other files or add dependencies.`
3. Review the proposed code before accepting or applying it. Check the input guard, division, rounding, minimum, and return type. The proposal is not guaranteed to match the request.
4. Keep the edit only if it meets every criterion. Otherwise discard it or give one precise correction; do not expand the task into a redesign.
5. Read the full changed function in context. Compare the actual changed files with the requested scope and undo unrelated edits.
6. Save the file, then proceed to the **Run tests and review the diff** lesson.

## Expected result

There is at most one focused implementation change, with the stated contract preserved. If the original code was already correct, the expected result is no change.

## Human verification

Trace `0`, `1`, `200`, `201`, `-1`, `NaN`, and `Infinity` through the implementation. The expected results are respectively `1`, `1`, `1`, `2`, `null`, `null`, and `null`. Confirm that nothing else in the workspace changed.

## Limitations and recovery

Different chat and editing surfaces can present suggestions and review controls differently. Use the controls in your VS Code version and keep the edit reversible. If a proposal changes unrelated files, introduces dependencies, or cannot be explained, reject or undo it and retry with a smaller scope. Do not let an agent run commands or modify files you did not authorize.

### Self-check

- **Should a correct helper be changed just to demonstrate Copilot?** No; no change is a valid result.
- **What do you do with a proposal that adds unrelated files?** Discard or undo it and narrow the task.
