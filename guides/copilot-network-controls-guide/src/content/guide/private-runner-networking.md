---
title: Choose private runner networking
section: Runners & Diagnosis
order: 22
description: Decide between cloud sandboxes, larger runners with Azure private networking and self-hosted runners.
verified: "2026-11-27"
diagram: private-runner-networking
checks:
  - question: Can you use the integrated agent firewall with self-hosted runners?
    answer: No. It is not compatible, so it must be disabled and you must provide your own network controls.
  - question: Do runner settings apply to sessions that run in cloud sandboxes?
    answer: No. Runner type, larger runners and self-hosted runners apply only to sessions that run on GitHub Actions.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent
  - https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/configuring-private-networking-for-hosted-compute-products/about-azure-private-networking-for-github-hosted-runners-in-your-enterprise
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
---

## What you will learn

- Distinguish cloud sandbox sessions from sessions that run on Actions.
- Compare larger runners with Azure private networking and self-hosted runners.
- List the outbound hosts and proxy variables the agent needs.

## Where the agent runs

Where both are available, [cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) are the default rather than GitHub Actions, and the choice cannot change once a session starts. [Customize the agent environment](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) explains that setup steps, larger runners, self-hosted runners and Windows apply only to sessions that run on Actions. Organization owners can set a standard or labeled runner under **Settings > Copilot > Cloud** and can stop repositories from customizing it, as described in [configure the runner](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent).

**Larger runners with Azure private networking.** [Azure private networking](https://docs.github.com/en/enterprise-cloud@latest/admin/configuring-settings/configuring-private-networking-for-hosted-compute-products/about-azure-private-networking-for-github-hosted-runners-in-your-enterprise) places the runner's network interface in your Azure virtual network, so your network policies apply. It supports larger runners only, in limited regions, without static IP addresses, and access is managed with runner groups. GitHub cannot block inbound traffic to the interface; the article recommends blocking inbound traffic explicitly because GitHub never needs it. The agent needs outbound access to `uploads.github.com`, `user-images.githubusercontent.com` and the `api.individual.`, `api.business.` or `api.enterprise.githubcopilot.com` hosts for the plans in use.

**Self-hosted runners.** The same article recommends ephemeral, single-use runners. You configure network controls, allowing the standard self-hosted runner hosts plus the hosts above. The integrated firewall is not compatible and must be disabled, or use is blocked. Proxy settings use `https_proxy`, `http_proxy`, `no_proxy`, `ssl_cert_file` and `node_extra_ca_certs`, set through agent variables or secrets or in the runner image. Only Ubuntu x64 and Windows 64-bit runners are supported, and Windows needs a self-hosted runner or a larger runner with Azure private networking.

Guide advice: once the integrated firewall is off, your network becomes the only egress control. Write its allowlist before the first session.

## Worked example: reach an internal network

**Hypothetical starting state:** The Dockside organization wants the agent to reach an internal artifact store that is reachable only from its Azure virtual network. It uses Copilot Enterprise.

The platform team chooses larger runners with Azure private networking, creates a runner group, adds explicit inbound deny rules and allows outbound `uploads.github.com`, `user-images.githubusercontent.com` and `api.enterprise.githubcopilot.com`. Organization owners set a labeled runner for Copilot and disable repository customization.

**Outcome:** Sessions that run on Actions use the private runners. Cloud sandbox sessions are unaffected, so the team confirms which repositories use Actions sessions.

## Practice: plan runner egress

**Prerequisites:** Your plans and the hosts above. No settings need to be changed.

1. Choose larger private-networked or self-hosted runners and justify the choice.
2. List the outbound hosts and, for self-hosted runners, the proxy variables.
3. State what happens to the integrated firewall.
4. In an authorized sandbox organization, assign a test runner group and start one session. Without a sandbox, compare with the model answer.

**Expected result:** A runner choice, an egress list and a firewall decision.

<details>
<summary>Model answer</summary>

Self-hosted example: ephemeral runners; allow standard runner hosts, `uploads.github.com`, `user-images.githubusercontent.com` and the plan's `api.*.githubcopilot.com` host; set the proxy variables in the runner image; disable the integrated firewall and enforce egress on your network.

</details>
