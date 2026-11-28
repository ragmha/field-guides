---
title: Delete, archive or hide
section: Retention and Deletion
order: 18
description: Match each removal control to the copy it affects and the surface where it is available.
verified: "2026-11-27"
diagram: delete-archive-hide
checks:
  - question: Can a cloud agent session that ran on GitHub Actions be deleted?
    answer: No. It can be archived, which removes it from the list, but not deleted.
  - question: What does deleting a synced session in the GitHub Copilot app do to the synced copy?
    answer: The app deletes the synced copy immediately; the CLI instead asks whether to delete it.
  - question: What does hiding a synced session on GitHub.com do?
    answer: It removes the session from your session index and query results.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
---

## What you will learn

- Distinguish deleting a record from archiving or hiding it.
- Choose the surface that can remove each copy of a session.

## Three different actions

- **Delete** removes the record. The [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) says deleting removes a session from the local list, the history index and the synced list.
- **Archive** removes a stopped session from the session list. The [agent management how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) says cloud agent sessions can be archived but not deleted; only local sessions from the CLI, VS Code, JetBrains and the app can be deleted.
- **Hide** applies to synced sessions on GitHub.com. The [CLI session data how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle) says hiding removes a session from the index and query results.

## Which control works where

| Session type | Where | Share | Delete | Archive |
| --- | --- | --- | --- | --- |
| CLI session | Locally | Yes | Yes | No |
| App session | Locally | Yes | Yes | Yes |
| Synced CLI or app session | GitHub.com | Yes, unshared by default | Yes | Yes |
| Cloud agent on GitHub Actions | GitHub.com | Yes, shared by default | No | Yes |
| Cloud sandbox session | GitHub.com | Yes, unshared by default | Yes | Yes |

Deleting a synced session from the CLI prompts whether to also delete the synced copy; the app deletes the synced copy immediately. The app's **Manage sessions** view can also restore archived chats, according to the [app sessions how-to](https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions). On GitHub.com, deletion applies to synced CLI, VS Code and app sessions.

VS Code users can run **Delete Session Sync Data** and choose **Delete from local and cloud**, which cannot be undone, or **Delete from cloud only**. The [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history) notes the command requires sync to be on; otherwise, manage synced sessions from the Agents tab.

## Worked example: a mistaken prompt

**Hypothetical starting state:** A developer on the identity team pasted a test credential into a synced CLI session and, separately, into a cloud agent session on GitHub Actions. They rotate the credential first, then want both records gone.

For the CLI session, they run `/session delete SESSION-ID --yes` and answer yes to deleting the synced copy. For the cloud agent session, they can only archive; the session log remains on GitHub.com for people with repository access.

**Outcome:** The CLI record is deleted locally and on GitHub. The cloud agent record is archived, not deleted. Guide advice: rotate the exposed secret regardless, and escalate through your normal support or security process for records you cannot delete.

## Practice: choose the control

**Prerequisites:** The table above. An authorized sandbox account if you want to try commands.

1. For each case, choose delete, archive or hide, and the surface: (a) remove a synced app session everywhere; (b) remove a finished cloud agent session from your list; (c) keep a synced session but stop it appearing in queries.
2. State whether any copy remains after each action.
3. In a sandbox, try one action on a test session. Without one, compare with the model answer.

**Expected result:** Three control choices, each naming the copy that remains, if any.

<details>
<summary>Model answer</summary>

(a) Delete in the app, which deletes the synced copy immediately; exported files remain. (b) Archive on GitHub.com; the record remains. (c) Hide on GitHub.com; the session remains stored but is removed from the index and query results.

</details>
