---
title: Fix, dismiss or prevent code findings
section: Code scanning response
order: 6
description: Remediate code scanning alerts with verified fixes, use dismissal reasons honestly and stop new findings at merge.
verified: "2026-11-27"
diagram: code-response
sources:
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/resolve-alerts
  - https://docs.github.com/en/code-security/concepts/security-at-scale/about-security-campaigns
  - https://docs.github.com/en/code-security/concepts/code-scanning/merge-protection
  - https://docs.github.com/en/rest/code-scanning/code-scanning
---

## What you will learn

- Choose between fixing, dismissing and deferring a code scanning alert.
- Use AI-assisted fixes with review, not trust.
- Reduce backlog growth with campaigns and merge protection.

## Fix the cause, then verify

For each alert, inspect the rule, the data flow and the affected location. Confirm whether the path is reachable, then fix the underlying cause rather than suppressing the symptom. A code scanning alert closes when a later analysis on the default branch no longer finds it. Keep a link to the change and confirm the closed state after the scan runs; a merged pull request alone is not proof.

## Use AI-assisted fixes with review

Copilot Autofix can suggest a fix for supported alerts, and where enabled an alert can be assigned to Copilot to open a pull request. GitHub describes autofix as best-effort and not guaranteed to be correct. Treat every suggestion like a contribution from a new team member:

- Review the diff and its tests.
- Confirm the fix addresses the cause, not just the pattern the rule matches.
- Let the normal review and scanning gates run before merging.

## Dismiss honestly

When a finding does not apply, dismiss it with a reason that matches the evidence. The REST API lists `false positive`, `won't fix` and `used in tests` among the dismissal reasons. Add a dismissal comment: GitHub adds it to the alert timeline, where it can serve as justification in later review.

| Situation | Better disposition |
| --- | --- |
| The rule misreads this code | False positive, with a short explanation |
| Only test fixtures are affected | Used in tests |
| Real issue that will not be fixed now | Exception process, not a quiet dismissal |

Where available, delegated alert dismissal requires a reviewer to approve dismissals. Part 7 covers how to run that review.

## Burn down with campaigns

Security campaigns group alerts across repositories into a time-boxed remediation effort with a named manager and due date. For code scanning campaigns, Copilot Autofix is triggered automatically for eligible alerts. Use campaigns for a specific rule or vulnerability class rather than "fix everything", and track completion against the campaign's own scope.

## Stop new findings at merge

Merge protection uses a ruleset rule to block a pull request when a required code scanning tool finds alerts at a chosen severity, is still running or is not configured. It does not enable code scanning by itself, and it is separate from required status checks. Start with a high threshold on critical services, measure how often teams are blocked, then widen.
