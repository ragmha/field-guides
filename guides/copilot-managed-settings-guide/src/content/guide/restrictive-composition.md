---
title: Compose restrictive keys
section: Precedence and Composition
order: 15
description: Identify the keys that combine across sources instead of overriding, and predict their result.
verified: "2026-11-27"
diagram: restrictive-composition
checks:
  - question: How are `permissions.allow` lists from several sources combined?
    answer: As the intersection of the sources that declare one. A source without an allow list adds no restriction of its own.
  - question: How are `deniedMcpServers` lists from several sources combined?
    answer: As a union. A server blocked by any source is blocked for all.
  - question: If MDM and the server-managed file both define `telemetry`, are their fields merged?
    answer: No. The highest-precedence source supplies the complete telemetry object.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
---

## What you will learn

- List the keys that compose restrictively across delivery methods.
- Predict an effective value for unions, intersections and whole-object keys.

## Exceptions to simple override

The [deployment page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) names keys composed in the most restrictive direction across delivery methods: `sandbox`, `permissions.deny`, `permissions.ask`, `permissions.allow` and `strictPluginOnlyCustomization`. For `strictPluginOnlyCustomization`, a category restricted by any managed source stays restricted; an MDM `false` cannot remove a server-managed or file restriction.

The [reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) adds per-key rules:

| Key | How sources combine |
| --- | --- |
| `permissions.deny` | Any source's deny applies |
| `permissions.allow` | Intersection of sources that declare one |
| `disableBypassPermissionsMode` | Most restrictive value across layers; a `"disable"` cannot be relaxed by a lower layer |
| `allowedMcpServers` | Intersection; a server must be permitted by every source |
| `deniedMcpServers` | Union; blocked by any source means blocked |
| `telemetry` | Highest-precedence source supplies the whole object; no merge |

If any managed source defines a permission rule or allow list, operations that match nothing require approval.

## Edge cases

For MCP, the [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) and reference describe evaluation order: built-in servers are allowed, then deny rules, then the allowlist, and a server with an unresolved variable is blocked. An empty `allowedMcpServers` array blocks all servers except built-ins; omitting the key allows all, subject to denies. MCP policy design itself belongs to the MCP governance guide.

`telemetry` behaves the opposite way to unions: fields omitted from the winning source are not inherited from lower sources.

## Worked example: two allowlists

**Hypothetical starting state:** MDM sets `allowedMcpServers` to servers A and B. The server-managed file allows B and C and denies A.

The intersection of the two allowlists is B. The denylist union contains A, which is already outside the intersection.

**Outcome:** Only B runs, plus built-in servers. The platform team, expecting C, learns that adding a server to one source never broadens what another source allows.

## Practice: compose four keys

**Prerequisites:** The hypothetical values below. No settings are changed.

1. MDM: `permissions.allow` = `["Shell(npm test *)"]`; server: `permissions.allow` = `["Shell(npm test *)", "Shell(git push *)"]`.
2. File: `permissions.deny` = `["Shell(rm -rf *)"]`.
3. MDM `telemetry` sets an exporter; server `telemetry` sets an exporter and content capture.
4. Predict the effective allow list, deny list and telemetry object.

**Expected result:** Three predictions, each citing its composition rule.

<details>
<summary>Model answer</summary>

Allow: the intersection, `Shell(npm test *)`; `git push` still requires approval. Deny: the file's `Shell(rm -rf *)` applies. Telemetry: MDM is higher precedence, so its object is used whole; the server's content-capture field is ignored.

</details>
