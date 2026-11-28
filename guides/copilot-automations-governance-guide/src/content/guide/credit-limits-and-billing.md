---
title: Set credit limits and billing owners
section: Cost & Rate Limits
order: 2
description: Combine per-run and periodic AI credit limits and know which account pays for each route.
verified: "2026-11-27"
diagram: credit-limits-and-billing
checks:
  - question: Does reaching an automation's daily AI credit limit stop a run already in progress?
    answer: No. Daily, weekly and monthly limits prevent new runs; only the per-run limit stops a run when reached.
  - question: When do the periodic automation credit limits reset?
    answer: Daily at 00:00 UTC, weekly on Monday at 00:00 UTC and monthly on the first at 00:00 UTC.
  - question: Do user-level budgets apply to Copilot CLI usage billed directly to an organization?
    answer: No. GitHub suggests cost centers and billing dashboards for that usage instead.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-github-agentic-workflows
---

## What you will learn

- Identify who pays for AI credits and Actions minutes on each route.
- Combine per-run and periodic limits into a bounded worst case.

## Two meters, four ceilings

Each automation run starts a cloud agent session that [uses AI credits and GitHub Actions minutes](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations). The creator pays AI credits for personal automations. The repository owner pays for shared automations. Actions minutes are billed separately to the repository owner. At the enterprise level, [compute from cloud sandboxes and Actions](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) draws on the same monthly allowance.

The [October 2026 update](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) added AI credit limits for automations. The automations documentation describes how they behave:

- **Per run.** Stops the run when reached. The minimum is 30 credits.
- **Daily, weekly, monthly.** Prevent new runs once reached but do not stop a run in progress. They reset at 00:00 UTC each day, on Monday and on the first of the month.

Other routes have their own meters. With Copilot CLI in Actions using `GITHUB_TOKEN` in an organization repository, usage is [metered to the organization](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions). User-level budgets are not considered, so GitHub suggests cost centers with budgets and billing dashboards. [GitHub Agentic Workflows](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-github-agentic-workflows) has a per-run `max-ai-credits` setting that defaults to 1,000. That page states 1 AI credit equals $0.01.

Guide advice: set a per-run limit on every automation. A periodic limit alone can be overshot by every run already in flight when it is reached.

## Worked example: an hourly routine

**Hypothetical starting state:** A shared automation runs hourly. The team sets a 200-credit per-run limit and a 2,000-credit daily limit.

Without the daily limit, the worst case is 24 runs × 200 credits = 4,800 credits a day. With it, new runs stop once 2,000 credits are used. The run that crosses the limit can still finish, up to its own 200-credit cap. Actions minutes for every run are billed to the organization separately, so the team adds them to its estimate.

**Outcome:** The worst case is about 2,000 credits plus one run's cap, plus Actions minutes. This is an estimate from documented limit behavior, not a measured bill.

## Practice: bound a cost

**Prerequisites:** One hypothetical automation design with a cadence or expected event rate.

1. Record who pays AI credits and who pays Actions minutes.
2. Choose a per-run limit and one periodic limit, then compute the worst case with and without the periodic limit.
3. In an authorized sandbox, set the limits on a disabled automation and confirm the fields. Do not change production limits.

**Expected result:** A billing owner and a written worst-case bound for the automation.

<details>
<summary>Model answer</summary>

For a personal daily automation with a 100-credit per-run limit and a 500-credit weekly limit, the creator pays AI credits and the repository owner pays Actions minutes. Without the weekly limit, the weekly worst case is 700 credits. With it, the worst case is about 500 credits plus one in-flight run of up to 100.

</details>
