---
title: Choose trusted directories
section: Local Risk Model
order: 3
description: Decide where a local agent may start, and review unfamiliar repositories before granting trust.
verified: "2026-11-27"
diagram: trusted-directories
checks:
  - question: Where does Copilot CLI store folders trusted for future sessions?
    answer: In the trustedFolders list in ~/.copilot/config.json, or under COPILOT_HOME if set.
  - question: Do agents run in a VS Code workspace that is in Restricted Mode?
    answer: No. Restricted Mode disables agents, the terminal, tasks and debugging until you trust the workspace.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
  - https://code.visualstudio.com/docs/editing/workspaces/workspace-trust
  - https://code.visualstudio.com/docs/agents/run/security
---

## What you will learn

- Explain what trusting a directory means in Copilot CLI and in VS Code.
- Review an unfamiliar repository before trusting it.

## Trust is a starting decision

When Copilot CLI starts, it asks whether you trust the files in the current directory. The [CLI documentation](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) advises launching it only from directories you trust and not from your home directory. It also says scoping to trusted directories is heuristic, so files outside them are not guaranteed to be protected. [Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) explains that you can trust a folder for the current session only, or for this and future sessions. Persistent choices are stored in `trustedFolders` in `~/.copilot/config.json`, and `COPILOT_HOME` changes that location.

VS Code uses [Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust). In Restricted Mode, AI agents, the terminal, tasks, debugging, workspace settings and some extensions are disabled. Trust is shared with the Agents window, and agents do not run in untrusted workspaces. Workspace tasks can run arbitrary commands, and trust does not stop a malicious extension. The [VS Code security baseline](https://code.visualstudio.com/docs/agents/run/security) recommends reviewing a repository in Restricted Mode before trusting it. Workspace MCP configuration files inherit Workspace Trust; MCP governance itself is a separate course.

## Worked example: an unfamiliar clone

**Hypothetical starting state:** A developer clones a third-party sample repository into `~/src/sample`. It contains `.vscode/tasks.json`, a `devcontainer.json` with a `postCreateCommand`, and a setup script. Their CLI `trustedFolders` already includes `~` from an earlier quick test.

The reviewer first removes `~` from `trustedFolders`, because trusting the home directory trusts everything beneath it. They open the clone in VS Code Restricted Mode and read the tasks, the dev container command and the script. Nothing runs during this review. They then decide to trust the folder for the current CLI session only, not for future sessions.

**Outcome:** Trust is limited to one reviewed directory for one session. The home directory is no longer trusted, and the repository's executable configuration was read before anything could run.

## Practice: audit trusted folders

**Prerequisites:** Copilot CLI installed on a test account, and VS Code with Workspace Trust enabled. Do not delete configuration you cannot restore.

1. Open `~/.copilot/config.json` (or the file under `COPILOT_HOME`) and list each `trustedFolders` entry.
2. Flag broad entries, such as a home directory or a parent of many repositories.
3. For one flagged repository, open it in VS Code Restricted Mode and list files that can execute code.
4. Decide whether to keep, narrow or remove each entry, and record why.

**Expected result:** A short trust register listing each folder, its scope, the executable files reviewed and a keep, narrow or remove decision.

<details>
<summary>Model answer</summary>

`~` is removed because it is too broad. `~/src/service-a` is kept after review. `~/src/sample` is trusted for one session only. The register notes the reviewed `.vscode/tasks.json`, `devcontainer.json` and setup scripts. It also records that CLI directory scoping is heuristic, so trust alone is not a file-access boundary.

</details>
