---
title: Design proportionate alerts
section: Investigation & Alerting
order: 19
description: Choose Copilot audit events worth alerting on, with owners, thresholds and responses.
verified: "2026-11-27"
diagram: alert-design
checks:
  - question: Why does GitHub recommend streaming for alerting rather than polling the web interface?
    answer: The Copilot audit log guide recommends streaming to a SIEM for long-term history and alerts; a stream delivers events continuously to a system that can evaluate rules.
  - question: What should every alert rule document besides its query?
    answer: An owner, a threshold or condition, and the response the owner will take.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
---

## What you will learn

- Select Copilot events that justify an alert.
- Write rules with an owner, condition and response, and avoid alert fatigue.

## From event to rule

The [Copilot audit log guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) recommends streaming to a SIEM for long-term history and alerts. The [event reference](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/audit-log-events-for-your-enterprise) supplies the actions to match. The rule ideas below are guide advice, not GitHub defaults:

| Signal | Example match | Suggested response |
| --- | --- | --- |
| Enterprise enablement changed | `copilot.enterprise_enablement_changed` | Confirm a change ticket exists |
| Enterprise settings changed | `copilot.cfb_enterprise_settings_changed` | Compare previous and current values |
| Content exclusion edited | `copilot.content_exclusion_changed` | Review `excluded_paths` with the data owner |
| Plan change | `copilot.plan_changed` | Notify the billing owner |
| Agent burst | Many `actor_is_agent: true` events from one `user` in a short window | Check the sessions view for a runaway session |
| Stream silence | No events received for an unusually long period | Check the stream and the health-check email |

The stream itself needs watching. [Streaming the audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) says a daily health check emails enterprise owners when the stream is misconfigured, and the stream must be fixed within six days to avoid dropped events. Because delivery is at least once, deduplicate before counting toward a threshold.

Recommended: start with a few high-value rules, tune thresholds against a baseline, and retire rules nobody acts on.

## Worked example: tuning a noisy rule

**Hypothetical starting state:** The fictional Litware Logistics team alerts on every `actor:Copilot` event. Analysts receive hundreds of alerts a day and start ignoring them.

The team replaces the rule with two: a burst rule on agent events per `user` per hour, set above a two-week baseline, and a change rule on `copilot.cfb_enterprise_settings_changed`. Duplicates are removed before counting.

**Outcome:** Daily alerts fall to a handful, and each one has an owner and a written response.

## Practice: write three rules

**Prerequisites:** The table above and, in an authorized sandbox, a SIEM test index or a spreadsheet. Do not change production alerting.

1. Pick three signals from the table.
2. For each, write the match, threshold, owner and response.
3. Add one rule that detects a silent or broken stream.

**Expected result:** Four rules, each with a named owner and response, including deduplication where counts are used.

<details>
<summary>Model answer</summary>

Settings change: any `cfb_enterprise_settings_changed`; owner AI platform lead; confirm ticket within one business day. Content exclusion: any `content_exclusion_changed`; owner data protection; review `excluded_paths`. Agent burst: deduplicated agent events per user per hour above baseline; owner security operations; check sessions view. Stream silence: no events for a set period; owner SIEM team; check destination and health-check email within six days.

</details>
