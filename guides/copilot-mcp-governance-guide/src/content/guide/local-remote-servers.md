---
title: Govern local and remote servers differently
section: Local and Remote Servers
order: 10
description: Choose matchers, sandboxing and network expectations based on how an MCP server runs.
verified: "2026-11-27"
diagram: local-remote-servers
checks:
  - question: Why is serverName a weak matcher for enforcing server identity?
    answer: Users choose server names, so GitHub recommends serverUrl or serverCommand when you need to enforce which server actually runs.
  - question: Does requiring sandboxMcpServers contain a remote MCP server?
    answer: No. It requires local MCP servers to run in the sandbox; remote servers do not run in the local sandbox.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
---

## What you will learn

- Distinguish local stdio servers from remote HTTP or SSE servers.
- Pick the matcher that enforces each server's identity.
- Identify which containment controls reach each type.

## Transport shapes the control

The [CLI how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers) describes two shapes. A **local** (STDIO) server starts a process on the machine and talks over standard input and output, with environment variables for keys. A **remote** server is reached by URL over Streamable HTTP or the legacy SSE transport, usually with HTTP headers for authentication.

The [managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) gives each entry exactly one matcher:

| Matcher | Applies to | Notes |
| --- | --- | --- |
| `serverName` | Any server | Exact, case-sensitive label chosen by users; no wildcards |
| `serverUrl` | Remote HTTP or SSE | Supports `*` for subdomains or path prefixes; URLs are canonicalized first |
| `serverCommand` | Local stdio | Exact command and each argument; no wildcards |

Canonicalization lowercases the scheme and host, converts Unicode hosts to Punycode, removes default ports and fragments, decodes percent-encoded host octets, and stops authority wildcards from crossing into the path.

Containment also differs. The reference's `sandbox.sandboxMcpServers` setting requires **local** MCP servers to run inside the local sandbox; **remote** servers do not run there. For the cloud agent, the [firewall how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) says the firewall covers the built-in Playwright MCP server but does not apply directly to other MCP servers. Sandbox and firewall design belong to sibling courses; here the point is that a remote server's data path is governed mainly by its URL, its credentials and the provider you are trusting.

## Worked example: pinning a local server

**Hypothetical starting state:** The Willow web team allowlists a browser-automation server by `serverName`. A developer renames an unrelated local script to the same name and it runs.

The team replaces the name entry with a `serverCommand` entry listing the exact command and arguments, and asks the local sandboxing owner whether `sandboxMcpServers` is required for this group.

**Outcome:** Only the reviewed command matches, and the renamed script is blocked by the allowlist.

## Practice: choose matchers

**Prerequisites:** An authorized sandbox and a list of three candidate servers (one local, two remote).

1. Classify each server as local or remote.
2. Write one allowlist entry per server using the strongest matcher.
3. For remote servers, decide whether a wildcard path prefix is needed.
4. Note which servers a local sandbox could contain.

**Expected result:** One `serverCommand` entry, two `serverUrl` entries, and a containment note.

<details>

<summary>Model answer</summary>

The local server uses `serverCommand` with its exact arguments and is eligible for local sandboxing. The remote servers use `serverUrl`, with a wildcard only when the provider uses versioned paths under a fixed host. Neither remote server is contained by the local sandbox.

</details>
