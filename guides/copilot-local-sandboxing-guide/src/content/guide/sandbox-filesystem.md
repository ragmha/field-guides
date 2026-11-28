---
title: Read a sandbox filesystem policy
section: Local Sandboxing
order: 14
description: Predict and verify which paths a sandboxed command can write, read or not reach.
verified: "2026-11-27"
diagram: sandbox-filesystem
checks:
  - question: If a path is both granted read/write and denied, what access does a sandboxed command get?
    answer: None. Denied access takes precedence over grants.
  - question: Which command shows the effective sandbox policy for a command without running it?
    answer: /sandbox policy followed by the command.
  - question: Is local sandboxing on by default in Copilot CLI?
    answer: No. Turn it on with /sandbox enable or --sandbox, or an enterprise can require it.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing
  - https://code.visualstudio.com/docs/agents/run/agent-sandboxing
---

## What you will learn

- Resolve read/write, read-only and denied grants for a path.
- Verify the effective policy before relying on it.

## Deny by default, then grant

[About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) explains that sandboxing is off by default in Copilot CLI and the GitHub Copilot app. Turn it on with `/sandbox enable` or `copilot --sandbox`. It uses macOS Seatbelt, Linux bubblewrap or recent Windows 11 features, and unsupported hosts have documented fallbacks.

[Understanding local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing) describes a deny-by-default filesystem with three levels: read/write, read-only and denied. Denied beats any grant. Between read-only and read/write, the more specific path wins. **Include working directory** (on by default) grants read/write to the working directory plus Git metadata; from a subdirectory, the whole repository is readable but writes stay in the working directory and `.git`. **Allow developer tool access** (on by default) grants read-only access to `PATH` directories, toolchain locations and package-manager caches, and some granted configuration files hold registry credentials.

[Using local sandboxing](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing) confirms that the whole home directory is not granted by default. `/add-dir PATH` adds session-only read/write access. `/sandbox policy COMMAND` shows the effective policy without running the command, and `/sandbox status` shows whether the sandbox is on. One caveat: a missing denied path is created as a directory, so a denied `.env` that does not exist becomes a folder. VS Code has an equivalent [agent sandbox](https://code.visualstudio.com/docs/agents/run/agent-sandboxing), with `readwritePaths`, `readonlyPaths` and `deniedPaths` lists.

## Worked example: a denied credentials folder

**Hypothetical starting state:** A developer turns on sandboxing in a monorepo subdirectory, `~/src/mono/api`. They add `~/.aws` as denied and `~/src/shared` as read-only. A build needs to write `~/src/mono/web/dist`.

The reviewer predicts: `api` is read/write; the rest of `mono` is read-only, so the `web/dist` write fails; `~/src/shared` is readable; `~/.aws` is denied. Running `/sandbox policy cat ~/.aws/credentials` confirms the denial without running the command.

**Outcome:** The prediction matches the reported policy. The developer uses `/add-dir ~/src/mono/web/dist` for this session instead of widening access permanently.

## Practice: predict, then verify

**Prerequisites:** Copilot CLI on a supported test machine with sandboxing available. Use a test repository.

1. Write down the expected access for the working directory, its repository, your home directory and one cache directory.
2. Turn sandboxing on with `/sandbox enable`.
3. Run `/sandbox policy` for a read of each path and a write to one of them.
4. Compare the reported policy with your predictions and note any differences.

**Expected result:** A table of paths with predicted and reported access, and an explanation for any mismatch.

<details>
<summary>Model answer</summary>

Working directory: read/write. Rest of repository: read-only. Home directory: not granted. Package cache: read-only or writable, depending on the cache. Any mismatch is traced to developer tool access, a more specific grant or a managed setting marked "(managed)".

</details>
