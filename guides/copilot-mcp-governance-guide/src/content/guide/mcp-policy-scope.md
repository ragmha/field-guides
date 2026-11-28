---
title: Scope the MCP servers in Copilot policy
section: MCP Policy Foundations
order: 2
description: Understand what the MCP servers in Copilot policy gates, which seats it governs, and what it leaves to other controls.
verified: "2026-11-27"
diagram: mcp-policy-scope
checks:
  - question: Is the MCP servers in Copilot policy enabled by default?
    answer: No. GitHub documents it as disabled by default, so MCP servers do not run for governed seats until an administrator enables it.
  - question: Does the policy govern a developer who uses a personal Copilot Pro plan?
    answer: No. It applies only to Copilot Business and Copilot Enterprise seats from the organization or enterprise that configures it.
  - question: Does enabling the policy decide which specific servers can run?
    answer: No. It decides whether MCP can run at all; allowlists, denylists or a registry decide which servers.
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry
---

## What you will learn

- Explain what the MCP servers in Copilot policy turns on and off.
- Identify which users and seats the policy governs.
- Separate the on/off decision from the which-servers decision.

## One policy, two questions

The [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp) describes MCP across IDEs, Copilot CLI, the Copilot app and the cloud agent. The **MCP servers in Copilot** policy is **disabled by default**. It applies only to users with Copilot Business or Copilot Enterprise seats from an organization or enterprise that configures it. Users on Copilot Free, Pro, Pro+ or Max are not governed by it.

[MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) frames the policy as the switch that defines whether MCP servers can run at all across Copilot clients. GitHub recommends keeping it enabled and restricting usage to an approved list. The same policy also governs Copilot connectors, which are **public preview**.

That leaves two separate questions:

1. **Can MCP run?** The policy answers this for governed seats.
2. **Which servers can run?** Managed-settings allowlists and denylists, or a custom registry, answer this. Part 2 covers both.

At the enterprise level, the [registry how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry) places the policy under **AI controls > MCP**, where it can be set to "Enabled everywhere". Organization owners find related settings under **Settings > Copilot > Policies**.

Guide advice: write down which seats each policy setting covers before you announce a change. A developer who also holds a personal plan may see different behavior depending on which license their session uses.

## Worked example: enabling MCP for a pilot

**Hypothetical starting state:** The Harbor platform team in a fictional enterprise wants Copilot to use an internal ticketing MCP server. The policy is still at its default, so MCP servers do not run for governed seats. Two contractors use personal Copilot Pro plans.

The team agrees that enabling the policy alone would allow any server a user configures. They therefore prepare an allowlist (Part 2) before enabling the policy, and note that the contractors' personal plans are outside the policy and need a contractual rather than technical control.

**Outcome:** The policy is enabled only after an allowlist is ready, and the team records the personal-plan gap as an accepted risk with an owner.

## Practice: map policy coverage

**Prerequisites:** Read access to Copilot policies in an authorized sandbox enterprise or organization; no production changes.

1. Find the MCP servers in Copilot policy and record its current value and the level that set it.
2. List the seat types in your sandbox and mark which ones the policy governs.
3. Note whether any allowlist, denylist or registry is configured.
4. Write one sentence describing what would happen if the policy were enabled today.

**Expected result:** A short coverage note that separates "can MCP run" from "which servers run" and names any ungoverned users.

<details>

<summary>Model answer</summary>

"The policy is disabled at enterprise level, so governed Business and Enterprise seats cannot run MCP servers. No allowlist exists. Enabling the policy today would allow any configured server for governed seats. Users on personal plans are not governed by this policy."

</details>
