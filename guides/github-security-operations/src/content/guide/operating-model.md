---
title: Why alerts stall and what fixes it
section: The operating model
order: 1
description: Understand the operating loop every alert travels and the roles that keep it moving.
verified: "2026-11-27"
diagram: response-loop
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview
  - https://docs.github.com/en/code-security/concepts/security-at-scale/audit-security-alerts
  - https://learn.microsoft.com/en-us/training/paths/github-advanced-security/
---

## What you will learn

- Recognize the common reasons security alerts sit unresolved.
- Describe the four-step loop every alert should travel.
- Separate the roles that own coverage, response, risk and improvement.

## Detection is not the bottleneck

Enabling code scanning, secret scanning and Dependabot usually produces findings quickly. The harder problem is what happens next. Alerts stall for predictable reasons:

- **No owner.** The alert is visible to many people and assigned to none of them.
- **No context.** The responder cannot tell whether the affected code is deployed, reachable or exposed.
- **No decision rule.** Teams disagree about what counts as urgent, so every alert gets negotiated.
- **No exit path.** There is no agreed way to defer or accept a risk, so alerts stay open indefinitely or are dismissed without a record.
- **No feedback.** Nobody reviews why the queue grows, so the same routing and ownership failures repeat.

Product training explains how each feature detects and displays findings. This course covers the operating decisions around them: who acts, in what order, with what evidence, and how the organization learns.

## One loop for every alert

Every alert, regardless of type, should travel the same loop:

1. **Detect.** A feature raises a finding in a repository that is in scope and configured.
2. **Route.** The finding reaches one named owner with enough context to act.
3. **Respond.** The owner fixes, rotates, updates, dismisses with a reason or requests an exception.
4. **Verify.** Evidence shows the risk is actually reduced, not just that the status changed.

Measures from the loop feed the next review: coverage gaps, unowned alerts, overdue items and repeated exceptions show where the process, not the individual responder, needs attention.

## Roles in the loop

| Role | Owns | Does not own |
| --- | --- | --- |
| Platform administrator | Feature configuration, coverage and access | Individual remediation decisions |
| Repository or service owner | Assigning a responder and supplying service context | Organization-wide policy |
| Alert responder | Triage, the next action and recorded evidence | Accepting risk beyond their authority |
| Security operations | Operating policy, escalation support and queue health | Fixing every alert themselves |
| Risk approver | Bounded, documented exceptions | Routine triage |
| Incident response | Credible active exposure, such as a usable leaked credential | The routine backlog |

Name these roles for your organization before scaling enablement. A role can be shared by one person in a small team, but each responsibility needs a named holder.

## Agree the rules before the volume arrives

Before broad rollout, agree in writing:

- Which alert classes and repositories are in scope.
- Where alerts go when ownership is unknown.
- Response targets by priority, and who sets priority.
- Who may dismiss alerts, who may approve exceptions and how long exceptions last.
- What evidence closes an alert.
- When an alert becomes an incident.

The remaining parts of this course turn each of those rules into practice. Keep the policy short enough that responders actually read it.
