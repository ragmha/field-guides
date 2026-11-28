---
title: Read the surface support matrix
section: Surfaces & Limitations
order: 10
description: Identify which tools enforce exclusion for inline suggestions and for chat or agent features.
verified: "2026-11-27"
diagram: surface-support-matrix
checks:
  - question: Does Xcode enforce content exclusion for Copilot Chat?
    answer: No. GitHub lists Xcode as supporting exclusion for inline suggestions but not for chat or agent features.
  - question: Is content exclusion supported in Copilot code review?
    answer: Yes. The matrix lists Copilot code review as supported, and excluded files are not reviewed.
  - question: Which editor listed in the matrix does not support exclusion for inline suggestions?
    answer: Azure Data Studio.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
  - https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli/
---

## What you will learn

- Read GitHub's exclusion support matrix.
- Find tools where exclusion is partial or unsupported.
- Plan compensating guidance for those tools.

## The matrix

[Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) lists support per tool. "N/A" means the tool does not offer that feature.

| Tool | Inline suggestions | Chat and agent features |
| --- | --- | --- |
| Visual Studio, VS Code, JetBrains IDEs | Supported | Supported |
| Vim/Neovim | Supported | N/A |
| Xcode, Eclipse | Supported | Not supported |
| Azure Data Studio | Not supported | N/A |
| Copilot app, Copilot CLI | N/A | Supported |
| Copilot in the cloud (web, Mobile, cloud sandboxes) | N/A | Supported |
| Copilot code review | N/A | Supported |

[Supported surfaces for policies](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) also lists content exclusion as supported in the cloud sandbox, cloud Actions, CLI, app and code review columns. A [September 2026 changelog](https://github.blog/changelog/2026-09-02-content-exclusions-generally-available-in-copilot-app-and-cli/) announced general availability in the Copilot app and CLI for Copilot Business and Copilot Enterprise.

Guide advice: the gaps are the rows to plan around. A developer using Xcode or Eclipse chat can still use an excluded file as chat context, and Azure Data Studio inline suggestions are not covered. Record these rows next to every exclusion that protects sensitive content.

## Worked example: a mixed editor estate

**Hypothetical starting state:** The fictional `octo-devices` team builds an iOS app in Xcode and a backend in VS Code. Both repositories exclude `/provisioning/**`.

The team checks the matrix. In VS Code, the rule covers inline suggestions and chat. In Xcode, it covers inline suggestions only. The team records that Xcode chat is a gap, adds a contributing note asking developers not to share provisioning files in Xcode chat, and confirms that the files are also limited by repository permissions.

**Outcome:** The team's control record lists one supported and one partial surface, with compensating guidance for the partial one.

## Practice: map your estate

**Prerequisites:** A list of the editors and Copilot surfaces used in an authorized sandbox team, and the matrix above.

1. List each tool the team uses.
2. Mark inline and chat coverage from the matrix.
3. Flag every "Not supported" cell.
4. Write one compensating control or note for each flag.

**Expected result:** A coverage table with flagged gaps and compensating notes.

<details>
<summary>Model answer</summary>

Example for VS Code, Eclipse and Copilot CLI: VS Code is supported for inline and chat; Eclipse is supported for inline but not chat; Copilot CLI is supported for chat and agent features. Flag Eclipse chat. Compensating note: restrict repository access to the sensitive path's owners and ask Eclipse users not to attach those files to chat.

</details>
