---
kind: lesson
title: Ask Copilot to explain code
description: Use Ask mode and focused context to request an explanation without delegating edits.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/chat-with-copilot/chat-in-ide
  - https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide
checks:
  - question: Which chat mode is intended for coding questions and explanations?
    answer: Ask mode.
  - question: How do you validate an explanation of code?
    answer: Compare it with the actual code and test behavior; ask a focused follow-up if an assumption is unclear.
---

Chat can explain code as well as suggest approaches. In this lesson Rin uses **Ask** mode to understand a harmless example before deciding what to do next. Ask is for an answer or guidance, not a request for the assistant to carry out a multi-file task.

## Prerequisites

- Copilot Chat is available in the practice VS Code workspace.
- The editor has a small, non-sensitive code example open. For example:

  ```js
  const books = [{ title: "North Window", finished: true }, { title: "Paper Harbor", finished: false }];
  const unreadTitles = books.filter((book) => !book.finished).map((book) => book.title);
  ```

## Acceptance criteria

- You can submit a code question in Ask mode.
- The answer distinguishes what the code does from assumptions it may be making.
- You compare the answer with the source instead of treating it as authoritative.

## Numbered steps

1. Select the two example lines in the editor. Selecting a small, relevant region helps keep the question focused.
2. Open Copilot Chat from the title bar or use `Ctrl+Alt+I` on Windows/Linux or `Control+Command+I` on macOS.
3. In the chat mode selector, choose **Ask**. If the selector is different in your VS Code version, consult the current chat documentation rather than choosing an editing mode by guesswork.
4. Ask: `Explain how unreadTitles is produced. Describe what filter keeps, what map returns, and what the result is for these two sample records.`
5. Read the answer, then compare each claim with the selected code. In this example, the expected result is an array containing only `"Paper Harbor"`.
6. If something is unclear, ask a narrow follow-up such as: `What would the result be if both records had finished: true?` Check the answer against the code yourself.
7. Confirm no file changed as a result of this explanation request. If you want an edit later, state the desired behavior separately and inspect the proposed diff.

## Expected result

You can describe the filter-map sequence and the sample output in your own words, with no code changes made by the explanation request.

## Human verification

Read the selected lines and manually trace one record through both operations. Do not rely on an explanation that claims the code does something not visible in the selected code or project context.

## Limitations and recovery

Ask mode can misunderstand names, omit context, or make an incorrect claim. Include only relevant, safe context and ask a more precise follow-up if needed. If Chat is missing, check account access, editor version, and organization policy. Chat labels and keyboard shortcuts can vary by client and release.

### Self-check

- **Does an explanation prove the function behaves as described?** No. It is a hypothesis to compare with the source and observed behavior.
- **Why choose Ask mode for this exercise?** It is designed for questions and explanations rather than autonomous task execution.
