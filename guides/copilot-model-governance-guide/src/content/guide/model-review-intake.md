---
title: Run a model review intake
section: Review & Approval
order: 22
description: Gather the evidence needed to approve, scope, pilot or decline a model request.
verified: "2026-11-27"
diagram: model-review-intake
checks:
  - question: Should model policies be configured before or after a pilot organization gets access?
    answer: Before, so pilot users are governed from their first interaction.
  - question: How long does GitHub suggest a pilot should run?
    answer: At least one full billing cycle, typically four to six weeks.
  - question: What does GitHub recommend before using an open-weight model?
    answer: Review the model card and run your own evaluations.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/reference/ai-models/model-hosting
---

## What you will learn

- Write an intake record that covers status, data terms, cost and scope.
- Run a contained pilot before broad enablement.
- Record a go, hold or no-go decision with evidence.

## From request to decision

GitHub's [new features and models guide](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models) suggests reviewing the documentation, checking the relevant policies and piloting before rollout. The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) adds detail: confirm compliance before enabling anything; define success criteria for adoption, cost and feedback in advance; choose an organization whose licensed users fit the pilot; configure policies before enabling; run for at least one full billing cycle, typically four to six weeks; then decide go, hold or no-go and report the evidence.

Guide advice: use one intake record per model request, built from the earlier parts of this course:

1. **Status:** release stage and any evaluation or preview terms (Part 1).
2. **Scope:** explicit state, default policy effect and delegation mode (Part 2).
3. **Data terms:** hosting, retention coverage and any exception (Part 3). For open-weight models, the [model hosting reference](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) recommends reviewing the model card and running your own evaluations.
4. **Routing effect:** whether Auto or Fusion behavior changes (Part 4).
5. **Cost:** category, pricing components and modifiers, with budget design handed to the AI credits process (Part 5).
6. **Decision:** approver, scope, pilot dates, success criteria and review date.

Recommended: let security, privacy and finance each sign their own section, so one approval does not stand in for another.

## Worked example: a pilot for a preview model

**Hypothetical starting state:** Alpine Ski House receives a request to enable a public preview model for a mobile team. The model is not covered by the default policy because it is in preview.

The reviewer completes the intake record, confirms preview terms with legal, and selects the mobile organization because its licensed users match the pilot criteria. A targeted access rule is drafted for that organization only, success criteria are written, and the pilot is scheduled for one billing cycle. The decision field reads "pending pilot".

**Outcome:** The model has a scoped, time-boxed trial with criteria agreed in advance, and no other organization is affected.

## Practice: complete an intake record

**Prerequisites:** Use the six-field intake above and the [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model).

1. Choose a hypothetical request for a GA model from a provider you already use.
2. Fill in all six fields, citing a source for each factual claim.
3. Write three success criteria covering adoption, cost and feedback.
4. If an authorized sandbox is available, identify, without saving changes, the organization that would host the pilot.

**Expected result:** A sourced intake record with a scope, a pilot window and measurable success criteria.

<details>
<summary>Model answer</summary>

Status GA; scope a targeted access rule for one organization; data terms copied from the hosting reference with a review date; routing effect noted as Auto and Fusion gaining an eligible model in that organization; cost category and modifiers recorded with a budget owner named. Criteria: a stated share of licensed users active, spend within the agreed ceiling, and most participants recommending the model.

</details>
