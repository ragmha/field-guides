---
title: Account for connectors and plugin sources
section: Local and Remote Servers
order: 11
description: Govern Copilot connectors and plugin-distributed servers alongside allow and deny lists.
verified: "2026-11-27"
diagram: connectors-and-plugins
checks:
  - question: An enterprise sets an allowlist that does not include connector URLs. Can users use connectors?
    answer: No. With an allowlist in place, connectors are blocked unless their serverUrl matches an entry.
  - question: Does strictPluginOnlyCustomization with mcp replace allow and deny lists?
    answer: No. It restricts where MCP configuration can come from; GitHub says it does not replace allow and deny lists.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
---

## What you will learn

- Predict when Copilot connectors are allowed or blocked.
- Explain what plugin-only MCP sources add and what they do not.
- Plan an exception for a team that builds MCP servers.

## Connectors are remote servers

Copilot connectors are **public preview**. [MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) says the MCP servers in Copilot policy also governs connectors, and they need the Editor preview features policy. Connectors are blocked when "Restrict MCP access to registry servers" is Registry only, or when an allowlist lacks connector URLs.

The [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) treats connectors as remote servers matched by `serverUrl`. Without an allowlist they are allowed unless denied; with one they are blocked unless matched. It documents the wildcard `https://api.github.com/copilot-connectors/api/v1/connectors/*/mcp` and suggests pairing it with specific deny entries. The MCP concepts page adds that connectors work in cloud sandbox sessions but not GitHub Actions sessions.

## Plugin-only sources

MCP management also describes `strictPluginOnlyCustomization`. Including `mcp` blocks standalone user and project MCP configuration while allowing servers from plugins and managed sources; `strictKnownMarketplaces` restricts marketplace sources. GitHub states these do not replace allow and deny lists and advises verifying coverage before retiring a registry policy.

The [team override how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams) shows an MCP-development team exception: make the value overridable (for example `["mcp", "extensions"]`), map a team file that keeps only `["extensions"]`, then verify a member can use standalone MCP and a non-member cannot. A restriction from any other applicable team or device-managed source still applies.

## Worked example: connectors with exceptions

**Hypothetical starting state:** The Maple enterprise allowlists two internal URLs. A product group asks for connectors, and a tools team needs standalone MCP for development.

The administrators add the connector wildcard to the allowlist, deny one connector their data owners rejected, and add a team override that lifts the `mcp` source restriction only for the tools team.

**Outcome:** Connectors work except the denied one, most users stay on plugin-provided servers, and the tools team can test standalone configurations.

## Practice: write the connector rules

**Prerequisites:** An authorized sandbox enterprise and a draft `managed-settings.json`; do not commit to a production `.github-private` repository.

1. Add the connector wildcard as a `serverUrl` allow entry.
2. Add one specific connector URL as a deny entry.
3. Draft an overridable `strictPluginOnlyCustomization` value and a team file.
4. List the two accounts you would use to verify the exception.

**Expected result:** A draft that allows connectors except one, and a verification plan with a team member and a non-member.

<details>

<summary>Model answer</summary>

The deny entry wins over the wildcard allow. The team file must list every category that should remain restricted, because it replaces the whole overridable default. Verification checks that the member can use standalone MCP, the non-member cannot, and executable extensions stay blocked for both.

</details>
