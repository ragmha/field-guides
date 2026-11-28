---
title: Map Copilot traffic paths
section: Network Paths
order: 2
description: Classify a connectivity symptom by the path it travels before changing any rule.
verified: "2026-11-27"
diagram: copilot-traffic-paths
checks:
  - question: Do corporate firewall rules for Copilot clients also control what the cloud agent can reach?
    answer: No. GitHub describes client allowlist rules as separate from the firewall that runs inside the agent's cloud environment.
  - question: Which path carries a cloud session viewed in a browser?
    answer: A WebSocket connection from the browser to a Web PubSub host on TCP port 443, which your proxy must allow in both directions.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
---

## What you will learn

- Distinguish client egress, browser streaming and agent-environment egress.
- Name the control that applies to each path.

## Three paths, three controls

**Client egress.** Editors, Copilot CLI and GitHub Mobile call GitHub and Copilot services from a user's device. On a corporate network that traffic crosses your firewall and proxy, so it needs the hosts in the [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference). Proxy and certificate settings on the device also apply.

**Browser streaming.** When people work with Copilot cloud sessions in a browser, the browser opens WebSocket connections to `production-copilot-host*.webpubsub.azure.com` hosts on TCP port 443. The reference notes that HTTPS working does not prove WebSockets work, because the proxy must also support bidirectional WebSocket traffic.

**Agent-environment egress.** Copilot's cloud agent runs in a GitHub-hosted environment: a cloud sandbox or a GitHub Actions runner. The [agent firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) limits what that environment can reach, and [cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) follow the same firewall settings. The allowlist reference states that the client rules are separate from this firewall. Self-hosted runners and larger runners with Azure private networking move the environment onto networks you control, which Part 6 covers.

Guide advice: write the path into every network ticket. A ticket that says only "Copilot is blocked" invites a change to the wrong control.

## Worked example: two symptoms on one morning

**Hypothetical starting state:** The Harbor Platform team receives two reports. A developer's editor shows "read ETIMEDOUT" when requesting suggestions. A pull request opened by Copilot's cloud agent contains a warning that a request to an internal package host was blocked.

The administrator classifies the first report as client egress: the editor runs on the developer's laptop, behind the corporate proxy. The second is agent-environment egress: the warning comes from the agent firewall, which lists the blocked address and the command that made the request. Adding the package host to the corporate proxy would not help the agent, and adding it to the agent firewall would not fix the laptop.

**Outcome:** Two tickets go to two owners. The network team investigates the proxy path; the repository's Copilot administrators review the firewall allowlist. Neither change is made yet; each owner first confirms the cause.

## Practice: classify five symptoms

**Prerequisites:** The three paths above and the [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference). No settings need to be changed.

1. Classify each symptom as client, browser or agent path: (a) Copilot CLI cannot sign in from the office; (b) a cloud session in the browser connects but shows no live output; (c) the agent cannot download a dependency from a public registry; (d) suggestions fail only when the VPN is on; (e) a JetBrains user sees a certificate error.
2. For each, name the control you would inspect first.
3. In an authorized sandbox, reproduce one client symptom with a test account. Without a sandbox, compare your answers with the model answer.

**Expected result:** Each symptom has one path and one first control, with no change proposed before evidence.

<details>
<summary>Model answer</summary>

(a) Client: corporate allowlist and proxy. (b) Browser: WebSocket support and the Web PubSub host on port 443. (c) Agent: the agent firewall allowlist for that repository. (d) Client: VPN, proxy or firewall path. (e) Client: proxy certificate trust on the device.

</details>
