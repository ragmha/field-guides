---
title: Apply the precedence order
section: Precedence and Composition
order: 14
description: Predict which delivery method supplies a key and how VS Code device policies interact.
verified: "2026-11-27"
diagram: deployment-precedence
checks:
  - question: What is the documented precedence order for managed settings?
    answer: MDM-managed, then server-managed, then file-based, then user-level settings.
  - question: Can a developer's workspace or user setting override an enforced managed value?
    answer: No. User settings are lowest, and VS Code troubleshooting notes that changing user or workspace settings does not override an enforced policy.
  - question: In VS Code, which wins when an enterprise-managed setting and a VS Code device policy configure the same control?
    answer: The enterprise-managed setting. The values are not merged.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
  - https://code.visualstudio.com/docs/enterprise/troubleshooting
---

## What you will learn

- Apply the delivery-method precedence order to a single key.
- Predict how enterprise-managed settings interact with VS Code device policies.

## The order

When the same key arrives from several sources, [the deployment page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) applies this order, highest first:

1. MDM-managed settings
2. Server-managed settings
3. File-based settings
4. User-level settings

For most keys the highest source that sets the key wins outright. The next lesson covers the exceptions that compose restrictively instead.

Server-managed team overrides are resolved by GitHub before delivery, so a team value competes as part of the server-managed layer. MDM and file settings ignore team membership.

## VS Code device policies are a separate system

VS Code also has its own device policies. The [VS Code enterprise page](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) states:

- Different controls from the two systems both apply.
- When both configure the same control, the enterprise-managed setting wins; values are not merged.
- If enterprise-managed settings do not provide the control, the device policy stays in effect.

**Recommended (VS Code docs):** configure an overlapping control through one management solution where possible, and run **Developer: Policy Diagnostics** to see the effective value and its source. The [troubleshooting page](https://code.visualstudio.com/docs/enterprise/troubleshooting) adds that changing user or workspace settings does not override an enforced policy; correct the configuration in the system that owns it.

## Worked example: two sources disagree on the model default

**Hypothetical starting state:** IT deploys `model` = a specific model ID by MDM. The AI platform team sets `"model": "auto"` in the server-managed file. A developer sets a preferred model in user settings.

Following the order, MDM wins over server-managed and user settings.

**Outcome:** New conversations start with the MDM model, and the platform team's change has no visible effect on those devices. The teams agree that `model` belongs to the server-managed file and remove it from the MDM payload in a later change.

## Practice: trace a key across sources

**Prerequisites:** The hypothetical sources below, or an authorized sandbox device with VS Code. Do not change production settings.

1. For `autoTier`, write the value from MDM (none), server (`"balance"`), file (`"unmanaged"`) and user settings (`"intelligence"`).
2. Apply the precedence order to predict the effective value.
3. In a sandbox, compare the prediction with **Developer: Policy Diagnostics**.

**Expected result:** A prediction naming the source that supplies the value.

<details>
<summary>Model answer</summary>

MDM does not set the key, so the server-managed `"balance"` wins over the file and user values, and it locks the tier because it is not `"unmanaged"`. Diagnostics should show a server-managed source. If it does not, check delivery before changing the configuration.

</details>
