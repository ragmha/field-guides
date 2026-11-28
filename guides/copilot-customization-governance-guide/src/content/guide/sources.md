---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/customization-cheat-sheet
---

## What you will learn

The links below are the primary documentation consulted for this draft. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Customization types | [Comparing GitHub Copilot customizations](https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations) | 2026-11-27 |
| Locations and support | [Customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) | 2026-11-27 |
| Instruction concepts | [About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) | 2026-11-27 |
| Instruction support | [Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support) | 2026-11-27 |
| Repository instructions | [Adding repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions) | 2026-11-27 |
| Organization instructions | [Adding organization custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions) | 2026-11-27 |
| Personal instructions | [Adding personal custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions) | 2026-11-27 |
| CLI instructions | [Adding custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) | 2026-11-27 |
| VS Code instructions | [Use custom instructions in VS Code](https://code.visualstudio.com/docs/agent-customization/custom-instructions) | 2026-11-27 |
| VS Code prompt files | [Use prompt files in VS Code](https://code.visualstudio.com/docs/agent-customization/prompt-files) | 2026-11-27 |
| VS Code migration | [Migrate customizations to the Copilot harness](https://code.visualstudio.com/docs/agent-customization/migrate-customizations) | 2026-11-27 |
| Custom agents | [About custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents) | 2026-11-27 |
| Agent configuration | [Custom agents configuration](https://docs.github.com/en/copilot/reference/custom-agents-configuration) | 2026-11-27 |
| Creating agents | [Creating custom agents for Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/create-custom-agents) | 2026-11-27 |
| Testing agents | [Testing and releasing custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents) | 2026-11-27 |
| Organization agents | [Preparing to use custom agents in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) | 2026-11-27 |
| Enterprise agents | [Preparing to use custom agents in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents) | 2026-11-27 |
| Skill concepts | [About agent skills](https://docs.github.com/en/copilot/concepts/customizations/agent-skills) | 2026-11-27 |
| Adding skills | [Adding agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) | 2026-11-27 |
| Plugin concepts | [Plugins for GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/plugins) | 2026-11-27 |
| Plugin reference | [Plugin and marketplace reference](https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference) | 2026-11-27 |
| Marketplaces | [Creating and sharing a plugin marketplace](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces) | 2026-11-27 |
| Managed plugins | [Managing plugin marketplaces and plugins](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) | 2026-11-27 |

## Release status and scope

- **Public preview:** organization and enterprise custom agents, as labeled on the organization preparation and agent testing pages.
- **Public preview:** custom agents and several other customization types in JetBrains IDEs, Eclipse and Xcode, as marked in the cheat sheet and configuration reference.
- **Public preview:** `gh skill` commands in GitHub CLI 2.90.0 or later.
- **Experimental:** the VS Code user customization migration feature.
- **Deprecated:** the VS Code Local harness, which runs prompt files, is scheduled for removal by February 2027.
- **Retired:** GitHub App-based Copilot Extensions; they are distinct from CLI extensions and are not covered.
- **Out of scope:** policies and policy conflicts, managed settings keys and deployment, MCP allowlists, hooks, sandboxing, network and content controls, session data, audit telemetry analysis, metrics and model governance. These are covered by sibling courses or only referenced where a customization decision depends on them.

## Upstream and attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use layered maps, a support matrix, a swimlane, flowcharts, a release timeline and lifecycles. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.
