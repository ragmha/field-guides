---
title: Scope and deduplication summary
section: Scope & Deduplication
order: 12
description: Report each scope from its own source and explain why parts do not sum to the whole.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/team-level-metrics
---

## Key Takeaways

- A user with a Copilot seat anywhere in the enterprise is attributed to every organization in that enterprise they belong to.
- Enterprise reports deduplicate users; organization reports do not, so never add organization totals to get an enterprise total.
- Team metrics are not pre-aggregated; build them by joining the daily user-teams report to the daily per-user report on user, day and entity.
- Count users with a distinct count and sum only volume counters.
- Teams with fewer than five seated Copilot users are excluded, and multi-team users appear in each team, so team totals do not sum to the entity total.
- Never join a 28-day per-user report to the daily user-teams report.
