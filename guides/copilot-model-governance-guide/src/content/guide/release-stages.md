---
title: Read release stages
section: Model Landscape
order: 3
description: Distinguish evaluation, preview, generally available and retired models before approving them.
verified: "2026-11-27"
diagram: release-stages
checks:
  - question: Do preview models follow the default availability policy for released models?
    answer: No. Preview models are left unconfigured and do not follow the GA default.
  - question: Can evaluation models be removed without notice?
    answer: Yes. The supported models reference says evaluation models can be added or removed without notice.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
---

## What you will learn

- Name the release stages GitHub uses for Copilot features and models.
- Explain why evaluation and preview models need a separate decision.
- Record retirement as a stage with its own follow-up.

## From evaluation to retirement

The [new features and models guide](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models) describes three release stages. Private preview is invitation-only. Public preview is opt-in and may change. General availability (GA) is the stage GitHub recommends for production use. The same page notes that many previews are covered by the GitHub Data Protection Agreement and points to the preview terms, so legal reviewers should confirm coverage for each preview rather than assume it.

The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) adds evaluation models. They may appear under codenames, can be added or removed without notice, and GitHub's testing found they may perform worse on security-related prompts. On individual plans, Auto can route to evaluation models, controlled by a user setting for evaluation models in Auto model selection.

Release status also changes how defaults behave. The [default availability reference](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) explains that preview models are unconfigured and do not follow the default availability policy for released models. They stay off until someone makes an explicit choice.

The end of the lifecycle matters too. The supported models reference keeps a model retirement history with retirement dates and suggested alternatives. Guide advice: treat retirement as a stage in your inventory so dependent instructions, pilots and documentation are updated before the date.

## Worked example: a preview arrives

**Hypothetical starting state:** Northwind Labs enables GA models by default. A newly announced model appears in the settings as public preview, and a team lead asks why it is not available.

The administrator checks the default availability reference and confirms that preview models do not inherit the GA default. The model is added to the review queue with its stage, the date seen and the preview terms link. The team lead is told it needs an explicit decision.

**Outcome:** No preview model is enabled by accident, and the request has a clear next step instead of an unexplained absence.

## Practice: classify four models

**Prerequisites:** Use the [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) and the release stage definitions above.

1. Pick four rows from the reference: one GA, one public preview, one listed in the retirement history and, if listed, one evaluation model.
2. For each, record stage, whether the GA default applies and the required follow-up.
3. If an authorized sandbox is available, compare each model's displayed policy state without saving changes.

**Expected result:** Four classified rows where only the GA model can follow the default and the retired model has a replacement action.

<details>
<summary>Model answer</summary>

The GA model may follow the default policy. The public preview model is unconfigured and needs an explicit decision plus preview-terms review. The retired model needs a migration to the suggested alternative before its retirement date. An evaluation model needs a security-focused evaluation and the expectation that it may disappear.

</details>
