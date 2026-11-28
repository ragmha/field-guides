---
title: Map the customization layers
section: Customization Estate
order: 2
description: Place each customization type at personal, repository, organization or enterprise scope.
verified: "2026-11-27"
diagram: customization-layers
checks:
  - question: Which file holds repository-wide custom instructions?
    answer: .github/copilot-instructions.md, alongside optional path-specific .instructions.md files and agent instruction files such as AGENTS.md.
  - question: Where can organization-level custom agents be stored?
    answer: In the agents directory of the organization's .github or .github-private repository.
  - question: Are organization custom instructions read by local IDE clients?
    answer: No. They apply to supported GitHub website experiences and Copilot code review, not to local clients.
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
  - https://docs.github.com/en/copilot/reference/customization-cheat-sheet
  - https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations
---

## What you will learn

- Name the customization types GitHub documents and the scope each one supports.
- Locate the storage path for each type so it can be inventoried.

## Customizations sit at different scopes

GitHub describes three kinds of custom instructions: personal, repository and organization. Repository instructions take three forms: a repository-wide `.github/copilot-instructions.md`, path-specific `NAME.instructions.md` files under `.github/instructions/` that use an `applyTo` glob, and agent instruction files such as `AGENTS.md`, `CLAUDE.md` or `GEMINI.md`. Organization instructions are entered in organization settings, require Copilot Business or Enterprise, and apply only to supported GitHub website experiences and Copilot code review. See [About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions).

The [customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) lists the other locations:

| Type | Repository | Shared beyond one repository | Personal |
| --- | --- | --- | --- |
| Prompt files | `.github/prompts/*.prompt.md` | None documented | User profile in supported IDEs |
| Custom agents | `.github/agents/` | `agents/` in the organization `.github` or `.github-private` repository, or the enterprise-designated `.github-private` repository | User profile |
| Agent skills | `.github/skills`, `.claude/skills` or `.agents/skills` | Through plugins | `~/.copilot/skills` or `~/.agents/skills` |
| Plugins | Defaults in `.github/copilot/settings.json` | Marketplaces and managed settings | Client installs |

[Comparing customizations](https://docs.github.com/en/copilot/concepts/customizations/comparing-customizations) also notes that CLI extensions are distinct from IDE extensions and from the retired GitHub App-based Copilot Extensions, so an inventory should not merge them.

Guide advice: record the scope as well as the path. A personal skill and a repository skill may have the same name but have very different owners and audiences.

## Worked example: a first layer map

**Hypothetical starting state:** The fictional Lumen Labs platform team assumes "our Copilot instructions" means one organization text box. A quick search finds `AGENTS.md` in 40 repositories, `.github/agents/` in six, and several developers with personal skills.

The team builds a layer map with four rows (personal, repository, organization, enterprise) and one column per customization type. Each cell lists the storage location and an example file found in the estate.

**Outcome:** The team learns that most behavior comes from repository files, not the organization setting, and assigns inventory work to repository maintainers rather than only to administrators.

## Practice: draw your layer map

**Prerequisites:** Read access to an authorized sandbox organization and at least one sandbox repository; no write access is needed.

1. List the customization types from the table above as columns.
2. Add rows for personal, repository, organization and enterprise scope.
3. In the sandbox repository, search for `.github/copilot-instructions.md`, `.github/instructions/`, `AGENTS.md`, `.github/prompts/`, `.github/agents/` and `.github/skills/`.
4. Check whether the sandbox organization has a `.github` or `.github-private` repository with an `agents/` directory.
5. Record each finding in the matching cell, with its path.

**Expected result:** A grid that shows where each customization in the sandbox lives and which cells are empty.

<details>
<summary>Model answer</summary>

A complete map has a path or "none found" in every cell. Personal cells are usually "unknown" because personal files live on developer machines or profiles; note that gap rather than guessing. Organization instructions appear only as a setting, not a file.

</details>
