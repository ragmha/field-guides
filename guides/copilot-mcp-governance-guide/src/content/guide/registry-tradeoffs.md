---
title: Weigh custom registries against allowlists
section: Allowlists and Registries
order: 7
description: Decide when a public preview MCP registry adds value and how to migrate toward managed-settings allowlists.
verified: "2026-11-27"
diagram: registry-tradeoffs
checks:
  - question: What does GitHub recommend for enforcing an MCP allowlist?
    answer: An enterprise managed-settings.json allowlist, which is generally available and matches on name, URL or command. Custom registries are public preview.
  - question: Under Registry only, why might a correctly listed local server still be blocked?
    answer: Its registry ID must exactly match the installed server ID; a mismatch blocks it.
  - question: Does registry enforcement apply to Copilot in the cloud?
    answer: No. The enforcement reference lists Copilot in the cloud as not supported.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/mcp-private-registry-enforcement
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry
---

## What you will learn

- Compare custom registries with managed-settings allowlists.
- Predict which registry policy wins across organizations.
- Plan a migration to a single source of truth.

## Two mechanisms, different strength

[MCP management](https://docs.github.com/en/copilot/concepts/enterprise/mcp-management) compares the options. A `managed-settings.json` allowlist is **generally available**, enterprise-wide with team overrides, and matches securely on name, URL or stdio command. A custom registry is **public preview** and "not prioritized for development". It must be hosted as an HTTPS registry that follows the MCP specification, can be set at enterprise or organization scope, matches by name or ID only, and can be bypassed by users editing configuration files.

Hosting requirements come from the [registry setup how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry): implement the v0.1 endpoints (`GET /v0.1/servers` and version lookups), return CORS headers that allow `GET` and `OPTIONS`, and include local servers with the correct server ID. Azure API Center is one documented host.

The [enforcement reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/mcp-private-registry-enforcement) lists minimum versions for CLI, Eclipse, JetBrains, Visual Studio, VS Code and Xcode, with Eclipse, JetBrains and Xcode support in pre-release versions. Copilot in the cloud is **not supported**. For users with seats in several organizations, enterprise settings override organization settings, Registry only beats Allow all, and the most recently uploaded registry wins at the same scope and strictness.

The [restriction how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/restrict-based-on-registry) sets "Restrict MCP access to registry servers" to Allow all (discovery only) or Registry only. Registry only also blocks Copilot connectors.

## Worked example: retiring a registry gate

**Hypothetical starting state:** The Birch enterprise uses a self-hosted registry with Registry only. Developers discover that editing a local configuration file can bypass it, and cloud agent sessions are not covered.

The team writes an equivalent `allowedMcpServers` list using URL and command matchers, deploys it, and then sets the registry restriction to Allow all while keeping the registry for discovery. They consider clearing the registry URL to avoid two sources of truth.

**Outcome:** Enforcement moves to managed settings, which also reach cloud sandboxes, and the registry becomes optional.

## Practice: compare coverage

**Prerequisites:** Read access to MCP policy pages in an authorized sandbox enterprise; no setting changes.

1. Record the registry URL and restriction value, if any.
2. List the clients your developers use and check each against the enforcement reference.
3. Note which servers would need URL or command matchers in an allowlist.
4. Decide whether the registry should remain for discovery.

**Expected result:** A coverage table showing unsupported surfaces and a recommendation.

<details>

<summary>Model answer</summary>

Cloud agent sessions and any client below the minimum version are outside registry enforcement. Recommended: enforce with managed-settings allow and deny lists, keep the registry on Allow all only if developers rely on it for discovery, and name one owner for both.

</details>
