---
title: Sync policy and who gets access
section: Syncing and Policy
order: 11
description: Apply the organization policy for local session storage and separate availability from access.
verified: "2026-11-27"
diagram: sync-policy-access
checks:
  - question: What happens to local sessions for a Business user when the cloud storage policy is disabled or not configured?
    answer: They stay local only.
  - question: Does enabling the policy let administrators read synced sessions?
    answer: No. Synced data is tied to the user's personal account and accessible only to them by default.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://github.blog/changelog/2026-06-02-gain-insights-across-your-agent-sessions-with-chronicle/
---

## What you will learn

- Explain the role of the "Store local sessions in the Cloud" policy.
- Separate an administrator's control over whether syncing is available from access to session content.

## The policy gate

For Copilot Business and Copilot Enterprise users, the [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data) says the **Store local sessions in the Cloud** policy must be set to at least "View from cloud" for local sessions to sync. If it is disabled or not configured, sessions remain local only. The [June 2026 changelog](https://github.blog/changelog/2026-06-02-gain-insights-across-your-agent-sessions-with-chronicle/) states the same: an administrator must enable local session syncing before Business or Enterprise users can use it. This guide does not describe other policy values; check the policy page in your settings.

VS Code adds a second control on the [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history): the `CopilotSessionSync` group policy. When disabled, `chat.sessionSync.enabled` is forced to `false` and the status shows **Disabled by policy**. Users cannot override either policy.

Features that depend on synced data stop working without it. The [agent management how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) says querying past sessions from Chat requires syncing and is unavailable when `"remoteExport": false` is set or the policy is not enabled. You can query only sessions you started.

## Availability is not access

Both GitHub and VS Code state that enabling the policy does not give administrators access to session data. Synced sessions are tied to the user's personal account and are accessible only to that user by default. Administrators decide whether syncing is available; users decide what to share.

Guide advice: write this distinction into your internal policy note. Reviewers who expect central visibility should look at audit and monitoring features, covered in Part 6, rather than the sync policy.

## Worked example: a policy request

**Hypothetical starting state:** The security team asks the platform team to enable local session storage "so we can review what developers asked Copilot." The enterprise currently has the policy disabled.

The platform team checks the documentation. Enabling the policy lets users' CLI and app sessions sync to their personal accounts. It does not give the security team access. Session query features would start working for users, and users could choose to share sessions with repository collaborators.

**Outcome:** The request is reframed: enabling sync is a developer-experience decision, and the security team's review need is routed to audit log and monitoring options instead.

## Practice: answer a policy question

**Prerequisites:** The [session data page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/session-data). No settings need to be changed.

1. State what happens to a Business user's CLI sessions with the policy disabled.
2. State what changes for that user, and for administrators, if the policy is enabled.
3. In an authorized sandbox enterprise, read the current policy value without changing it. Without one, compare with the model answer.

**Expected result:** Two short answers that separate availability for users from access for administrators.

<details>
<summary>Model answer</summary>

Disabled: sessions stay local and session query from Chat is unavailable. Enabled: sessions sync to the user's personal account unless the user opts out; query works. Administrators gain no access to content; only explicit sharing exposes a session to others.

</details>
