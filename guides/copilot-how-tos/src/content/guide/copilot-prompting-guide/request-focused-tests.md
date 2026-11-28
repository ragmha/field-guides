---
kind: lesson
title: Request focused tests
description: Ask for tests that encode expected behavior, meaningful boundaries, and regressions.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/tutorials/write-tests
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
checks:
  - question: What should a focused test request specify?
    answer: The behavior under test, expected outcomes, important boundaries, and the project's existing test pattern.
  - question: Does a generated passing test prove the implementation is correct?
    answer: No. Check that the test expresses the intended behavior and would fail if that behavior regressed.
---

Tests turn requirements into examples that can be run again. A request to “add tests” does not say which behavior matters, what boundary cases count, or how the project organizes its test suite. Name those things, point Copilot to a nearby example, and ask it to match the established framework.

GitHub's documentation recommends specific scenarios and edge cases in test prompts, and explicitly warns that generated tests may not cover everything. Treat a generated suite as a starting point: the test should encode an expected behavior you can defend, not merely mirror the implementation.

## Before and after

Suppose Parcel Desk should reject a whitespace-only recipient name, while accepting a trimmed non-empty name:

```text
Before:
Add tests for recipient validation.
```

Make the expected behavior and boundaries explicit:

```text
After:
Using the existing Vitest style in `tests/routes/labels.test.ts`, add focused
tests for recipient-name validation in the label endpoint.

Cover:
- A normal non-empty name is accepted.
- A name containing only spaces is rejected using the established invalid-
  request status and response shape.
- A valid name with surrounding spaces follows the current documented or
  tested normalization behavior.

Keep the tests independent and assert the externally observable response or
stored value, not a private helper call. Do not change production code or
weaken existing assertions. If the intended behavior for surrounding spaces
is not established, call out that ambiguity instead of inventing an
expectation. Tell me the test command you recommend.
```

### Expected result

The proposed tests should follow the nearby test conventions, distinguish invalid from valid inputs, and assert behavior a caller observes. The last case must match an established contract; if none exists, the prompt correctly asks for a decision rather than letting a test silently create one.

## Choose cases that earn their place

For each case, ask:

- Does it represent a requirement, boundary, or previously observed regression?
- Would it fail if the behavior regressed?
- Is its expected result explicit and independent of implementation details?
- Does it overlap another test without adding a distinct guarantee?

For example, the empty string and a spaces-only string may exercise different behavior if normalization is involved. Conversely, testing many ordinary names may add little beyond one representative valid case. Use the actual input domain and established contract to decide.

For a complex behavior, request one small group of tests at a time. GitHub's test-writing tutorial also shows using examples of input and expected output to clarify a request, then executing and reviewing the generated tests. A follow-up can add one missing edge case without turning a focused suite into an unbounded “comprehensive” one.

## Human verification

Run the named project test command yourself. Check that the tests pass for the right reason, that assertions fail when behavior is intentionally wrong (where practical), and that no test has been skipped or weakened. Then run the broader relevant suite if the change affects shared validation. A passing test run is evidence, not proof of complete coverage.

## Limitations and recovery

Generated tests can encode a mistaken requirement, miss boundaries, couple to internals, or reproduce a bug in the same way as the implementation. If a test fails unexpectedly, compare its premise with the product contract and nearby tests before changing code. If a test passes but does not distinguish correct from incorrect behavior, strengthen the observable assertion. Do not add a dependency or alter the test runner unless the task requires it and you verify the project's conventions.
