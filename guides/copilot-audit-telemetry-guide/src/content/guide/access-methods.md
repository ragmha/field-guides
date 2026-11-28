---
title: Choose an audit log access method
section: Audit Evidence Map
order: 3
description: Compare the web interface, exports, the REST API and streaming by range and data coverage.
verified: "2026-11-27"
diagram: access-methods
checks:
  - question: Which access method is the only one that can include API request events?
    answer: Streaming to an external system, and only when streaming of API request events is enabled.
  - question: Can you search the audit log web interface by free text?
    answer: No. Searches use qualifiers such as action, actor, created and repo; text search is not supported.
  - question: Who can view an organization's audit log?
    answer: Only organization owners.
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/using-the-audit-log-api-for-your-enterprise
  - https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization
---

## What you will learn

- Compare the four enterprise audit log access methods.
- Write qualifier-based searches and API queries for Copilot events.

## Four ways in, four different subsets

[Accessing the enterprise audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise) lists the web interface, JSON or CSV exports, the REST API and streaming to an external system. Each exposes a different subset of data:

- **Web interface, exports and REST API** cover 180 days of web events. Streaming retention is set by your external system.
- **API request events** are available only when streamed, and only if that option is enabled.
- **Git events** appear in JSON exports, the API and streams, not the web interface, and the audit log keeps them for seven days.

[Searching the enterprise audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/searching-the-audit-log-for-your-enterprise) uses qualifiers, not text search. Useful keys include `action`, `actor`, `created`, `operation`, `repo` (which must include the owner) and `user`. When an agent performed an action, `user` is the person the agent acted for. Examples: `actor:Copilot`, `-actor:Copilot` and `action:copilot created:>=2026-11-01`.

The [audit log API](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/using-the-audit-log-api-for-your-enterprise) accepts the same phrase syntax, returns timestamps in UTC epoch milliseconds, uses cursor pagination from the `link` header and needs the `read:audit_log` scope. It allows 1,750 queries per hour per user and IP address; GitHub advises backing off on 403 or 429 responses.

At organization level, [the organization audit log](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization) keeps 180 days of events and only owners can view it.

## Worked example: picking the method

**Hypothetical starting state:** The fictional Harborline Labs platform team wants a weekly report of Copilot policy changes and a near-real-time view of agent pull requests. An engineer proposes scraping the web interface.

The team compares methods. The weekly report fits the REST API with `phrase=action:copilot+created:>=<date>`, paged with cursors and kept within the rate limit. Near-real-time monitoring fits streaming, because a stream delivers events continuously and keeps them for as long as the destination retains them.

**Outcome:** A scheduled API job feeds the report and a stream feeds monitoring. Web scraping is rejected because the interface is not designed as a data feed.

## Practice: write the queries

**Prerequisites:** The qualifier list above and, in an authorized sandbox, an enterprise owner account or the fictional scenario.

1. Write a web search for Copilot plan and policy events created in the last 30 days.
2. Write a search for agent activity in one repository, including the owner in `repo`.
3. Write the API `phrase` value for the first search and note the scope and rate limit it requires.

**Expected result:** Three qualifier-based queries that use no free text, plus the scope and rate-limit note.

<details>
<summary>Model answer</summary>

1. `action:copilot created:>=2026-10-28`
2. `actor:Copilot repo:lantern/payments-api`
3. `phrase=action:copilot+created:>=2026-10-28`, sent with a token that has `read:audit_log`, paged through the `link` header, within 1,750 queries per hour and backing off on 403 or 429.

</details>
