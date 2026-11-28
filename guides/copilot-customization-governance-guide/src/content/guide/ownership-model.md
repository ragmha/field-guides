---
title: Assign owners at every scope
section: Ownership & Review
order: 6
description: Match each customization scope to an accountable owner and protect shared agent files.
verified: "2026-11-27"
diagram: ownership-model
checks:
  - question: What does the enterprise option to protect agent files using rulesets do?
    answer: It creates a ruleset so only enterprise owners can edit agent files in the governance repository; others can still open pull requests.
  - question: Who can see organization-level custom agents stored in the organization agents directory?
    answer: All organization members, even those without access to the repository that stores them.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces
---

## What you will learn

- Assign an accountable owner for each customization scope.
- Use documented repository settings to restrict who can change shared agent files.

## Ownership follows scope

Repository files such as `.github/copilot-instructions.md`, `.github/agents/` and `.github/skills/` are owned like any other source file: by the people who can merge to the default branch.

Shared agents need more deliberate ownership. [Preparing to use custom agents in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/prepare-for-custom-agents) says agents in the `agents/` directory of the organization's `.github` or `.github-private` repository are available to all organization members, even without access to that repository. It recommends a private repository from the template, internal visibility where collaboration is wanted, and a README that sets creation and compliance guidelines. Organization custom agents are labeled **public preview** on that page.

At enterprise scope, [Preparing to use custom agents in your enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents) has you select a `.github-private` repository as the source of governance. Under **AI controls**, the **Agents** tab offers **Protect agent files using rulesets**. The resulting ruleset lets only enterprise owners edit agent files, while others can still open pull requests and bypass actors can merge. The same page notes this also blocks organization owners from managing organization-level agents unless the ruleset is narrowed, and describes delegating to a team of AI managers.

For plugin marketplaces, [Creating and sharing a plugin marketplace](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces) asks maintainers to update `.github/CODEOWNERS`, contribution instructions and templates.

Recommended: name a team, not an individual, as owner of every shared customization, and record that team in your inventory.

## Worked example: an enterprise agent with no gatekeeper

**Hypothetical starting state:** At the fictional Northwind Freight enterprise, any member of the designated organization can push to `.github-private`, and a contractor edits an enterprise-wide agent profile directly on the default branch.

The enterprise owners enable the ruleset protection, narrow it so organization owners still manage their own agents, and add a CODEOWNERS entry naming an AI managers team.

**Outcome:** Edits now arrive as pull requests reviewed by a named team, and the inventory records that team as owner.

## Practice: write an ownership table

**Prerequisites:** Your inventory from Part 1 and read access to an authorized sandbox organization's settings and repositories.

1. Add an Owner column and a Review path column to the inventory.
2. For repository files, record the team that approves pull requests to the default branch.
3. For organization and enterprise agents, record who can push to the governance repository.
4. Mark any shared customization where direct pushes are possible without review.
5. Draft, but do not apply, the ruleset or CODEOWNERS change that would close the gap.

**Expected result:** Every row has a team owner and a review path, with gaps flagged and a draft change for each.

<details>
<summary>Model answer</summary>

Repository rows usually map to existing maintainers. Gaps cluster in the organization and enterprise governance repositories and in personal customizations, which have no shared owner. The draft fix is a protected default branch or the agent-file ruleset plus a CODEOWNERS entry for the owning team.

</details>
