---
title: Read model cost signals
section: Cost & Custom Models
order: 18
description: Connect model availability decisions to token pricing, modifiers and usage reporting.
verified: "2026-11-27"
diagram: model-cost-signals
checks:
  - question: Are all tokens in a request priced the same way?
    answer: No. Input, cached input, cache write and output tokens can have different rates, and some models add a long-context tier.
  - question: Does enforcing the FedRAMP model restriction change AI credit consumption?
    answer: Yes. The FedRAMP page documents that requests under enforcement cost 10% more AI credits.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
  - https://docs.github.com/en/copilot/reference/ai-models/model-comparison
  - https://docs.github.com/en/copilot/concepts/enterprise/fedramp-models
  - https://docs.github.com/en/copilot/concepts/models/auto-model-selection
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
---

## What you will learn

- Identify the pricing components that vary by model.
- Name the modifiers that raise or lower model cost.
- Find model-level usage evidence without rebuilding a budget process.

## Price follows the model

The [models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) prices each request by tokens: input, cached input, cache write where applicable, and output. The total converts to GitHub AI Credits, where one AI credit is $0.01 USD. Copilot Business and Copilot Enterprise allowances are pooled at the billing entity level. Some models also have a long-context tier with higher rates above a token threshold. Code completions and next edit suggestions are not billed in AI credits on paid plans.

The [model comparison reference](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) notes that models consume credits at different rates, and the pricing reference groups models into Lightweight, Versatile and Powerful categories. That makes availability a cost decision: enabling a Powerful model for everyone widens the range of possible spend even if the default stays cheaper.

Several modifiers are documented:

- **Auto:** paid plans receive a 10% discount on model costs in Copilot Chat or cloud agent, per the [Auto page](https://docs.github.com/en/copilot/concepts/models/auto-model-selection).
- **Fusion:** a time-bound promotional discount, and possible higher use at higher effort levels.
- **FedRAMP:** under the "Restrict Copilot to FedRAMP models" policy on GHE.com with US data residency, requests cost 10% more AI credits, per the [FedRAMP models page](https://docs.github.com/en/copilot/concepts/enterprise/fedramp-models).
- **Promotional pricing:** some models list promotional rates with end dates in the pricing reference.

For evidence, the [usage metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) includes model usage breakdowns, such as model usage per day and per chat mode. Recommended: use these to see whether an enabled model is actually used before reviewing its cost.

Guide advice: do not set budgets in this review. Record the cost signals and hand budget design to the process in the [AI credits course](/field-guides/ai-credits-guide/).

## Worked example: adding a Powerful model

**Hypothetical starting state:** Relecloud enables Versatile models for all organizations. An architecture group requests a Powerful model with a long-context tier.

The reviewer records the model category, the long-context threshold, the cache write cost and any promotional end date. They propose a targeted access rule for the architecture organization and ask finance to apply the budget process from the AI credits course.

**Outcome:** The model decision captures the cost drivers; budget controls are owned elsewhere and not duplicated.

## Practice: write cost notes for one model

**Prerequisites:** Open the [models and pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing).

1. Pick one model category and note which token types it charges for.
2. Record whether a long-context tier or promotional end date applies.
3. List any modifiers that apply in your hypothetical enterprise.
4. If an authorized sandbox is available, view its model usage metrics without changing settings.

**Expected result:** A cost note naming token types, tiers, dates and modifiers, with a pointer to the budget owner.

<details>
<summary>Model answer</summary>

Powerful category: input, cached input, cache write and output rates; long-context tier above the documented threshold; promotional pricing ends on the listed date. Modifiers: Auto discount if routed through Auto in Chat; FedRAMP uplift if that policy is enforced. Budget design is handed to finance using the AI credits course.

</details>
