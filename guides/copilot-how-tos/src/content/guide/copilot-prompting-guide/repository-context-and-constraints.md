---
kind: lesson
title: Provide repository context and constraints
description: Point Copilot to relevant project conventions and set explicit boundaries for a task.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
checks:
  - question: What context should you attach to a repository task?
    answer: The smallest useful set of source, tests, configuration, and documentation that grounds the requested behavior.
  - question: Do repository instructions replace a task prompt?
    answer: No. They can provide recurring project guidance, while the task prompt supplies the immediate goal, evidence, and boundaries.
---

Copilot's answer depends in part on the context available in the current surface: open files, selected code, conversation history, or explicitly attached repository items can differ between clients. A useful prompt names the relevant files or asks Copilot to locate them, while you make sure those files are actually available to the session. Avoid dumping the entire repository into a prompt; a small, relevant set is easier to reason about and review.

GitHub's documentation describes repository-wide and path-specific custom instructions as ways to provide recurring project context on supported surfaces. They can explain conventions that should apply repeatedly, but they do not prove that the correct files were loaded or that a one-off task's boundaries are understood.

## Before and after

Suppose Parcel Desk's handlers use a shared response helper and integration tests live beside the endpoint tests. Without context, Copilot might invent a response format or add an unnecessary dependency:

```text
Before:
Add validation to the parcel endpoint.
```

Name the context to inspect, the expected behavior, and the constraints:

```text
After:
In Parcel Desk, inspect `src/routes/labels.ts`, the validator it calls, and
the nearest tests under `tests/routes/`. Follow the existing response helper
and test framework; use only dependencies already in the project.

Goal: reject recipient names that are empty after trimming.
Acceptance criteria:
- Preserve the current response shape and status convention for invalid input.
- Do not change successful label creation or other request fields.
- Add a focused regression test for a spaces-only name and retain a valid-name
  case.
- Do not edit generated files or add a package.

Before editing, summarize which existing files and conventions you found. If
the status code or normalization behavior is not established by the code or
tests, point out the ambiguity instead of choosing silently.
```

### Expected result

Copilot should identify evidence in the route, validator, tests, or project instructions and use the project's patterns rather than inventing new ones. The change should remain within the stated scope. If it cannot access or find a named file, it should say so instead of pretending it inspected it.

## Pick a useful context slice

Depending on the task, relevant context may include:

- The target function and its direct callers.
- One or two tests that establish existing behavior and test style.
- The project instructions or contributor guidance that apply to the paths.
- A configuration or script that defines the real validation command.
- A short issue description, example request, or expected response.

Say what is evidence, what is a requirement, and what is out of scope. “Use the existing response helper” is a constraint; “I think this is probably handled in `labels.ts`” is a hypothesis worth checking. Ask Copilot to identify assumptions or missing evidence before editing when project behavior is unclear.

For recurring guidance, repository instructions can document stable conventions, build commands, or testing preferences. Keep durable rules there, not a long history of one feature's requirements. Confirm that your Copilot surface supports the instruction type you use and that the file is in the documented location.

## Human verification

Check that Copilot's cited paths exist and that its summary matches the files:

1. Open the route, validator, and tests yourself.
2. Confirm that the response helper and test framework are really the established ones.
3. Inspect the diff for files outside the stated boundary.
4. Check whether a new dependency or changed response contract slipped in.

## Limitations and recovery

Mentioning a path is not the same as attaching its contents. Context windows are finite, and long discussions or large outputs can obscure important requirements. If Copilot misses a convention, provide a precise example from the repository and restate the requirement. If it claims a file or instruction says something that you cannot verify, treat the claim as unconfirmed and inspect the source before proceeding.
