---
title: Resolve instruction conflicts at the source
section: Layer Conflicts
order: 18
description: Know which clients rank instruction layers and why conflicts must be removed rather than outranked.
verified: "2026-11-27"
diagram: instruction-precedence
checks:
  - question: On Copilot Chat on GitHub.com, which instruction layer has the highest priority?
    answer: Personal instructions, then repository instructions, then organization instructions, though all relevant sets are provided.
  - question: Does Copilot CLI define a general precedence order between instruction files?
    answer: No. It combines them, removes identical duplicates and advises avoiding conflicts.
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
  - https://code.visualstudio.com/docs/agent-customization/custom-instructions
---

## What you will learn

- Describe how instruction layers combine on GitHub.com and in local clients.
- Resolve a conflict by removing or narrowing a rule, not by adding a counter-rule.

## Precedence depends on the surface

[About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions) says precedence depends on the client. For Copilot Chat on GitHub.com, [Adding personal custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-personal-instructions) gives the order personal, then repository, then organization, and adds that all relevant sets are still provided to Copilot. Within repository instructions, path-specific instructions rank before repository-wide and agent instructions.

Local clients behave differently. [Adding custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions) states that the CLI combines applicable user and repository files, removes identical duplicates, and defines no general precedence order. The [VS Code custom instructions documentation](https://code.visualstudio.com/docs/agent-customization/custom-instructions) also warns against relying on a universal precedence order, and advises removing or narrowing a conflicting personal rule rather than adding another rule to compensate.

All sources agree that instructions guide the model and do not guarantee compliance.

Recommended: treat any conflict as a defect. Higher priority on one surface does not make the lower-priority instruction disappear, and on other surfaces neither instruction wins.

## Worked example: two test frameworks

**Hypothetical starting state:** The fictional Bramble Retail organization instructions say "Use Jest for tests". A repository's `AGENTS.md` says "Use Vitest". A developer's personal instructions say "Prefer Mocha".

On GitHub.com the personal rule ranks first, but all three are sent. In Copilot CLI, the repository and personal files are combined without a ranking, and results vary. The team removes the organization rule, which no longer reflects practice, keeps Vitest in the repository file, and asks the developer to drop the personal rule for this repository's work.

**Outcome:** One authoritative statement per topic, owned by the repository team, with the conflict recorded in the inventory.

## Practice: find conflicts in a sandbox

**Prerequisites:** An authorized sandbox repository with at least two instruction files, and Copilot CLI available in a sandbox environment.

1. Start a Copilot CLI session in the sandbox repository and run `/instructions` to list discovered files.
2. Read each listed file and note rules that address the same topic.
3. On GitHub.com, ask Copilot Chat a question in the same repository and inspect the references list.
4. For each conflicting pair, decide which owner should keep the rule.
5. Draft, but do not merge, the pull request that removes or narrows the other rule.

**Expected result:** A conflict list with a proposed single source for each topic and a draft change.

<details>
<summary>Model answer</summary>

Conflicts often hide between organization text and `AGENTS.md`, or between a repository-wide file and a path-specific file. The fix removes one rule; it does not add "ignore the other instruction", because ranking differs by surface.

</details>
