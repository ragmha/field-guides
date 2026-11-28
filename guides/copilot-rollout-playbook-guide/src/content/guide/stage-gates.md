---
title: Expand in stages
section: Staged Expansion
order: 19
description: Widen access from the pilot organization to more organizations and then the enterprise, with gates and a clean rollback.
verified: "2026-11-27"
diagram: stage-gates
checks:
  - question: What does GitHub's pilot tutorial say to do with budgets as you expand?
    answer: Raise or add budgets for the newly enabled organizations so spending stays within the ceiling you intend.
  - question: Name three rollback steps from the pilot tutorial.
    answer: Turn off the policy, tell participants, confirm there is no remaining usage, review or remove the budget and keep the data.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards
---

## What you will learn

- Define the stages and the gate checks between them.
- Prepare a rollback that leaves no usage and keeps the evidence.

## Stages, gates and rollback

The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) recommends expanding in stages: enable additional organizations, then consider enabling for the enterprise, and raise or add budgets as you go. If the decision is to stop, it describes a rollback: turn off the policy, tell participants, confirm no usage remains, review or remove the budget and keep the data for future decisions.

The [codebase standards tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards) adds planning for the worst: know how to revert changes, communicate through a discussion post and use the audit log to check ruleset bypasses.

Guide advice: put a gate between every stage and reuse the same checks each time: adoption is stable, spend is within budget, budgets for the next stage are raised or added, policy settings and agent activity are as intended, and feedback has been reviewed. A failed gate means hold or roll back, never skip ahead.

## Worked example: three stages

**Hypothetical starting state:** The payments hold is resolved. Four more organizations want access, followed by the rest of the enterprise.

Stage 2 enables the four organizations with their own budgets. At the gate, three pass, but one shows spend near its ceiling after a team adopts an agentic workflow. The rollout owner holds that organization, raises its budget after finance approves and passes the gate a week later. Stage 3 sets the enterprise policy once all organizations have passed. A rollback runbook stays on file throughout.

**Outcome:** Each stage widened access only after the same checks passed. The scenario is illustrative.

## Practice: write the stage plan

**Prerequisites:** Your decision record and baseline table. No settings need to be changed.

1. List the stages and the organizations in each.
2. Write the gate checklist and the owner for each check.
3. List the budget changes needed at each stage.
4. Write the rollback runbook from the tutorial's steps.

**Expected result:** A stage plan with gates, budget changes and a rollback runbook.

<details>
<summary>Model answer</summary>

Stages: pilot organization, four further organizations, enterprise. Gate: adoption stable (AI managers), spend within budget and next budgets set (finance), policy and agent activity as intended (AI managers, audit log), feedback reviewed (rollout owner). Rollback: turn off the policy, notify participants, confirm no remaining usage, review or remove the budget, retain data.

</details>
