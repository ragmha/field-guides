---
title: Retention windows by record type
section: Retention and Deletion
order: 19
description: List the documented retention windows for Copilot records and mark where none is documented.
verified: "2026-11-27"
diagram: retention-windows
checks:
  - question: How long are messages in a GitHub.com Copilot Chat conversation kept?
    answer: 28 days, after which they are permanently deleted; up to 100 recent conversations are stored.
  - question: Does turning off VS Code session sync start a retention clock on synced sessions?
    answer: No. Existing synced sessions remain on GitHub.com until you delete them.
  - question: Does a memory disappearing from the settings list prove it was deleted?
    answer: No. Hidden memories can remain stored until they expire.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
  - https://docs.github.com/en/copilot/concepts/agents/copilot-memory
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions
---

## What you will learn

- Name the documented retention windows for Copilot records.
- Avoid inventing a retention period where the documentation gives none.

## Documented windows

Retention differs by record type. These are the windows this guide could confirm in public documentation:

| Record | Documented behavior |
| --- | --- |
| GitHub.com Copilot Chat conversations | Up to 100 recent conversations; messages kept 28 days, then permanently deleted |
| Synced local sessions | Remain on GitHub.com until you delete them |
| Local session records | Remain on disk until you prune or delete them |
| Cloud sandbox snapshot | Kept while the session is stopped; billed per GiB-month |
| Copilot Memory facts and preferences | Expire after a period without reinforcement |
| Enterprise audit log | Events retained for the last 180 days |

The [Chat on GitHub how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/chat-with-copilot/chat-in-github) states the Chat limits; once a conversation has no messages left, it is removed from your history. VS Code's [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history) says synced sessions remain until deleted, even after sync is turned off. [Cloud sandbox concepts](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) describe snapshot retention while stopped. The [audit log how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) states 180 days and recommends streaming to a SIEM for longer history.

[Copilot Memory](https://docs.github.com/en/copilot/concepts/agents/copilot-memory) is a separate store, not session data, but reviewers often ask about it together. Its expiry period starts when a memory is created and resets when Copilot upvotes it; retrieval alone does not reset it. Memories Copilot has learned not to use are hidden from the settings list but can remain stored until they expire, so delete a memory explicitly if you do not want it used. Organization and enterprise owners can export or delete members' user-level preferences.

## Visibility windows are not retention

Some windows limit what you see, not what is kept. VS Code's [session list](https://code.visualstudio.com/docs/agents/run/sessions/manage-sessions) only discovers external CLI and app sessions updated within the last seven days. A session missing from that view still exists.

Guide advice: in a records schedule, write "no documented expiry; retained until deleted" rather than guessing a period, and name who can delete each record.

## Worked example: a records schedule request

**Hypothetical starting state:** The compliance team asks the platform team for a single retention period for "Copilot data."

The platform team splits the request by record type using the table above. It notes that synced and local sessions have no documented expiry, that Chat messages are deleted after 28 days, and that audit events are kept 180 days unless streamed.

**Outcome:** A schedule with one row per record type, its documented window or "retained until deleted," and the person or role able to delete it. No single period is claimed.

## Practice: draft a schedule row

**Prerequisites:** The sources above. No settings need to be changed.

1. Write rows for synced CLI sessions, GitHub.com Chat and the audit log.
2. For each, add the documented window and who can remove the data.
3. Compare with the model answer; label any value you could not find in the documentation as "not documented."

**Expected result:** Three rows, none with an invented period.

<details>
<summary>Model answer</summary>

Synced CLI sessions: retained until deleted; the user deletes them on GitHub.com or from the CLI prompt. GitHub.com Chat: messages deleted after 28 days, up to 100 conversations. Audit log: 180 days; stream to a SIEM for longer retention under your own policy.

</details>
