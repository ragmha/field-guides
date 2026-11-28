---
title: Read the control layer stack
section: The Control Map
order: 2
description: Place each Copilot governance surface in a layer stack and record where it is defined and whom it reaches.
verified: "2026-11-27"
diagram: control-layer-stack
checks:
  - question: Do audit logs show what a developer typed into a local client?
    answer: No. GitHub's overview says audit logs cover activity on the GitHub website, not local client actions or a granular breakdown of sessions.
  - question: Which managed settings source applies to anyone using the machine, regardless of license?
    answer: Machine-level configuration (MDM or a local file). The server-managed file in the .github-private repository applies only to licensed users.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/governance-controls
  - https://docs.github.com/en/copilot/get-started/enterprise-ai-governance
---

## What you will learn

- List the eight governance surfaces GitHub documents for Copilot.
- Record, for each one, where it is defined and who it affects.
- Explain why no single layer covers every requirement.

## Eight surfaces, four questions

GitHub's [governance controls overview](https://docs.github.com/en/copilot/concepts/enterprise/governance-controls) suggests a simplified order: assign seats, configure network settings, set policies, configure further settings (models, `managed-settings.json`, billing budgets and cost centers), create rulesets, then use audit logs to prevent drift. It also gives a table of surfaces. Read each one through four questions: what it controls, where it is defined, who it affects, and what it cannot see.

| Layer | Defined in | Affects |
| --- | --- | --- |
| Seat assignment | Enterprise AI controls, organization settings or an identity provider through enterprise teams | Members; with Enterprise Managed Users it is the only way to receive Copilot |
| Network settings | Enterprise settings plus corporate proxy or firewall | Anyone on the corporate network |
| Copilot policies and model settings | Enterprise AI controls or organization settings | Generally seat holders; client support varies |
| Enterprise managed settings | JSON in a `.github-private` repository, or machine configuration | Server file: licensed users only. Machine configuration: anyone on that machine |
| Billing settings | Enterprise or organization billing | People billed to the enterprise, in all clients |
| Rulesets | Enterprise, organization or repository | Agents and humans |
| Audit logs | GitHub | Visible to admins; GitHub website activity only |

The stack is not a hierarchy where a higher layer overrides a lower one. Each layer answers a different question. Policies decide whether a feature is available. Managed settings decide what a client or agent may do once it runs. Network routing decides which endpoints and accounts can be reached. Rulesets decide what can land on a branch. The evidence layers show what happened. The [enterprise AI governance index](https://docs.github.com/en/copilot/get-started/enterprise-ai-governance) links the detailed documentation for each one.

Guide advice: write "cannot see" or "does not cover" next to every layer. Gaps usually come from assuming that one layer covers what only a neighboring layer can enforce.

## Worked example: placing a request on the stack

**Hypothetical starting state:** A fictional enterprise, Larkspur Freight, asks: "Make sure contractors on shared build machines cannot use personal Copilot accounts, and show us that the rule holds."

The administrator splits the request across layers. Network routing can block personal Copilot plan endpoints on the corporate network. A machine-level managed settings source reaches every user of that machine, unlike the server file, which reaches only licensed users. The audit log can show policy and setting changes but not local client activity, so evidence that the rule holds must come from network and endpoint records owned by other teams.

**Outcome:** One sentence of requirement becomes three layer entries, each with a different owner and a stated evidence gap.

## Practice: stack a requirement

**Prerequisites:** The table above, a whiteboard or notes file, and no production access needed.

1. Take the requirement "Agents must not merge their own changes to the default branch."
2. Mark every layer that could contribute.
3. For each marked layer, write one line on what it would enforce and one on what it cannot see.

**Expected result:** At least rulesets and audit logs are marked, with a stated limitation for each.

<details>
<summary>Model answer</summary>

Rulesets enforce pull request review on the default branch for agents and humans, but do not record who approved changes outside GitHub. Policies can decide whether the cloud agent is available at all, but not how its pull requests are merged. Audit logs show agent activity and ruleset changes on GitHub, but not local client sessions.

</details>
