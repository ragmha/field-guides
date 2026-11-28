---
title: Review the model lifecycle
section: Review & Approval
order: 23
description: Keep approvals current through releases, base model changes, retirements and policy drift.
verified: "2026-11-27"
diagram: model-lifecycle-review
checks:
  - question: How long is a long-term support model supported?
    answer: One year from its designation date, for Copilot Business and Copilot Enterprise.
  - question: Can a base model become enabled without an administrator enabling it?
    answer: Yes. A designated base model is automatically enabled within 60 days for Copilot Business and Copilot Enterprise.
sources:
  - https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models
  - https://docs.github.com/en/copilot/concepts/models/utility-models
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://github.blog/changelog/label/copilot/
---

## What you will learn

- Identify the documented events that change model availability over time.
- Set a review cadence that catches them.
- Detect drift between approved and actual model settings.

## Events that change the approved set

**New releases.** GitHub recommends following the [Copilot changelog](https://github.blog/changelog/label/copilot/) together with the supported models and model comparison pages, as described in the [new features and models guide](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models).

**Base and long-term support models.** For Copilot Business and Copilot Enterprise, the [base and LTS models page](https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models) defines a base model as the default used when no other models are enabled. A newly designated base model is automatically enabled within 60 days of designation, so it can appear even under a restrictive baseline. An LTS model is supported for one year from its designation date, which makes it a stable choice for instructions or workflows that depend on one model.

**Retirements.** The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) keeps a retirement history with dates and suggested alternatives.

**Utility models.** The [utility models page](https://docs.github.com/en/copilot/concepts/models/utility-models) describes models that are always on while Copilot is enabled; GitHub's new features guide lists them with a note to monitor them for compliance.

**Policy drift.** The [policies concept page](https://docs.github.com/en/copilot/concepts/enterprise/policies) advises regularly reviewing who can change policies, including the "Manage enterprise AI controls" custom role, and using the audit log to monitor policy changes. Audit log analysis is covered in the audit and telemetry course.

Guide advice: run a monthly comparison of approved models against the settings page, and an event-driven review whenever a base model, LTS model or retirement is announced.

## Worked example: a base model announcement

**Hypothetical starting state:** Wide World Importers disables every model except two approved ones. GitHub announces a new base model.

The reviewer notes the 60-day window, starts an intake record for the base model, and schedules completion before the automatic enablement date. They also check whether any approved model appears in the retirement history.

**Outcome:** The automatic enablement is reviewed before it happens, and the team is not surprised by a model it did not approve.

## Practice: build a lifecycle calendar

**Prerequisites:** Read the [base and LTS models page](https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models).

1. Create a calendar with a monthly settings comparison.
2. Add a hypothetical base model announcement and mark day 0 and day 60.
3. Add an LTS designation and its one-year end.
4. Add one retirement from the reference with its suggested alternative.
5. If an authorized sandbox is available, compare its model settings with your approved list without saving changes.

**Expected result:** A calendar with recurring and event-driven reviews, each tied to a source.

<details>
<summary>Model answer</summary>

Monthly: compare approved models with the settings page and review who holds policy permissions. Base model: intake starts on day 0 and must finish before day 60. LTS: plan a replacement review before the one-year end. Retirement: migrate dependent instructions to the suggested alternative before the retirement date. Each entry links the page that defines it.

</details>
