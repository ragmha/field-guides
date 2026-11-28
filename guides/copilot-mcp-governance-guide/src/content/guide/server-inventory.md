---
title: Inventory where servers are configured
section: MCP Policy Foundations
order: 3
description: Map every place an MCP server can be defined, who can edit it, and which control reaches it.
verified: "2026-11-27"
diagram: server-inventory
checks:
  - question: Which file does Copilot CLI use for user-level MCP configuration?
    answer: The CLI stores user-level servers in ~/.copilot/mcp-config.json, and also reads project files such as .mcp.json and .github/mcp.json.
  - question: Do managed-settings allow and deny lists cover servers defined in repository custom agent profiles?
    answer: No. GitHub states those lists do not apply to repository custom agent profiles; a custom firewall that withholds required domains can prevent them.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
---

## What you will learn

- List the locations where MCP servers can be defined.
- Identify who can edit each location.
- Match each location to the control that governs it.

## Configuration locations

MCP servers are not defined in one place. From the public documentation:

- **Copilot CLI user configuration.** The [CLI how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) stores servers added with `/mcp add` or `copilot mcp add` in `~/.copilot/mcp-config.json`.
- **Project files.** The CLI reads `.mcp.json` (from the working directory up to the repository root) and `.github/mcp.json`. When names conflict, files closer to the working directory win. GitHub warns not to commit credentials in project-level configuration.
- **Repository settings for the cloud agent.** Repository administrators configure servers in repository settings; anyone with write access can benefit from them, per the [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp).
- **Personal MCP servers.** Users can configure personal servers for cloud sandboxes.
- **Custom agent profiles.** Profiles can define servers with an `mcp-servers` property for the cloud agent.
- **Built-in servers.** The GitHub MCP server is built into Copilot CLI and enabled by default for the cloud agent.

The [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) says `allowedMcpServers` and `deniedMcpServers` apply to servers in user settings and repository settings, but **not** to repository custom agent profiles. Those can be prevented when an organization or repository custom firewall does not allow the domains they need.

Recommended: treat each location as a separate row in an inventory with an owner, an edit permission and a governing control. Gaps in the "governing control" column are where review effort belongs.

## Worked example: finding an ungoverned path

**Hypothetical starting state:** The Juniper data team has an enterprise allowlist and believes every server is covered. A repository custom agent profile defines a remote analytics server that is not on the allowlist.

The team's inventory shows the profile row has no allowlist coverage. They review the profile's required domains against the repository's firewall settings and assign an owner to review custom agent profiles in that repository.

**Outcome:** The inventory exposes one location the allowlist cannot reach, and the team adds a compensating review rather than assuming coverage.

## Practice: build a location inventory

**Prerequisites:** An authorized sandbox repository and organization; read access to settings and repository files.

1. Create a table with columns for location, editor, example server and governing control.
2. Add rows for CLI user configuration, project files, repository settings, personal servers, custom agent profiles and built-in servers.
3. Search the sandbox repository for `.mcp.json`, `.github/mcp.json` and agent profiles.
4. Mark rows where allow and deny lists do not apply.

**Expected result:** A six-row inventory with at least one row flagged for compensating controls.

<details>

<summary>Model answer</summary>

The custom agent profile row is flagged because managed-settings lists do not apply there; its compensating control is firewall review and repository ownership. Built-in servers are flagged as always allowed by allowlist evaluation. The project-file row notes the GitHub warning against committed credentials.

</details>
