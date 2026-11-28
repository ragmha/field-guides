---
title: Detect and explain drift
section: Verification and Drift
order: 19
description: Recognize how caches, client versions, fetch failures and malformed values make endpoints diverge from intent.
verified: "2026-11-27"
diagram: drift-detection
checks:
  - question: In Copilot CLI, what happens when the server-managed fetch fails and no cached response exists?
    answer: The server-managed policy is unavailable for that session. Use MDM or file delivery for restrictions that must survive without a server response.
  - question: What does `forceRemoteSettingsRefresh` do in VS Code if the startup refresh fails?
    answer: Copilot features are blocked until the required refresh succeeds.
  - question: How does a client treat a malformed MCP allowlist?
    answer: As an empty `allowedMcpServers` list, which blocks all servers except built-in defaults.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
  - https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/
---

## What you will learn

- Name the documented causes of drift between intended and effective settings.
- Decide when `forceRemoteSettingsRefresh` is worth its availability cost.

## Where drift comes from

**Timing.** Server-managed settings refresh within about an hour; MDM is checked hourly; files load at startup. Between those moments, endpoints differ by design. The cloud agent observes changes on its next task assignment.

**Failed fetches.** In Copilot CLI, if the server-managed request fails and no cache exists, that policy is unavailable for the session ([deployment page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings)). For MCP lists, a retrieval or device-discovery error makes the client keep the previously enforced policy: it can become more restrictive, not less ([allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist)).

**Malformed or unknown values.** A malformed MCP list is treated as an empty allowlist. An unrecognized `disableBypassPermissionsMode` value makes the CLI log the problem and enforce `"disable"`. Both fail closed, which looks like drift to users.

**Client versions.** Older clients are blocked when `sandbox` is configured below its minimum version. VS Code shows a notice when the managed-settings service requires a newer version ([VS Code docs](https://code.visualstudio.com/docs/enterprise/manage-ai-settings)).

**Account and device changes.** Server-managed settings follow the signed-in account; device settings follow the machine and persist across account switches.

## Forcing a fresh fetch

`forceRemoteSettingsRefresh: true` makes CLI, VS Code and the app download server-managed settings at startup. In the CLI and app it skips the one-hour cache and blocks fallback to an older cached policy; a failed refresh restricts affected operations. In VS Code, Copilot features are blocked until refresh succeeds, so users need a network connection at startup. Deliver it by MDM or file so it applies from first startup; a server-managed value only takes effect on later startups. In the registry or macOS preferences, store `"true"` as a string, not a DWORD.

**Guide advice:** Reserve it for time-sensitive restrictions where stale policy is worse than a blocked start.

## Worked example: an offline laptop

**Hypothetical starting state:** A security fix adds a `permissions.deny` rule server-side. A developer's CLI on a laptop offline since yesterday still runs the denied command.

The administrator notes the server-managed layer depends on fetch and cache state, and that device delivery would have applied without a server response.

**Outcome:** The rule is also delivered by file to managed laptops, and the incident note records cache timing rather than calling it a bypass.

## Practice: classify drift reports

**Prerequisites:** The three hypothetical reports below. No settings are changed.

1. "My MCP servers all stopped after the change." (A list was edited by hand.)
2. "Sandbox settings broke my old CLI." (CLI 1.0.80.)
3. "VS Code says Copilot is blocked at startup on the train."

**Expected result:** Each report mapped to a documented cause and a next check.

<details>
<summary>Model answer</summary>

1. Likely malformed list treated as empty allowlist: check validation and JSON. 2. Below the `sandbox` minimum, so connections are blocked: upgrade to 1.0.93+. 3. `forceRemoteSettingsRefresh` blocks Copilot until a refresh succeeds: confirm network access, which is the expected trade-off.

</details>
