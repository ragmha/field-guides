---
title: Deliver a managed file
section: Device Deployment
order: 11
description: Place managed-settings.json at the per-OS path with the ownership the CLI requires.
verified: "2026-11-27"
diagram: file-based-delivery
checks:
  - question: Where does file-based delivery place the managed file on Linux?
    answer: "`/etc/github-copilot/managed-settings.json`."
  - question: What file properties does Copilot CLI require on macOS and Linux?
    answer: A regular file owned by root, not group- or world-writable, and not a symbolic link. The CLI rejects other files.
  - question: How do clients pick up an updated managed file?
    answer: Users restart supported clients so the file is loaded at startup.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
---

## What you will learn

- Place the managed file at the correct path for each operating system.
- Meet the CLI's file-ownership checks and plan restarts.

## Paths and permissions

[File-based delivery](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) uses the same JSON schema as the server-managed file:

| Platform | Path |
| --- | --- |
| macOS | `/Library/Application Support/GitHubCopilot/managed-settings.json` |
| Windows | `%ProgramFiles%\GitHubCopilot\managed-settings.json` |
| Linux | `/etc/github-copilot/managed-settings.json` |

Distribute the file with your normal device management process. Machines that do not receive it are not restricted by it. For Copilot CLI on macOS and Linux, the file must be a regular file owned by `root`, not group- or world-writable, and not a symbolic link; the CLI rejects files that fail these checks.

Clients load the file at startup, so ask users to restart supported clients after an update.

## When to use a file

File delivery works on every platform, including containers and Codespaces, where server-managed or MDM delivery may not be available. Like MDM, it applies before sign-in, regardless of license source, and to local clients only. It is lowest among managed sources: MDM and server-managed settings take precedence over it, except for keys that compose restrictively.

Some settings are device-only. The reference notes that Copilot CLI `sandbox` host rules (`allowedHosts`, `blockedHosts`) can come from user or device-managed settings but are not supported in the server-managed file. Sandbox design belongs to the local sandboxing guide.

## Worked example: a dev container image

**Hypothetical starting state:** A team builds a Linux dev container image for Copilot CLI and wants `disableBypassPermissionsMode` enforced inside it. A first attempt copies the file in as a symlink to a writable volume.

The CLI rejects the symlink. The team changes the image build to write a regular file at `/etc/github-copilot/managed-settings.json`, owned by root with mode `644`.

**Outcome:** New containers load the file at startup. The team records that existing containers keep the old state until they restart.

## Practice: stage a file safely

**Prerequisites:** An authorized sandbox Linux or macOS machine or container with Copilot CLI. Do not change production endpoints.

1. Write `{ "permissions": { "disableBypassPermissionsMode": "disable" } }` to the documented path.
2. Set ownership to root and remove group and world write permission.
3. Restart the CLI and try an allow-all option such as `--allow-all`.
4. Replace the file with a symlink in the sandbox and note the CLI behavior, then restore the regular file.

**Expected result:** The allow-all option has no effect with the regular file; the symlink variant is rejected.

<details>
<summary>Model answer</summary>

With a root-owned, non-writable regular file, `--allow-all` cannot grant elevated permissions after restart. With a symlink, the CLI rejects the file, so record that as a misconfiguration rather than a policy. Restore the regular file before you finish.

</details>
