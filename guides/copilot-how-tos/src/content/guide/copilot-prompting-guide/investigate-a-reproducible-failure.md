---
kind: lesson
title: Investigate a reproducible failure
description: Give Copilot a minimal reproduction and evidence before asking for a diagnosis or fix.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
  - https://docs.github.com/en/copilot/tutorials/write-tests
checks:
  - question: What details help investigate a failure?
    answer: The exact command, relevant input or setup, expected and actual behavior, complete error, and whether the result is repeatable.
  - question: Should Copilot patch the first plausible cause?
    answer: No. Ask it to trace the evidence and distinguish confirmed facts from hypotheses before changing code.
---

A stack trace without the command, input, or expected behavior often leads to a guess. A stronger failure report lets Copilot reason from a repeatable observation: what you ran, what you supplied, what you expected, what happened, and the relevant output.

GitHub's prompt guidance recommends supplying relevant context, examples, and specific requirements. Its testing guidance likewise emphasizes concrete scenarios and running the generated tests. Apply the same discipline to debugging: give the smallest reproduction you can safely share, then ask for a diagnosis grounded in the code and output.

## Before and after

In the fictional Parcel Desk project, an integration test fails only for a recipient name with surrounding spaces. A vague request invites an immediate patch:

```text
Before:
The recipient test is broken. Fix it.
```

Report the observed behavior and ask for an evidence-based first step:

```text
After:
Investigate this repeatable failure in Parcel Desk. Do not edit files yet.

Command: `pnpm vitest run tests/routes/labels.test.ts -t "trims recipient"`
Input: recipient name is `"  Mira Chen  "`
Expected: the stored label uses `"Mira Chen"`.
Actual: the test expected `"Mira Chen"` but received `"  Mira Chen  "`.
Environment: local checkout on the current branch; this test fails on two
consecutive runs. No other test result has been checked yet.

Trace the input from the request through validation to label creation. Identify
the exact code path that explains the observed result, list any unverified
assumptions, and suggest the smallest confirming test or observation. Do not
change tests just to make the failure disappear.
```

### Expected result

The answer should distinguish the test's expectation from the implementation's observed behavior. It should point to the request path and transformation—or missing transformation—that explains the value. It may propose a narrow next check, such as comparing the test fixture with the route's actual input contract. It should not claim a root cause that the provided evidence cannot establish.

## Make the reproduction useful

Include only information that helps recreate or explain the problem:

- The exact command and relevant flags.
- A minimal input, fixture, or setup (remove secrets and personal data).
- Expected behavior and actual behavior, preferably with the exact error or assertion.
- Whether the failure repeats, and what changed recently if you know.
- Relevant paths or a request to inspect them.

Do not silently paraphrase an error when the exact message matters. If setup is nondeterministic, say so and record what you observed rather than claiming the failure is reproducible. If you cannot share the original data, create a fictional or minimized example that preserves the failing property.

## Move from diagnosis to a fix

Once you have confirmed a cause and decided the intended behavior, make a distinct implementation request. State the acceptance criteria, preserve unrelated behavior, and ask for a regression test that fails before the fix and passes after it. If the first hypothesis is disproved, update the evidence and investigate another branch rather than layering speculative patches.

## Human verification

Re-run the exact command and input. Compare actual behavior with the expected behavior, then run nearby tests to check for regressions. Confirm that the new test exercises the same path that failed. Inspect whether a test was weakened, skipped, or deleted; a green summary alone is not enough.

## Limitations and recovery

A reproduced failure narrows the search but does not prove a single cause. Environmental differences, external services, stale fixtures, concurrency, or a mistaken expectation can all affect results. If the symptom disappears, record the new state and avoid asserting the cause is fixed. Ask for a minimal next experiment when evidence is incomplete, and keep user data, credentials, and sensitive logs out of prompts.
