---
title: Build team views without double counting
section: Scope & Deduplication
order: 11
description: Join the daily user-teams and per-user reports correctly and explain why team totals fall short.
verified: "2026-11-27"
diagram: team-level-joins
checks:
  - question: Which keys join the daily user-teams report to the daily per-user report?
    answer: The user ID, the day and the enterprise or organization ID.
  - question: Why can the sum of team active users be lower than the organization total even though multi-team users are counted more than once?
    answer: Teams with fewer than five seated Copilot users are excluded, and users who belong to no team are not represented.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/team-level-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard
---

## What you will learn

- Join team membership to daily usage correctly.
- Apply distinct counts and sums to the right columns.

## The join rules

The [metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) notes that team-level metrics are not pre-aggregated. The [team-level metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/team-level-metrics) describes how to build them:

1. Join the daily `user-teams-1-day` report to the daily `users-1-day` report on `user_id`, `day` and the enterprise or organization ID.
2. Group by `team_id`.
3. Use a distinct count of users for active user figures, and sums for volume counters such as interaction or generation counts.
4. Use a left join from the team list when you need to show teams with zero activity.

Several limits shape the result:

- Teams with fewer than five seated Copilot users are excluded from the user-teams report.
- A user in several teams is counted in each, so team totals must not be summed.
- The 28-day per-user report must never be joined to the daily user-teams report, because the windows do not match.

The [impact dashboard](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-impact-dashboard) shows team cohorts natively, which can be enough for a quick check.

Guide advice: keep the five-user floor in your own outputs too; do not reconstruct small teams from other sources.

## Worked example: a duplicated team

**Hypothetical starting state:** The fictional Litware analytics team joins the 28-day per-user file to one day's user-teams file. The mobile team shows 46 active users, although it has 30 members.

The analyst finds two errors: the windows were mixed, and the query counted rows instead of distinct users. The rebuilt query joins daily files on all three keys and counts distinct users per team and day.

**Outcome:** Mobile shows 22 active users on the sample day. Team totals are published with a note that teams below five seated users are not shown and that multi-team users appear in each team.

## Practice: write the team query

**Prerequisites:** Daily per-user and user-teams files for one day from an authorized sandbox, loaded into a local database or spreadsheet.

1. Join the files on user ID, day and entity ID.
2. Group by team and compute distinct active users.
3. Sum one volume counter per team.
4. Compare the sum of team users with the entity's daily active users.

**Expected result:** A team table with distinct users, a volume total and a note explaining the gap with the entity total.

<details>
<summary>Model answer</summary>

The query uses `COUNT(DISTINCT user_id)` filtered to users with a user-initiated interaction count above zero, and `SUM` for the volume counter. The team sum can exceed the entity count because of multi-team users, or fall below it because of small or missing teams; the note names both effects.
</details>
