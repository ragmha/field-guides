---
title: Read the enterprise decision state
section: Policy Layers
order: 2
description: Identify whether an enterprise policy is fixed, scoped to selected organizations or delegated before looking at any organization setting.
verified: "2026-11-27"
diagram: enterprise-decision-states
checks:
  - question: An enterprise owner has disabled a policy everywhere. Can an organization owner enable it for their members?
    answer: No. Organization owners cannot override an enterprise selection such as enabled everywhere, disabled everywhere or enabled for selected organizations.
  - question: When does the organization setting become the deciding input?
    answer: When the enterprise has let organizations decide for that policy, and the organization owner has configured it.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Name the enterprise decision states a Copilot policy can have.
- Decide whether an organization setting can matter at all for a given policy.
- Avoid reading organization settings that the enterprise has already overridden.

## Enterprise first, organization second

In an enterprise, Copilot policies are set at the enterprise level first, on the **AI controls** tab. For most policies an enterprise owner can explicitly enable or disable the policy, or let organizations decide. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies). Some policies offer more options. For example, the Copilot in the cloud policy can be **Enabled for selected organizations**, and the enterprise owner then picks the organizations. See [Managing Copilot in the cloud](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud).

The organization documentation is explicit: if the enterprise owner has selected a specific policy, such as enabling a feature everywhere, disabling it everywhere, or enabling it for selected organizations only, the organization owner cannot override it. See [Managing policies in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies). Only a delegated policy turns the organization setting into a deciding input.

Policies on the enterprise pages use different controls: some have a dropdown menu, some a toggle, and some are configured by clicking the policy name. See [Managing policies in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies). Read the control that is actually present rather than assuming every policy has the same states.

Guide advice: record the enterprise state of a policy before opening any organization's settings. If it is fixed, the investigation for that policy stops at the enterprise, apart from surface support and resource-level controls covered later in this course.

## Worked example: a fixed state hides an organization setting

**Hypothetical starting state:** The platform team receives a report that Copilot CLI is unavailable for a developer in the mobile organization. The mobile organization's policy page shows Copilot CLI as enabled from an earlier configuration. The enterprise **Features & clients** page shows Copilot CLI as disabled everywhere.

The administrator starts at the enterprise. Because the enterprise decision is a fixed disable, the organization's earlier value is not an input for this policy. The administrator does not ask the mobile organization owner to change anything, because they could not override the enterprise decision.

**Outcome:** The predicted effective state is disabled for every licensed user in the enterprise. The fix, if one is approved, is an enterprise decision. The trace records the enterprise state, notes that the organization setting was not consulted, and leaves verification on the CLI as a separate step.

## Practice: classify five policies

**Prerequisites:** A hypothetical list of five policies with their enterprise states: two enabled everywhere, one disabled everywhere, one enabled for selected organizations, and one set to let organizations decide. No settings need to be changed.

1. For each policy, write the enterprise state exactly as displayed.
2. Mark whether an organization setting can change the result.
3. For the selected-organizations policy, list which organizations are in scope and what that means for a member of an unselected organization.
4. In an authorized sandbox, compare your list with the enterprise **AI controls** pages. Without a sandbox, compare with the model answer.

**Expected result:** Only the delegated policy needs organization settings; the others are resolved, or scoped, at the enterprise.

<details>
<summary>Model answer</summary>

Enabled everywhere and disabled everywhere: the organization setting is irrelevant. Enabled for selected organizations: the outcome depends on whether the user's licensing organization is selected; an organization owner cannot add their organization. Let organizations decide: read each licensing organization's setting, then apply the conflict rules from Part 3. Surface support is still a separate check.

</details>
