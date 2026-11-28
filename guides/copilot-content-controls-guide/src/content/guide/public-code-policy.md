---
title: Set the public code policy
section: Public Code Matching
order: 18
description: Choose Allow or Block, understand inheritance and check which surfaces support the policy.
verified: "2026-11-27"
diagram: public-code-policy
checks:
  - question: What does Block do for inline suggestions in most products?
    answer: Copilot checks suggestions, with about 150 characters of surrounding code, against public code on GitHub and does not show a match or near match.
  - question: Can a user with an organization-assigned seat on GitHub Enterprise Cloud set this policy personally?
    answer: No. The setting is inherited from the organization or enterprise.
  - question: If two organizations that assign a user seats set different values, which applies?
    answer: The most restrictive setting, according to GitHub's policy conflicts reference.
sources:
  - https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
---

## What you will learn

- Explain the Allow and Block options.
- Trace where the effective setting comes from.
- Check surface support before relying on Block.

## Allow or Block

[Managing GitHub Copilot policies as an individual subscriber](https://docs.github.com/en/copilot/how-tos/manage-your-account/manage-policies) describes the "Suggestions matching public code" policy:

- **Block:** in most Copilot products, suggestions and about 150 characters of surrounding code are checked against public code on GitHub. A match or near match is not shown.
- **Allow,** or a product that does not support Block: Copilot can show matching suggestions with details of the match.

Users with seats assigned by an organization on GitHub Enterprise Cloud cannot set the policy themselves; it is inherited from the organization or enterprise. Organization owners set it under **Settings → Copilot → Policies**, as described in [Managing policies for your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-policies), unless an enterprise has already made a selection. [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) explains that enterprise selections come first, and [Policy conflicts](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts) states that this policy resolves to the most restrictive organization setting for a user with seats from more than one organization.

## Surface support

[Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) lists the policy as supported in IDEs and in Copilot in the cloud running on GitHub Actions, where it supports annotate mode only. It is not listed as supported in the cloud sandbox, the Copilot CLI, the Copilot app or Copilot code review.

Guide advice: Block is a filter for supported surfaces. Record the unsupported surfaces in the same control record as the policy, so reviewers know where references or human review must carry the load.

## Worked example: a legal requirement

**Hypothetical starting state:** The fictional `octo-legal` team asks that public-code matches never be shown to developers in the `octo-apps` organization. The enterprise has selected "let organizations decide."

The organization owner sets the policy to Block. A developer who also holds a seat from `octo-data`, which allows matches, is covered because the most restrictive setting applies. The owner then notes that the CLI, app and code review are not listed as supporting the policy and asks the team to review agent output from those surfaces before merging.

**Outcome:** Block is in effect for supported surfaces, and the control record names the surfaces that need human review.

## Practice: record the effective policy

**Prerequisites:** Read access to Copilot policy settings in an authorized sandbox organization.

1. Record whether the enterprise has made a selection.
2. Record the organization setting.
3. List the surfaces your team uses and mark whether each supports the policy.
4. Write the review step for unsupported surfaces.

**Expected result:** A short record of source, value, supported surfaces and a compensating review step.

<details>
<summary>Model answer</summary>

Enterprise: let organizations decide. Organization: Block. Supported: VS Code and JetBrains (IDE). Not listed as supported: Copilot CLI and code review. Compensating step: reviewers check agent-generated changes from the CLI for copied third-party code before merging.

</details>
