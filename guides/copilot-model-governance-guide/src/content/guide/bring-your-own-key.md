---
title: Govern bring your own key
section: Cost & Custom Models
order: 19
description: Compare user-configured BYOK with enterprise and organization custom models.
verified: "2026-11-27"
diagram: bring-your-own-key
checks:
  - question: Do user-configured BYOK requests go through GitHub's Copilot API?
    answer: No. The client sends them directly to the provider with the user's credentials.
  - question: Which BYOK approach does GitHub recommend as the default for most organizations?
    answer: Enterprise custom models, with user-configured BYOK allowed where needed.
  - question: Can Copilot Business and Copilot Enterprise policy disable user BYOK in IDEs?
    answer: Yes. An enterprise or organization policy can disable configuring your own model provider in IDEs.
sources:
  - https://docs.github.com/en/copilot/concepts/models/bring-your-own-key
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/enable-custom-models
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/enable-custom-models
  - https://docs.github.com/en/copilot/responsible-use/chat
---

## What you will learn

- Distinguish user-configured BYOK from enterprise custom models.
- Describe how each path affects data flow, access and reporting.
- Apply key-handling and testing expectations.

## Two paths for your own models

The [BYOK concept page](https://docs.github.com/en/copilot/concepts/models/bring-your-own-key) describes two approaches.

**User-configured BYOK.** A supported client uses credentials the user supplies to send requests directly to the provider, not through GitHub's Copilot API. The model is available only to that user, can be local or cloud-hosted, and works without a Copilot subscription. For Copilot Business and Copilot Enterprise users, an enterprise or organization policy can disable configuring a model provider in IDEs. Usage is reported from client telemetry in supported clients only.

**Enterprise and organization custom models** are a **public preview - use with caution**. Enterprise owners add provider API keys in enterprise settings, as described in [enabling custom models for an enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/enable-custom-models), and can let organization owners add their own through the **Enable custom models** policy ([organization guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/enable-custom-models)). Supported providers include Anthropic, AWS Bedrock, Google AI Studio, Microsoft Foundry, OpenAI, OpenAI-compatible providers and xAI. Users reach these models through GitHub's Copilot API with a Copilot license, and the models appear in the picker under the enterprise name. The enterprise guide asks for least-privilege key scopes, and says fine-tuned models should be tested before production use.

GitHub recommends enterprise custom models as the default for most organizations, because keys stay under central control and usage is fully reported in Copilot usage metrics, with user BYOK allowed for local, air-gapped or experimental needs.

Data terms change with either path. The [Copilot Chat responsible use page](https://docs.github.com/en/copilot/responsible-use/chat) states that with BYOK, prompts and responses go to the selected provider and may be subject to that provider's retention and privacy policies, and that quality depends on the provider.

## Worked example: a team with its own provider contract

**Hypothetical starting state:** A data science group at Fourth Coffee has a negotiated contract with a model provider and wants to use it in Copilot Chat. Some developers already configured personal keys in their IDEs.

The platform team proposes an enterprise custom model with a least-privilege key, scoped to the data science organization. Legal reviews the provider's retention terms, since GitHub's hosting statements do not cover it. The team then decides whether to disable user BYOK in IDEs once the central option is live.

**Outcome:** Keys move out of individual IDEs, usage becomes visible in metrics, and the provider's data terms are reviewed rather than assumed.

## Practice: choose a BYOK path

**Prerequisites:** Read the [BYOK concept page](https://docs.github.com/en/copilot/concepts/models/bring-your-own-key).

1. Write two hypothetical needs: an air-gapped team and a contracted cloud provider.
2. Choose user BYOK or enterprise custom models for each and justify the choice.
3. Record who holds the key, how usage is reported and whose retention terms apply.
4. If an authorized sandbox is available, open its custom model settings without adding a key.

**Expected result:** Two decisions that each name the key holder, reporting path and data terms.

<details>
<summary>Model answer</summary>

The air-gapped team uses user-configured BYOK to a reachable local endpoint; the user holds the configuration, and usage appears only through supported client telemetry. The contracted provider uses an enterprise custom model with a least-privilege key held centrally; usage appears in Copilot usage metrics. In both cases the provider's retention and privacy terms apply and need review.

</details>
