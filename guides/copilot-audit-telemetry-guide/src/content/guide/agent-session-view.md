---
title: Use the agent sessions view
section: Agent Activity Monitoring
order: 10
description: Triage recent agent sessions in AI controls and know when to move to the audit log.
verified: "2026-11-27"
diagram: agent-session-view
checks:
  - question: How far back does the "View all" list in the Agent sessions section reach by default?
    answer: It lists agent sessions from the last 24 hours. Filters such as `timeframe:7d` narrow by session start time.
  - question: Which filter shows sessions started by a specific person?
    answer: "`user:`, for example `user:octocat`."
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters
---

## What you will learn

- Open and filter the Agent sessions view in enterprise AI controls.
- Decide when a question needs the audit log instead.

## A live window, not an archive

The [agent monitoring guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) describes the "Agent sessions" section at the top of the enterprise **AI controls** page. It shows the three most recent agent sessions. **View all** lists agent sessions from the last 24 hours. Press <kbd>Space</kbd> in the search bar to choose filters.

[The session filter reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agent-session-filters) lists:

| Filter | Example |
| --- | --- |
| `agent` | `agent:copilot-cloud-agent` |
| `organization` | `organization:octocat-org` |
| `repository` | `repository:octocat-repo` |
| `status` | `status:in_progress` |
| `timeframe` | `timeframe:7d` (sessions started within the timeframe) |
| `user` | `user:octocat` (sessions initiated by that user) |

The same page links to the enterprise audit log, where `actor:Copilot` shows what agents did during those sessions.

Guide advice: use the sessions view for triage ("is something running now, and who started it?") and the audit log for evidence ("what did it change, and when?"). Capture the session details you need while they are visible, because the view is designed for recent activity.

## Worked example: a runaway session

**Hypothetical starting state:** At the fictional Fabrikam Studios, a repository owner reports many pull requests appearing in `fabrikam-web/storefront` within an hour. The enterprise owner opens AI controls.

The owner filters `status:in_progress repository:storefront` and finds one cloud agent session started by `user:lee-build`. The owner records the session details, contacts Lee, then searches the audit log with `actor:Copilot repo:fabrikam-web/storefront` to list the pull requests created and the session ID on each event.

**Outcome:** Triage took minutes in the sessions view; the evidence for the incident record came from the audit log.

## Practice: triage with filters

**Prerequisites:** The filter table above and, in an authorized sandbox, enterprise owner access to AI controls, or the fictional scenario.

1. Write a filter for in-progress cloud agent sessions in one organization.
2. Write a filter for sessions one user started in the last seven days.
3. Write the audit log search you would run next to list that user's agent-initiated actions.

**Expected result:** Two session filters and one audit log search, with no change made to any session or setting.

<details>
<summary>Model answer</summary>

1. `agent:copilot-cloud-agent status:in_progress organization:fabrikam-web`
2. `user:lee-build timeframe:7d`
3. `actor:Copilot user:lee-build created:>=2026-11-20`, because `user` refers to the person an agent acted for.

</details>
