---
title: Pair metrics with qualitative evidence
section: Pairing Metrics with Evidence
order: 22
description: Use surveys, retrospectives and support trends to explain what usage metrics show.
verified: "2026-11-27"
diagram: qualitative-evidence
checks:
  - question: Weekly active users rose, but acceptance rate fell. What is a good next step?
    answer: Ask developers how their use has changed, for example through a short survey or retrospective, before drawing a conclusion.
  - question: What should accompany a quoted survey result in an adoption report?
    answer: The respondent count, the population surveyed and the survey date.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/communicate-copilot-impact
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics
---

## What you will learn

- Choose qualitative sources that fit an adoption question.
- Run a loop in which metrics raise questions and feedback answers them.

## Metrics raise questions; people answer them

The [concepts page](https://docs.github.com/en/copilot/concepts/billing-and-usage/copilot-usage-metrics/copilot-metrics) advises looking for patterns rather than treating one number as productivity, and combining metrics with developer feedback. The [trial tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/measure-success) suggests three sources from outside GitHub:

- **Satisfaction surveys** about usefulness, trust and productivity.
- **Internal feedback channels** such as retrospectives and pulse surveys.
- **Support trends**, where fewer "how do I" questions over time can suggest growing confidence.

The [company goals tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/drive-downstream-impact/achieve-company-goals) recommends using sustained usage, feature adoption and acceptance trends to identify questions to explore with developers, rather than inferring satisfaction from activity alone. The [impact communication tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/communicate-copilot-impact) asks for developer feedback to be reported with the number of respondents.

Guide advice for collecting feedback without surveillance:

1. Keep surveys short, anonymous and voluntary, and report results only for groups of at least five respondents.
2. Ask about tasks and obstacles, not about individual usage levels.
3. Record the question wording, population, response count and dates with each result.
4. Feed findings back to teams, so participation is seen as useful.

## Worked example: the falling acceptance rate

**Hypothetical starting state:** At the fictional Graphic Design Institute, weekly active users rose from 180 to 230 over a quarter, while acceptance rate fell from 31 to 24 percent. A sponsor reads this as declining quality.

The team runs a five-question pulse survey; 96 of 230 active users respond. Many report moving routine edits from completions to agent mode, and a group of new users say they reject most suggestions while learning. Adoption phase data shows growth in Phases 2 and 3.

**Outcome:** The report presents the acceptance change as a shift in how Copilot is used, supported by survey and phase data, and schedules a follow-up with the new-user group.

## Practice: plan a metrics-led conversation

**Prerequisites:** One adoption trend from an authorized sandbox or a fictional dataset.

1. Pick one metric movement you cannot explain from the data alone.
2. Write two neutral survey or retrospective questions about it.
3. Define the population, minimum group size and timing.
4. Describe how you will report the answer alongside the metric.

**Expected result:** A short plan linking one metric change to a feedback method and a reporting format.

<details>
<summary>Model answer</summary>

Movement: agent adoption flat for two months. Questions: "Which tasks have you tried with agent mode?" and "What stops you from using it more?" Population: all seat holders in three product teams, anonymous, results shown only for groups of five or more, run over one week. Reporting: the agent adoption chart with a callout listing the top obstacles and the respondent count.
</details>
