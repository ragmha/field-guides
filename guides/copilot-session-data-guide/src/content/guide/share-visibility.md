---
title: Sharing and visibility
section: Sharing and Export
order: 14
description: Know which sessions are shared by default and what a recipient can see and do.
verified: "2026-11-27"
diagram: share-visibility
checks:
  - question: Which sessions are shared by default?
    answer: Cloud agent sessions on GitHub Actions, visible to people with repository access.
  - question: Can a recipient of a shared session steer it?
    answer: No. Sharing is view-only; recipients see prompts, responses and file changes.
  - question: Does a shared session appear in the recipient's /chronicle results?
    answer: No. Shared sessions are not indexed in other users' session queries.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
---

## What you will learn

- Identify the default sharing state for each session type.
- Describe what sharing grants and how to stop sharing.

## Default sharing by session type

The [agent management how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) and the [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) give these defaults:

- **Cloud agent sessions on GitHub Actions:** shared by default with people who have repository access. They appear under "All sessions" on the repository's **Agents** tab.
- **Cloud sandbox sessions:** unshared by default.
- **Local sessions** (CLI, VS Code, JetBrains, the app): unshared by default. Once synced, they can be shared.

On GitHub.com you change sharing through **Sharing settings** in a session's `...` menu. In Copilot CLI, `/share link` creates a link on GitHub.com and `/share off` stops sharing, according to the [CLI session data how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle). Running `/share` with no arguments opens a menu and shares nothing by itself.

## What a recipient gets

Sharing grants view-only access to people who have access to the repository. Recipients see the session's prompts, responses and file changes but cannot steer it. Shared sessions are not indexed in recipients' own session queries, so they do not appear in their `/chronicle` results.

Two related records are visible without sharing. The session log of a cloud agent session shows progress, internal reasoning and the tools used. Commits from a cloud agent are authored by Copilot with the person who started the session as co-author, are signed, and include a link to the session logs in the commit message.

Guide advice: because cloud agent session logs are shared with everyone who can read the repository, review prompts for that audience before starting a cloud agent session on a widely readable repository.

## Worked example: a handoff

**Hypothetical starting state:** A developer on the billing team investigated an incident in a local CLI session that has synced. A teammate with repository access needs to see the investigation. The developer also has an unrelated cloud agent session on the same repository.

The developer runs `/share link` for the CLI session and sends the link. The teammate can read prompts, responses and file changes but cannot continue the session. The cloud agent session is already visible to the teammate through the Agents tab, because it is shared by default.

**Outcome:** The teammate can view both. After the handoff, the developer runs `/share off` for the CLI session. The cloud agent session stays shared because that is its default.

## Practice: audit sharing on a repository

**Prerequisites:** An authorized sandbox repository with at least one cloud agent session and one synced local session.

1. Open the repository's Agents tab and list sessions under "All sessions".
2. For each, record type, default sharing state and current state.
3. Do not change sharing on real work. Without a sandbox, fill the table for the worked example.

**Expected result:** A table that shows which sessions are visible to repository readers and why.

<details>
<summary>Model answer</summary>

Cloud agent session: GitHub Actions, shared by default, shared. CLI session: local, unshared by default, shared during the handoff and unshared afterward. A sandbox session would be unshared unless someone changed it.

</details>
