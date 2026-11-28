---
title: Govern exceptions and dismissals
section: Exceptions and evidence
order: 8
description: Make dismissal and deferral decisions explicit, authorized and time-bounded, with delegated review where available.
verified: "2026-11-27"
diagram: exception-record
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/delegated-alert-dismissal
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/resolving-alerts
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/viewing-and-updating-dependabot-alerts
---

## What you will learn

- Separate a verified fix from a dismissal and an accepted risk.
- Use delegated alert dismissal to separate requester and approver.
- Record and review exceptions so they expire instead of persisting silently.

## Three different outcomes

| Outcome | Meaning | Evidence |
| --- | --- | --- |
| Fixed | The cause is removed and the alert closed after a scan or update | Change link and closed state |
| Dismissed | The alert does not apply, for a documented reason | Reason, comment and decision maker |
| Accepted risk | The issue is real, but remediation is deferred | Approver, scope, controls and expiry |

Mixing these outcomes is the most common way metrics mislead. A falling queue built from dismissals is not a falling risk.

## Separate requester from approver

Delegated alert dismissal changes who can close an alert without a fix. When it is enabled, users with write access request a dismissal instead of dismissing directly. Organization owners and security managers, or custom roles with the right permissions, review and approve or deny the request, and both sides receive email. Reviewers can find requests in the organization's security area and filter them by repository, requester, reviewer, time frame or status.

Delegated dismissal is configured per repository or through a security configuration, so enforcement in a configuration prevents repository-level changes. Availability differs by alert type and GitHub version; check the linked documentation before relying on it.

## What an exception record needs

Store the alert reference, decision, evidence considered, decision maker, date, scope, owner, compensating controls and expiry or review date. Do not include credential values, private keys or sensitive source excerpts.

Before approving an exception, confirm:

- The alert and affected scope are identified.
- The reason is supported by evidence, not by deadline pressure.
- The approver has authority for this level of risk.
- An owner and any compensating controls are recorded.
- A review or expiry date is set.

If a request is outside the approver's authority, escalate it rather than implying approval.

## Exceptions expire

At each review, confirm the condition still applies, the control remains effective, the owner is current and the expiry has not passed. Expired exceptions need a new authorized decision. Reopen the decision early when scope or exposure changes, for example when a service becomes internet-facing.
