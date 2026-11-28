---
title: Map provider hosting
section: Hosting & Data Terms
order: 10
description: Record who hosts each model family and what GitHub documents about training and filters.
verified: "2026-11-27"
diagram: provider-hosting
checks:
  - question: Does GitHub use Copilot Business or Copilot Enterprise customer data to train AI models?
    answer: No. The model hosting reference states that it does not.
  - question: Do prompts to open-weight models hosted by GitHub go to the original model developer?
    answer: No. The reference says they are served on a hosting provider under a zero data retention agreement and not sent to the developer.
  - question: Do content filters apply when a cloud-hosted model is selected?
    answer: Yes. Requests and responses continue to pass through Copilot content filters.
sources:
  - https://docs.github.com/en/copilot/reference/ai-models/model-hosting
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
---

## What you will learn

- Summarize where each provider family's models are hosted.
- Distinguish training statements for business and individual plans.
- Identify where safety filters may differ.

## Hosting by provider family

The [model hosting reference](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) describes hosting per provider. Recommended: quote it by section and date rather than paraphrasing commitments from memory.

| Provider family | Documented hosting | Documented data statement |
| --- | --- | --- |
| OpenAI | OpenAI and GitHub's Azure infrastructure | Zero data retention agreement; no training on business data |
| Anthropic | AWS, Anthropic and Google Cloud | Zero data retention for generally available Anthropic features; prompt caching used |
| Google | Google Cloud | No training on prompts or responses; durable cache encrypted and held up to 24 hours |
| xAI | xAI | Zero data retention API policy |
| Microsoft first-party | Azure AI Foundry in GitHub's tenant | Subject to GitHub's data handling configuration for that deployment |
| Open-weight | Hosted by GitHub on a third-party provider | Zero data retention with the host; prompts not sent to the developer |

Across these sections, the reference states that GitHub does not use Copilot Business or Copilot Enterprise customer data to train AI models. For some cloud-hosted models, it also states that GitHub may use interaction data from individual plans to train and improve models, in accordance with the GitHub privacy statement. Recommended: make sure developers use their organization license, not a personal plan, for company work.

All listed providers run requests and responses through Copilot content filters for harmful content and, when applied, public code matching. One Microsoft model can also run locally on a user's machine; when locally hosted, it may not use the same safety filters. Inline suggestions for Business and Enterprise plans are powered by models hosted on Azure.

The [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) points to vendor support pages and the GitHub status page when a model is unavailable, which helps separate an outage from a policy change.

## Worked example: a privacy questionnaire

**Hypothetical starting state:** A privacy officer at Adatum Health asks, for each enabled provider, "Where is the prompt processed, is it retained, and is it used for training?"

The reviewer fills one row per provider family from the reference, links the section, and adds the review date. Where the reference mentions caching, the row records the documented duration. The local-model row is marked "filters may differ".

**Outcome:** The answer is traceable to GitHub's text, and caching and local hosting are visible rather than hidden behind "zero retention".

## Practice: complete a hosting row

**Prerequisites:** Open the [model hosting reference](https://docs.github.com/en/copilot/reference/ai-models/model-hosting).

1. Choose two provider families your hypothetical enterprise uses.
2. For each, record hosting, retention statement, caching, training statement and filter coverage.
3. Add a link and review date to each cell you filled.
4. Mark any cell you could not source as "not documented".

**Expected result:** Two sourced rows that a privacy reviewer could check against the reference.

<details>
<summary>Model answer</summary>

A Google row lists Google Cloud hosting, the no-training commitment, durable caching for up to 24 hours, and content filter coverage. An Anthropic row lists AWS, Anthropic and Google Cloud hosting, zero data retention for generally available features, prompt caching, and filter coverage. Both note the business-plan training statement and the review date.

</details>
