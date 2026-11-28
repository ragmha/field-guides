---
kind: lesson
title: Set a goal and acceptance criteria
description: Describe the outcome you want and how you will tell whether the change is complete.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
checks:
  - question: What makes an acceptance criterion useful?
    answer: It describes an observable behavior or boundary that a person can check.
  - question: Must every request specify implementation details?
    answer: No. State the outcome and constraints; let the repository's established patterns inform implementation unless a technical choice is important.
---

A request like “make parcel labels better” names a topic, not a result. Copilot has to guess what “better” means: faster, more readable, more reliable, or something else. A concrete goal narrows the task; acceptance criteria give both you and Copilot a way to check whether the result meets it.

GitHub's prompt-engineering guidance recommends starting with the goal, then listing specific requirements and examples where useful. In practice, put the behavior that matters most near the start of the request, and state what success should look like in terms you can observe.

## Before and after

In the fictional Parcel Desk project, a user reports that the label endpoint accepts an empty recipient name. A vague request leaves important decisions open:

```text
Before:
Fix parcel labels.
```

The revised request defines scope and behavior without dictating the internal implementation:

```text
After:
Update the parcel-label request validation so a recipient name containing only
spaces is rejected with the same client-error response used for a missing name.
Keep the existing JSON response shape and do not change unrelated fields or
routes. Add or update a focused test showing that "   " is rejected. First
inspect the current validator and its nearest tests; follow the existing
pattern. Report the files changed and the test command you ran.
```

### Expected result

The response should identify the relevant validator and nearby tests before proposing a small change. A plausible implementation might normalize whitespace for validation while preserving the endpoint's established response format. The focused test should distinguish a whitespace-only name from a valid name, and the response should name the check actually run. These are expectations for evaluating a result—not a guarantee that Copilot will follow the prompt or choose that implementation.

## Make success observable

Useful acceptance criteria are things you can verify, for example:

- “A name containing only spaces returns the established client-error response.”
- “A normal name continues to create a label.”
- “The response JSON keys do not change.”
- “Only the validator and its relevant test are in scope.”

Avoid criteria such as “make it robust” unless you explain which inputs or failure modes “robust” covers. If there are examples, show both an input and the expected outcome. If the task is large, split it into smaller tasks with separate checks rather than asking for a broad rewrite in one turn.

## Human verification

Before accepting a proposed result, compare it with the original goal:

1. Did the behavior change for the invalid input you named?
2. Does a valid input still work?
3. Did the response shape or unrelated routes change?
4. Did the agent report a real test command and its result?
5. Does the diff contain only changes needed for the goal?

Run the relevant checks yourself if the response does not show enough evidence. Passing tests do not establish that the criteria are complete or that no other behavior regressed.

## Limitations and recovery

Acceptance criteria cannot resolve missing product decisions. If rejecting whitespace should trim the stored name, preserve original spacing, or return a particular message and that choice is not already established, stop and decide it before asking for implementation. If Copilot proposes a broad refactor, restate the scope and ask it to reduce the change to the validator and focused test. If its result satisfies only some criteria, name the specific missing one and request a targeted follow-up.
