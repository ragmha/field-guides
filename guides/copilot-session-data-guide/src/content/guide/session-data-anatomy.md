---
title: Anatomy of a session record
section: Session Data Map
order: 2
description: Name what a session record contains and answer the four storage questions separately.
verified: "2026-11-27"
diagram: session-data-anatomy
checks:
  - question: What does GitHub's documentation list as session data?
    answer: The prompts, responses, tools used and file changes recorded for a session.
  - question: Does syncing a session share it with teammates?
    answer: No. Syncing stores a copy in your account; sharing is a separate, explicit step.
  - question: Can using session history send data to a model?
    answer: Yes. Querying history or using /chronicle can send prompts, context and responses to the AI model.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
---

## What you will learn

- Name the parts of a session record and the uses GitHub documents for them.
- Ask four separate questions about any session: where it runs, where its data is stored, whether it syncs and who can access it.

## Session, session data and session history

GitHub's [session data concept page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) defines a session as one piece of work with Copilot, and session data as its record: the prompts you sent, the responses, the tools Copilot used and the file changes it made. Session history is the collection of sessions you can query. The documented uses are querying history, resuming work, reviewing or sharing a session, and generating insights such as standup summaries.

The same page separates four questions:

1. **Where does the session run?** On your machine, in a cloud sandbox or in an ephemeral GitHub Actions environment.
2. **Where is its data stored?** Locally, on GitHub.com or both.
3. **Is it synced?** Syncing copies a local session to your GitHub account.
4. **Who can access it?** Only you by default, unless the session type is shared by default or you share it.

The answers are independent. Syncing is not sharing: a synced session is stored in your account but stays visible only to you until you share it. Running in the cloud is not the same as being shared either, because cloud sandbox sessions are unshared by default.

One more boundary matters for privacy reviews. When you query session history or use `/chronicle`, session data such as prompts, context and responses may be sent to the AI model to answer the question. VS Code's [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history) adds that session-history sync is separate from the prompts and context sent to a model during a session: turning sync off does not stop those model requests.

## Worked example: classify one session

**Hypothetical starting state:** A developer on the platform team runs a Copilot CLI session on a laptop to fix a flaky test. The organization has enabled cloud storage of local sessions. The developer has not changed any sync setting and has not shared anything.

The reviewer answers the four questions separately. The session ran locally. Its complete record is stored locally, and because CLI sessions sync by default when the policy allows it, a copy is also stored in the developer's GitHub account. It is synced. Access is limited to the developer, because local sessions are unshared by default.

**Outcome:** Run: local. Stored: local and GitHub account. Synced: yes. Access: developer only. This is a prediction from documented defaults, not an observation of the developer's settings.

## Practice: classify a session you started

**Prerequisites:** The [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) and, optionally, a test session in an authorized sandbox account.

1. Write the four questions as column headings.
2. For the hypothetical session above, add a row for the case where the developer had set `remoteExport` to `false`.
3. In an authorized sandbox, start a short session, then check whether it appears on GitHub. Without a sandbox, compare your row with the model answer and mark it as a prediction.

**Expected result:** A row that changes only the storage and sync answers, leaving where it ran and who can access it unchanged.

<details>
<summary>Model answer</summary>

Run: local. Stored: local only. Synced: no, because `remoteExport: false` opts out. Access: developer only. Only the storage and sync columns change; turning off sync does not change who can see the local record.

</details>
