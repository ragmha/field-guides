---
title: Route each finding to an owner
section: The operating model
order: 2
description: Build a consistent intake record and route every alert to one accountable owner.
verified: "2026-11-27"
diagram: intake-record
sources:
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/monitoring-alerts
  - https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configure-dependabot-notifications
  - https://docs.github.com/en/code-security/reference/security-at-scale/overview-dashboard-filters
---

## What you will learn

- Assign one accountable owner without confusing ownership with sole responsibility.
- Capture the minimum intake record needed for a repeatable decision.
- Understand that default notifications differ by alert type.

## Start with one owner

Every open finding needs one accountable response owner, even when platform, security or service teams help investigate. Define a fallback intake owner for alerts whose repository team is unknown. A shared queue is useful for visibility, but it does not replace assigning the next action.

Use the repository's actual ownership mechanism where available, and agree how alerts move when a team changes or a repository is archived. Verify that people who receive alerts have the access needed to investigate them.

GitHub supports assigning alerts directly. Code scanning alerts can be assigned to a user with write access, and security overview filters support `assignee:` values for users and teams. Use assignment as the owner signal where your process allows, so the queue and the record agree.

## Notifications are not routing

Default notifications differ by alert type, so do not assume the right person has already been told:

- **Secret scanning** notifies users with access to security alerts according to their watch and notification settings. Commit authors are notified regardless of their preferences.
- **Dependabot** emails people with write, maintain or admin access to the repository by default, and offers digest options.
- **Assignment** of a code scanning or secret scanning alert notifies the assignee.

Notification settings are personal and change over time. Routing is an organizational decision: confirm that a named owner has accepted the alert.

## Minimum intake record

| Field | Why it matters |
| --- | --- |
| Alert link and type | The source of truth for current state and evidence. |
| Repository and location or dependency | Scopes the investigation. |
| Owner and date received | Starts the response clock. |
| Priority and due date | Sets expectations against agreed targets. |
| Environment, exposure and service criticality | Turns severity into priority. |
| Decision and evidence | Shows how the alert was resolved. |

Keep credentials and sensitive code out of tickets. Link to the restricted alert instead.

## Use properties to route at scale

Custom repository properties, such as owning team, service tier or data classification, make routing repeatable. Security overview supports filtering by custom property (`props.NAME:value`) and by team (`team:`), so the same attributes that route alerts also support review and reporting. Agree a small set of required properties and keep them current; stale ownership data routes alerts to people who have moved on.

## Escalate, do not queue

If a credential may be usable or exposure may be active, escalate through the incident process immediately. Routine routing and weekly review are for normal backlog, not for live exposure.
