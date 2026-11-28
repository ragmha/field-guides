---
title: Build the pre-enable baseline
section: Baseline Policies
order: 10
description: Confirm licensing, set policies, enable one organization and cap spend, with defaults that favor adoption.
verified: "2026-11-27"
diagram: pre-enable-baseline
checks:
  - question: In which order does the pilot tutorial configure the rollout?
    answer: Confirm membership and license source, configure policies before enabling, enable for one organization only, then set a budget.
  - question: When does GitHub suggest setting an enterprise policy to disabled?
    answer: Only for non-negotiable restrictions; otherwise keep default availability enabled and scope restrictions to sensitive organizations.
  - question: Do organization rulesets override the enterprise baseline?
    answer: No. Organization rulesets add to the enterprise baseline and never override it.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards
---

## What you will learn

- Apply the pilot tutorial's four setup steps in order.
- Choose a baseline that restricts only what must be restricted and relies on code guardrails for the rest.

## Policies first, then access

The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) sets up a pilot in four steps: confirm membership and that licenses come from the pilot organization, configure the organization's policies before enabling the feature, enable it for one organization only, and set a budget. Configuring first means nobody sees the feature with unreviewed settings.

The [governance posture tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) advises keeping the default availability policies enabled so vetted features reach developers, setting enterprise defaults to disabled only for non-negotiable restrictions, and scoping restrictions to organizations with sensitive work rather than the whole enterprise. It also warns that very tight budgets can block the features you enabled.

The [codebase standards tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards) supplies guardrails that apply to every change: branch rulesets that require a pull request with approval and block force pushes, required workflows, and a security configuration with code scanning, secret scanning and push protection. Organization rulesets add to the enterprise baseline and never override it.

Guide advice: write the baseline as a table of setting, value, scope and owner, and version it so the quarterly review in Part 6 can compare it with what is configured.

## Worked example: a baseline for the payments pilot

**Hypothetical starting state:** The payments organization from Part 2 is ready. A regulated ledger organization must not receive agentic features yet.

The AI managers keep default availability on for generally available features and models. For the agentic feature, the enterprise lets organizations decide; the ledger organization keeps it disabled. An enterprise ruleset requiring one approval and blocking force pushes already covers both organizations. The feature is enabled for payments, and the $250 budget from Part 2 is set.

**Outcome:** Payments developers can use the feature with review and scanning in place; the ledger organization is unaffected. The configuration is illustrative.

## Practice: draft your baseline table

**Prerequisites:** Your pilot organization, list of sensitive organizations and the three tutorials linked above. No settings need to be changed.

1. Write the four setup steps with an owner from your RACI for each.
2. List the policies you will leave at default and the few you will disable, with the reason.
3. Note which organizations receive restrictions and why.
4. List the code guardrails already in place and any gaps.
5. In an authorized sandbox, an owner may apply the table and confirm what a test user sees.

**Expected result:** A versioned baseline table and a gap list.

<details>
<summary>Model answer</summary>

Licenses confirmed by the rollout owner; policies set by AI managers; one organization enabled; budget set by the rollout owner with finance accountable. Defaults remain on except non-negotiables, restricted only for sensitive organizations. Guardrails: required reviews, blocked force pushes, required checks and code scanning, secret scanning and push protection. Missing guardrails are gaps, not reasons to block the feature everywhere.

</details>
