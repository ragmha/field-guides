---
title: Configure repository MCP for the cloud agent
section: Cloud Agent MCP
order: 18
description: Write, validate and restrict repository MCP configuration shared by the cloud agent and code review.
verified: "2026-11-27"
diagram: repository-mcp-config
checks:
  - question: Does the cloud agent ask for approval before calling a configured MCP tool?
    answer: No. GitHub warns that once a server is configured, Copilot uses its tools autonomously without asking for approval.
  - question: What must each tool declare for Copilot code review to use it?
    answer: An annotations.readOnlyHint value of true.
  - question: Where do you confirm that a server started in a cloud agent session?
    answer: In the session log, under the Start MCP Servers step, which lists the server's tools.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
---

## What you will learn

- Write a repository MCP configuration with an explicit tool list.
- Validate that the server starts in a cloud agent session.
- Recognize the limits of repository configuration.

## Repository configuration

The [repository configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) describes one configuration shared by the cloud agent (including automations) and Copilot code review. Repository administrators edit it under **Settings > Copilot > MCP servers**, and **Save MCP configuration** validates the syntax.

The JSON uses an `mcpServers` object. Each server has a `type` (`local`, `stdio`, `http` or `sse`), a `command` with `args` and `env` for local servers, or a `url` with `headers` for remote servers, and a required `tools` list. GitHub strongly recommends allowlisting specific read-only tools; `*` allows all.

GitHub warns that **once configured, Copilot uses the tools autonomously without approval**. Other limits: only tools are supported (not resources or prompts), remote servers that use OAuth are not supported in repository settings or custom agent profiles, and code review requires `annotations.readOnlyHint: true` on each tool. When reusing a VS Code configuration, add `tools` and replace `inputs` or `envFile` with `env`. A `copilot-setup-steps.yml` workflow can install dependencies.

To validate, assign an issue to Copilot, open **View session**, and expand the **Start MCP Servers** step to see the tools. For code review, check the "Setting up environment" section.

The [firewall how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) adds a boundary: the firewall does not apply directly to MCP servers other than the built-in Playwright server, or to setup-step processes. Firewall design is covered in a sibling course.

## Worked example: trimming a wildcard

**Hypothetical starting state:** The Poplar QA team adds a test-management server with `"tools": ["*"]`. The server exposes tools that create and delete test runs.

They replace the wildcard with two read tools, assign a test issue to Copilot, and confirm in **Start MCP Servers** that only those two tools are listed.

**Outcome:** The agent can read test results but cannot delete runs without a configuration change.

## Practice: configure and validate

**Prerequisites:** Administrator access to an authorized sandbox repository with the cloud agent enabled; no production repositories.

1. Add one server with an explicit `tools` list of read-only tools.
2. Reference any credential as a `COPILOT_MCP_` secret.
3. Save the configuration and fix any validation errors.
4. Assign a small issue and inspect the Start MCP Servers step.

**Expected result:** The session log lists only the tools you allowed.

<details>

<summary>Model answer</summary>

A valid entry lists `type`, `url` or `command`, and `"tools": ["get_item", "list_items"]`. If more tools appear in the session log, the list or the server name is wrong. If the server is missing, check the secret name, the setup steps and whether an allowlist blocks it.

</details>
