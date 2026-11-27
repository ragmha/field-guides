---
title: Client sync controls
section: Syncing and Policy
order: 10
description: Predict whether a local session syncs from CLI configuration, run flags and VS Code settings.
verified: "2026-11-27"
diagram: sync-controls
checks:
  - question: What is the default value of remoteExport in Copilot CLI?
    answer: true. Session history syncs when syncing is available.
  - question: How do you override remoteExport for a single CLI run?
    answer: Use --sync-session=on or --sync-session=off.
  - question: Does turning off VS Code session sync delete data already synced?
    answer: No. Existing synced sessions remain on GitHub.com until you delete them.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
---

## What you will learn

- Read the CLI and VS Code settings that control session sync.
- Explain why turning sync off is not the same as deleting synced data.

## Copilot CLI and the app

The [configuration directory reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) documents these controls:

- `remoteExport` is a boolean that defaults to `true`. It syncs session history when syncing is available; set it to `false` to opt out.
- `--sync-session=on` or `--sync-session=off` overrides `remoteExport` for one run.
- `remoteSessions: true`, which turns on remote control and defaults to `false`, also enables export.
- Syncing is refused when the organization's cloud session storage policy is off or cannot be determined.

Because the GitHub Copilot app is built on Copilot CLI, its local sessions follow the same default: synced unless opted out or blocked by policy.

## VS Code

VS Code documents its own controls on the [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history). Session sync there is **experimental** and off by default:

| Setting | Default | Purpose |
| --- | --- | --- |
| `github.copilot.chat.localIndex.enabled` | `true` | Local session tracking, a prerequisite for sync |
| `chat.sessionSync.enabled` | `false` | Sync sessions to your GitHub account |
| `chat.sessionSync.excludeRepositories` | `[]` | `owner/repo` names or glob patterns that do not sync |

Before syncing, VS Code filters detected secrets by matching known patterns and values. The page warns that this might not detect every secret. Turning sync off does not delete data already synced; those sessions remain on GitHub.com until you delete them.

Guide advice: client settings are user preferences, so do not treat a developer's `false` value as an organizational control. Use the policy in the next lesson for that.

## Worked example: two clients, one developer

**Hypothetical starting state:** A developer on the mobile team uses both Copilot CLI and VS Code. Their organization allows cloud session storage. The CLI configuration has no `remoteExport` entry; VS Code settings are at their defaults. They want work on `example-org/payments-*` repositories never to sync from VS Code.

The CLI has no entry, so `remoteExport` takes its default of `true` and CLI sessions sync. VS Code defaults `chat.sessionSync.enabled` to `false`, so VS Code sessions do not sync. If the developer enables VS Code sync, they add `example-org/payments-*` to `chat.sessionSync.excludeRepositories`.

**Outcome:** Predicted: CLI sessions sync; VS Code sessions stay local until sync is enabled; once enabled, matching repositories are excluded. These are predictions from documented defaults.

## Practice: write a sync prediction table

**Prerequisites:** The two sources above and an authorized sandbox account if you want to observe results.

1. Make rows for: CLI default; CLI with `remoteExport: false`; CLI with `remoteExport: false` run with `--sync-session=on`; VS Code default; VS Code with sync enabled.
2. Assume the policy allows syncing. Write synced or local for each row.
3. In the sandbox, test one row and check the session sync status or the Agents tab. Without a sandbox, label the table as predicted.

**Expected result:** Five predictions that show the run flag overriding configuration and VS Code being off by default.

<details>
<summary>Model answer</summary>

CLI default: synced. `remoteExport: false`: local. With `--sync-session=on`: synced for that run. VS Code default: local. VS Code enabled: synced, except excluded repositories. If the policy is off or cannot be determined, every row is local.

</details>
