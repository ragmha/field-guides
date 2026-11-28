---
title: Decide where the cloud agent may run
section: Enablement and Scope
order: 2
description: Trace the Copilot in the cloud policy from enterprise to organization to repository.
verified: "2026-11-27"
diagram: enablement-policy-scope
checks:
  - question: Can an organization owner override a policy that the enterprise has already chosen?
    answer: No. When the enterprise sets the Copilot in the cloud policy, organizations cannot override it; they decide only when the enterprise delegates the choice.
  - question: Can you turn off cloud sandboxes while keeping the Copilot in the cloud policy enabled?
    answer: No. Enabling the policy makes cloud sandboxes available, and GitHub documents that they cannot be disabled separately.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
---

## What you will learn

- Identify the policy that enables the cloud agent and what it covers.
- Trace enterprise, organization and repository decisions in order.
- Record which repositories are in scope before any rollout.

## One policy, three decision points

The [enterprise management page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) describes a single **Copilot in the cloud** policy. It covers chat and assigning work on GitHub and GitHub Mobile, and starting cloud sandbox sessions from Copilot CLI and the GitHub Copilot app. It replaced the earlier separate cloud agent and Chat policies; existing repository opt-outs carried over. The policy is enabled by default and is set under **AI controls > Copilot > Configure features & clients**. "Enabled for selected organizations" can target organizations, including through the REST API with custom properties.

The [organization page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) explains that organizations cannot override an enterprise choice. Where the choice is delegated, owners use **Settings > Copilot > Cloud** and its **Repository access** setting to allow all repositories or only selected ones. Repository owners and admins can also disable Copilot for a repository, as the [Copilot on GitHub overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) describes.

Enabling the policy also makes [cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) available; they have no separate access policy. Sessions are scoped by default to a single organization or to personal repositories.

**Guide advice:** Write down the effective decision at each layer. A repository is in scope only when every layer allows it.

## Worked example: a phased enablement record

**Hypothetical starting state:** The fictional enterprise Harbor Lane Analytics has two organizations, `hl-payments` and `hl-tools`. The platform team wants the agent only in `hl-tools`, and only in three internal repositories. The enterprise policy is still at its default.

The team reads the policy description and notes that the default is enabled, so every organization would be in scope. They plan "Enabled for selected organizations" for `hl-tools` only. In `hl-tools`, they plan **Repository access** for three selected repositories. Because cloud sandboxes follow the same policy, they note that sandbox sessions become available wherever the policy is enabled.

**Outcome:** The record lists one organization and three repositories in scope, plus an owner for each layer. It is a plan; it does not prove the settings are applied.

## Practice: map effective scope on paper

**Prerequisites:** A local note and these fictional facts: the enterprise enables the policy for selected organizations `org-a` only; `org-a` allows selected repositories `api` and `web`; the `web` admin has disabled Copilot for that repository.

1. For `org-a/api`, `org-a/web` and `org-b/docs`, decide whether the cloud agent is in scope.
2. Name the layer that decides each result.
3. With authorized read-only access to a sandbox enterprise, compare your plan with the settings pages. Do not change any policy.

**Expected result:** A three-row table with a result and the deciding layer for each repository.

<details>
<summary>Model answer</summary>

`org-a/api` is in scope because every layer allows it. `org-a/web` is out of scope because the repository opt-out applies. `org-b/docs` is out of scope because the enterprise did not select `org-b`, and the organization cannot override that. Confirm the current pages before relying on this mapping.

</details>
