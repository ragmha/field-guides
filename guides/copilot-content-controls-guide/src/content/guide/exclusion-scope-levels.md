---
title: Match each rule level to its audience
section: Exclusion Foundations
order: 3
description: Decide whether a rule belongs at repository, organization or enterprise level based on who it must reach.
verified: "2026-11-27"
diagram: exclusion-scope-levels
checks:
  - question: Which users does a repository-level exclusion affect?
    answer: Any Copilot user in the enterprise who is working in that repository, according to GitHub's concept page.
  - question: Which users does an organization-level exclusion affect?
    answer: Only users who are assigned a Copilot seat by that organization.
  - question: Can a repository administrator edit an inherited organization rule on the repository settings page?
    answer: No. Inherited organization or enterprise exclusions appear as gray boxes and cannot be edited there.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Identify where each level is configured.
- Predict which users each level reaches.
- Choose a level for a given protection need.

## Three levels, three audiences

[Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) and [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) describe three places to save rules:

| Level | Where it is configured | Who is affected |
| --- | --- | --- |
| Repository | Repository **Settings → Copilot → Content exclusion**, "Paths to exclude in this repository" | Any Copilot user in the enterprise working in that repository |
| Organization | Organization **Settings → Copilot → Content exclusion**, "Repositories and paths to exclude" | Users assigned a Copilot seat by that organization |
| Enterprise | Enterprise **AI controls → Copilot → Content exclusion** | All Copilot users in the enterprise |

Repository rules contain paths only, because the repository is implied. Organization and enterprise rules name repositories, or use `"*"` for every repository, and can target files in Git or files that are not under Git control.

On the repository page, exclusions inherited from the organization or enterprise appear in gray boxes. A repository administrator can see them but cannot edit them there.

Guide advice: the organization audience depends on seat assignment, not on who owns the repository. If a contractor's seat comes from a different organization, an organization rule in your organization may not reach them; a repository or enterprise rule would.

## Worked example: a shared vendor directory

**Hypothetical starting state:** A fictional enterprise has two organizations, `octo-apps` and `octo-data`. Both use `/vendor/licensed-sdk/` in many repositories. Some developers in `octo-data` hold seats assigned by `octo-apps`.

The administrators compare options. A rule in each repository would require dozens of edits. A rule in `octo-apps` would not cover users whose seats come from `octo-data`. An enterprise rule using `"*"` reaches every Copilot user in the enterprise, so they choose that and note it in the enterprise change record.

**Outcome:** One enterprise rule covers the directory for every Copilot user in the enterprise, and repository administrators see it as an inherited gray entry.

## Practice: choose the level

**Prerequisites:** The table above and three fictional needs: one secret file in one repository, one directory in every repository of a single organization whose users all hold seats from it, and one directory that every Copilot user in the enterprise must avoid.

1. For each need, name the level you would use.
2. Write one sentence on which users that level reaches.
3. State who must approve the change in your authorized sandbox.

**Expected result:** Three level choices, each with an audience sentence and an approver.

<details>
<summary>Model answer</summary>

Single file: repository level, affecting any enterprise Copilot user in that repository; approved by the repository administrator. Organization-wide directory: organization level, affecting users with a seat from that organization; approved by an organization owner. Enterprise-wide directory: enterprise level, affecting all Copilot users in the enterprise; approved by an enterprise owner.

</details>
