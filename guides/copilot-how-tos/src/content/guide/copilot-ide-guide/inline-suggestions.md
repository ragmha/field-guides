---
kind: lesson
title: Review an inline suggestion
description: Use a short code prompt to inspect, accept, or decline an inline completion.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide
  - https://code.visualstudio.com/docs/setup/copilot
checks:
  - question: What does pressing Tab do when an inline suggestion is displayed?
    answer: It accepts the displayed suggestion into the editor; you still need to review and verify the resulting code.
  - question: What if the completion does not fit the task?
    answer: Do not accept it; dismiss it or revise the code context and try again.
---

An inline completion is an in-editor proposal, often displayed as faint text at the cursor. Rin will ask for a tiny, pure helper in a new scratch file and decide whether the proposal fits the intended behavior before accepting anything.

## Prerequisites

- Complete [Set up Copilot in VS Code](/field-guides/copilot-ide-guide/part-1/2-install-sign-in-configure/).
- Open the safe practice folder in VS Code.
- Use a scratch file or project example where a mistaken completion is easy to discard.

## Acceptance criteria

- You can recognize an inline completion as a proposal rather than existing source.
- You can accept it only after checking it, or leave it unaccepted when it is unsuitable.
- You can explain the input, output, and edge cases of any code you keep.

## Numbered steps

1. Create a scratch JavaScript file named `reading-time.js` in the practice folder.
2. Type this declaration and pause briefly:

   ```js
   function estimateReadingMinutes(wordCount) {
   ```

3. If a completion appears, read the whole proposed body before acting. Rin’s requirement is: estimate at 200 words per minute, return at least 1 minute for a finite non-negative count, and return `null` for invalid or negative input.
4. Compare the proposal with that requirement. Check how it handles zero, a small positive count, a count just over 200, a fractional value, and invalid input. Do not accept code that silently invents different behavior.
5. If the completion is correct and understandable, press **Tab** to accept it. Otherwise leave it unaccepted and write the function yourself or revise the context. A completion may differ from one attempt to another.
6. Read the surrounding file after acceptance. Make sure the function is syntactically complete and did not add unrelated code.

## Expected result

The practice file contains either a reviewed `estimateReadingMinutes` implementation matching the stated behavior or no accepted suggestion. Both are valid outcomes; the goal is to practice making a deliberate choice.

## Human verification

Manually trace the boundary cases from step 4 against the code. A plausible-looking completion can use a different rounding rule, mishandle zero, or fail on invalid input. If you cannot explain the behavior, do not keep it yet.

## Limitations and recovery

Suggestions are probabilistic and depend on context, language support, policy, and service availability; they are not guaranteed to appear. If no suggestion appears, continue by writing the small helper yourself. If one is wrong, undo that insertion and change the surrounding context instead of repeatedly accepting near-misses.

### Self-check

- **Does Tab certify that the code is correct?** No. It only inserts the displayed proposal.
- **Is it a failure if no suggestion appears?** No. Availability varies; the task can be completed without one.
