---
title: The least-restrictive rule
section: Conflict Rules
order: 10
description: Predict the result for a user licensed by several organizations in one enterprise when a delegated policy disagrees.
verified: "2026-11-27"
diagram: least-restrictive-rule
checks:
  - question: A user is licensed by two organizations. One enables Copilot CLI and the other disables it. What is the predicted result?
    answer: Enabled. Copilot CLI follows the least-restrictive rule, so if any licensing organization enables it, it is enabled for that user everywhere.
  - question: Why does the least-restrictive rule matter for an organization that wants to restrict a feature?
    answer: Its disable does not hold for users who also receive a license from an organization that enables the feature.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- State the least-restrictive rule and when it applies.
- Name policies that GitHub lists as least restrictive.
- Predict an effective result from two disagreeing organization settings.

## Any enable wins

Conflicts arise when an enterprise delegates a policy by letting organizations decide, and a user receives Copilot from organizations that chose differently. For a policy that follows the least-restrictive rule, if any organization enabled the feature, it is enabled for that user everywhere. See [Feature availability when policies conflict](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts). The policy overview adds the scope: when a user receives licenses from multiple organizations in the same enterprise, the least-restrictive policy usually applies, with some exceptions. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

The reference lists these policies as least restrictive: Copilot can search the web, Copilot in the cloud, Copilot Chat in the IDE, Copilot Agent Mode in IDE Chat, Copilot code review, Spark, Copilot in GitHub Desktop, Copilot CLI, the GitHub Copilot app, editor preview features, MCP servers in Copilot, and Copilot-generated commit messages. Editor preview features cover features in **public preview**.

The rule only combines delegated values from seat-granting organizations. It does not override a fixed enterprise state, and it does not make a feature work on a surface the policy does not cover.

Guide advice: if a team must keep a least-restrictive feature off, the reliable controls are a fixed enterprise state or a seat that comes from only one organization. Disabling it in one organization is not enough for users seated by more.

## Worked example: two organizations disagree on web search

**Hypothetical starting state:** The enterprise lets organizations decide **Copilot can search the web**. The research organization enables it; the payments organization disables it. A developer holds seats from both.

The administrator confirms the policy is delegated, confirms both seat sources, and looks up the rule. Web search is listed as least restrictive.

**Outcome:** The predicted state is enabled for that developer, including when working on payments repositories. Payments-only users remain disabled. If payments requires a firm restriction for everyone, the request goes to the enterprise owner as a proposed fixed state.

## Practice: predict four dual-seat results

**Prerequisites:** The [policy conflicts reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) and a hypothetical user seated by two organizations, with these values: Copilot CLI enabled/disabled, Spark disabled/disabled, MCP servers in Copilot disabled/enabled, and Copilot code review enabled/enabled. No settings need to be changed.

1. Confirm each policy is in the least-restrictive list.
2. Apply the rule to each pair.
3. Write the predicted result and the deciding organization.
4. In an authorized sandbox, compare with what a test user sees. Without a sandbox, compare with the model answer.

**Expected result:** Three enabled results and one disabled result.

<details>
<summary>Model answer</summary>

Copilot CLI: enabled, from the first organization. Spark: disabled, because neither enabled it. MCP servers in Copilot: enabled, from the second organization. Copilot code review: enabled by both. Each prediction still needs confirmation on the actual surface.

</details>
