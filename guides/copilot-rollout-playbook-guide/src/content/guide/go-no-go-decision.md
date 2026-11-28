---
title: Make the go/no-go decision
section: Staged Expansion
order: 18
description: Check that the pilot produced enough evidence, compare it with the criteria and recommend expand, hold or stop.
verified: "2026-11-27"
diagram: go-no-go-decision
checks:
  - question: What does GitHub's pilot tutorial suggest if you do not yet have enough evidence?
    answer: Extend the pilot rather than deciding early.
  - question: What range of active trial licenses in the first month does the measure-success tutorial suggest as a goal?
    answer: 70–90% of trial licenses active in the first month.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/track-usage-and-adoption
---

## What you will learn

- Test whether the pilot produced enough evidence to decide.
- Compare evidence with the success criteria and choose expand, hold or stop.

## Enough evidence, then the criteria

The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) says you are ready to decide when adoption has stabilized, you have cohort data for agentic features, you have a full billing cycle of cost data and you have representative feedback. Otherwise, extend the pilot. The report it describes covers adoption, cost against budget, feedback themes and safety observations, ending in a recommendation to expand, hold or stop. Spending $0 early in the pilot is expected while usage stays inside the included pool.

GitHub's tutorials give reference points for adoption. The [measure success tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success) suggests a trial goal of 70–90% of licenses active in the first month. The [usage and adoption tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/track-usage-and-adoption) describes 60–80% active within the first month as healthy early adoption, notes that the dashboard requires the Copilot usage metrics policy, and notes that it excludes some surfaces, such as Copilot Chat on GitHub.com, Mobile, code review and the CLI. Treat these ranges as reference points, not pass marks.

Guide advice: decide what "partly met" means before the pilot ends. A hold with a named fix and a date is a decision; an open-ended pause is not.

## Worked example: the payments decision

**Hypothetical starting state:** Five weeks in, the payments pilot shows 72% of participants active, spend at $180 of the $250 ceiling, mixed feedback from 14 respondents and no safety incidents. Cohort data for the agentic feature covers only two weeks.

The AI managers judge the evidence insufficient because cohort data is short of the criteria, so they extend the pilot by two weeks. After the extension, adoption and cost meet the criteria, but feedback shows repeated proxy errors. The recommendation is to hold expansion until the network fix is confirmed, then expand.

**Outcome:** The rollout owner, accountable in the RACI, approves a dated hold with a named fix. The figures are hypothetical.

## Practice: write a decision record

**Prerequisites:** Your success criteria and hypothetical pilot results. No settings need to be changed.

1. Check each sufficiency condition from the tutorial and note gaps.
2. If evidence is sufficient, compare each criterion as met, partly met or not met.
3. Choose expand, hold or stop, and give the reason.
4. For a hold, name the fix, owner and date; for a stop, list the rollback steps from the next lesson.

**Expected result:** A one-page decision record with evidence, criteria results and a recommendation.

<details>
<summary>Model answer</summary>

Insufficient cohort data means extend. With sufficient evidence: adoption met, cost met, feedback partly met because of network errors, safety met. Recommendation: hold, with IT owning the proxy fix by a stated date and expansion to follow when it is confirmed.

</details>
