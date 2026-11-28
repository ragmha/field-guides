---
title: Fit rulesets to agent work
section: Branch and Ruleset Guardrails
order: 7
description: Check whether rulesets block Copilot, when to grant bypass, and how to protect agent configuration files.
verified: "2026-11-27"
diagram: rulesets-for-agents
checks:
  - question: Is Copilot exempt from rulesets because it is an app?
    answer: No. Copilot is subject to rulesets like human contributors, and a ruleset or branch protection rule can prevent it from creating or updating pull requests.
  - question: Which rule setting helps protect Copilot and MCP configuration files from unreviewed changes?
    answer: A CODEOWNERS entry for those files combined with "Require review from Code Owners" in the pull request rule.
sources:
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
---

## What you will learn

- Find existing rules that block agent pushes.
- Decide when a bypass entry is justified and how narrow it can be.
- Protect agent configuration files with code owner review.

## Rulesets apply to Copilot

The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) states that Copilot is subject to rulesets like humans. It recommends checking whether existing rules block Copilot: Copilot signs its commits, but it may not satisfy other commit-metadata rules. It suggests using a custom property to target repositories, considering required code scanning or code quality results, and protecting Copilot and MCP configuration files with CODEOWNERS plus **Require review from Code Owners**.

The [Copilot on GitHub overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) notes that a ruleset or branch protection rule can prevent Copilot from creating or updating pull requests, and that admins can add a ruleset bypass for Copilot. The [ruleset creation page](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/creating-rulesets-for-a-repository) lists eligible bypass actors, including GitHub Apps. A bypass can be limited to **For pull requests only**, which requires a pull request instead of a direct push.

The [available rules page](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) describes code owner review: a change to owned content needs a code owner's approval before it can merge.

**Guide advice:** Prefer adjusting a blocking rule's target over granting bypass. If bypass is required, scope it to the rule that blocks agent branches and record the reason.

## Worked example: a commit-metadata rule

**Hypothetical starting state:** The fictional Copperfield Systems repository has a ruleset on all branches that requires a ticket ID pattern in commit messages. Agent sessions fail to update their pull requests.

The team reads the tutorial note about commit-metadata rules. The rule targets all branches, including `copilot/` branches. Rather than adding Copilot to a bypass list for the whole ruleset, they plan to narrow the metadata rule to the default branch, where squash commits are written by humans. They add CODEOWNERS entries for `.github/workflows/copilot-setup-steps.yml` and agent instruction files, owned by the platform team.

**Outcome:** The plan removes the block without a broad bypass and adds code owner review for agent configuration files.

## Practice: review a ruleset on paper

**Prerequisites:** A local note and a fictional ruleset that targets `~ALL` branches with required signed commits, a commit message pattern, one required approval and code owner review.

1. Mark which rules could block a `copilot/` branch push, using the tutorial's guidance.
2. Propose the narrowest change that unblocks the agent.
3. List the agent configuration paths you would add to CODEOWNERS.
4. Use only an authorized sandbox repository if you test anything.

**Expected result:** Signed commits are not the blocker; the message pattern is. The change narrows its target rather than granting broad bypass.

<details>
<summary>Model answer</summary>

Copilot signs commits, so the signed-commit rule is satisfied. The message pattern may not be, so retarget it to the default branch or exclude `copilot/**`. Keep the approval and code owner rules. Add CODEOWNERS entries for `.github/workflows/copilot-setup-steps.yml`, instruction files and MCP configuration.

</details>
