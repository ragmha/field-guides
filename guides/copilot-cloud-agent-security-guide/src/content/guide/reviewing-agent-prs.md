---
title: Review agent pull requests with evidence
section: Required Reviews
order: 11
description: Combine built-in validation, commit provenance, session logs and human review.
verified: "2026-11-27"
diagram: reviewing-agent-prs
checks:
  - question: Do the built-in validation tools require a GitHub Advanced Security license?
    answer: No. GitHub documents that CodeQL, dependency checks, secret scanning and Copilot code review run for the agent without a GHAS license, though a repository admin can disable them.
  - question: Do session logs replace human code review?
    answer: No. They explain how the agent worked, but GitHub states they do not replace review.
  - question: How do you ask the agent to revise its pull request?
    answer: Leave a comment that mentions @copilot, or push your own commits to the branch.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
---

## What you will learn

- Name the built-in validation tools and who can disable them.
- Use commit signatures, co-authors and session log links as provenance.
- Build a review checklist that keeps humans responsible.

## Layers of review evidence

The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) lists built-in validation the agent runs on its work: CodeQL, checks of new dependencies against the GitHub Advisory Database for malware and High or Critical CVSS advisories, secret scanning, and a Copilot code review second opinion. No GitHub Advanced Security license is needed. The [agent settings page](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/configuring-agent-settings) shows that a repository admin can toggle these tools under **Settings > Copilot > Cloud agent > Validation tools**.

The [session management page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) explains provenance. Commits are authored by Copilot with the requester as co-author, are signed and appear as "Verified," and each commit message links to the session logs. The [Copilot on GitHub overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) cautions that session logs do not replace review.

The [review guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output) says to request changes with an `@copilot` comment or by pushing commits, and to inspect changes before approving workflows.

**Guide advice:** Treat validation results as inputs, not approvals. A clean scan does not show that the change does what the issue asked.

## Worked example: a dependency change

**Hypothetical starting state:** The fictional Lakeside Freight team receives an agent pull request that adds a new parsing library. The validation tools are enabled. The reviewer is not the requester.

The reviewer opens the session log from a commit link and sees why the agent chose the library. The dependency check reported no matching advisory. The reviewer still checks the license, the maintainer and whether an existing library could do the job. They leave an `@copilot` comment asking it to use the existing parser instead.

**Outcome:** The agent revises the branch. The reviewer approves only after reading the final diff.

## Practice: draft a review checklist

**Prerequisites:** A local note and a fictional agent pull request in an authorized sandbox repository.

1. Write a checklist with sections for validation results, provenance, diff review and workflow changes.
2. Add one item that confirms the reviewer is not the requester.
3. Add one item for files under `.github/`.
4. Do not change validation settings in a production repository.

**Expected result:** A checklist of four sections that treats tools and logs as evidence and keeps approval with a human reviewer.

<details>
<summary>Model answer</summary>

Validation: confirm the tool results, and note whether any tool was disabled. Provenance: check the "Verified" signature, the co-author and the session log link. Diff: read every change against the issue. Workflows: inspect `.github/` changes before approving runs. Independence: confirm the approver did not request the work.

</details>
