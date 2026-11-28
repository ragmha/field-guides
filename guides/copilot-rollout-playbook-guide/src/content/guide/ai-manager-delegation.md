---
title: Delegate AI administration
section: Stakeholders and Ownership
order: 3
description: Give a team of AI managers the permissions to run AI controls without enterprise ownership, and record what stays outside the role.
verified: "2026-11-27"
diagram: ai-manager-delegation
checks:
  - question: Which three permissions does GitHub's tutorial add to the AI manager role?
    answer: Manage enterprise AI controls, Read enterprise audit logs and View Enterprise Copilot Metrics.
  - question: Which Copilot settings can AI managers not access unless granted additional permissions?
    answer: Copilot access management settings and the settings in the Billing and Metrics sections of the Copilot page.
  - question: What is the release status of enterprise custom roles?
    answer: Public preview and subject to change.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Follow GitHub's three-step pattern for an AI manager team.
- Record the boundary of the role so owners know what still needs them.

## A role, a team and an assignment

GitHub's [AI managers tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) uses custom roles and enterprise teams to delegate AI administration without granting enterprise ownership. Enterprise custom roles are in **public preview** and subject to change.

The tutorial has three steps. First, create a custom enterprise role with **Manage enterprise AI controls**, **Read enterprise audit logs** and **View Enterprise Copilot Metrics**. Second, create an enterprise team and add the future AI managers. Third, assign the role to the team. An optional fourth step grants the team bypass on the ruleset that limits who can edit agent profile files, so AI managers can review and merge proposed custom agents.

AI managers can view and manage nearly all settings in the enterprise's AI controls. Unless you grant more, they cannot access Copilot access management settings or the settings in the **Billing** and **Metrics** sections of the Copilot page. The role still includes read access to the audit log and usage metrics through the permissions above.

The [policies overview](https://docs.github.com/en/copilot/concepts/enterprise/policies) warns that policy settings can drift when too many people have access. It recommends regularly reviewing who holds the **Manage enterprise AI controls** permission and using the audit log to monitor policy changes. Guide advice: include the AI manager team's membership in your steady-state review (Part 6).

## Worked example: a three-person AI manager team

**Hypothetical starting state:** Two enterprise owners approve every policy change, and requests queue for days. The platform team wants three engineers with Copilot experience to manage AI controls.

The rollout owner proposes a custom role with the three documented permissions, an enterprise team named for its purpose and a role assignment to that team. The proposal states that seat assignment and budgets stay with the enterprise owners and finance, matching the role's boundary. Because custom roles are in public preview, the proposal includes a fallback: owners keep the ability to make changes directly.

**Outcome:** The proposal moves routine AI-control decisions to the AI managers and leaves licensing and billing with their existing owners. It is a plan, not evidence that the role exists or behaves as described in your enterprise.

## Practice: write a delegation proposal

**Prerequisites:** Your RACI from the previous lesson and the [AI managers tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers). No settings need to be changed.

1. List the RACI rows where AI managers are responsible.
2. Name the permissions the role needs and the settings that remain outside it.
3. Decide whether the optional agent-profile bypass is needed, and who approves it.
4. In an authorized sandbox, an enterprise owner may create the role and confirm what a test member can see. Without a sandbox, compare your proposal with the model answer and call it unverified.

**Expected result:** A proposal naming the role, the team, the permissions, the boundary and the preview fallback.

<details>
<summary>Model answer</summary>

AI managers are responsible for baseline policies, go/no-go evidence and exceptions. The role has Manage enterprise AI controls, Read enterprise audit logs and View Enterprise Copilot Metrics. Access management and the Billing and Metrics settings stay with owners and finance unless explicitly granted. The bypass is needed only if an agent-profile ruleset exists. Owners retain direct access because the feature is in public preview.

</details>
