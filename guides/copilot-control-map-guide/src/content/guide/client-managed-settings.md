---
title: Client managed settings
section: Client and Network Layers
order: 10
description: Choose between server, device management and file sources for managed settings, and record their reach and precedence.
verified: "2026-11-27"
diagram: managed-settings-sources
checks:
  - question: Which managed settings source wins for most keys when several define the same key?
    answer: Device management (MDM), then the server-managed file, then the local file, then user settings.
  - question: Which keys combine in the most restrictive direction instead of following source precedence?
    answer: sandbox, the permissions deny, ask and allow rules, and strictPluginOnlyCustomization.
  - question: Does the server-managed file reach a contractor who uses a personal Copilot plan on a managed laptop?
    answer: No. The server file applies only to users licensed by the enterprise; a machine-level source is needed for anyone on the machine.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
---

## What you will learn

- Compare server-managed, device-managed and file-based settings by reach.
- Apply the documented precedence and its restrictive exceptions.
- Record client support per key rather than per file.

## Three sources, one effective configuration

The [getting started page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) lists Copilot CLI, VS Code, the Copilot app, Copilot in the cloud and JetBrains as supported clients. The [deployment how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) describes three sources:

| Source | Where | Reach |
| --- | --- | --- |
| Server-managed | `copilot/managed-settings.json` in the enterprise's `.github-private` repository | All supported clients, including Copilot in the cloud; enterprise-licensed users only; team overrides possible |
| Device management | Windows registry under `HKLM\SOFTWARE\Policies\GitHubCopilot`; macOS `com.github.copilot` domain; no Linux | Local clients on that device, regardless of license source |
| File-based | A `managed-settings.json` file in a documented system path per OS | Local clients on that device |

For most keys the precedence is device management, then server, then file, then the user's own settings. The exceptions are `sandbox`, the `permissions` deny, ask and allow rules, and `strictPluginOnlyCustomization`, which combine in the most restrictive direction. The [settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) lists keys such as `permissions.disableBypassPermissionsMode`, `model` and `telemetry`, and shows that client support varies by key. Browser use under `features.browserUse` is public preview.

Two operational facts belong in the map. Clients pick up server changes within about an hour, or on restart or sign-in. If Copilot CLI cannot reach the server and has no cached copy, the server policy is unavailable for that session, so a machine-level source is the stronger choice for must-hold rules. The [managed settings deep dive](https://ragmha.github.io/field-guides/copilot-managed-settings-guide/) covers keys and rollout in detail.

## Worked example: choosing a source

**Hypothetical starting state:** Fictional Larkspur Freight wants to disable bypass permissions mode for every Copilot client on company laptops, including contractors who bring their own Copilot plan.

The server file alone reaches only enterprise-licensed users. The endpoint team therefore also deploys the key through device management on Windows and macOS, and a file in the documented Linux path. The server file remains for Copilot in the cloud, which device management does not reach.

**Outcome:** One requirement becomes two inventory rows: server file (owner: AI governance lead) and device configuration (owner: endpoint lead).

## Practice: predict the effective value

**Prerequisites:** The precedence rules above.

1. Assume the server file sets `model` to one value and an MDM profile sets a different value.
2. Assume the server file denies a shell command and the local file allows it.
3. Predict the effective result in each case.

**Expected result:** Two predictions with the rule that produced each.

<details>
<summary>Model answer</summary>

`model`: the MDM value applies, because device management has the highest precedence for ordinary keys. Shell command: denied, because permission rules combine in the most restrictive direction and deny takes precedence over allow.

</details>
