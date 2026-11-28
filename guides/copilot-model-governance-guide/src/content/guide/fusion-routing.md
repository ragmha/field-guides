---
title: Govern Copilot Fusion
section: Automatic Routing
order: 15
description: Understand Fusion execution patterns, effort levels, model dependencies and billing.
verified: "2026-11-27"
diagram: fusion-routing
checks:
  - question: Is there a separate charge for using Copilot Fusion?
    answer: No. Fusion bills each model it uses at that model's standard rate, so multi-model tasks can cost more.
  - question: Why might Fusion Max be missing from the picker?
    answer: One or more models it requires may be disabled by policy.
  - question: Is local model routing in Fusion generally available?
    answer: No. It is a public preview that requires experimental features.
sources:
  - https://docs.github.com/en/copilot/concepts/models/copilot-fusion
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
---

## What you will learn

- Describe Fusion's execution patterns and effort levels.
- Explain how model policy limits Fusion.
- Identify cost and workspace effects to communicate to users.

## A router that can use several models

[Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) is a runtime router and orchestrator that chooses models and an execution pattern for each prompt, then returns one response. It is generally available on the surfaces listed in the Fusion documentation, including VS Code, Copilot CLI and the GitHub Copilot app. Three execution patterns are documented:

- **Single:** one model completes the task.
- **Cascade:** an efficient model drafts, and a judge accepts the draft or escalates to a stronger model.
- **Critique:** one model drafts, several models critique in parallel, and the first model revises.

Effort levels include Fusion Standard, Fusion High and Fusion Max; Fusion Fast is used only in specific scenarios and is not user-selectable.

Fusion respects the same exclusions as Auto: models outside the plan, models disabled by administrators, models outside data residency or FedRAMP restrictions, and restricted evaluation models. If none of its models are available, Fusion does not appear. The [enterprise model availability guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) includes a section on configuring Fusion models and warns that disabling frontier models can make Fusion Max unavailable.

Billing is per model used, at standard rates, with no separate Fusion charge. Because higher effort levels can call more than one model per task, they may consume more AI credits. The Fusion page documents a promotional discount for paid plans through December 31, 2026; treat it as time-bound.

Two further points matter for governance. Local model routing in Fusion is a **public preview - use with caution** that requires experimental features. And if Fusion discards a draft, file edits the draft already made are not undone automatically, so users should review changes before committing.

## Worked example: Fusion Max disappears

**Hypothetical starting state:** Proseware disables two frontier models after a cost review. The next day, developers report that Fusion Max is gone from the picker.

The administrator checks the Fusion documentation and confirms that Fusion Max depends on models that are now disabled. The team decides whether the cost saving outweighs losing Fusion Max, and records the dependency in the model inventory.

**Outcome:** A model decision's side effect on routing is visible and deliberate, and users get a clear explanation.

## Practice: write a Fusion user note

**Prerequisites:** Read the [Copilot Fusion page](https://docs.github.com/en/copilot/concepts/models/copilot-fusion).

1. Summarize the three execution patterns in one sentence each.
2. State how Fusion is billed and why higher effort can cost more.
3. Add the workspace caveat about discarded drafts.
4. If an authorized sandbox is available, check whether Fusion appears in a supported client, without changing any setting.

**Expected result:** A short user note covering patterns, billing and the discarded-draft caveat.

<details>
<summary>Model answer</summary>

Single uses one model; Cascade drafts with an efficient model and escalates when a judge rejects the draft; Critique gathers parallel feedback before revision. Fusion bills each model it calls at standard rates, so High and Max can cost more than Standard. If a draft is discarded, its file edits remain, so review the workspace before committing.

</details>
