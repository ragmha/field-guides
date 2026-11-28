---
kind: landing
title: Better prompts and context
description: Give Copilot useful goals, repository context and constraints, then verify its work.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
  - https://docs.github.com/en/copilot/concepts/prompting-and-context
checks:
  - question: What makes a coding request easier to act on?
    answer: A specific goal, relevant context, observable acceptance criteria, and a clear boundary for the change.
  - question: Should generated code be accepted because the prompt was detailed?
    answer: No. Run the project checks and review behavior, scope, and the diff yourself.
---

Copilot can help with a tiny function, a confusing module, or a failing test. The useful prompt is not necessarily the longest one: it gives the model the information needed for this particular job, makes the desired result observable, and leaves room for you to check the answer.

This guide follows one practical loop:

1. **Frame the request.** State the outcome, acceptance criteria, relevant repository context, and boundaries.
2. **Explore before changing.** Ask focused questions about code or a failure, and distinguish evidence from guesses.
3. **Improve and verify.** Request focused tests, make small iterations, and inspect the final result yourself.

The examples use a fictional TypeScript service called **Parcel Desk**. Its endpoint accepts parcel-label requests; its existing tests use Vitest. The names, paths, output, and behavior in these examples are illustrative, not claims about a real project or an automatic Copilot capability.

## What this guide will help you do

- Turn “fix this” into a task with observable acceptance criteria.
- Supply a small, relevant slice of repository context and state what must not change.
- Ask for an explanation without accidentally asking for a rewrite.
- Investigate a failure from exact reproduction details instead of guessing at a fix.
- Ask for tests that exercise meaningful behavior and edge cases.
- Iterate in small steps, run the checks that matter, and review the diff before relying on it.

## A few ground rules

Prompting techniques are reusable, but Copilot surfaces differ. A chat panel, a code-completion editor, and an agent working across a repository may receive different files, history, tools, or permissions. Attach or open the exact context your surface supports; do not assume that mentioning a file makes its contents available.

Use the repository's existing conventions and commands as evidence. If you do not know a test command, ask Copilot to find it in the project documentation or configuration, then verify the command before relying on it. Reusable repository instructions can help with recurring conventions, but a one-off task still needs its own goal and acceptance criteria.

Copilot can be wrong, omit a constraint, or propose a change that passes a narrow test while breaking another behavior. Treat its response as a proposal. You remain responsible for deciding whether the output is correct, safe, and appropriate for the project.

## Reading path

1. [Set a goal and acceptance criteria](/field-guides/copilot-prompting-guide/part-1/1-goal-and-acceptance-criteria/)
2. [Provide repository context and constraints](/field-guides/copilot-prompting-guide/part-1/2-repository-context-and-constraints/)
3. [Ask for an explanation](/field-guides/copilot-prompting-guide/part-2/1-ask-for-an-explanation/)
4. [Investigate a reproducible failure](/field-guides/copilot-prompting-guide/part-2/2-investigate-a-reproducible-failure/)
5. [Request focused tests](/field-guides/copilot-prompting-guide/part-3/1-request-focused-tests/)
6. [Iterate, verify, and review](/field-guides/copilot-prompting-guide/part-3/2-iterate-verify-and-review/)

The lesson links above are the guide's reading order. Finish by checking the generated sources page for the official references used here.
