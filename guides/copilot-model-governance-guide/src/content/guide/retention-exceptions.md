---
title: Handle retention exceptions
section: Hosting & Data Terms
order: 11
description: Identify models outside the retention agreement and decide how exceptions are approved.
verified: "2026-11-27"
diagram: retention-exceptions
checks:
  - question: Does an approved retention exemption make the model available to users?
    answer: No. An administrator must still enable the model in Copilot settings.
  - question: Which Anthropic features may fall outside zero data retention?
    answer: Some beta or preview features, because the agreement covers generally available Anthropic features.
sources:
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/reference/ai-models/model-hosting
  - https://docs.github.com/en/copilot/responsible-use/chat
---

## What you will learn

- Find models whose provider retains data for safety purposes.
- Describe the documented exemption path and its limits.
- Recognize other cases where data terms differ from the default.

## When the default terms do not apply

The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) flags some provider models that retain data by default for safety classifiers and are not covered by GitHub's zero data retention agreement. Eligible enterprises can request a time-bound exemption through their account team, documented as available through the end of 2026. Approval does not enable the model: an administrator still has to enable it. These models also carry an internal-use-only restriction. They are excluded from default enablement, so they stay off unless someone enables them explicitly.

The [model hosting reference](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) notes other boundaries:

- The Anthropic zero data retention agreement covers generally available Anthropic features, so some beta or preview features may not be covered.
- Open-weight models may be less aligned than other models; GitHub recommends reviewing the model card and running your own evaluations.
- A locally hosted model may not use the same safety filters as GitHub-provided cloud models.

Data terms also change when traffic does not go through GitHub. The [Copilot Chat responsible use page](https://docs.github.com/en/copilot/responsible-use/chat) states that with bring your own key, prompts and responses go to the selected provider and may be subject to that provider's retention and privacy policies. Part 5 covers BYOK governance.

Guide advice: keep a separate "exceptions" register with the model, the exception type, the approver, the expiry and the compensating control, and review it whenever the reference changes.

## Worked example: a request for a non-retention-covered model

**Hypothetical starting state:** A research group at Litware wants a model that the reference lists as outside the zero data retention agreement. The enterprise default is to enable GA models automatically.

The reviewer confirms the model is excluded from default enablement, so it is off. Legal decides whether to request the time-bound exemption through the account team. Even with approval, the reviewer plans a targeted access rule for the research organization only and records the internal-use restriction and the end-of-2026 expiry.

**Outcome:** The exception has an owner, a scope and a date to revisit, and approval is not confused with enablement.

## Practice: write an exception entry

**Prerequisites:** Read the retention notes in the [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models).

1. Choose one exception type: provider retention, preview feature, open-weight or local hosting.
2. Write an entry with model category, exception, approver, scope, expiry and compensating control.
3. State which administrator action, if any, is still needed after approval.
4. If an authorized sandbox is available, confirm without saving changes that the model's current status matches your entry.

**Expected result:** One exception entry that separates legal approval from technical enablement.

<details>
<summary>Model answer</summary>

Provider retention exception: model category Powerful; not covered by zero data retention; approved by legal through the account team; scoped to one organization by a targeted access rule; expires with the documented exemption period; compensated by internal-use-only guidance and quarterly review. An enterprise administrator must still enable the model for the target organization.

</details>
