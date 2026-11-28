---
title: Choose the right layer
section: Operating the Map
order: 23
description: Use reach, enforcement strength and evidence to decide which layer should carry a new requirement.
verified: "2026-11-27"
diagram: layer-selection
checks:
  - question: Why does GitHub recommend a managed settings allowlist over a custom MCP registry for restricting MCP servers?
    answer: The registry method has weaker enforcement; the managed settings allowlist applies across clients and users cannot override it. The custom registry is also public preview.
  - question: When should a restriction be set at enterprise level rather than scoped to an organization?
    answer: Only for non-negotiables; GitHub recommends scoping restrictions to sensitive organizations so others can move faster.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/governance-controls
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model
---

## What you will learn

- Apply a four-question sequence to place a requirement on a layer.
- Prefer the narrowest scope that still covers the people at risk.
- Combine layers when no single one reaches everyone.

## Four questions

Guide advice: ask these in order.

1. **Is it about availability, behavior, reach, data, cost or code landing?** Availability points to policies and model settings. Behavior inside a client or agent points to managed settings. Reaching unapproved accounts points to network routing. Data exposure points to content exclusion. Cost points to budgets. Changes landing on branches point to rulesets. See the surface table in the [governance controls overview](https://docs.github.com/en/copilot/concepts/enterprise/governance-controls).
2. **Who must it reach?** Licensed users only, everyone on a managed device, everyone on the network or every contributor to a repository. Pick the layer whose reach matches.
3. **Can users override it?** Prefer a layer that users cannot override for non-negotiables. The [MCP management concept page](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) is a worked case: the managed settings allowlist (generally available) applies across clients and cannot be overridden by users, while a custom MCP registry (public preview) has weaker enforcement. The [MCP governance deep dive](https://ragmha.github.io/field-guides/copilot-mcp-governance-guide/) goes further.
4. **What will prove it?** If no evidence source covers the layer, add one or choose a layer that has one.

Then choose the narrowest scope. The [adoption governance tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) recommends disabling at enterprise level only for non-negotiables and scoping other restrictions to sensitive organizations. The [pilot tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) shows how to trial a feature or model with a limited group first. The [rollout playbook deep dive](https://ragmha.github.io/field-guides/copilot-rollout-playbook-guide/) covers staging.

## Worked example: only approved MCP servers

**Hypothetical starting state:** Fictional Larkspur Freight's security lead asks that Copilot agents use only MCP servers the security team has reviewed, on laptops and in the cloud.

Question 1: behavior inside clients and agents, so managed settings. Question 2: licensed users in all supported clients, including Copilot in the cloud, so the server-managed file; contractors on managed laptops also need a device management source. Question 3: the managed settings allowlist cannot be overridden by users, unlike a custom registry. Question 4: changes to the settings file are visible in the `.github-private` repository history, and the MCP policy itself appears in the audit log.

**Outcome:** One requirement lands on managed settings at two sources, with the "MCP servers in Copilot" policy recorded as a separate availability row.

## Practice: place three requirements

**Prerequisites:** The four questions.

1. Place each: "Finance may not use a specific model"; "No personal Copilot plans on the office network"; "Research spend stops at a fixed amount".

**Expected result:** One primary layer and its scope for each.

<details>
<summary>Model answer</summary>

Model restriction: model settings scoped to the Finance organization, not the whole enterprise. Personal plans: network routing that blocks the individual endpoint, owned by the network team. Research spend: a cost center budget with "Stop usage when budget limit is reached" enabled, or user-level budgets for a per-person hard stop.

</details>
