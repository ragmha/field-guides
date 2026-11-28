---
title: Stage a custom agent release
section: Versioning & Release
order: 10
description: Test an agent privately, release it by moving the profile, and rely on commit-based versions.
verified: "2026-11-27"
diagram: agent-release-path
checks:
  - question: Where do you place a custom agent profile to test it privately in a .github-private repository?
    answer: In the .github/agents directory, where it is only usable for tasks started within that repository.
  - question: Which agent version does a cloud agent pull request use after the profile changes?
    answer: The version from the latest commit when the task was assigned; the pull request keeps that version.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents
  - https://docs.github.com/en/copilot/reference/custom-agents-configuration
---

## What you will learn

- Use the documented test-then-release path for organization and enterprise agents.
- Explain how commit-based agent versioning affects in-flight work and rollback.

## Testing and releasing an agent

[Testing and releasing custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents) describes three steps. Custom agents on this page are in **public preview**.

1. Create the profile in `.github/agents` inside the organization's or enterprise's `.github-private` repository and merge it. Agents there are available only to people with access to that repository, and only for tasks started in it.
2. Select the repository and the agent at the agents tab, send prompts, and review results under recent sessions. Iterate until satisfied.
3. Move the profile from `.github/agents` to the top-level `agents` directory and merge. The agent is now available across the organization or enterprise.

The same page suggests filtering the organization audit log by `actor:Copilot` to monitor usage after release.

## Versions are commits

The [custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) states that agent versioning is based on Git commit SHAs. When a task is assigned, the latest profile version on the repository and branch is used, and the resulting pull request keeps that version. The reference also lists the frontmatter (`name`, `description`, `target`, `tools`, `model`, `mcp-servers` and others) and a 30,000-character limit for the prompt.

Guide advice: record the commit SHA of each released profile in a changelog in the governance repository README. Rollback is then a reviewed revert, and in-flight pull requests are unaffected because they keep their original version.

## Worked example: a risky tool change

**Hypothetical starting state:** The fictional Copperline Bank platform team wants to add a new tool to its enterprise "migration helper" agent, which currently omits `tools` and therefore has all tools.

The team duplicates the profile into `.github-private/.github/agents/` with an explicit `tools` list, tests it on sample tasks, then moves it to `agents/` in a reviewed pull request and notes the merge SHA in its changelog.

**Outcome:** The released agent has a narrower, reviewed tool list, and the team can point to the exact commit if behavior changes.

## Practice: plan a staged release

**Prerequisites:** An authorized sandbox organization with a `.github-private` repository prepared for custom agents, and permission to open pull requests there.

1. Copy an existing sandbox agent profile into `.github/agents/` under a test filename that uses only allowed characters.
2. Open and merge the pull request into the sandbox default branch.
3. Run two representative prompts with the test agent from the agents tab and record results.
4. Write the pull request that would move it to `agents/`, but leave it as a draft.
5. Record the test commit SHA and the planned release checklist.

**Expected result:** A tested sandbox profile, a draft release pull request and a changelog entry, with no change to released agents.

<details>
<summary>Model answer</summary>

The checklist should include test prompts and expected outcomes, the reviewer, the release commit SHA, and the rollback step (revert the move). Note that the test location limits use to the governance repository, so test prompts must target that repository.

</details>
