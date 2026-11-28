---
kind: lesson
title: Run tests and review the diff
description: Validate the focused change with project checks and account for every changed line.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/chat-with-copilot/chat-in-ide
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues
checks:
  - question: Does a passing test suite replace reviewing the diff?
    answer: No. Tests check selected behavior; inspect the full patch for scope, correctness, and unintended changes.
  - question: What if the project has no documented test command?
    answer: Do not guess or add a new test dependency for this exercise; inspect project guidance and ask the maintainer which check is expected.
---

A passing test is useful evidence, not proof that every requirement is met. Rin will discover the project’s existing test command, exercise the reading-time boundaries, and inspect the complete diff before deciding whether the practice change is ready.

## Prerequisites

- Complete [Make one small, safe change](/field-guides/copilot-ide-guide/part-3/1-small-safe-change/).
- Know the project’s package manager and existing test instructions, if any.
- Have the project’s normal source-control diff available.

## Acceptance criteria

- Relevant tests or checks complete successfully, or the missing test setup is documented without introducing unrequested dependencies.
- Boundary behavior matches the helper’s contract.
- Every changed file and line is understood, and no unrelated edits remain.

## Numbered steps

1. **Find the project’s test instructions.** Read its README, contribution notes, or package scripts. Use the project’s established test command rather than guessing from another repository.
2. **Run a focused check first.** If a relevant unit test exists, run that test. For the reading-time helper, verify `0 → 1`, `1 → 1`, `200 → 1`, `201 → 2`, and invalid values (`-1`, `NaN`, `Infinity`) → `null`.
3. **Run the project’s required broader checks** such as its documented test suite, type check, or lint command. Do not skip a failed check; capture the exact error and determine whether it is related to the change.
4. **Inspect the workspace status.** Use VS Code’s Source Control view or `git status --short` to see which files changed. Check that the changes are yours and within scope.
5. **Read the complete diff.** Use the editor diff or `git diff` to compare each modified file with its starting version. Review surrounding code as well as the changed lines.
6. **Compare against the acceptance criteria.** Confirm the finite-number guard, rounding behavior, minimum, and invalid-value result. Look for unrelated formatting, generated files, secrets, or accidental edits.
7. **Recover or finish deliberately.** If a test fails or the diff is broader than intended, undo only the exercise’s changes, correct the focused issue, and rerun checks. Do not stage or commit until you are satisfied with the code and the review.

## Expected result

You have either a narrowly scoped, reviewed change with relevant checks passing, or a clear explanation of why the project’s checks could not be run. No unexplained or unrelated file changes remain.

## Human verification

Read the test output yourself and inspect the entire patch. Verify that every acceptance criterion has evidence and every changed line has a reason. A test written or run by Copilot is still something you must evaluate.

## Limitations and recovery

Test commands and diff controls vary by project and VS Code version. If the repository does not document a suitable test command, ask its maintainer rather than installing an arbitrary framework. If a check fails, separate pre-existing failures from regressions by comparing with the known starting state. Copilot’s report is not a substitute for that comparison.

### Self-check

- **What does a clean test run establish?** Only that the checks that ran passed for the cases they cover.
- **When is the exercise ready to finish?** When the patch is understood, the relevant checks are accounted for, and no unintended changes remain.
