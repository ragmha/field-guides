---
title: Know what the record shows
section: Exceptions and evidence
order: 9
description: Understand which alert actions reach the audit log and how to retain the evidence your process needs.
verified: "2026-11-27"
diagram: audit-trail
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/audit-security-alerts
  - https://docs.github.com/en/code-security/how-tos/view-and-interpret-data/analyze-organization-data/export-data
---

## What you will learn

- Identify which alert types create audit log events.
- Combine the alert timeline, audit log, webhooks and exports into a usable record.
- Avoid overstating what any single source proves.

## Coverage differs by alert type

GitHub documents how security alert activity is recorded, and the coverage is not uniform:

- **Secret scanning.** The audit log tracks alert creation, resolution and reopening, and push protection bypasses.
- **Dependabot.** The audit log tracks alerts being created, dismissed or resolved.
- **Code scanning.** GitHub states that code scanning does not create timeline events in an audit log.

Do not describe the audit log as a complete record of every alert action. For code scanning in particular, retain the evidence your process requires elsewhere.

## Four sources, four purposes

| Source | What it gives you | Limitation |
| --- | --- | --- |
| Alert timeline | Every status change on the alert, regardless of cause | Per alert; you must visit or query each one |
| Audit log | Organization-level events for supported alert types | Coverage differs by alert type |
| Webhooks | `code_scanning_alert`, `secret_scanning_alert` and `dependabot_alert` events as they happen | You must receive and store them |
| REST API | Current state of alerts | Current status only, not history |

If you need a durable history across all three alert types, subscribe to webhooks and store the events in an approved system. Use the REST API for current-state reporting and the alert timeline for individual investigations.

## Export security overview data

Several security overview pages can be exported as CSV, and the export reflects the filters you applied. Exports are snapshots: label them with the date, filters and the role of the person who produced them, because visibility depends on role.

## Keep the evidence where it belongs

The record your process needs is usually a combination: the alert link, the timeline, the exception record and the change that fixed it. Store decisions in an approved system with suitable access controls. Do not copy secret values or sensitive code into evidence stores.
