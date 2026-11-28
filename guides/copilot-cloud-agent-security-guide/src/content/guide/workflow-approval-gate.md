---
title: Gate workflows on agent pushes
section: Workflow Approval
order: 14
description: Use Approve and run workflows as a checkpoint for code that could reach Actions secrets.
verified: "2026-11-27"
diagram: workflow-approval-gate
checks:
  - question: Do GitHub Actions workflows run automatically when the cloud agent pushes changes?
    answer: Not by default. A user with write access must click Approve and run workflows, unless the repository has turned off the approval requirement.
  - question: Which part of the diff deserves particular attention before approving workflow runs?
    answer: Changes under .github/workflows/, because an approved run executes that code with the workflow's permissions and secrets.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
---

## What you will learn

- Explain why agent pushes do not trigger workflows automatically.
- Inspect the right files before approving a run.
- Separate workflow approval from pull request approval.

## A checkpoint before Actions runs

The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) states that GitHub Actions workflows do not run on agent pushes until a user with write access clicks **Approve and run workflows**. Repositories can configure workflows to run automatically instead.

The [review guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output) tells reviewers to inspect the changes first, especially any under `.github/workflows/`, and then click **Approve and run workflows** in the merge box. The [agent settings page](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) explains the risk: unreviewed code in a workflow run could gain write access or read Actions secrets.

Workflow approval and pull request approval are separate decisions. Approving runs lets CI produce evidence; it does not approve the change for merge.

**Guide advice:** Read the diff before approving runs, even when you only want test results. A change to a test script or build file runs with the same permissions as a workflow change.

## Worked example: a modified workflow

**Hypothetical starting state:** The fictional Silverpine Retail team receives an agent pull request that fixes a flaky test. The diff also edits `.github/workflows/ci.yml` to add a step that prints environment variables "for debugging."

The reviewer sees the workflow approval prompt. Before clicking it, they read the diff and notice the new step. They ask why it is needed and leave an `@copilot` comment asking it to remove the step. After the agent pushes a revision without it, the reviewer approves the workflow run.

**Outcome:** The run that executed did not include the unreviewed debugging step. The pull request still needs an independent approval before merge.

## Practice: decide whether to approve a run

**Prerequisites:** A local note and three fictional agent pushes to an authorized sandbox repository: (a) a README change only; (b) a change to `package.json` scripts; (c) a new workflow file that uses a repository secret.

1. For each push, list the files you would read before approving runs.
2. Decide whether you would approve, ask for changes, or escalate.
3. Explain what an approved run could access in each case.
4. Do not approve runs in a production repository as part of this exercise.

**Expected result:** A decision for each push with a short reason tied to what the run would execute.

<details>
<summary>Model answer</summary>

(a) Read the diff and approve if nothing else changed. (b) Read the script changes, because CI will execute them; approve only if they are expected. (c) Escalate to the workflow owner. A new workflow that references a secret needs explicit review before any run, since approval lets it execute with that secret.

</details>
