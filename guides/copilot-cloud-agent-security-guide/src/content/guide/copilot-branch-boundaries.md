---
title: Know the agent's branch boundaries
section: Branch and Ruleset Guardrails
order: 6
description: Understand which branch the agent pushes to and what it cannot do with a pull request.
verified: "2026-11-27"
diagram: copilot-branch-boundaries
checks:
  - question: Which branch does the agent push to when it is not invoked on an existing pull request?
    answer: A new branch whose name starts with copilot/. When invoked with @copilot on a pull request, it pushes to that pull request's branch.
  - question: Can the cloud agent mark its own pull request ready for review or merge it?
    answer: No. Its pull requests start as drafts, and a human must mark them ready, review and merge them.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
---

## What you will learn

- Describe the single-branch push boundary for agent work.
- List the pull request actions reserved for humans.
- Use branch names to target agent work in rules.

## One task, one branch, one draft

The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) states that the agent pushes to a single branch. When invoked with `@copilot` on a pull request, that is the pull request branch; otherwise it is a new branch starting with `copilot/`. The agent can perform only simple pushes and cannot run `git push` directly. It remains subject to branch protections and required checks.

The same page says agent pull requests are drafts that a human must review and merge. The agent cannot mark a pull request ready for review, approve it or merge it. The [Copilot on GitHub overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) adds that each task produces one branch and one pull request.

The [session management page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) explains that stopping a session ends the Actions run and preserves commits already pushed. Stopping is not a rollback.

**Guide advice:** Treat the `copilot/` prefix as a useful targeting signal for rules and reports, not as a security control on its own. A human can also create a branch with that prefix.

## Worked example: a stopped session

**Hypothetical starting state:** The fictional team at Meadowbrook Labs assigned an issue to Copilot. The session pushed two commits to `copilot/fix-retry-logic`, then headed in the wrong direction. A developer stopped the session.

The team checks what remains. The draft pull request and the two commits still exist on the `copilot/` branch. The default branch is unchanged, because the agent could push only to its own branch and could not merge. The developer closes the draft and deletes the branch through the normal process.

**Outcome:** Nothing reached the default branch without a human decision. The cleanup used ordinary pull request controls.

## Practice: list human-only actions

**Prerequisites:** A local note and a fictional agent pull request on `copilot/update-readme`, opened from an assigned issue in an authorized sandbox repository.

1. List each step from the open draft to a merged change.
2. Mark each step as "agent can do" or "human only," using the documented behavior.
3. Identify which branch an `@copilot` follow-up comment on this pull request would push to.
4. Do not merge or modify a production repository.

**Expected result:** A short list where marking ready, approving and merging are human-only, and the follow-up pushes to `copilot/update-readme`.

<details>
<summary>Model answer</summary>

The agent can push simple commits to `copilot/update-readme` and respond to `@copilot` comments on the same branch. A human must mark the draft ready for review, an eligible reviewer must approve it, and a human must merge it. Required checks and branch protections still apply to the agent's pushes.

</details>
