---
title: Control changes to automations
section: Audit & Change Control
order: 3
description: Review automation definitions that live outside Git, or move them into reviewed workflow files.
verified: "2026-11-27"
diagram: automation-change-control
checks:
  - question: Are automation definitions committed to the repository and reviewed through pull requests?
    answer: No. They are stored outside the repository, so use revision history or an as-code alternative for review.
  - question: Who decides whether a proposed improvement to an automation is applied?
    answer: The automation owner is notified and can apply or dismiss it.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-github-agentic-workflows
---

## What you will learn

- Track changes to automation definitions with revision history.
- Decide when to use an as-code workflow instead.

## Definitions outside Git

[Automations](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) are stored by GitHub, not committed to the repository. A change to a prompt, trigger or tool list does not go through a pull request. The controls that exist:

- **Revision history.** Each automation keeps revisions you can view in the UI or through the [REST API](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**).
- **Edit rights.** Anyone with write access can edit a shared automation. The automation type cannot change after creation.
- **Proposed improvements.** [Automations can propose changes](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations) to the tools, triggers and prompts of themselves or other automations. The owner is notified and can apply or dismiss the proposal.

Guide advice: snapshot each automation's definition with the REST get endpoint on a schedule and compare it with the last approved copy. Treat a proposed improvement that adds tools or triggers as a new review.

For teams that need pull request review, [GitHub Agentic Workflows](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-github-agentic-workflows) is an as-code alternative. Workflows are markdown files compiled to a lock file in the repository, so changes go through normal review. They are read-only by default and write through declared safe outputs.

## Worked example: a quiet prompt change

**Hypothetical starting state:** A weekly report automation began opening pull requests instead of issues. No pull request changed its definition.

The reviewer opens revision history and finds an edit two weeks earlier that added a pull request tool. The editor had write access, so the edit was allowed. The reviewer restores the earlier settings and starts a weekly snapshot comparison.

**Outcome:** The change is reversed and future edits are caught within a week. Teams that need stronger control move this job to an agentic workflow file.

## Practice: set up change review

**Prerequisites:** An authorized sandbox repository with one shared test automation.

1. Record who has write access and can edit the automation.
2. Fetch the automation definition and its revisions.
3. Decide whether it stays an automation or becomes a reviewed workflow file.

**Expected result:** A baseline snapshot, a list of editors and a placement decision.

<details>
<summary>Model answer</summary>

Editors are the repository's writers and maintainers. The baseline is the latest revision's prompt, triggers and tools. A weekly comparison flags differences to the owner. A job that writes to protected branches moves to an agentic workflow so its definition is reviewed in a pull request.

</details>
