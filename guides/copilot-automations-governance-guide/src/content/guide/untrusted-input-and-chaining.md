---
title: Filter untrusted input and chains
section: Permissions & Scope
order: 3
description: Decide whose events and which Copilot-created events may start an automation, and keep chains finite.
verified: "2026-11-27"
diagram: untrusted-input-and-chaining
checks:
  - question: By default, can an event created by another Copilot session start an automation trigger?
    answer: No. Copilot-created events are excluded unless the trigger is set to Anyone; the Copilot coding agent app cannot turn that on itself.
  - question: Can a GitHub App's label or comment event start an automation if the app has write access?
    answer: No. App-authored label, assignment, closure, comment and review events are filtered out.
sources:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/
---

## What you will learn

- Apply the actor filters that decide whose events reach the prompt.
- Design automation chains that cannot loop or bypass review.

## Two filters guard the trigger

When an automation is triggered by an event, input from the person who caused it can [become part of the prompt](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations). GitHub documents two filters:

- **Write access.** By default, automations ignore events from users without write access. In the [creation form](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations), this checkbox can be locked on. The [REST reference](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) calls it `require_actor_write_permission`. Setting it to false is rejected when organization or repository policy disallows read-access triggers. Scheduled runs have no event actor.
- **Copilot-created events.** **Can be triggered by** offers **Anyone except Copilot in the cloud** or **Anyone**. The REST field `allow_copilot_triggers` defaults to false. The Copilot coding agent app cannot turn it on, so an agent cannot widen its own triggers.

GitHub App events are filtered separately. App-authored label, assignment, closure, comment and review events cannot trigger automations, even when the app has write access.

The [October 2026 update](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) supports chaining through **Can be triggered by** and the automation run succeeded and failed triggers. GitHub also filters hidden characters and HTML comments from agent input. Pull requests that automations open don't run Actions workflows until a user with write access approves them, which stops chained workflows from running unchecked.

Guide advice: allow Copilot-created events only on the downstream trigger that needs them. Draw the chain and confirm that no automation can trigger itself through another.

## Worked example: triage feeding a fixer

**Hypothetical starting state:** The platform team wants a triage automation to label bug reports. A second automation should open a fix when the `bug` label appears.

The labeling event comes from Copilot, so the fixer's `issue_labeled` trigger must allow Copilot-created events. The reviewer enables that on the fixer only. The triage trigger stays on **Anyone except Copilot in the cloud**, so the fixer's comments cannot restart triage. Both keep the write-access filter on.

**Outcome:** The chain has one direction. A person outside the repository cannot start it, and the fixer's pull request still waits for workflow approval and human review.

## Practice: trace a chain for loops

**Prerequisites:** Two or three hypothetical automation designs with their triggers, in an authorized sandbox or on paper.

1. Draw each automation as a node and each trigger that accepts Copilot-created events as an arrow.
2. Look for any cycle. Mark triggers that accept events from users without write access.
3. Remove arrows until the graph has no cycle and outside input is limited.

**Expected result:** A chain diagram with no cycle and documented filters.

<details>
<summary>Model answer</summary>

Triage to fixer is the only arrow; triage accepts no Copilot-created events. Both triggers require write access. If a third automation reacts to `automation_failed` from the fixer, confirm that it cannot itself trigger the fixer. Otherwise a failure could loop.

</details>
