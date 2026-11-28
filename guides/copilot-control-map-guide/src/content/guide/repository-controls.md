---
title: Repository and cloud agent controls
section: Platform Policy Layers
order: 7
description: Inventory the repository-level controls that bound what the cloud agent can change and how its work is reviewed.
verified: "2026-11-27"
diagram: repository-guardrails
checks:
  - question: Can an organization or repository ruleset weaken an enterprise branch ruleset?
    answer: No. Organization and repository rulesets add to the enterprise baseline and do not override it.
  - question: By default, what happens to Actions workflows on pull requests that Copilot opens?
    answer: They do not run until someone with write access approves them; repository administrators can change this.
sources:
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/add-copilot-cloud-agent
---

## What you will learn

- List the repository-level controls that apply to Copilot's agent work.
- Separate controls set by organization owners from those set by repository administrators.
- Record which repository controls can be locked from above.

## Controls around the agent's work

Copilot in the cloud is enabled by default. Organization owners can restrict which repositories the cloud agent can work in, and any user with a Copilot license and write access to a permitted repository can delegate a task. See [adding the cloud agent to an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/add-copilot-cloud-agent).

The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) lists the controls that then bound the agent:

- **Rulesets** apply to Copilot as to any contributor. Copilot cannot push to the default branch or merge its own pull requests.
- **CODEOWNERS** with "Require review from Code Owners" can protect Copilot and MCP configuration files.
- **Agents secrets and variables** at organization or repository level decide what the agent environment receives.
- **Runners**: prefer GitHub-hosted or ephemeral runners; organizations can restrict runner labels.
- **Workflow approval**: workflows on Copilot's pull requests wait for approval by default.
- **Firewall**: the agent's internet access is set at organization level and may be delegated to repositories.

The [codebase standards tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards) adds an enterprise branch ruleset as a baseline, for example requiring a pull request with one approval and blocking force pushes, targeted with custom properties. Organization and repository rulesets add to that baseline and never override it.

The [cloud agent security deep dive](https://ragmha.github.io/field-guides/copilot-cloud-agent-security-guide/) goes further into the agent's environment. In the map, record each control's level, whether it is locked from above and who can change it.

## Worked example: a ruleset baseline

**Hypothetical starting state:** Fictional Larkspur Freight's repositories each have their own branch protection. Some repositories allow direct pushes to the default branch.

The governance lead proposes an enterprise ruleset targeting repositories with a `tier: production` custom property, requiring a pull request and one approval and blocking force pushes. Repository administrators keep their own rules, which add to the baseline. Copilot configuration files are listed in CODEOWNERS with code owner review required.

**Outcome:** The inventory gains one enterprise-level ruleset row and one CODEOWNERS row per repository class, each with a named owner.

## Practice: classify repository controls

**Prerequisites:** The control list above.

1. Sort the six controls into "set by organization owners", "set by repository administrators" or "both".
2. Mark which ones the enterprise can make non-negotiable.

**Expected result:** A short table showing that rulesets are the main control that can be enforced from the enterprise downward.

<details>
<summary>Model answer</summary>

Organization: cloud agent repository access, runner restrictions, firewall defaults and whether repositories may add custom rules. Repository: CODEOWNERS, workflow approval, repository rulesets. Both: secrets and variables, rulesets. Enterprise-enforceable: rulesets through the enterprise baseline.

</details>
