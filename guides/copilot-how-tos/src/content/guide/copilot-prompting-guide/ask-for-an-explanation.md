---
kind: lesson
title: Ask for an explanation
description: Request a bounded, evidence-based explanation before asking for a code change.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/prompt-engineering
  - https://docs.github.com/en/copilot/concepts/prompting-and-context
checks:
  - question: How can you prevent an explanation request from becoming a rewrite?
    answer: Name the exact symbol or block, ask for a description only, and explicitly say not to edit files.
  - question: What should an explanation cite?
    answer: Specific code paths or behavior it can verify, with assumptions clearly labeled.
---

An explanation prompt is a way to learn what code appears to do, trace a behavior, or surface questions before you change anything. Ask about a named symbol or a small code selection rather than “this” or “the code.” A bounded question also makes it easier to spot when the answer drifts into speculation.

GitHub's prompting guidance calls out ambiguity as a source of poor results: identify the function, block, or prior response you mean. It also recommends supplying relevant context. For an explanation, that means naming the code and asking for the evidence behind the explanation—not just a confident conclusion.

## Before and after

In Parcel Desk, a developer sees an unfamiliar `normalizeRecipient` helper:

```text
Before:
What does this do?
```

Instead, ask for a trace and explicitly keep the task read-only:

```text
After:
Explain `normalizeRecipient` in `src/labels/recipient.ts` without editing any
files. Describe, in order:
1. The input values it accepts and any early returns or errors.
2. Each transformation applied to the name and postal code.
3. Where the result is used by label creation.

For each claim, point to the relevant expression or call site. Distinguish
what the code guarantees from assumptions about product intent. If a caller
or test is needed to answer, identify it rather than guessing. End with one
behavior a reviewer should verify before changing this helper.
```

### Expected result

A helpful answer separates the function's visible operations from inferred intent, mentions relevant callers, and points you to concrete code to inspect. It should not modify a file in response to a request explicitly limited to explanation. If the helper delegates behavior, the answer can identify the next function to read rather than pretending the trace ends there.

## Ask progressively

Start with one question, then narrow the follow-up based on the answer:

- “Which branches accept an empty or whitespace-only name?”
- “What does the caller do with the returned value?”
- “Which existing test demonstrates how invalid recipients are reported?”
- “Is the behavior established by code, a test, or only an assumption?”

This keeps the investigation focused. If an explanation reveals an unclear product rule, resolve that rule before turning the conversation into a change request. If the task does need a code change, write a separate prompt with a concrete goal, acceptance criteria, context, and boundaries.

## Human verification

Open the referenced implementation and callers. Confirm that the described branches and transformations exist, and run a test or trace the actual call path when the behavior matters. An explanation is a map for your investigation, not proof that the code behaves correctly in every environment.

## Limitations and recovery

An answer may omit a caller, misread a condition, or confuse an implementation detail with intended behavior. If it makes an unsupported claim, ask “Which exact expression supports that?” and inspect the source yourself. If the explanation remains broad, give it the relevant function or test excerpt and ask one narrower question. Do not rely on an explanation alone for security-sensitive, data-loss, or externally observable behavior.
