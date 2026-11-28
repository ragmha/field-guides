---
title: Choose a distribution channel
section: Distribution
order: 14
description: Match each customization to a channel by audience, surface and ownership.
verified: "2026-11-27"
diagram: distribution-channels
checks:
  - question: How do personal skills reach Copilot cloud agent sandbox sessions?
    answer: Only through a .copilot/skills directory in a dotfiles repository, and not in Actions-based sessions.
  - question: Which channel bundles agents, skills, hooks and MCP configuration for several surfaces?
    answer: A plugin distributed through a marketplace.
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/agent-skills
  - https://docs.github.com/en/copilot/concepts/customizations/plugins
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents
  - https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations
---

## What you will learn

- Compare the documented distribution channels for customizations.
- Select the narrowest channel that reaches the intended audience.

## Four channels

**Repository files.** Instructions, prompt files, agents and skills committed to a repository reach everyone working in that repository on supported surfaces, and are reviewed like code.

**Governance repositories.** Agents in the `agents/` directory of an organization's `.github` or `.github-private` repository reach every organization member, as described in [Preparing to use custom agents in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) (**public preview**). Enterprise agents use the enterprise-designated `.github-private` repository.

**Personal setups.** Personal instructions, skills and agents stay with one person. [About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) notes that personal skills reach cloud agent sandbox sessions only through `.copilot/skills` in a dotfiles repository, and not Actions-based sessions.

**Plugins.** [Plugins for GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/plugins) bundle agents, skills, hooks, extensions, MCP and LSP configuration for supported surfaces such as VS Code, Copilot CLI, the Copilot app and Copilot in the cloud. They are distributed through marketplaces; the built-in marketplace is awesome-copilot.

[Comparing customizations](https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations) recommends starting with the smallest customization that solves the problem.

Guide advice: choose the narrowest channel that reaches the audience. Promote a personal skill to a repository only after a second team asks for it, and to a plugin only when several repositories need the same bundle.

## Worked example: one skill, three channels

**Hypothetical starting state:** At the fictional Alder Logistics, a developer's personal `incident-summary` skill is copied by hand into 12 repositories, and the copies have drifted.

The platform team keeps one canonical copy in a plugin in an internal marketplace, documents it in the inventory, and removes the hand copies in reviewed pull requests. The original author keeps a personal variant for experiments.

**Outcome:** One owner, one version, and a clear distinction between the shared bundle and personal experiments.

## Practice: assign channels in your inventory

**Prerequisites:** The ownership inventory from Part 2, read-only.

1. Add a Channel column with the values repository, governance repository, personal and plugin.
2. For each row, record the current channel and the audience it actually reaches.
3. Mark rows where the same customization appears in more than one channel.
4. For each duplicate, propose a single canonical channel and the owner who would maintain it.

**Expected result:** Each customization has one proposed canonical channel and owner, with duplicates listed for consolidation.

<details>
<summary>Model answer</summary>

Duplicates usually appear as copied skills or instructions. The canonical channel should be the narrowest that covers every current consumer. Note any surface gaps, such as personal skills not reaching Actions-based sessions, before consolidating.

</details>
