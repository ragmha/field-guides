---
title: Where sessions run and what persists
section: Session Data Map
order: 3
description: Compare local, cloud sandbox and GitHub Actions sessions by persistence and default sharing.
verified: "2026-11-27"
diagram: where-sessions-run
checks:
  - question: What happens to a GitHub Actions cloud session's environment when the session ends?
    answer: The ephemeral environment is destroyed, but the session log remains on GitHub.com.
  - question: Which cloud session type keeps a snapshot while stopped?
    answer: A cloud sandbox session, whose snapshot storage is billed per GiB-month.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Compare persistence and default sharing for local, cloud sandbox and GitHub Actions sessions.
- Recognize which choices are fixed when a cloud session starts.

## Three places a session can run

The [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) describes three execution models with different data behavior:

| Runs in | Working environment | Session record | Default sharing |
| --- | --- | --- | --- |
| Local client (CLI, app, IDE) | Your machine | On disk; CLI and app sessions also sync by default | Unshared |
| Cloud sandbox | GitHub-hosted, snapshot kept while stopped | On GitHub | Unshared |
| GitHub Actions | Ephemeral, destroyed at session end | Session log stays on GitHub.com | Shared with people who have repository access |

[Cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) are isolated Linux environments hosted by GitHub into which repositories are cloned. While a sandbox session is stopped, GitHub keeps a snapshot so the session can continue, including from another client; snapshot storage is billed per GiB-month. The environment type, cloud sandbox or GitHub Actions, is chosen when the session starts and cannot be changed later. Cloud sandbox support in JetBrains is in **public preview**.

The enterprise [Copilot in the cloud](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) page adds two scoping rules. Chat sessions are scoped by default to a single organization or to the user's personal repositories. Where an organization uses SAML single sign-on, users must authenticate before they can access session data from that organization's repositories.

Guide advice: when someone asks "is this session stored in the cloud?", ask which of the three models it used first. The answer differs for each, and a working environment being deleted does not mean the record is gone.

## Worked example: two cloud sessions

**Hypothetical starting state:** The platform team starts two cloud sessions on the same private repository. Session A runs on GitHub Actions; session B runs in a cloud sandbox. Both finish their tasks and stop.

For session A, the Actions environment is destroyed when the session ends, but the session log remains on GitHub.com and is visible to people with repository access. For session B, the sandbox snapshot is retained while stopped and the session remains unshared until someone shares it.

**Outcome:** Both records persist on GitHub. A's working environment is gone and its log is shared; B's working environment persists as a billed snapshot and its record is private to the person who started it.

## Practice: predict persistence

**Prerequisites:** The table above and the [cloud sandbox concepts](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes). No settings need to be changed.

1. For each session type, write whether the working environment persists after it stops.
2. For each, write whether the record persists and who sees it by default.
3. In an authorized sandbox repository, start one session of each type and compare the Agents tab with your prediction. Without a sandbox, compare with the model answer.

**Expected result:** Three rows that separate the working environment from the record.

<details>
<summary>Model answer</summary>

Local: environment is your machine; record stays on disk and syncs by default; unshared. Cloud sandbox: snapshot persists while stopped; record on GitHub; unshared. GitHub Actions: environment destroyed; session log remains; shared with repository readers by default.

</details>
