---
title: Scope Agents secrets and variables
section: Environment and Secrets
order: 23
description: Give the agent only the secrets it needs, in the right place and with the right precedence.
verified: "2026-11-27"
diagram: agents-secrets-variables
checks:
  - question: Can the cloud agent read Actions, Codespaces or Dependabot secrets?
    answer: No. It uses dedicated Agents secrets and variables, not Actions, Codespaces or Dependabot secrets.
  - question: Which Agents values are available in a cloud sandbox session?
    answer: Only Agents secrets. Agents variables are not available in cloud sandboxes.
  - question: If an organization and a repository define an Agents secret with the same name, which value is used?
    answer: The repository value, because the lowest level takes precedence.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
---

## What you will learn

- Locate Agents secrets and variables and who can manage them.
- Explain how the agent and MCP servers receive values.
- Keep data you do not want the agent to reach out of Agents secrets.

## A dedicated secret store

The [secrets and variables page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) describes **Agents** secrets and variables under **Settings > Security > Secrets and variables > Agents**. Repository values need a repository admin, and organization values need an organization owner. Organization values can be shared with all repositories, private repositories, or selected repositories.

Values are exposed to the agent environment as environment variables. Values whose names start with `COPILOT_MCP_` are passed only to MCP servers. In a cloud sandbox, only secrets are available, not variables. Values are masked in session logs. The agent cannot read Actions, Codespaces or Dependabot secrets. Older secrets in a `copilot` environment were migrated automatically.

Names can contain only letters, numbers and underscores, cannot start with `GITHUB_` or a number, and are not case-sensitive. When the same name exists at more than one level, the lowest level wins, so a repository value overrides an organization value.

The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) recommends storing values the agent needs as Agents secrets and keeping data you do not want the agent to access in Actions secrets.

**Guide advice:** Masking reduces accidental exposure in logs. It does not stop code the agent runs from using a secret, so scope each secret to the least privilege it needs.

## Worked example: a shared registry token

**Hypothetical starting state:** The fictional Oakhollow Bank organization shares an Agents secret `REGISTRY_TOKEN` with all repositories. One repository needs a token with different scope, and an MCP server needs an API key.

The platform team narrows the organization secret to selected repositories. For the special repository, they add a repository-level `REGISTRY_TOKEN`, which overrides the organization value. They store the MCP key as `COPILOT_MCP_DOCS_KEY`, so it reaches only MCP servers. Deployment credentials stay in Actions secrets.

**Outcome:** Each repository receives only the token it needs, and deployment credentials remain outside the agent's reach.

## Practice: place each value

**Prerequisites:** A local note and four fictional values for an authorized sandbox repository: a read-only package token, a production deploy key, an MCP search API key, and a non-secret feature flag used in Actions sessions.

1. Choose where each value should live: Agents secret, Agents variable, `COPILOT_MCP_` secret, or Actions secret.
2. Note which values a cloud sandbox session would receive.
3. Do not create or move real secrets as part of this exercise.

**Expected result:** A four-row placement table with a reason for each choice.

<details>
<summary>Model answer</summary>

Package token: Agents secret. Deploy key: Actions secret, so the agent cannot read it. MCP key: Agents secret with a `COPILOT_MCP_` prefix. Feature flag: Agents variable. In a cloud sandbox, the two Agents secrets are available, but the variable is not.

</details>
