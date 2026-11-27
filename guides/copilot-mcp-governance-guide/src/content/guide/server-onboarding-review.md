---
title: Review and onboard a server
section: Onboarding to Offboarding
order: 22
description: Run a repeatable review before an MCP server is allowlisted, configured and given credentials.
verified: "2026-11-27"
diagram: server-onboarding-review
checks:
  - question: Which three areas does GitHub say to review for a third-party MCP server?
    answer: Its tools, its authentication and the data it can access.
  - question: Where do administrators check for configuration errors after committing server-managed settings?
    answer: In AI controls, on the Agents tab, in the Copilot settings validation section.
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
---

## What you will learn

- Apply GitHub's MCP best practices as review criteria.
- Sequence onboarding so controls exist before access.
- Record evidence that a server was reviewed.

## Review criteria

The [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp) lists best practices that make a usable checklist:

- **Review third-party servers**: the tools they expose, how they authenticate and what data they can access.
- **Enable only the tools you need**, preferably read-only.
- **Scope credentials** and avoid broadening the default GitHub token unnecessarily.
- **Validate the configuration** after you add it.

Guide advice: add four governance questions. Who owns the server? Is it local or remote, and which matcher pins its identity? Which surfaces will use it (IDE, CLI, cloud agent, code review)? How will it be removed?

## Onboarding sequence

Recommended order, so that no server runs before its controls exist:

1. **Review** against the criteria and record the decision and owner.
2. **Allowlist** with a `serverUrl` or `serverCommand` entry in managed settings, as described in the [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist).
3. **Validate** the settings. For server-managed deployments, the [getting started how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) shows errors and warnings under **AI controls > Agents > Copilot settings validation**. Clients receive updates within about an hour; restarting or signing in again refreshes immediately.
4. **Provision credentials** as scoped `COPILOT_MCP_` secrets.
5. **Configure** the server with an explicit tool list.
6. **Confirm** in a sandbox session log that only the expected tools load.

## Worked example: onboarding a vendor server

**Hypothetical starting state:** The Hazel finance team requests a vendor's remote MCP server that exposes twelve tools, four of which write records.

The reviewers record the vendor's authentication method and data access, approve three read tools, and assign the finance platform lead as owner. They add a `serverUrl` allow entry, check the validation section, create a selected-repository secret, configure the repository with the three tools, and confirm them in a sandbox session.

**Outcome:** The server is live with read-only tools, a named owner and a review record linked from the inventory.

## Practice: complete a review record

**Prerequisites:** Public documentation for one MCP server you might adopt; an authorized sandbox for any test.

1. List the server's tools and mark each read or write.
2. Record its authentication method and data access.
3. Choose the matcher and draft the allow entry.
4. Name an owner, the surfaces, and a removal trigger.

**Expected result:** A one-page review record that someone else could use to approve or reject the server.

<details>

<summary>Model answer</summary>

A strong record lists only read tools for approval, states that the server uses an API key stored as a `COPILOT_MCP_` secret, pins identity with `serverUrl`, names a team owner, and defines removal triggers such as vendor change, owner departure or failed recheck.

</details>
