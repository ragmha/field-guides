---
title: Delegation and default availability
section: Policy Layers
order: 3
description: Follow a delegated or unconfigured feature through the enterprise and organization default policies.
verified: "2026-11-27"
diagram: delegation-and-defaults
checks:
  - question: Does the default policy for new features and clients decide availability of a feature in preview?
    answer: No. The documentation says the policy does not apply to features in preview.
  - question: At the organization level, which features does the default policy for new features apply to?
    answer: Features the enterprise has set to let organizations decide that an organization owner has not explicitly configured.
  - question: An enterprise sets the default for new features to enabled everywhere. Can an organization disable an unconfigured GA feature?
    answer: No. Enabled everywhere enables any unconfigured GA feature for all Copilot users, and organizations cannot disable it.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Distinguish an explicit decision from an unconfigured policy.
- Trace an unconfigured generally available (GA) feature through enterprise and organization defaults.
- Recognize the documented exceptions to default availability.

## Delegation is not the end of the trace

Letting organizations decide hands the decision to organization owners, but an organization owner might never configure it. For Copilot Business and Copilot Enterprise, the **Default policy for new features and clients** fills that gap for GA features. See [About default availability](https://docs.github.com/en/copilot/concepts/enterprise/default-availability).

At the enterprise level the default policy applies to features labeled **Unconfigured**, and it has three states:

- **Let organizations decide**: an unconfigured feature is set to let organizations decide if its policy supports that option; otherwise it is disabled. For a delegated feature an organization owner has not configured, the organization's own default policy decides.
- **Enabled everywhere**: any unconfigured GA feature is enabled for all Copilot users, and organizations cannot disable it.
- **Disabled everywhere**: any unconfigured GA feature is disabled for all Copilot users, and organizations cannot enable it.

The policy does not apply to features in preview. For this policy, a feature means any policy on the enterprise **Features & clients** page plus the **MCP servers in Copilot** policy. Documented exclusions include **Store local sessions in the Cloud** and the GHE.com restrictive model policies. Models have a separate **Default availability for released models** policy, covered in Part 5.

Guide advice: an explicit setting is easier to defend than a default. Where a feature matters for compliance, record whether its state is explicit or inherited.

## Worked example: an unconfigured feature in two organizations

**Hypothetical starting state:** A new GA client policy appears on the enterprise **Features & clients** page as **Unconfigured**. The enterprise default for new features is let organizations decide. The data organization has set its default to disabled; the web organization has set its default to enabled. Neither has configured the new policy explicitly.

The administrator traces the feature. Because the enterprise default delegates, the feature becomes delegated if its policy supports that. Each organization's default then decides: disabled in the data organization, enabled in the web organization. A person licensed by both organizations then needs the feature's conflict rule from Part 3.

**Outcome:** Predicted states are disabled for data-only users and enabled for web-only users, with dual-licensed users pending the conflict rule. The record marks both values as inherited from defaults, not explicit choices.

## Practice: trace three unconfigured features

**Prerequisites:** The [default availability page](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) and three hypothetical features: one GA, one in preview and one excluded from the default policy. No settings need to be changed.

1. State the enterprise default policy you are assuming.
2. For each feature, decide whether the default policy applies.
3. Where it applies, follow it to the organization default if the enterprise delegates.
4. In an authorized sandbox, compare with the displayed states. Without a sandbox, compare with the model answer.

**Expected result:** Only the GA feature follows the defaults; the other two need their own policy or documentation checked.

<details>
<summary>Model answer</summary>

GA feature: follows the enterprise default, then the organization default if delegated. Preview feature: not covered by the default policy; check its own policy and preview terms. Excluded policy, such as **Store local sessions in the Cloud**: not affected by the default policy; configure or read it directly.

</details>
