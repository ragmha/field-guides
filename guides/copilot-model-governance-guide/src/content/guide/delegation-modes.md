---
title: Choose a delegation mode
section: Availability Policies
order: 7
description: Decide whether organizations, targeted access rules or enterprise teams own model choices.
verified: "2026-11-27"
diagram: delegation-modes
checks:
  - question: Can an organization owner change a model that the enterprise has enforced?
    answer: No. Enforced models show a lock icon; only models the enterprise made optional can be changed.
  - question: In enterprise teams mode, can a team enable a model the enterprise has disabled?
    answer: No. Team access is additive within enterprise limits, and enterprise-disabled models stay off.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-default-models
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Compare organization delegation, targeted access rules and enterprise teams mode.
- Identify which license source governs a user's model access.
- Plan the migration risk of switching to enterprise teams mode.

## Three ways to delegate

**Organizations.** When an enterprise delegates a model, organization owners configure it under **Settings**, **Copilot**, **Models**. The [organization model guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-default-models) describes what they see: Enabled or Disabled with a lock icon means the enterprise enforced it; a dropdown means the model is optional; Delegate to Default Policy means the organization's own default availability policy applies.

**Targeted access rules.** The [enterprise model availability guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) describes creating an access rule that targets selected organizations and lists the models they may use, so an enterprise can grant a model to a pilot group without handing the decision to every organization.

**Enterprise teams mode** is an opt-in **public preview - use with caution**. When enabled, organization model settings are deactivated and access is granted to enterprise teams. Team access is additive: a model disabled at the enterprise cannot be enabled for a team, and a model enabled at the enterprise is always available. Users in several teams get the union of their teams' models, and teams offer no disabled option. During migration, models previously delegated to organizations become unavailable until they are enabled for teams. Rollback is possible while the mode is in preview, but enterprise changes made after switching are not preserved.

Whichever mode you use, the [policies concept page](https://docs.github.com/en/copilot/concepts/enterprise/policies) explains that a user is governed by the enterprise or organization that grants their license. On the GitHub Team plan, model access follows the organization paying for the user's usage. Conflicts between multiple licenses follow the documented conflict rules, covered in the policy conflicts course.

## Worked example: a pilot without broad delegation

**Hypothetical starting state:** Tailspin Retail has twelve organizations. Security approved a new model for a two-organization pilot only. The platform team is also considering enterprise teams mode.

The team writes a targeted access rule for the two pilot organizations and leaves the model disabled elsewhere. It records enterprise teams mode as a separate decision, listing the models that would lose access during migration.

**Outcome:** The pilot is scoped without delegating to all organizations, and the preview mode switch has its own impact list rather than riding along with the pilot.

## Practice: map ownership

**Prerequisites:** Read the [enterprise model availability guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models).

1. List three hypothetical models: one enforced, one optional for organizations, one for a pilot.
2. For each, write who decides and which screen they use.
3. Note what would happen to each if the enterprise switched to teams mode.
4. If an authorized sandbox is available, view, without saving, the model page an organization owner sees.

**Expected result:** An ownership map with one decision owner per model and a migration note for teams mode.

<details>
<summary>Model answer</summary>

The enterprise owner decides the enforced model in Configure models. Organization owners decide the optional model on their Models page. The pilot model is owned by the enterprise through a targeted access rule. In teams mode, the optional model becomes unavailable until it is enabled for teams, and organization owners lose their model page.

</details>
