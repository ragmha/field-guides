---
title: Run the weekly review
section: Measure and improve
order: 11
description: Run a short, repeatable review that fixes the system behind the queue and check your operating readiness.
verified: "2026-11-27"
diagram: weekly-review
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview
  - https://docs.github.com/en/code-security/concepts/secret-security/push-protection
  - https://docs.github.com/en/code-security/concepts/security-at-scale/delegated-alert-dismissal
---

## What you will learn

- Run a weekly review in a fixed order that surfaces system problems first.
- Turn recurring issues into owned improvements.
- Check your organization against an operating readiness list.

## A thirty-minute agenda

Keep the review short and the order fixed:

1. **Coverage gaps** (5 minutes). New repositories without features, failed configuration attachments, stale scans.
2. **Unowned and overdue** (10 minutes). Alerts without an owner, and P1 or P2 items past their target.
3. **Decisions pending** (5 minutes). Dismissal requests, push protection bypasses and exceptions approaching expiry.
4. **One pattern** (5 minutes). Pick one repeated problem and ask why it recurs.
5. **Actions** (5 minutes). Name an owner and date for each improvement.

Live exposure never waits for this meeting. If something in the review looks like an active incident, hand it to incident response immediately.

## Fix the system, not the person

When the same problem repeats, ask which part of the operating model failed:

| Symptom | Likely system cause | Possible fix |
| --- | --- | --- |
| Alerts sit unowned | Missing or stale ownership data | Required custom properties and a fallback owner |
| The same rule fires across repositories | Shared pattern or library | Security campaign or shared fix |
| Frequent "false positive" bypasses | Unclear guidance or noisy pattern | Delegated bypass review and better test fixtures |
| Exceptions renewed repeatedly | Remediation not planned | Escalate to roadmap owner with risk context |

Track whether each change reduces recurrence, not just whether the queue moved.

## Operating readiness checklist

Use this list to check whether the operating model is in place:

- Alert classes and repositories in scope are written down.
- Every in-scope repository has an owning team and a fallback intake owner.
- Coverage is reviewed and gaps are owned.
- Priorities and response targets are published and agreed with service owners.
- A leaked credential triggers rotation and incident response, not backlog triage.
- Dismissal reasons and comments are required by practice; delegated review is used where appropriate.
- Exceptions have an approver, scope, controls and expiry.
- Evidence sources are known, including the code scanning audit-log gap.
- Measures are balanced and defined, and individual rankings are not published.
- The weekly review runs, and its actions have owners and dates.

Revisit the checklist each quarter and after any significant incident.
