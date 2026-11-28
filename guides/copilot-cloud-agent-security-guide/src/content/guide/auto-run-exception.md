---
title: Treat automatic runs as an exception
section: Workflow Approval
order: 15
description: Decide who owns the Require approval for workflow runs setting and how to document an exception.
verified: "2026-11-27"
diagram: auto-run-exception
checks:
  - question: Where is the Require approval for workflow runs setting?
    answer: In repository Settings > Copilot > Cloud agent, in the Policies section. Repository admins can change it.
  - question: Why should the organization communicate a preferred value for this setting?
    answer: Because approval is on by default but repository admins can disable it, so the organization cannot rely on the default alone.
sources:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## What you will learn

- Locate the workflow approval setting and its owner.
- Weigh the trade-offs of automatic workflow runs.
- Write a time-bound exception record.

## A repository-level choice with organization impact

The [agent settings page](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) places **Require approval for workflow runs** under **Settings > Copilot > Cloud agent > Policies**. Turning it off lets workflows run automatically on agent pushes. GitHub warns that unreviewed code could then gain write access to the repository or access Actions secrets.

The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) notes that approval is on by default, but repository admins can disable it, so organizations should communicate their preferred setting. The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) confirms that automatic runs are a configurable option.

Teams usually ask for automatic runs to get faster CI feedback. That benefit is real, but it moves the checkpoint: code runs before any human reads it.

**Recommended:** Keep approval on by default. Grant exceptions only for repositories where workflows hold no secrets and use read-only token permissions, and review each exception on a schedule.

## Worked example: a documentation site request

**Hypothetical starting state:** The fictional Bramblewood Media docs team asks to disable workflow approval for its static site repository. Its only workflow builds the site with read-only permissions and no secrets. Deployment runs from a separate workflow on the default branch.

The platform owner compares the request with the guidance. The workflows that run on agent branches cannot read secrets, and their token is read-only. The owner approves an exception for 90 days, records the conditions, and asks the team to restore approval if any workflow later adds a secret or write permission.

**Outcome:** The exception is narrow, conditional and dated. The deploy workflow stays outside the agent's branch runs.

## Practice: write an exception record

**Prerequisites:** A local note and a fictional request from an authorized sandbox repository whose CI workflow uses a package registry token.

1. Decide whether the request meets the conditions in the worked example.
2. If it does not, list the changes that would make it eligible.
3. Write an exception record with an owner, conditions, an expiry date and a review trigger.
4. Do not change the setting in a production repository.

**Expected result:** A record that declines the request as written and names the token as the blocking condition.

<details>
<summary>Model answer</summary>

The CI workflow uses a secret, so automatic runs could expose it to unreviewed code. Decline as written. To become eligible, move the token to a workflow that does not run on agent branches, or remove its need in CI. The record names the repository admin as owner, sets a 90-day expiry, and triggers review on any workflow change.

</details>
