---
title: Know what the firewall covers
section: Agent Firewall
order: 18
description: Map the processes the agent firewall filters and the paths it does not cover.
verified: "2026-11-27"
diagram: firewall-coverage
checks:
  - question: Does the agent firewall filter traffic from MCP servers other than the built-in Playwright MCP server?
    answer: No. It applies to processes started through the agent's Bash tool and, in cloud sandboxes, to the built-in Playwright MCP server and its browsers, but not to other MCP servers.
  - question: Is the firewall a complete defense against data exfiltration?
    answer: No. GitHub documents that bypass is possible and that the firewall is not comprehensive, so pair it with other controls.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## What you will learn

- List the processes the firewall filters.
- Identify paths outside its coverage.
- Read blocked-request warnings on agent pull requests.

## Coverage and limits

The [firewall page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) states that the firewall is on by default and always allows GitHub hosts. A recommended allowlist, also on by default, permits common operating system package repositories, container registries, language package registries, certificate authorities and Playwright browser hosts. When a request is blocked, Copilot adds a warning to the pull request body or a comment with the blocked address and the command that tried to reach it.

The same page lists limits. The firewall applies to processes the agent starts through its Bash tool. In cloud sandboxes, it also applies to the built-in Playwright MCP server and its browsers. It does not apply to other MCP servers, to Playwright replacements configured in the repository, or to processes started in setup steps. It works only inside the agent's environment, and sophisticated attacks may bypass it.

The [cloud sandbox page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) confirms that sandbox network access follows the same firewall settings. Allowlist changes do not apply to sessions that are already running. The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) lists the firewall as one of several mitigations, not the only one.

**Guide advice:** Treat a blocked-request warning as a review signal. Ask why the agent needed the host before adding it to an allowlist.

## Worked example: an unexpected host

**Hypothetical starting state:** The fictional Elmstead Insurance team gets an agent pull request whose body includes a firewall warning. A `curl` command tried to reach an unfamiliar paste site. The repository also configures a third-party MCP server.

The reviewer notes that the firewall blocked the Bash request, which is within its coverage. They also note that the MCP server's own traffic is outside firewall coverage. They read the session log to find what prompted the `curl` call and trace it to text in a linked issue. They escalate the issue text for review and ask the MCP server owner how that server's network access is controlled.

**Outcome:** The block worked for the covered path. The team records the MCP server as an uncovered path with a separate owner.

## Practice: classify network paths

**Prerequisites:** A local note and five fictional processes in an authorized sandbox repository: (a) `npm install` run by the agent; (b) a setup step that downloads a tool; (c) the built-in Playwright MCP server in a cloud sandbox; (d) a custom MCP server; (e) a test that calls an API, run by the agent.

1. Mark each as covered or not covered by the firewall.
2. For uncovered paths, name another control to review.
3. Do not disable the firewall or edit allowlists as part of this exercise.

**Expected result:** A table with coverage and a compensating control for each uncovered path.

<details>
<summary>Model answer</summary>

(a), (c) and (e) are covered: the agent runs (a) and (e) through Bash, and (c) is the built-in Playwright MCP in a sandbox. (b) is not covered; review the setup steps file and its runner network. (d) is not covered; review the server's configuration, credentials and host network controls.

</details>
