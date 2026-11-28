---
title: Use repository access as the base layer
section: Complementary Controls
order: 22
description: Use repository roles, base permissions and deploy key reviews to limit who can reach sensitive content.
verified: "2026-11-27"
diagram: repository-access-layer
checks:
  - question: Who sets an organization's base permissions?
    answer: Organization owners. Base permissions apply to all members when accessing any of the organization's repositories.
  - question: Why should deploy keys be reviewed when someone leaves the organization?
    answer: GitHub warns that anyone with the private key can read from or write to the repository, depending on key settings, even after removal from the organization.
  - question: Which repository role has full access including sensitive and destructive actions?
    answer: Admin.
sources:
  - https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
---

## What you will learn

- List the repository roles and what base permissions do.
- Explain why access decisions sit beneath exclusion.
- Include deploy keys in access reviews.

## Roles and base permissions

[Repository roles for an organization](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization) lists six roles, from least to most access: Read, Triage, Moderate, Write, Maintain and Admin. Admin is recommended for people who need full access, including sensitive and destructive actions such as managing security or deleting a repository. Organizations on GitHub Enterprise Cloud can also create custom repository roles. Organization owners set base permissions, which apply to all members on all of the organization's repositories, and organization owners have admin access to every repository in the organization.

The page also warns that anyone who has a deploy key's private key can read from or write to the repository, depending on the key settings, even after being removed from the organization. Deploy keys belong in every access review.

## Why access comes first

[Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) describes exclusion as a guardrail, not a security boundary. Recommended: decide who should reach the content first, using repository roles, base permissions and repository placement, then add exclusion so that people who do have access are not offered that content through Copilot.

## Worked example: a sensitive directory in a wide repository

**Hypothetical starting state:** The fictional `octo-apps` organization grants Write base permissions. Its `platform` repository includes `/pricing/models/`, which only the pricing team should see, and an organization exclusion already covers that path.

The owners recognize that the exclusion stops Copilot from using the directory but every member can still clone it. They move the pricing models into a new repository, grant the pricing team Write access through a team, lower base permissions to Read, and keep the exclusion in the new repository for the pricing team's own Copilot use. They also remove an old deploy key held by a former contractor.

**Outcome:** Only the pricing team can read the models, Copilot does not use them, and no stale deploy key remains.

## Practice: review an access layer

**Prerequisites:** Owner or admin access to an authorized sandbox organization and repository containing a fictional sensitive path.

1. Record the organization base permission.
2. List teams and people with access to the repository and their roles.
3. List deploy keys and whether each has a current owner.
4. Decide whether exclusion alone is appropriate, or whether access must change first.

**Expected result:** A short access record with base permission, role list, deploy key list and a decision.

<details>
<summary>Model answer</summary>

Base permission: Read. Roles: `pricing` team Write; two admins. Deploy keys: one CI key with an owner; one key without an owner, flagged for removal. Decision: access is appropriate after removing the unowned key; keep exclusion as an additional Copilot layer.

</details>
