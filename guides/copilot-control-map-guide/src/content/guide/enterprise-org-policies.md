---
title: Enterprise and organization policies
section: Platform Policy Layers
order: 6
description: Record which level sets each policy, how delegation works and which surfaces a policy actually reaches.
verified: "2026-11-27"
diagram: policy-delegation
checks:
  - question: Can an organization owner override a policy the enterprise has set to enabled or disabled?
    answer: No. Organizations can only choose a setting when the enterprise selects Let organizations decide.
  - question: Why check the supported surfaces reference before recording a policy as a control?
    answer: Not every policy applies to every surface, so a policy may not reach the client or feature the requirement is about.
  - question: Which policy decides whether newly released features and models are available before anyone configures them?
    answer: The default availability policies for unconfigured generally available features and models.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
---

## What you will learn

- Trace a policy from enterprise to organization and record who set it.
- Check a policy against the surfaces it reaches.
- Include default availability as its own row in the inventory.

## The delegation chain

Enterprise administrators set Copilot policies first, on the AI controls tab. For each policy they choose enabled, disabled or "Let organizations decide". Only in the last case can organization owners choose, under the organization's Copilot settings; the [organization how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies) states that organizations cannot override enterprise-set policies. A separate "Policies for enterprise-assigned users" setting covers users who receive a seat directly from the enterprise. See [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

Three details change what a policy row means in your inventory:

1. **Reach.** Policies generally apply to licensed users, but a few apply to everyone, such as blocking Copilot in the cloud in the enterprise's repositories. The [supported surfaces reference](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) shows which clients each policy reaches.
2. **Conflicts.** When a user is licensed through several organizations, the least restrictive value usually wins, with exceptions listed in the [conflict reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts). Across enterprises the most restrictive value almost always wins. The [policy conflicts deep dive](https://ragmha.github.io/field-guides/copilot-policy-conflicts-guide/) works through these cases.
3. **Defaults.** Two [default availability](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) policies decide whether unconfigured generally available features and models are on. They are controls in their own right.

Model choice is a separate settings surface that can differ by enterprise team or organization; the [model governance deep dive](https://ragmha.github.io/field-guides/copilot-model-governance-guide/) covers it.

## Worked example: a delegated policy

**Hypothetical starting state:** Fictional Larkspur Freight sets "Copilot CLI" to "Let organizations decide". The Platform organization enables it; the Finance organization disables it. One analyst holds seats from both organizations.

The inventory row records the enterprise setting as "delegated", lists both organization values and links the conflict reference rather than assuming the analyst is blocked. Because the least restrictive value usually applies across organizations, the analyst may have the CLI. The administrator checks the specific policy in the reference before reporting.

**Outcome:** The row states the effective result as "check per user", names both organization owners and records the conflict rule source.

## Practice: write a policy row

**Prerequisites:** Read access to a sandbox enterprise or the documentation only.

1. Choose one Copilot policy.
2. Record the enterprise value, any organization values and the surfaces the policy reaches.
3. Record whether the conflict rule is least or most restrictive for that policy.

**Expected result:** A row that someone else could use to predict a user's effective setting.

<details>
<summary>Model answer</summary>

Policy: suggestions matching public code. Enterprise: delegated. Organizations: Platform allowed, Finance blocked. Surfaces: per the supported surfaces reference. Conflict rule: most restrictive across organizations, so a user seated by both is blocked. Owner: AI governance lead.

</details>
