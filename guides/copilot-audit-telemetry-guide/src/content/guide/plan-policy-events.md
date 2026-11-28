---
title: Read plan, policy and seat events
section: Copilot Audit Events
order: 6
description: Interpret copilot audit events for seats, settings, content exclusion and plan changes.
verified: "2026-11-27"
diagram: plan-policy-events
checks:
  - question: Is the actor of a `copilot.cfb_seat_added` event always the person who changed the team membership that granted the seat?
    answer: No. GitHub notes that the actor may not be the account that made the team membership change.
  - question: Which event records a change to Copilot content exclusion paths?
    answer: "`copilot.content_exclusion_changed`, which includes the `excluded_paths` field."
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## What you will learn

- Group the `copilot` audit events into seat, settings, plan and access families.
- Avoid misreading the actor on seat events.

## Event families

The [enterprise audit log event reference](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise) lists the `copilot` category. Grouped by purpose:

| Family | Example actions | Notable fields |
| --- | --- | --- |
| Seats | `copilot.cfb_seat_added`, `cfb_seat_assignment_created`, `cfb_seat_assignment_refreshed`, `cfb_seat_assignment_reused`, `cfb_seat_assignment_unassigned`, `cfb_seat_cancelled`, `cfb_seat_cancelled_by_staff`, `cfb_seat_management_changed` | `owner`, `owner_type`, `actor_is_agent`, `new_value`, `old_value` |
| Settings | `copilot.cfb_enterprise_settings_changed`, `cfb_org_settings_changed`, `cfb_enterprise_org_enablement_changed`, `enterprise_enablement_changed` | `previous_value`, `current_value` |
| Content and memory | `copilot.content_exclusion_changed`, `memory_user_opt_out` | `excluded_paths` |
| Plan and terms | `copilot.plan_changed`, `plan_downgrade_scheduled`, `clickwrap_save_event` | `old_plan`, `plan` |
| Access | `copilot.access_revoked` | `reason`, `plan` |

`copilot.access_revoked` records that access ended because a subscription ended, a billing issue occurred, or the account was marked spammy or suspended. `cfb_seat_assignment_unassigned` records a seat that will lose access at the end of the billing cycle. `cfb_seat_added` covers seats added directly, through a team or through an all-members assignment.

The [Copilot audit log guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) shows filtering with `action:copilot` or a specific action such as `action:copilot.cfb_seat_assignment_created`. It also warns that the actor of `copilot.cfb_seat_added` may not be the account that changed the team membership.

## Worked example: an unexpected seat

**Hypothetical starting state:** The fictional Northwind Gardens finance team asks why a contractor received a Copilot seat. The audit log shows `copilot.cfb_seat_added` with an enterprise owner as the actor.

The analyst does not conclude that the owner added the contractor. The seat came through a team, and the documented caveat applies. The analyst searches the team membership history for the same time window and finds that a team maintainer added the contractor to the team.

**Outcome:** The finding names the team change as the cause and the seat event as the consequence, with both records attached.

## Practice: classify events

**Prerequisites:** The family table above and, in an authorized sandbox, read access to an enterprise audit log, or the fictional scenario.

1. Search `action:copilot` for the last 30 days, or list five fictional events.
2. Assign each event to a family from the table.
3. For each seat event, note whether the actor could differ from the person who caused it, and which other record you would check.

**Expected result:** Every event is classified, and seat events carry a note naming the corroborating record.

<details>
<summary>Model answer</summary>

Settings events are compared through their previous and current values. Plan events show the old and new plan. For `cfb_seat_added` through a team, check team membership changes in the same window before naming who caused the seat. For `access_revoked`, read the `reason` field before treating it as an administrative action.

</details>
