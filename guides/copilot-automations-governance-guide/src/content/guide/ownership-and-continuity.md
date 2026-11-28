---
title: Plan ownership and continuity
section: Identity & Ownership
order: 3
description: Keep an owner for every automation and handle role changes without losing control or history.
verified: "2026-11-27"
diagram: ownership-and-continuity
checks:
  - question: Can a repository administrator list other people's personal automations?
    answer: Not according to the documentation reviewed. Personal automations are private to their creator, but their runs are visible to everyone with read access.
  - question: Does a shared automation stop when its creator leaves?
    answer: No. The documentation says shared automations keep working after the creator leaves.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
---

## What you will learn

- Find automations you cannot list directly by tracing their visible runs.
- Plan role changes, handover and retirement for both automation types.

## Ownership outlives creation

Shared automations [belong to the repository](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) and keep working when their creator leaves. Anyone with write access can maintain them. Personal automations are private to their creator, so neither repository administrators nor teammates can see or edit their configuration. Their runs are visible to everyone with read access. Cloud agent sessions [appear in the repository's **All sessions** view](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) on the **Agents** tab, so runs are the main discovery route.

Each user has an [Automations view](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations) that lists all of their own automations. The [REST API](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) offers a matching list for the authenticated user and a list for a repository. Because the type is fixed, moving a personal routine to team ownership means creating a new shared automation and disabling or deleting the old one.

Two documented features tie state to ownership. Automation groups with the same ownership share persistent artifact storage. The `continuous_history` option lets each run build on earlier runs' session history and runs them one at a time. The documentation reviewed does not say what happens to a personal automation when its creator loses access. Guide advice: treat that as an open question. Do not rely on access removal as a cleanup step; ask creators to disable or hand over automations before they leave.

## Worked example: a departing engineer

**Hypothetical starting state:** An engineer who is moving teams owns two personal automations in the platform team's repository. One posts a weekly dependency report. The other fixes lint failures on new pull requests.

The team lead reviews recent sessions in the repository and finds runs from both automations. The engineer opens their Automations view and copies each automation's prompt, triggers and tools into the team's notes. The team decides the dependency report is still useful and recreates it as a shared automation with a named owner. The lint fixer duplicates an existing workflow, so the engineer deletes it.

**Outcome:** Both personal automations are closed by their creator before the move, and the surviving routine has team ownership. Nothing depends on the engineer's account.

## Practice: write a handover checklist

**Prerequisites:** The hypothetical above and read access to an authorized sandbox repository.

1. In the authorized sandbox, list recent agent sessions and note any that started from automations you cannot see.
2. For each, record the likely owner, the trigger and whether the work should continue.
3. Draft handover steps: copy the configuration, recreate as shared if needed, then disable or delete the original.

**Expected result:** A checklist that does not depend on undocumented offboarding behavior.

<details>
<summary>Model answer</summary>

1. Identify automations from visible runs and ask each creator to confirm them.
2. Have the creator copy the prompt, triggers, tools, model and limits.
3. Recreate continuing routines as shared automations with a named team owner.
4. Have the creator disable or delete the personal original before leaving.
5. Confirm that no new runs from the original appear afterward.

</details>
