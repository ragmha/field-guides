---
title: Layer personal and custom agent servers
section: Cloud Agent MCP
order: 19
description: Understand how personal servers, custom agent profiles and repository settings combine in cloud sessions.
verified: "2026-11-27"
diagram: personal-and-agent-servers
checks:
  - question: A personal server and a repository server share a name. Which one is used?
    answer: The repository server. A repository-level server overrides a personal server with the same name.
  - question: In which order are default, custom agent and repository MCP configurations processed?
    answer: Defaults first, then the custom agent profile, then repository settings; later configuration overrides earlier.
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
---

## What you will learn

- Describe personal MCP servers and their limits.
- Predict the effective configuration when sources overlap.
- Identify which sources managed-settings lists do not reach.

## Three sources in a cloud session

The [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp) describes three ways servers reach a cloud session beyond the defaults:

- **Personal MCP servers.** Users configure them in their Copilot customization settings. They support key-based authentication only, run in cloud sandboxes only, use personal MCP server secrets prefixed `COPILOT_MCP_`, and can be allowed in selected organizations. They are available in every cloud session, cannot use URL query parameters, and count toward a limit of 50 servers across personal and repository configuration.
- **Repository settings.** Shared with everyone who has write access. A repository server **overrides** a personal server with the same name.
- **Custom agent profiles.** An `mcp-servers` property in a profile adds servers for the cloud agent.

Processing order is defaults, then the custom agent profile, then repository settings, and later configuration overrides earlier.

The [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) applies `allowedMcpServers` and `deniedMcpServers` in cloud sandboxes to user and repository settings, but **not** to repository custom agent profiles. Those can be prevented if the organization or repository custom firewall does not allow the domains they require.

Guide advice: name repository servers deliberately. Because a repository server overrides a same-named personal server, a shared name can silently replace a user's server with a different one, or the reverse when the repository server is removed.

## Worked example: a name collision

**Hypothetical starting state:** A developer on the Elm team has a personal server named `docs` pointing at a vendor service. The repository adds its own `docs` server for internal documentation. The developer's sessions in that repository suddenly return internal content.

The team renames the repository server `internal-docs`, records it in the inventory, and reviews the custom agent profiles in the repository because allowlists do not cover them.

**Outcome:** Both servers are available under distinct names, and the profile review is on the team's checklist.

## Practice: resolve an effective configuration

**Prerequisites:** An authorized sandbox repository; written scenarios only, no configuration changes required.

1. Define a personal server `search`, a custom agent server `notes`, and a repository server `tickets`.
2. Apply the documented rules to list the effective servers.
3. Add a custom agent server named `tickets` and a repository server named `search`, then repeat.
4. Note which entries an enterprise denylist would evaluate.

**Expected result:** A table of effective servers for each scenario with the governing control.

<details>

<summary>Model answer</summary>

In the first scenario, all three servers are available. In the second, the repository `tickets` overrides the custom agent `tickets` because repository settings are processed later, and the repository `search` overrides the personal `search`. Denylists evaluate the personal and repository entries; the custom agent entry needs firewall or repository review.

</details>
