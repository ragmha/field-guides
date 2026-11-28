---
title: Network access layer
section: Client and Network Layers
order: 11
description: Record what subscription-based network routing and the cloud agent firewall control, and who owns each.
verified: "2026-11-27"
diagram: network-boundaries
checks:
  - question: Which endpoint should a corporate firewall block to prevent personal Copilot plans?
    answer: The individual plan endpoint, *.individual.githubcopilot.com, while allowing the business or enterprise endpoint for the organization's plan.
  - question: Does endpoint reuse decide which features or models a user can use?
    answer: No. GitHub states that endpoint reuse does not determine feature or model availability; policies still do.
  - question: Does the cloud agent firewall control traffic from every MCP server the agent starts?
    answer: No. It covers processes started through Bash and the built-in Playwright MCP in sandboxes, not other MCP servers or setup steps.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
---

## What you will learn

- Separate corporate network routing from the cloud agent's own firewall.
- Record the client and hosting limits of subscription-based routing.
- Name the network owner and the GitHub owner for each.

## Two network controls with different owners

**Corporate network routing.** On GitHub.com, enterprise and organization owners can use the corporate firewall to control which Copilot plans members can use. The [network access how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access) says to allow `*.business.githubcopilot.com`, `*.enterprise.githubcopilot.com` or both, and to block `*.individual.githubcopilot.com`. Routing affects inline suggestions and chat in supported IDEs, Copilot Chat on GitHub, GitHub Mobile and Copilot CLI. Clients need minimum versions. Subscription-based routing is not supported on GHE.com, and allowing the enterprise endpoint is required before moving to the Copilot access billing model. The [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) lists the hostnames to allow so Copilot keeps working. Endpoint reuse does not decide feature or model availability; policies still do.

**Cloud agent firewall.** Copilot in the cloud runs in GitHub's environment, so the corporate firewall does not see it. Its internet access is set on the organization's settings, with separate sections for the cloud agent and code review. See [customizing the firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall). The firewall and recommended allowlist can be enabled, disabled or left to repositories (the default). "Allow repository custom rules" is on by default; organization rules combine with repository rules and cannot be removed at repository level. The firewall covers processes started through Bash and the built-in Playwright MCP in sandboxes, not other MCP servers or setup steps, and it can be bypassed, so treat it as one layer among several.

The [network controls deep dive](https://ragmha.github.io/field-guides/copilot-network-controls-guide/) covers proxies, certificates and allowlists in detail.

## Worked example: two rows, two owners

**Hypothetical starting state:** Fictional Larkspur Freight's network team blocks `*.individual.githubcopilot.com` and believes all Copilot traffic is now governed.

The governance lead adds two rows. Row one: corporate routing, owner the network lead, scope corporate network only, gap "developers off the corporate network". Row two: cloud agent firewall, owner the AI governance lead, scope organization with repository rules allowed, gap "MCP servers and setup steps not covered".

**Outcome:** The belief "all traffic is governed" is replaced with two scoped controls and two documented gaps.

## Practice: find the uncovered path

**Prerequisites:** The two descriptions above.

1. List three places Copilot sends or receives network traffic.
2. For each, name which control applies, if any.

**Expected result:** At least one path with no network control, recorded as a gap.

<details>
<summary>Model answer</summary>

IDE on the corporate network: subscription-based routing. IDE on a home network without a VPN: no corporate routing applies. Cloud agent Bash commands: cloud agent firewall. A third-party MCP server started by the cloud agent: not covered by the firewall; rely on MCP allowlists and review instead.

</details>
