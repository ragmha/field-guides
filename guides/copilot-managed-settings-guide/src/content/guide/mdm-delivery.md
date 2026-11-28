---
title: Deliver settings through MDM
section: Device Deployment
order: 10
description: Convert managed settings to native Windows and macOS policy values and assign them to device groups.
verified: "2026-11-27"
diagram: mdm-delivery
checks:
  - question: Where does native MDM delivery place Copilot managed settings on Windows?
    answer: As `REG_SZ` string values under `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot`.
  - question: How do you deliver `sandbox.enabled` set to true through native MDM?
    answer: Use the dot-separated key `sandbox.enabled` with the string value `true`.
  - question: Does native MDM delivery reach Copilot cloud agent?
    answer: No. MDM-managed settings apply to local clients only.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
  - https://code.visualstudio.com/docs/enterprise/policies
---

## What you will learn

- Convert JSON settings to native MDM key and string values.
- Recognize what MDM delivery does and does not reach.

## Same keys, different encoding

[Native MDM delivery](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) uses the same logical keys as `managed-settings.json` but does not deploy a file. The MDM platform writes individual string values:

| Platform | Native location |
| --- | --- |
| Windows | `REG_SZ` values under `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot` |
| macOS | Forced managed preferences in the `com.github.copilot` domain |
| Linux | Not supported; use file-based settings |

Every value is a string. Nested settings use dot-separated keys such as `permissions.disableBypassPermissionsMode`. Ordinary strings are stored directly; booleans, arrays and objects are stored as JSON text, for example `enabledPlugins` = `{"PLUGIN-NAME@MARKETPLACE-NAME":true}`.

The Copilot location is separate from VS Code's own device policies under `Software\Policies\Microsoft\VSCode`. The [VS Code enterprise page](https://code.visualstudio.com/docs/enterprise/manage-ai-settings) notes that enterprise-managed settings use the Copilot format and delivery path, not the VS Code device-policy namespace, even when the same MDM tool deploys both.

## What MDM is good for

MDM settings load from the device. They can apply before sign-in, stay active when users switch accounts and apply regardless of where the user's license comes from. They reach local clients only, and do not support enterprise team overrides; target groups with MDM assignments instead. Clients check hourly without a restart; in VS Code, **Developer: Sync Account Policy** forces a check for testing.

**Guide advice:** The deployment page suggests MDM for non-negotiable security policies owned by IT, combined with server-managed settings for settings that change more often. Mixing methods makes the effective policy harder to reason about, so document which method owns each key.

## Worked example: a bypass lock for contractors' laptops

**Hypothetical starting state:** Contractors use enterprise-managed Windows laptops but receive Copilot licenses from their own employers, so server-managed settings do not reach them.

The administrator deploys `permissions.disableBypassPermissionsMode` = `disable` as a `REG_SZ` value to the contractor device group.

**Outcome:** Because MDM applies regardless of license source, supported local clients on those laptops block bypass modes. Cloud agent sessions are unaffected.

## Practice: encode three values

**Prerequisites:** An authorized sandbox device group in your MDM platform, or paper only. Do not change production policy.

1. Encode `permissions.disableBypassPermissionsMode: "disable"`, `sandbox.enabled: true` and `permissions.deny: ["Shell(git push *)"]` as native key and value pairs.
2. If you have a sandbox device, assign the policy and run **Developer: Sync Account Policy** in VS Code.
3. Record which clients on the device should honor each key.

**Expected result:** Three dot-separated string pairs and a list of covered local clients.

<details>
<summary>Model answer</summary>

`permissions.disableBypassPermissionsMode` = `disable`; `sandbox.enabled` = `true`; `permissions.deny` = `["Shell(git push *)"]` as JSON text. Covered clients follow the reference matrix; for example, `sandbox` needs CLI 1.0.93+, VS Code 1.141.0+ (Agent Host) or app 1.1.26+. `git push *` matches the command prefix, per the reference selector syntax.

</details>
