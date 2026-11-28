---
title: Check surface support before you rely on a file
section: Customization Estate
order: 3
description: Confirm which Copilot surfaces read each customization and where support is in public preview.
verified: "2026-11-27"
diagram: surface-support-check
checks:
  - question: Are prompt files supported on GitHub.com or in Copilot CLI?
    answer: No. The cheat sheet lists prompt files for supported IDEs, not GitHub.com or the CLI.
  - question: Which experiences on GitHub.com read path-specific instruction files?
    answer: Copilot cloud agent and Copilot code review; the excludeAgent key can exclude one of them.
  - question: What should you do when a cell in the support table is marked as preview?
    answer: Record it as public preview, expect change, and avoid making it a hard dependency for a control.
sources:
  - https://docs.github.com/en/copilot/reference/custom-instructions-support
  - https://docs.github.com/en/copilot/reference/customization-cheat-sheet
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions
  - https://code.visualstudio.com/docs/agent-customization/prompt-files
---

## What you will learn

- Check a customization against the surfaces that are documented to read it.
- Flag public preview support so it is not treated as a stable dependency.

## The same file is not read everywhere

[Support for different types of custom instructions](https://docs.github.com/en/copilot/reference/custom-instructions-support) is a matrix, not a single yes or no. GitHub.com, VS Code, Visual Studio, JetBrains IDEs and Eclipse each read a different subset of instruction types, and Copilot code review also reads `REVIEW.md`. On GitHub.com, path-specific instructions are read by Copilot cloud agent and Copilot code review; an `excludeAgent` frontmatter value of `"code-review"` or `"cloud-agent"` keeps one of them from reading the file. See [Adding repository custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions).

The [customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet) extends the matrix to agents, skills, prompt files and hooks. Several JetBrains, Eclipse and Xcode cells are marked as **public preview**, and prompt files are not supported on GitHub.com or in Copilot CLI.

Visual Studio Code adds a further boundary: its [prompt files documentation](https://code.visualstudio.com/docs/agent-customization/prompt-files) says prompt files run only in the Local harness, which is deprecated and scheduled for removal by February 2027, and recommends converting them to skills.

Recommended: treat the support matrix as an input to every governance decision. A rule that only lives in a prompt file is invisible to cloud agent sessions; a rule that only lives in organization instructions never reaches a local IDE.

## Worked example: a rule that never reached the reviewer

**Hypothetical starting state:** The fictional Harbor Analytics team writes its secure-logging rule in a path-specific instructions file with `excludeAgent: "code-review"`, expecting Copilot code review to enforce it.

The team compares the file with the support matrix and the `excludeAgent` documentation. The value they chose explicitly removes the file from Copilot code review.

**Outcome:** The team removes the exclusion in a reviewed pull request, adds a support column to its inventory, and records that instructions guide Copilot but do not guarantee compliance.

## Practice: annotate your inventory with support

**Prerequisites:** The layer map from the previous lesson and read access to an authorized sandbox repository.

1. Add columns for GitHub.com, Copilot CLI, VS Code and any other client your teams use.
2. For each inventory row, mark supported, not supported or public preview using the support matrix and cheat sheet.
3. Open any path-specific instruction file and note whether it uses `excludeAgent`.
4. Highlight rows where the intended audience uses a surface that does not read the file.

**Expected result:** An inventory that shows, for each customization, the surfaces where it takes effect and any preview dependency.

<details>
<summary>Model answer</summary>

Typical findings are prompt files expected to work in cloud agent sessions, organization instructions expected to reach IDEs, and preview-only support in one IDE. Each mismatch becomes a follow-up: move the rule to a supported type, document the gap, or accept the preview risk explicitly.

</details>
