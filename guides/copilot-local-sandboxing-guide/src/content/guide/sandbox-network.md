---
title: Constrain sandbox network access
section: Local Sandboxing
order: 15
description: Turn sandbox outbound access into a short allowlist and understand platform caveats.
verified: "2026-11-27"
diagram: sandbox-network
checks:
  - question: What happens to outbound access when you add one allow rule to Copilot CLI sandbox host rules?
    answer: Outbound access becomes an allowlist; only matching hosts are reachable, and deny rules still win.
  - question: Is local-network access allowed by default in a Copilot CLI sandbox?
    answer: No. Outbound internet is on by default, but local network access is off in the CLI.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://code.visualstudio.com/docs/agents/run/agent-sandboxing
---

## What you will learn

- Configure outbound, local-network and host rules for a sandboxed session.
- Recognize where network restrictions are weaker or need extra access.

## Outbound is on until you narrow it

[Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) lists the CLI network controls under `/sandbox`: **Allow outbound** (on by default), **Allow local network** (off by default in the CLI, on in the GitHub Copilot app), **Host rules** and a remote proxy. Deny rules beat allow rules. Adding any allow rule turns outbound access into an allowlist. Denying a domain also denies its subdomains, and rules from device management can only narrow access.

[About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) notes a platform difference. On Windows, network restrictions rely on programs honoring proxy settings, which is weaker than on macOS and Linux.

The VS Code [agent sandbox](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) works the same way. `chat.agent.sandbox.network.allowNetwork` is true by default; a nonempty `allowedDomains` list limits destinations; `deniedDomains` takes precedence; and setting `allowNetwork` to false blocks outbound access. On Windows, domain restrictions and credential masking need `allowLocalNetwork`, which also opens additional local-network access. VS Code also cautions that an allowed destination can receive workspace content or credential-backed changes. These sandbox rules are separate from the CLI's URL permissions in Part 3; organization network controls are a separate course.

## Worked example: a package-and-API allowlist

**Hypothetical starting state:** A team's sandboxed sessions only need the npm registry and the GitHub API. Outbound access is on with no host rules, and a developer on Windows also wants credential masking.

The reviewer, as advice, adds allow rules for `registry.npmjs.org` and `api.github.com`, which turns outbound access into an allowlist. They keep local network off on macOS and Linux. For the Windows developer, they record that masking needs local network access, accept that trade-off, and note that Windows enforcement depends on proxy-aware programs.

**Outcome:** Commands can reach two hosts. A test `curl` to another site fails, and the Windows exception is documented rather than assumed equal.

## Practice: build and test an allowlist

**Prerequisites:** A sandboxed test session in Copilot CLI or VS Code, and permission to make test network requests.

1. List the hosts your task needs.
2. Add allow rules for those hosts only.
3. Ask the agent to fetch one allowed host and one unlisted host.
4. Record the result and any platform-specific exception.

**Expected result:** The allowed host succeeds, the unlisted host is blocked, and platform caveats are written down.

<details>
<summary>Model answer</summary>

Allow `registry.npmjs.org` and `api.github.com`. A request to `example.com` fails. Local network stays off except where Windows masking requires it. The notes state that a deny rule would override these allows and that Windows enforcement depends on proxy settings.

</details>
