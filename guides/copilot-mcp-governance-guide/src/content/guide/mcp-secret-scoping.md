---
title: Scope secrets for MCP servers
section: Credentials and Secrets
order: 14
description: Place COPILOT_MCP_ secrets at the right level so cloud agent MCP servers get only what they need.
verified: "2026-11-27"
diagram: mcp-secret-scoping
checks:
  - question: An MCP server in a cloud sandbox references a COPILOT_MCP_ variable rather than a secret. Is the value available?
    answer: No. In a cloud sandbox only secrets are available to MCP servers, not variables.
  - question: An organization secret and a repository secret share a name. Which value does the agent use?
    answer: The repository value. The lowest level wins when names collide.
  - question: Can a repository MCP server reference a user's personal MCP secrets?
    answer: No. Repository-level servers cannot reference personal secrets.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
---

## What you will learn

- Explain how COPILOT_MCP_ secrets reach MCP servers.
- Choose between organization and repository secrets.
- Avoid personal credentials in shared configuration.

## Agents secrets and the MCP prefix

The [secrets how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) describes **Agents** secrets and variables under **Settings > Secrets and variables > Agents**. Organization owners set organization values and choose repository access (all, private or selected repositories). Repository administrators set repository values.

Key behaviors:

- Values with the `COPILOT_MCP_` prefix are available **only to MCP servers**.
- In a cloud sandbox, only **secrets** are available, not variables.
- Secret values are masked in session logs.
- The agent does not receive Actions, Codespaces or Dependabot secrets.
- Names are case-insensitive, may not start with `GITHUB_` or a digit, and the lowest level wins, so a repository value overrides an organization value.

The [repository configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) shows how MCP JSON references these values in `env` or `headers` as `$COPILOT_MCP_NAME`, `${COPILOT_MCP_NAME}` or `${COPILOT_MCP_NAME:-default}`.

The [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp) adds that repository configuration is usable by anyone with write access, so it recommends a service account rather than personal credentials. Repository servers cannot reference personal secrets; personal servers use their own personal MCP server secrets, also prefixed `COPILOT_MCP_`.

Guide advice: give each server its own secret name, record its owner and rotation date, and grant organization secrets to selected repositories rather than all.

## Worked example: an over-shared key

**Hypothetical starting state:** The Spruce support team stores a ticketing API key as an organization Agents secret available to all repositories. Only two repositories configure the ticketing MCP server.

The team creates a service-account key, changes repository access to the two selected repositories, and documents that a same-named repository secret would override it.

**Outcome:** The credential is no longer reachable from unrelated repositories, and it no longer belongs to an individual.

## Practice: plan a secret placement

**Prerequisites:** An authorized sandbox organization and repository; use placeholder values only.

1. Pick one remote MCP server that needs an API key.
2. Name a secret with the `COPILOT_MCP_` prefix.
3. Decide organization or repository level and the repository access list.
4. Write the `headers` entry that references the secret.

**Expected result:** A placement decision, an owner, and a configuration reference that never contains the raw value.

<details>

<summary>Model answer</summary>

Create `COPILOT_MCP_TICKETS_KEY` as an organization secret limited to selected repositories, owned by a service account. Reference it as `"Authorization": "Bearer $COPILOT_MCP_TICKETS_KEY"`. A repository secret with the same name would override it for that repository.

</details>
