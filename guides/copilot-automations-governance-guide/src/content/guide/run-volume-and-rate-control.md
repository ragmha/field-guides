---
title: Control run volume and rate
section: Cost & Rate Limits
order: 3
description: Reduce how often automations start and keep API callers within documented rate limits.
verified: "2026-11-27"
diagram: run-volume-and-rate-control
checks:
  - question: Does a success response from the run-an-automation endpoint confirm that a task was created?
    answer: No. Task creation is asynchronous, an immediate fetch may return 404, and downstream skips or failures can prevent creation.
  - question: What should a script do after a secondary rate limit response with a retry-after header?
    answer: Wait at least that many seconds before retrying, and back off exponentially if failures continue.
sources:
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api
---

## What you will learn

- Use cadence, filters and serialization to control how often runs start.
- Apply documented REST rate-limit handling to scripts that start automations.

## Volume is a design choice

The documentation reviewed does not publish a run-rate limit specific to automations. Volume comes from the design. The [agent automations REST reference](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) documents the controls:

- **Cadence.** Schedules are `hourly`, `daily` or `weekly`. Daily and weekly runs anchor to a UTC hour and to minute 0, 15, 30 or 45. Weekly runs default to Monday.
- **Filters.** Event triggers accept a search query. Pull request triggers accept changed-file path globs. Label triggers accept label names, and `workflow_run` triggers list workflow names and the `failure` conclusion.
- **Serialization.** With `continuous_history`, each run builds on earlier runs' session history, and runs of the same automation happen one at a time.
- **Credit limits.** Periodic limits block new runs once reached, as covered in the previous lesson.

API callers face separate limits. The run endpoint accepts a request and preallocates a `task_id`, but the response does not confirm execution. An immediate fetch may return 404. GitHub's [REST rate limits](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) include secondary limits, such as no more than 80 content-generating requests per minute and 500 per hour, which also count web interface actions. After a 403 or 429 for a secondary limit, wait for `retry-after` if present, otherwise at least one minute. Back off exponentially if failures continue. Continuing while limited may get the integration banned.

Guide advice: treat a 404 just after a run request as "not yet created", not "failed". Retrying at once can start duplicate runs.

## Worked example: an event storm

**Hypothetical starting state:** A shared automation reviews pull requests on the `pull_request_synchronize` trigger in a busy repository. Every push to every open pull request starts a run.

The reviewer narrows the trigger with path globs for the service directory and a search query that excludes draft pull requests. For work that only needs to happen once, the reviewer suggests `pull_request_ready_for_review` instead. A daily credit limit is added as a backstop.

**Outcome:** Runs drop to pushes that touch the service in non-draft pull requests. This is a predicted reduction; the team checks the session list after a sandbox trial.

## Practice: tune a noisy trigger

**Prerequisites:** One hypothetical event-triggered automation and a rough count of matching events per day.

1. Estimate runs per day with the current trigger.
2. Add one filter or choose a less frequent trigger, and estimate again.
3. For any script that calls the run endpoint, write retry rules for 404, 403 and 429 responses.

**Expected result:** A lower estimated run count and documented retry rules.

<details>
<summary>Model answer</summary>

Fifty pushes a day becomes about ten after path and draft filters. Retry rules: on 404 after a run request, poll the automation's task list rather than resubmitting. On 403 or 429, honor `retry-after` or wait at least one minute, then back off exponentially and stop after a fixed number of attempts.

</details>
