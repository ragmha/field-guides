---
title: Inventory automation triggers
section: Triggers & Entry Points
order: 2
description: Classify each automation trigger by who can cause it, what input it carries and what it may change.
verified: "2026-11-27"
diagram: automation-trigger-inventory
checks:
  - question: Does a trigger-scoped write setting limit what a scheduled run can change?
    answer: No. The REST reference says the setting has no effect on interval triggers; scheduled runs can change any resource in the repository.
  - question: Can a user without write access cause an event-triggered automation to run?
    answer: Not by default. Events from users without write access are ignored unless the automation opts in and policy allows it.
  - question: Can automations run in public repositories?
    answer: Not at review time. The documentation limits automations to private and internal repositories.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/
  - https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/
---

## What you will learn

- Group automation triggers into schedule, repository event, chained and manual families.
- Record, for each trigger, who can cause it, what input it carries and what the run may change.

## Triggers decide who starts the work

[Copilot automations](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) run Copilot cloud agent on a schedule (hourly, daily or weekly), when something happens in a repository, or through the API. They are available in private and internal repositories, not public ones. The organization must allow both the cloud agent and automations; both are on by default. Anyone with write access can create one.

The [launch changelog](https://github.blog/changelog/2026-06-02-schedule-and-automate-tasks-with-copilot-cloud-agent/) introduced schedules and issue and pull request events. A [later update](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) added 24 triggers, including code scanning, secret scanning and Dependabot alerts, and triggers for when another automation run succeeds or fails. The [agent automations REST reference](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) lists the current trigger objects. They include issue, pull request, discussion and comment events, `workflow_run` failures, `automation_completed` and `automation_failed`. Event triggers can be narrowed with a search query, changed-file paths, labels or issue statuses. Issue statuses are in **public preview**.

Two documented differences matter for governance:

- **Schedules have no event actor.** Interval-scheduled runs always run as the automation owner. The REST reference says `write_scope` has no effect on them: scheduled runs can change any resource in the repository.
- **Events carry outside input.** By default, an event-triggered automation ignores events from users without write access. This setting can be turned off where policy allows, which lets content from more people reach the prompt.

## Worked example: a sandbox inventory

**Hypothetical starting state:** The platform team's sandbox repository has three automations. One triages dependencies nightly on a daily schedule. One summarizes new pull requests when they open. One investigates `workflow_run` failures in the build workflow.

The team records four columns for each automation: trigger family, who can cause the trigger, input that reaches the prompt, and write reach. The nightly triage has no event actor and repository-wide write reach. The summarizer reads pull request content from people with write access, because the default actor filter is on. The failure investigator starts from a workflow result, so the team asks which changes can make that workflow fail.

**Outcome:** The highest-risk row is the scheduled one. The prompt is fixed, but a trigger-scoped write setting would not limit it. The team marks it for tool review in Part 3. This is a design review, not an observed incident.

## Practice: build a trigger register

**Prerequisites:** Read access to an authorized sandbox repository with automations, or the hypothetical facts above.

1. In an authorized sandbox, open **Agents**, then **Automations**, or call the list endpoint in the REST reference. Do not edit anything.
2. For each automation, record trigger family, filters, actor rule and write reach.
3. Flag every schedule and every trigger that accepts input from users without write access.

**Expected result:** A register with one row per trigger and clearly flagged high-reach rows.

<details>
<summary>Model answer</summary>

| Automation | Trigger | Actor rule | Write reach |
| --- | --- | --- | --- |
| Nightly triage | Daily schedule | None; runs as owner | Repository-wide |
| PR summary | Pull request opened | Write access only (default) | As configured |
| Failure investigator | `workflow_run` failure | Review who can cause failures | As configured |

Flag the schedule for tool minimization. Personal automations are private to their creators, so a repository listing may not show every automation. Part 2 covers that gap.

</details>
