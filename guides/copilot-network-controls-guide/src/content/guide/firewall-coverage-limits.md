---
title: Know the firewall's limits
section: Agent Firewall
order: 19
description: Identify the processes and environments the agent firewall does not cover and plan compensating controls.
verified: "2026-11-27"
diagram: firewall-coverage-limits
checks:
  - question: Does the agent firewall cover MCP servers other than the built-in Playwright server?
    answer: No. It covers Bash-tool processes and, in cloud sandboxes, the built-in Playwright MCP server and its browser, but not other MCP servers.
  - question: Does an allowlist change apply to a cloud sandbox session that is already running?
    answer: No. Start a new session for the change to take effect.
  - question: What appears when the firewall blocks a request?
    answer: A warning in the pull request body or a comment, naming the blocked address and the command that made the request.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
---

## What you will learn

- List what the firewall covers and what it does not.
- Read blocked-request warnings.
- Plan compensating controls for uncovered paths.

## Coverage and gaps

The [firewall how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) states that the firewall applies to processes started by the agent's Bash tool and, in cloud sandboxes, to the built-in Playwright MCP server and its browser. It does not apply to:

- MCP servers other than the built-in Playwright server.
- A repository's own replacement for the Playwright server.
- Processes started by setup steps.
- Anything outside the agent's own environment.

GitHub also notes that sophisticated attacks may bypass the firewall, so it is not a comprehensive security solution.

When a request is blocked, a warning appears in the pull request body or a comment, naming the blocked address and the command that made the request. In [cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes), allowlist changes do not reach sessions already running; start a new session.

The firewall is not compatible with self-hosted runners or Windows runners, according to [customize the agent environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment). Those environments rely on your own network controls, covered in Part 6.

Guide advice: treat the firewall as one layer. Review setup steps and approved MCP servers separately, and keep secrets the agent can use to a minimum.

## Worked example: a warning after an allowlist change

**Hypothetical starting state:** A cloud agent pull request in the Lantern repository shows a blocked request to `mirror.lantern.corp`, made by a package install command. An administrator adds the host to the repository allowlist and asks the agent to retry in the same session. The block repeats.

The administrator recognizes that running sessions keep their original rules. A new session succeeds. During the review, the team also notices that a setup step downloads tools from another host. That traffic is not filtered by the firewall, so they add the step to their review of setup workflows.

**Outcome:** The rule works in new sessions, and the uncovered setup-step traffic is tracked as a separate risk with its own owner.

## Practice: map the gaps

**Prerequisites:** A list of a repository's setup steps and configured MCP servers. No settings need to be changed.

1. Mark each process as covered or not covered by the firewall.
2. For each uncovered item, name a compensating control.
3. Describe how you would confirm a new allowlist entry.
4. In an authorized sandbox repository, start a new session after an allowlist change and read any warnings. Without a sandbox, compare with the model answer.

**Expected result:** A coverage table with a compensating control for each gap and a new-session confirmation step.

<details>
<summary>Model answer</summary>

Covered: Bash-tool processes and the built-in Playwright server in cloud sandboxes. Not covered: setup steps, other MCP servers and custom Playwright replacements. Compensating controls: review setup workflows and approve MCP servers through their own governance. Confirm the entry in a new session.

</details>
