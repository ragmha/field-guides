---
title: Build a model inventory
section: Model Landscape
order: 2
description: Record which models users can reach and why the list differs by plan, surface and policy.
verified: "2026-11-27"
diagram: model-inventory
checks:
  - question: Does a model listed in the supported models reference appear for every Copilot user?
    answer: No. Availability depends on plan, client and surface, administrator policies and time.
  - question: Can administrators disable utility models that generate commit messages or session titles?
    answer: Not individually. Utility models are not in the picker and are only removed by disabling Copilot.
  - question: Which models do Copilot Free and Student users get?
    answer: Auto model selection only, according to the access documentation.
sources:
  - https://docs.github.com/en/copilot/concepts/models/overview
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models
  - https://docs.github.com/en/copilot/concepts/models/utility-models
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
---

## What you will learn

- Explain the four factors that decide whether a model is available.
- Separate picker models, utility models and custom models in an inventory.
- Record model categories without depending on volatile version names.

## Four filters on one catalog

The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) lists each model with its provider and release status, and states that availability is subject to change. The [models overview](https://docs.github.com/en/copilot/concepts/models/overview) names the factors that narrow that catalog for a given person: their plan, the client or surface they use, the policies set by administrators, and time, because models are added and retired.

The [access documentation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) adds detail. Copilot Free and Student users get Auto model selection only. The image generation model is governed by the same model policy as chat models. Custom models added through BYOK are covered on the same page and in Part 5.

Not every model is in the picker. [Utility models](https://docs.github.com/en/copilot/concepts/models/utility-models) power background tasks such as commit messages and session titles. They are not billed, are rate-limited, and cannot be disabled except by disabling Copilot. GitHub lists them so administrators can monitor them for compliance.

The [pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) groups models into Lightweight, Versatile and Powerful categories. Recommended: record the category, provider and release status in your inventory, and link to the reference for the current model name instead of copying it.

## Worked example: an inventory for two organizations

**Hypothetical starting state:** Fabrikam Tools has two organizations on Copilot Business. One uses VS Code and the GitHub website; the other works mostly in the CLI. A reviewer is asked, "Which models can our developers use?"

The reviewer builds one row per model category and provider, with columns for release status, surfaces in use, and current policy state in each organization. A separate section lists utility models, marked "cannot be disabled individually", and a third lists custom models, which are empty for now.

**Outcome:** The inventory shows that the honest answer is "it depends on organization and surface". It also shows that an empty custom-model list and a utility model list are both governance facts, not gaps.

## Practice: draft an inventory row set

**Prerequisites:** Read the [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) and the [utility models page](https://docs.github.com/en/copilot/concepts/models/utility-models).

1. Create a table with columns for provider, category, release status, surfaces and policy state.
2. Add three rows using categories and providers from the reference, not version names.
3. Add a utility-model section that states the disable limitation.
4. If an authorized sandbox organization is available, view its model settings without saving changes and fill in the policy column. Otherwise, mark the column "to verify".

**Expected result:** A short inventory that distinguishes picker models from utility models and shows that policy state is verified or explicitly unverified.

<details>
<summary>Model answer</summary>

Each row names a provider, a category such as Versatile, a release status copied from the reference with its review date, the surfaces where it was observed, and a policy state. The utility section notes that these models run for background tasks, are not billed, and stay active while Copilot is enabled. Any unverified cell says so rather than guessing.

</details>
