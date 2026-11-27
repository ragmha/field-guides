---
title: Trace the license source, not membership
section: Seat Sources
order: 6
description: Separate organization membership from the organization that grants a Copilot seat before choosing which policy settings to read.
verified: "2026-11-27"
diagram: license-source-tracing
checks:
  - question: A user is a member of three organizations but holds a Copilot seat from only one. Whose delegated policies govern them?
    answer: Generally the organization that grants the seat. Policies apply to users based on where they receive their license, not on membership alone.
  - question: A user has seats from two organizations in the same enterprise. How many times is the enterprise billed for that user?
    answer: Once. One organization is selected for billing, and the detailed usage report shows which one in its organization column.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles
---

## What you will learn

- Explain why membership does not decide which delegated policies apply.
- List every seat source for a user before reading organization settings.
- Separate the billing organization from the set of policy-granting organizations.

## Membership and licensing are different lists

GitHub's policy overview states that policies generally only apply to users on your plan: a user is governed by the policies of the enterprise or organization where they receive a Copilot Business or Copilot Enterprise license. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies). The pilot tutorial makes the same point from the other side: most policies apply based on which organization assigns the license, so if a pilot user receives their license from a different organization, the pilot's policies will not govern them. See [Piloting a feature or model](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model).

Organization owners grant seats on **Settings → Copilot → Access**, to all members or to selected members and teams, and seats can also be assigned to outside collaborators. See [Granting access to Copilot for members of your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-access/grant-access). A person can therefore belong to many organizations, be seated by only some of them, or be seated by an organization they are not a full member of.

Billing is a third list. When a user has seats from more than one organization in the same enterprise, the enterprise is billed once and one organization is selected; the detailed usage report's organization column identifies it. See [Seats and billing cycles](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/seats-and-billing-cycles). Guide advice: do not treat the billing organization as the only policy source. Each organization that grants a seat contributes its delegated settings, which Part 3 combines.

## Worked example: a pilot that missed one engineer

**Hypothetical starting state:** The analytics organization runs a pilot with a delegated feature enabled. An engineer on the pilot team cannot see the feature. They are a member of analytics, but their seat comes from the platform organization, which has the feature disabled.

The administrator lists memberships (analytics, platform, docs) and seat sources (platform only). Analytics settings are not inputs for this user because analytics does not license them.

**Outcome:** The predicted state is disabled, matching the report. The approved fix is to seat the engineer through analytics, or to keep them out of the pilot. The trace records both lists and the reason analytics was excluded.

## Practice: build a seat-source table

**Prerequisites:** A hypothetical user who is a member of four organizations, is seated by two, and appears under one organization in the usage report. No settings need to be changed.

1. List every membership.
2. List every organization that grants the user a seat.
3. Note the organization the usage report attributes billing to.
4. Mark which organizations' delegated settings are inputs.
5. In an authorized sandbox, confirm seat sources on each organization's **Access** page. Without a sandbox, compare with the model answer.

**Expected result:** Two policy inputs, one billing organization, and two memberships that do not affect delegated policies.

<details>
<summary>Model answer</summary>

Inputs are the two seat-granting organizations, whichever one is billed. Memberships without a seat are recorded but not used. If the two inputs disagree, apply the conflict rule for that policy from Part 3.

</details>
