---
title: Keep human review gates
section: Review Gates & Kill Switches
order: 2
description: Combine branch rules, extra approvals and workflow approval so automation output still meets a person.
verified: "2026-11-27"
diagram: review-and-workflow-gates
checks:
  - question: How many approvals does a ruleset requiring one approval need for a shared automation's pull request, by default?
    answer: Two. The additional approval rule for unattributed Copilot pull requests is on by default and adds one.
  - question: Who can turn off the requirement to approve workflow runs on Copilot pull requests?
    answer: A repository administrator, in the repository's Copilot cloud agent settings. GitHub warns this may expose secrets or write access.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
  - https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/
---

## What you will learn

- Identify the review gates that apply to automation pull requests and pushes.
- Recognize the settings and tools that can weaken those gates.

## Gates that still apply

The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) describes how cloud agent work is checked:

- **Branch limits.** The agent pushes only to one branch, a new `copilot/` branch or the existing pull request branch. It cannot run `git push` directly, and branch protections and rulesets apply. The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) confirms Copilot is subject to rulesets.
- **Approvers.** The person who requested the work cannot approve its pull request. For a personal automation, that is the creator.
- **Extra approval.** Shared automation pull requests are attributed to Copilot, not a person. The ruleset rule [**Require an additional approval for unattributed Copilot pull requests**](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) (**public preview**) is on by default and adds one approval. Admins can clear it in rulesets. Branch protection always requires the extra approval. The rule has no effect when zero approvals are required.
- **Workflow approval.** Actions workflows don't run on Copilot pull requests until someone with write access selects **Approve and run workflows**. A repository administrator can [disable this requirement](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings). GitHub warns that doing so may let unreviewed code gain write access or reach Actions secrets.

The cloud agent also runs built-in security checks and Copilot code review by default. Administrators can turn these validation tools off.

The [October 2026 update](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) added an automation tool that merges pull requests. Guide advice: treat it as the most sensitive tool in the catalog. Required approvals and status checks on the target branch are the gate that still stands between it and the default branch. Add it only where those rules are in place.

## Worked example: a repository with no required reviews

**Hypothetical starting state:** An internal tools repository requires zero approvals, and the team wants a shared automation that fixes lint failures.

The reviewer notes that the extra approval rule has no effect when zero approvals are required. The repository also allows workflows to run without approval. The reviewer proposes a ruleset for the default branch that requires one approval and keeps the extra approval rule. Workflow approval is restored, and the merge tool is excluded.

**Outcome:** Each automation pull request now needs two human approvals and a workflow approval before CI runs. Gates are proposed in a sandbox first.

## Practice: audit review gates

**Prerequisites:** Read access to the rules and Copilot settings of an authorized sandbox repository.

1. Record the required approvals on the default branch and whether the extra approval rule is on.
2. Record whether workflow runs on Copilot pull requests require approval and whether validation tools are on.
3. List any automation that has the merge tool.

**Expected result:** A gate table that shows where automation output can reach the default branch without a person.

<details>
<summary>Model answer</summary>

| Gate | Sandbox state | Action |
| --- | --- | --- |
| Required approvals | 0 | Require at least one |
| Extra approval rule | Has no effect at 0 | Keep enabled |
| Workflow approval | Off | Turn it back on |
| Merge tool | One automation | Remove or justify |

</details>
