---
title: Choose personal or shared identity
section: Identity & Ownership
order: 2
description: Compare visibility, editing rights, billing and acting identity before fixing an automation's type.
verified: "2026-11-27"
diagram: personal-vs-shared-identity
checks:
  - question: Can a personal automation be converted to a shared one later?
    answer: No. The type is fixed at creation; changing it means creating a new automation.
  - question: Whose identity does a shared automation use for actions on GitHub?
    answer: Copilot's identity, not that of the person who created it.
  - question: Who can see the runs of a personal automation?
    answer: Everyone with read access to the repository, even though only the creator can see the automation itself.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

## What you will learn

- Compare personal and shared automations across visibility, editing, billing and identity.
- Choose a type that matches who should own the work over time.

## The type fixes five properties

The [automations documentation](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) describes two types:

| Property | Personal | Shared |
| --- | --- | --- |
| Who can see it | Only the creator | Everyone with read access |
| Who can edit it | Only the creator | Anyone with write access |
| Who sees its runs | Everyone with read access | Everyone with read access |
| Who pays for AI credits | The creator | The repository owner |
| Identity for actions on GitHub | The creator | Copilot |

The type cannot be changed after creation. A shared automation keeps working when its creator leaves. In organization repositories, shared automations need the **Allow use of Copilot cloud agent billed to the organization** policy. The [REST reference](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) adds that personal automations are the default type through the API. When a GitHub App installation token creates a shared automation, `created_by` identifies the app's bot account.

Identity shapes review. Actions from a personal automation are attributed to its creator, who [cannot approve](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) the resulting pull requests. Actions from a shared automation are attributed to Copilot. If the repository requires approving reviews, a shared automation's pull request needs one more approval by default. Part 5 covers that gate.

Guide advice: Use personal automations for individual tasks where the creator should stay accountable for each change. Use shared automations for team routines that must outlive one person and whose cost belongs to the repository owner.

## Worked example: a team triage routine

**Hypothetical starting state:** A developer on the docs team proposes a weekly automation that labels stale issues in the team's private repository. The team wants it to keep running through staffing changes.

The reviewer compares the two types. A personal automation would be invisible to teammates, billed to the developer and act as the developer. A shared automation would be visible and editable by the team, billed to the organization and act as Copilot. The reviewer confirms that the organization allows cloud agent use billed to the organization.

**Outcome:** The team chooses shared. Because anyone with write access can edit a shared automation, it adds change review in Part 6. Its pull requests need an extra approval by default.

## Practice: choose a type

**Prerequisites:** Two hypothetical requests: a personal daily summary of one developer's open pull requests, and a team routine that fixes failing builds.

1. For each request, list who must see, edit and pay for it.
2. Choose a type and note which review rule applies.
3. In an authorized sandbox, create each automation disabled to confirm the options shown. Do not enable anything in production.

**Expected result:** A type decision with its billing and review consequences for each request.

<details>
<summary>Model answer</summary>

The daily summary is personal. It is private to the developer and billed to that developer, and any pull request it opens is attributed to the developer, who cannot approve it. The build-fix routine is shared. It is team-visible, billed to the repository owner and attributed to Copilot. Where reviews are required, it needs an additional approval by default.

</details>
