---
title: Understand subscription-based routing
section: Plan-Based Routing
order: 14
description: Allow or block plan-specific endpoints to control which Copilot plans work on your network.
verified: "2026-11-27"
diagram: subscription-routing
checks:
  - question: Which endpoint pattern should a company block to stop personal Copilot plans on its network?
    answer: The *.individual.githubcopilot.com pattern, while allowing the business or enterprise pattern its plans use.
  - question: Does the endpoint a request uses decide which features or models the user gets?
    answer: No. GitHub states that endpoint reuse does not determine which features or models are available.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
---

## What you will learn

- Explain how plan-specific endpoints work.
- Choose allow and block rules for company and personal plans.
- Identify the clients and environments where routing applies.

## Plan-specific endpoints

[Subscription-based network routing](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access) is enabled for all users on GitHub.com. A request from a client goes to an endpoint that reflects the user's plan, so a network can tell company plans from personal ones without inspecting content. Allow `*.business.githubcopilot.com`, `*.enterprise.githubcopilot.com` or both, according to the plans your organization uses, and block `*.individual.githubcopilot.com`.

GitHub notes that endpoint reuse does not determine which features or models a user can access. The routing gives the network a signal; policy settings still decide capability.

The routing applies to inline suggestions in VS Code, Visual Studio, JetBrains IDEs and Vim/Neovim; Chat in VS Code, Visual Studio, JetBrains IDEs and on GitHub; GitHub Mobile; and Copilot CLI. Clients need minimum versions, including Copilot Chat 0.17 for VS Code, 1.5.6.5692 for the JetBrains plugin and Visual Studio 2022 17.11.

The [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) adds two details. The broad `*.githubcopilot.com` entry serves any plan, so do not add it when you rely on routing. The three plan-specific patterns are not returned by the meta API. Routing is not supported on GHE.com.

Guide advice: a block rule is only as strong as the network path. Devices off the corporate network or using another egress are outside its reach.

## Worked example: block personal plans

**Hypothetical starting state:** The Anchorage Engineering organization holds Copilot Business. The security team has heard that some contractors use personal plans on company laptops.

The network team reviews the allowlist and finds `*.githubcopilot.com`, which permits every plan. They draft a change: remove the broad entry, allow `*.business.githubcopilot.com` and block `*.individual.githubcopilot.com`. Before approving, they confirm that managed editors meet the minimum versions.

**Outcome:** In a pilot network segment, company accounts keep working and a test personal account is blocked. The change is scheduled with a rollback note. The next lesson covers the change plan.

## Practice: write routing rules

**Prerequisites:** Your organization's Copilot plans and the [routing how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access). No firewall rules need to be changed.

1. List the plans your organization uses.
2. Write the allow and block rules for plan-specific endpoints.
3. Note whether the broad `*.githubcopilot.com` entry is present and what you will do with it.
4. In an authorized sandbox network, test with a company and a personal test account. Without a sandbox, compare your rules with the model answer.

**Expected result:** Rules that allow only your company plans' patterns and block the individual pattern.

<details>
<summary>Model answer</summary>

For Business only: allow `*.business.githubcopilot.com`, block `*.individual.githubcopilot.com` and remove `*.githubcopilot.com`. For Enterprise, allow `*.enterprise.githubcopilot.com` instead or as well. The rules apply on GitHub.com only.

</details>
