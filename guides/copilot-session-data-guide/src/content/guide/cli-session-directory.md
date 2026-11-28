---
title: Inside the CLI session directory
section: Local Storage
order: 6
description: Locate the full session record, the searchable store and logs, and know which are safe to remove.
verified: "2026-11-27"
diagram: cli-session-directory
checks:
  - question: Where does Copilot CLI keep each session's complete record by default?
    answer: In per-session subdirectories of ~/.copilot/session-state/, including an events.jsonl file.
  - question: Which local item is documented as safe to delete without caution?
    answer: The logs/ directory; it is re-created each session.
  - question: What happens to existing history if you change COPILOT_HOME?
    answer: Copilot won't find it unless you move the existing files to the new location.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions
---

## What you will learn

- Locate the complete session record, the cross-session store and process logs.
- Use the documented safe-to-delete guidance before cleaning up a machine.

## The configuration directory

Copilot CLI and the GitHub Copilot app store the complete record of each local session under `~/.copilot/session-state/` and a subset in a local SQLite session store that backs `/chronicle`, according to the [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data). IDE storage is specific to each IDE. The [configuration directory reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) describes the layout:

- `~/.copilot` is the default directory. Set `COPILOT_HOME` to move it; existing history is not found unless you move the files too. The cache directory is separate and uses `COPILOT_CACHE_HOME`.
- `session-state/` has one subdirectory per session ID, holding `events.jsonl` and workspace artifacts such as plans, checkpoints and tracked files.
- `session-store.db` is the SQLite cross-session store. It can be rebuilt.
- `logs/` holds `process-{timestamp}-{pid}.log` files.
- `command-history-state/` holds command history.

The reference rates deletion risk:

| Item | Safe to delete? | Effect |
| --- | --- | --- |
| `session-state/` | With caution | Removes local history and the ability to resume those sessions |
| `session-store.db` | With caution | Re-created automatically |
| `logs/` | Yes | Re-created each session |

Deleting `session-state/` removes only local copies; it does not touch data synced to GitHub. Because the [GitHub Copilot app](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions) is built on Copilot CLI, the same commands work there, and its **Manage sessions** view shows disk space used by working files and chat history.

Guide advice: treat `session-state/` as user data in device backup, reimaging and offboarding plans. It is the only local copy that can resume a session.

## Worked example: a full disk

**Hypothetical starting state:** A developer on the data team reports a nearly full disk. Their `~/.copilot` directory is large. They plan to delete the whole directory.

The reviewer checks the reference. `logs/` can be deleted freely. `session-store.db` would be re-created. Deleting `session-state/` would remove the ability to resume past sessions and local history, though any synced copies would remain on GitHub.

**Outcome:** The developer deletes `logs/` first and uses the session commands covered in the next lesson to remove specific old sessions, instead of deleting the directory.

## Practice: inventory a configuration directory

**Prerequisites:** The [configuration directory reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) and an authorized sandbox machine or account.

1. List the top-level entries of the Copilot configuration directory, noting whether `COPILOT_HOME` is set.
2. Classify each entry as record, index, log or other, with its documented deletion risk.
3. Do not delete anything. Without a sandbox, classify the five entries named above.

**Expected result:** An inventory showing which entry holds the complete record and which entries can be rebuilt or recreated.

<details>
<summary>Model answer</summary>

`session-state/`: record, delete with caution, loses history and resume. `session-store.db`: index, with caution, re-created automatically. `logs/`: log, safe. `command-history-state/`: other, no deletion rating given here. If `COPILOT_HOME` is set, inventory that directory instead of `~/.copilot`.

</details>
