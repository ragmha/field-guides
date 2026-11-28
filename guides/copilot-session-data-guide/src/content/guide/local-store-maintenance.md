---
title: Maintain and repair the local store
section: Local Storage
order: 7
description: Use session commands to prune, delete and reindex local sessions without touching synced data.
verified: "2026-11-27"
diagram: local-store-maintenance
checks:
  - question: Does /session cleanup delete anything?
    answer: No. It only shows a storage summary.
  - question: Do /session delete-all and /session prune affect synced data?
    answer: No. They affect only local sessions.
  - question: What should you run after manually deleting a session directory?
    answer: /chronicle reindex, which rebuilds the session store and syncs.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
  - https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
---

## What you will learn

- Choose the right local command to inspect, prune or delete sessions.
- Know when to rebuild the session store with a reindex.

## Session commands

The [CLI session data how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle) lists the local maintenance commands:

- `/session cleanup` shows a storage summary. It deletes nothing.
- `/session prune --older-than DAYS` removes local sessions older than the threshold. Add `--dry-run` to preview.
- `/session delete` deletes the current session. `/session delete SESSION-ID` shows a preview; add `--yes` to confirm.
- `/session delete-all --yes` deletes local sessions but skips sessions currently in use.

`delete-all` and `prune` affect only local sessions, not synced data. You cannot delete synced data from the local machine with these bulk commands; use GitHub.com or the per-session delete prompt covered in Part 5. To find a session ID, use `/session`; to resume, use `copilot --continue`, `copilot --resume [SESSION-ID]` or `/resume`.

## Reindex

Session data is written to disk periodically and when a session ends. The session store can drift from `session-state/` after a crash, a migration, a restore from backup, a corrupt or deleted `~/.copilot/session-store.db`, or a manually deleted session directory. `/chronicle reindex` rebuilds the store and syncs. The [configuration reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference) confirms the store is re-created automatically if removed.

Guide advice: prefer the session commands to deleting folders by hand. If you must delete by hand, reindex afterward so `/chronicle` results no longer include the removed session.

## Worked example: a quarterly cleanup

**Hypothetical starting state:** The platform team asks developers to remove local sessions older than 90 days from shared build machines. One developer deleted a few session folders by hand last week.

The developer runs `/session cleanup` to see usage, then `/session prune --older-than 90 --dry-run` to preview. After reviewing the list, they rerun the command without `--dry-run`. Because of the manual deletions, they finish with `/chronicle reindex`.

**Outcome:** Old local sessions are removed and the store matches the remaining sessions. Any synced copies of the pruned sessions remain in the developer's GitHub account until deleted there.

## Practice: plan a prune

**Prerequisites:** The [session commands](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle) and an authorized sandbox machine with test sessions.

1. Write the commands, in order, to inspect usage, preview and prune sessions older than 30 days.
2. Add the step needed if some session folders were deleted manually.
3. In the sandbox, run only the preview command. Without a sandbox, compare your plan with the model answer.

**Expected result:** A command sequence that previews before deleting, reindexes after manual changes and states that synced data is unaffected.

<details>
<summary>Model answer</summary>

`/session cleanup`, then `/session prune --older-than 30 --dry-run`, then `/session prune --older-than 30`, then `/chronicle reindex`. The prune affects only local sessions; synced copies need separate deletion on GitHub.com.

</details>
