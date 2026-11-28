---
title: Set an availability baseline
section: Availability Policies
order: 6
description: Combine explicit model states with the default policy for newly released models.
verified: "2026-11-27"
diagram: availability-baseline
checks:
  - question: Does a model set to Delegate to default policy ignore the default availability policy?
    answer: No. It follows that policy, while an unconfigured model such as a preview model does not.
  - question: Are open-weight models and models outside the retention agreement enabled by default?
    answer: No. GitHub excludes them from default enablement, so they stay disabled until explicitly enabled.
  - question: Is default availability the same as the default model chosen in a session?
    answer: No. GitHub documents them as unrelated settings.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/concepts/models/auto-model-selection
---

## What you will learn

- Read the model statuses an enterprise or organization can see.
- Predict which newly released models become available without intervention.
- Write a baseline that names explicit exceptions.

## Explicit states and a default

Enterprise owners configure models under **AI controls**, **Copilot**, **Configure models**, where each model can be Enabled, Disabled or delegated, as described in the [enterprise model availability guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models). The same guide suggests an explicit baseline, for example making vetted lower-cost models available to everyone and disabling models that do not meet compliance needs.

The [default availability reference](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) adds the "Default availability for released models" policy, which an enterprise can set to Enabled, Disabled or Let organizations decide. Each model then shows a status:

- **Enabled** or **Disabled** is an explicit choice that does not change when the default changes.
- **Delegate to default policy** follows the default availability policy.
- **Unconfigured** does not follow the default; preview models start here.
- **Delegated** passes the decision to organizations, or to enterprise teams in teams mode.

Some models are never switched on by the default. The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) lists the exclusions from default enablement: pre-GA models, open-weight models, models not covered by GitHub's zero data retention agreement, and models outside data residency or FedRAMP restrictions. On GHE.com, the restrictive policies "Restrict Copilot to data residency models" and "Restrict Copilot to FedRAMP models" narrow the list further.

Default availability is not the default model in a session. The [Auto model selection page](https://docs.github.com/en/copilot/concepts/models/auto-model-selection) states the two are unrelated.

## Worked example: a review-first baseline

**Hypothetical starting state:** Contoso Freight wants vetted models available everywhere, wants one provider's models off until legal review completes, and does not want new GA models to appear without review.

The administrator plans explicit Enabled states for the vetted set, explicit Disabled states for the pending provider and sets the default policy to Disabled. The plan notes that open-weight and non-retention-covered models would be off by default anyway.

**Outcome:** New GA models wait for review, explicit choices survive a later change to the default, and the plan explains why each excluded model is off.

## Practice: predict model status

**Prerequisites:** Use the status list above and the [default availability reference](https://docs.github.com/en/copilot/concepts/enterprise/default-availability).

1. Assume the default policy is Enabled. List five hypothetical models: explicit Disabled, Delegate to default policy, preview, open-weight, and explicit Enabled.
2. Predict whether each is available to users.
3. Repeat with the default policy set to Disabled.
4. If an authorized sandbox is available, compare its displayed statuses without saving changes.

**Expected result:** A two-column prediction showing that only the delegated model changes between scenarios.

<details>
<summary>Model answer</summary>

With the default Enabled, the explicit Enabled and Delegate to default policy models are available; the explicit Disabled, preview and open-weight models are not. With the default Disabled, the delegated model also becomes unavailable. The other four keep their state because they are explicit, unconfigured or excluded from default enablement.

</details>
