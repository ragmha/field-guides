---
title: Assign network control owners
section: Network Paths
order: 3
description: Record which team owns each Copilot network control and where it is configured.
verified: "2026-11-27"
diagram: network-ownership-map
checks:
  - question: Where do organization owners configure the cloud agent firewall?
    answer: In the organization's Copilot settings, on the Internet access tab, with separate sections for Copilot in the cloud and Copilot code review.
  - question: Is subscription-based network routing turned on with a GitHub setting?
    answer: No. It is enabled for all users; administrators use it by allowing or blocking plan-specific endpoints on their own network.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings
---

## What you will learn

- List the Copilot network controls and where each is configured.
- Assign an accountable owner and a review trigger to each control.

## Controls live in different places

Copilot network controls are split between your infrastructure and GitHub settings:

- **Corporate allowlist and proxy.** Configured on your firewall and proxy. This includes the plan-specific endpoints used for [subscription-based network routing](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access), which is enabled for all users and enforced only by what your network allows or blocks.
- **Client proxy and certificate settings.** Configured in each editor or through environment variables, as described in [configure network settings](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings).
- **Agent firewall.** Configured in organization settings under **Copilot > Internet access** and in repository settings, according to [customize the firewall](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall). The organization can lock settings so repositories cannot change them.
- **Runner type.** Configured in organization settings under **Copilot > Cloud** for sessions that run on GitHub Actions, as described in [configure the runner](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent). The organization can stop repositories from customizing it.

Recommended: give each control one accountable team, a change process and a trigger for review, such as a new plan, a new editor version or a new internal registry. Ownership is a guide recommendation, not a GitHub role.

## Worked example: an ownership table

**Hypothetical starting state:** The Lighthouse Security team learns that the network team, the desktop team and two repository administrators have each changed Copilot network settings in the last quarter, with no shared record.

The team lists the controls, records where each is configured and asks who approves changes. The network team owns the corporate allowlist and the plan-specific routing rules. The desktop team owns proxy and certificate distribution to devices. Organization owners own the agent firewall defaults and decide whether repositories may add custom rules. The same organization owners own the runner type.

**Outcome:** Each control has an owner, a configuration location and a review trigger. Repository administrators keep custom firewall rules only where the organization allows them.

## Practice: draft an ownership table

**Prerequisites:** The control list above. No settings need to be changed.

1. Create a table with columns for control, configured in, owner, approver and review trigger.
2. Add a row for each of the four controls above.
3. In an authorized sandbox, open the organization's Copilot settings in read-only fashion and confirm the location of the Internet access and Cloud settings. Without a sandbox, compare your table with the model answer.

**Expected result:** Four rows with distinct configuration locations and one accountable owner each.

<details>
<summary>Model answer</summary>

Corporate allowlist and routing: firewall and proxy; network team; trigger: plan or billing change. Client proxy and certificates: editor settings and environment variables; desktop team; trigger: new editor or inspection change. Agent firewall: organization and repository Internet access settings; organization owners; trigger: new dependency host. Runner type: organization Cloud settings; organization owners; trigger: new runner group.

</details>
