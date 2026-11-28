---
title: Read the managed-settings keys
section: What Managed Settings Control
order: 2
description: Group the documented keys by purpose and tell a starting default from an enforced lock.
verified: "2026-11-27"
diagram: managed-settings-keys
checks:
  - question: Does setting the top-level `model` key stop a developer from choosing another model in a conversation?
    answer: No. It sets a starting default; users can still pick another available model per conversation.
  - question: Which permission rule wins when an operation matches deny, ask and allow rules?
    answer: Deny, then ask, then allow. A deny from any managed source applies.
  - question: What does `permissions.disableBypassPermissionsMode` set to `"disable"` do in Copilot CLI?
    answer: It blocks allow-all options such as `--yolo` and `/allow-all`, so they cannot grant elevated permissions.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
---

## What you will learn

- Group the managed-settings keys by the behavior they govern.
- Tell keys that set a default from keys that enforce a restriction.

## Keys by purpose

The [enterprise-managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) documents one JSON object. Its keys fall into a few groups:

- **Permissions:** `permissions.deny`, `ask` and `allow` rules use selectors such as `Shell()`, `Read()`, `Edit()` and `Domain()`. Deny beats ask, and ask beats allow. `disableBypassPermissionsMode`, `disableAssistedPermissionsMode` and `defaultMode` govern approval modes.
- **Features:** `features.computerUse` and `features.browserUse`. Browser use is **public preview**.
- **Models:** `model`, `autoTier` and `fusionTier`.
- **Plugins:** `enabledPlugins`, `extraKnownMarketplaces`, `strictKnownMarketplaces` and `strictPluginOnlyCustomization`.
- **MCP:** `allowedMcpServers` and `deniedMcpServers`.
- **Runtime and operations:** `sandbox`, `telemetry`, `remoteControl`, `forceRemoteSettingsRefresh` and, for the CLI only, `communication.support.url`.

This guide treats these keys as settings mechanics. Sibling guides cover MCP governance, sandboxing, model choice and telemetry in depth.

## Defaults versus locks

Some keys only set a starting point. `model` accepts `"auto"`, `"fusion"` or a model ID, but users can still choose another model per conversation. `permissions.defaultMode` picks `manual`, `assisted` or `allow-all` for new sessions; if the mode is unavailable or blocked, the session starts with manual approval.

Other keys restrict. Any `autoTier` or `fusionTier` value other than `"unmanaged"` locks the tier. `disableBypassPermissionsMode: "disable"` blocks allow-all options; in the CLI, an unrecognized value fails closed to `"disable"`. `sandbox` sets restrictions, not defaults.

## Worked example: a default mistaken for a lock

**Hypothetical starting state:** A platform team sets `"model": "auto"` and `"permissions": { "defaultMode": "manual" }`, then tells security that developers can no longer pick models or enable allow-all mode.

Reviewing the reference, the administrator notes that both keys are defaults. To block bypass modes, the team needs `disableBypassPermissionsMode: "disable"`. The reference describes `model` only as a default, so the claim about model choice is withdrawn.

**Outcome:** The proposal is rewritten to say which keys are defaults and which are locks, and `disableBypassPermissionsMode` is added for review. Nothing is deployed yet.

## Practice: classify a draft file

**Prerequisites:** A draft `managed-settings.json` in an authorized sandbox repository, and the reference page. Do not edit production settings.

1. List every key in the draft.
2. Mark each key as *default*, *lock* or *restriction*, citing the reference sentence.
3. Flag any key in **public preview**.
4. Note keys whose reference entry lists client-specific behavior, for review in the next lesson.

**Expected result:** A table that tells a reviewer which keys developers can still override in a session.

<details>
<summary>Model answer</summary>

For a draft with `model`, `permissions.defaultMode`, `permissions.deny` and `features.browserUse`: `model` and `defaultMode` are defaults; `deny` is a restriction, and a deny from any managed source applies; `features.browserUse` is a feature control in **public preview**. Ask the security reviewer whether a bypass lock was intended.

</details>
