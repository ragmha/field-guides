---
title: Read adoption phases as breadth
section: Metric Definitions
order: 7
description: Understand how adoption cohorts are assigned and what they do and do not say about users.
verified: "2026-11-27"
diagram: adoption-phases
checks:
  - question: A user completes code on one day only in the trailing 28 days. Are they engaged with code completion?
    answer: No. Engagement requires use on at least two distinct days within the trailing 28-day window.
  - question: Which phase does a user reach when they are engaged with both the cloud agent and code review?
    answer: Phase 3, multi-agent, because they are engaged with two or more agent surfaces.
  - question: Does a move from Phase 2 to Phase 1 prove a user changed habits?
    answer: No. Phases are recalculated daily on a rolling window, so a user's phase can shift without a change in habits.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics
---

## What you will learn

- Trace how a user is placed in an adoption phase.
- Avoid reading cohorts as measures of volume, skill or productivity.

## How phases are assigned

The [metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) defines engagement with a feature as use on at least two distinct days in a trailing 28-day window. Each user receives the highest phase they qualify for:

- **No Cohort**, shown as "Chat-first" in the impact dashboard: engaged only with conversational chat, for example chat panel agent mode.
- **Phase 1, code first:** engaged with code completion or agent edits.
- **Phase 2, agent first:** engaged with exactly one of Copilot CLI, the cloud agent or code review.
- **Phase 3, multi-agent:** engaged with the Copilot app, or with two or more agent surfaces.

Per-user reports carry the result in `ai_adoption_phase`, and aggregated reports include `totals_by_ai_adoption_phase`. Phases are recalculated daily.

The [concepts page](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) states that cohorts measure breadth of feature use, not volume. The [interpretation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics) warns that the adoption multiplier compares different populations, so cohort differences are associations rather than causes.

Guide advice: report phases as distributions for groups, never as a rating of a person.

## Worked example: a falling phase count

**Hypothetical starting state:** The fictional Tailwind Payments team sees Phase 2 drop from 60 to 41 users in a week and suspects a regression in the CLI.

The analyst checks the window. A two-week hackathon ended 28 days earlier, and many users had used the cloud agent only during that event. As those days roll out of the window, those users fall back to Phase 1 or No Cohort.

**Outcome:** The team annotates the trend with the event dates and stops treating weekly phase movement as a signal without context.

## Practice: classify sample users

**Prerequisites:** The phase definitions above and the fictional activity list below.

1. User A used code completion on 9 days and nothing else.
2. User B used the CLI on 5 days and code review on 1 day.
3. User C used the CLI on 3 days and the cloud agent on 2 days.
4. User D used chat panel agent mode on 6 days.

Assign each user a phase.

**Expected result:** One phase per user with the rule that decided it.

<details>
<summary>Model answer</summary>

A is Phase 1, code first. B is Phase 2, agent first, because code review on one day does not meet the two-day rule, leaving one engaged agent surface. C is Phase 3, multi-agent, with two engaged agent surfaces. D is No Cohort, shown as Chat-first.
</details>
