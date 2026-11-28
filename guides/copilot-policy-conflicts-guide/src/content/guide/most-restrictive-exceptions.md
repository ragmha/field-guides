---
title: Most-restrictive policies and exceptions
section: Conflict Rules
order: 11
description: Recognize the sensitive policies that use the most-restrictive rule and the rules for users licensed by multiple enterprises.
verified: "2026-11-27"
diagram: most-restrictive-exceptions
checks:
  - question: Semantic indexing for non-GitHub repositories is Enabled in one licensing organization and Unconfigured in the other. Is it available?
    answer: No. It is only available when all of the user's organizations explicitly set it to Enabled; Unconfigured behaves as disabled.
  - question: A user is licensed by two enterprises and one disables Copilot Chat in GitHub. What usually happens?
    answer: It is disabled for that user. Across multiple enterprises the most-restrictive policy usually applies.
  - question: Name one documented exception to the multi-enterprise most-restrictive rule.
    answer: AI credit paid usage, which applies to each enterprise rather than to the user, or GitHub Spark.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/enable-copilot-code-review
---

## What you will learn

- Name the policies that follow the most-restrictive rule.
- Apply the explicit-enable requirement for semantic indexing.
- Explain the multi-enterprise rule and its documented exceptions.

## Any disable wins for sensitive policies

For the most sensitive features, GitHub applies the opposite rule: if any organization disabled the feature, it is disabled in all of the user's organizations. The reference lists these policies as most restrictive: Copilot Metrics API; semantic indexing for non-GitHub repositories; suggestions matching public code; and allow members without a Copilot license to use Copilot code review in GitHub.com. See [Feature availability when policies conflict](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts).

Semantic indexing for non-GitHub repositories is stricter still. It is only available when all of the user's organizations explicitly set it to **Enabled**; **Unconfigured** behaves as disabled. Suggestions matching public code is a privacy policy, so a block in any licensing organization holds.

The unlicensed code review policy has its own prerequisites: AI credit paid usage and Copilot code review must be enabled, and credits are billed to the enterprise or a cost center. See [Enabling Copilot code review](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/enable-copilot-code-review).

## Multiple enterprises

When a user receives Copilot from more than one enterprise, the most-restrictive policy usually applies. The overview gives an example: if any enterprise disables Copilot Chat in GitHub, it is disabled for that user. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies). The documented exceptions are AI credit paid usage, which applies to each enterprise rather than to the user, and GitHub Spark.

Guide advice: keep the documented lists beside every conflict trace. Do not infer a rule from a policy's name; look it up.

## Worked example: an indexing gap

**Hypothetical starting state:** The tooling organization explicitly enables semantic indexing for non-GitHub repositories. A developer also holds a seat from the docs organization, where the policy is Unconfigured. The developer reports that indexing is unavailable.

The administrator identifies the policy as most restrictive with an explicit-enable requirement. Unconfigured in docs behaves as disabled.

**Outcome:** The predicted state is unavailable, matching the report. Options are an explicit enable in docs, after its owner approves, or removing the docs seat. The record cites the explicit-enable rule.

## Practice: classify a mixed set

**Prerequisites:** A hypothetical user seated by two organizations in one enterprise and separately licensed by a second enterprise. No settings need to be changed.

1. For Copilot Metrics API (enabled/disabled), apply the organization rule.
2. For Copilot CLI (enabled/disabled), apply the organization rule.
3. For Copilot Chat in GitHub, disabled by the second enterprise only, apply the multi-enterprise rule.
4. For AI credit paid usage, state how the exception applies.
5. In an authorized sandbox, compare with observed results. Without a sandbox, compare with the model answer.

**Expected result:** Disabled, enabled, disabled, and per-enterprise.

<details>
<summary>Model answer</summary>

Metrics API: disabled, most restrictive. CLI: enabled, least restrictive. Chat in GitHub: disabled, because the multi-enterprise rule is usually most restrictive. AI credit paid usage: decided by each enterprise for its own billing, not combined for the user.

</details>
