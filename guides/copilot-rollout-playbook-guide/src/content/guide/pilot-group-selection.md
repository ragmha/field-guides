---
title: Select the pilot group
section: Pilot Design
order: 6
description: Pick an existing or dedicated organization for the pilot and confirm that participants are licensed through it.
verified: "2026-11-27"
diagram: pilot-group-selection
checks:
  - question: Why does the licensing organization matter for a pilot?
    answer: Features and models are enabled at the organization level, so everyone who receives a license through that organization gets access.
  - question: What is a drawback of creating a dedicated pilot organization?
    answer: You must duplicate repository access, and it may not work well for features such as the cloud agent that need to work in your existing repositories.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Decide between an existing organization and a dedicated pilot organization.
- Confirm that each participant's license comes from the pilot organization.

## The organization is the pilot boundary

The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) explains that features and models are enabled at the organization level, so everyone with a license assigned through the chosen organization gets access. It suggests an organization whose members do real work, cover a mix of seniority and a range of teams, and are willing to give feedback. If no organization fits, you can create a dedicated pilot organization, but that requires duplicating repository access and may not suit features such as the cloud agent, which need to work in your existing repositories.

The [policies overview](https://docs.github.com/en/copilot/concepts/enterprise/policies) adds why licensing matters: policies follow the organization or enterprise that grants a user's license. A developer who belongs to the pilot organization but is licensed elsewhere may not see the pilot feature. The tutorial's first step is therefore to confirm membership and that each participant's license is assigned through the pilot organization.

Guide advice: write the success criteria and the participant list before the go-live date, and keep both with the pilot record so the decision in Part 5 compares like with like.

## Worked example: choosing between two organizations

**Hypothetical starting state:** A payments organization has 40 members across four teams; a documentation organization has six writers. The team wants to pilot an agentic feature in working repositories.

The rollout owner rejects the documentation organization because it lacks a range of teams and the agentic feature needs code repositories. A dedicated organization is also rejected because duplicating repository access would distort the pilot. The payments organization is chosen. A license export shows that three members are licensed through a different organization, so their licenses are moved or they are left out of the pilot list.

**Outcome:** The pilot population is the people licensed through the payments organization. The choice is hypothetical and depends on real license data in your enterprise.

## Practice: confirm a pilot population

**Prerequisites:** A list of candidate organizations and read access to license assignments, or a hypothetical roster. No settings need to be changed.

1. Score each candidate organization on real work, seniority mix, team range and willingness to give feedback.
2. Decide whether an existing organization fits; if not, record what a dedicated organization would duplicate.
3. For the chosen organization, list members and the organization each one is licensed through.
4. Mark anyone licensed elsewhere and decide whether to move their license or exclude them.

**Expected result:** A named pilot organization and a participant list in which every license is assigned through it.

<details>
<summary>Model answer</summary>

The organization with real repositories and several teams wins. A dedicated organization is a fallback only when no existing one fits, with repository access and cloud agent limits recorded. Members licensed through another organization are either moved, after approval from the license owner, or excluded, so the pilot population matches who can actually use the feature.

</details>
