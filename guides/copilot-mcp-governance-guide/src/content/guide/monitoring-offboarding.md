---
title: Monitor and offboard servers
section: Onboarding to Offboarding
order: 23
description: Use available evidence to monitor MCP servers and retire them without leaving access behind.
verified: "2026-11-27"
diagram: monitoring-offboarding
checks:
  - question: Why add a deny entry before deleting a server's configuration?
    answer: A deny blocks the server everywhere managed settings apply, even if a copy remains in user or repository configuration.
  - question: If a client cannot fetch updated policy, does it fall back to allowing all servers?
    answer: No. The client keeps the previously enforced policy, which can become more restrictive but not less.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
---

## What you will learn

- Identify the documented evidence for MCP server behavior.
- Set a review cadence for approved servers.
- Retire a server in an order that closes access first.

## Evidence you can check

The documentation in this course points to a few concrete signals:

- **Session logs.** The [repository configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) shows tools loaded under **Start MCP Servers** for the cloud agent and under "Setting up environment" for code review.
- **Masked secrets.** The [secrets how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/configure-secrets-and-variables) says secret values are masked in session logs.
- **Settings delivery.** The [deployment how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) says server-managed and MDM settings refresh about hourly, while file-based settings need a client restart.
- **Failure behavior.** The [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) says a client that cannot retrieve policy keeps the previously enforced policy, and malformed JSON blocks all but built-in servers.

Audit logs and usage telemetry are covered in sibling courses; this lesson uses only the configuration and session evidence above.

Guide advice: recheck each approved server on a fixed cadence and whenever its vendor, tool list, owner or credential changes. Compare the tools in a recent session log with the approved list.

## Offboarding order

Recommended sequence:

1. **Deny** the server in managed settings with the same matcher used to allow it. Deny wins over allow.
2. **Remove** the allow entry and the server from repository, project and personal configuration you control.
3. **Delete or rotate** its `COPILOT_MCP_` secrets and revoke the upstream credential.
4. **Confirm** in a sandbox session that the server no longer starts, after allowing time for settings to refresh.
5. **Update** the inventory; keep the deny entry until no copies remain.

## Worked example: a vendor exit

**Hypothetical starting state:** The Linden analytics team's vendor announces it will shut down its MCP endpoint. Three repositories and several developers' CLI configurations reference it.

The administrators add a `serverUrl` deny entry, remove repository configurations, delete the organization secret, revoke the vendor key and confirm in a session log that the server is absent.

**Outcome:** The endpoint is blocked everywhere managed settings apply, and no credential remains.

## Practice: write an offboarding runbook

**Prerequisites:** One approved sandbox server and its inventory entry; no production changes.

1. Write the deny entry.
2. List every configuration location to clean up.
3. List the secrets and upstream credentials to revoke.
4. Define the confirmation check and when the deny entry may be removed.

**Expected result:** A five-step runbook with owners and a verification step.

<details>

<summary>Model answer</summary>

Deny by `serverUrl` first, clean repository and project files, delete the `COPILOT_MCP_` secret and revoke the key, check a new session after the refresh window, and keep the deny entry until searches find no remaining configuration.

</details>
