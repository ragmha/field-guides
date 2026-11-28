---
title: Check client support first
section: What Managed Settings Control
order: 3
description: Use the supported-clients matrix and minimum versions to predict where a key is enforced.
verified: "2026-11-27"
diagram: client-support-matrix
checks:
  - question: Which managed-settings key does the reference list as supported by Copilot CLI only?
    answer: "`communication.support.url`."
  - question: What happens when a Copilot CLI older than 1.0.93 connects while managed settings include `sandbox`?
    answer: Connections from older clients are blocked.
  - question: In VS Code, where do granular permission rules and managed `sandbox` apply?
    answer: Only to Agent Host sessions. `disableBypassPermissionsMode` is broader and also turns off global auto-approve.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
---

## What you will learn

- Read the supported-clients matrix for a key before deploying it.
- Account for minimum versions and session-type limits.

## Support varies by client

The [reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) lists support across Copilot CLI, VS Code, the GitHub Copilot app, Copilot cloud agent (sandbox and Actions runners) and JetBrains. A few patterns from the table at review time:

| Key | Supported clients (summary) |
| --- | --- |
| `permissions.disableBypassPermissionsMode` | CLI, VS Code, app, cloud sandbox, JetBrains |
| `permissions.deny` / `ask` / `allow` | CLI, VS Code, app, cloud sandbox |
| `permissions.defaultMode`, `sandbox` | CLI, VS Code, app |
| `features.computerUse` | CLI, app |
| `model` | CLI, VS Code, app, cloud sandbox and Actions |
| `autoTier` | CLI, VS Code |
| `allowedMcpServers` / `deniedMcpServers` | CLI, VS Code, app, cloud sandbox, JetBrains |
| `communication.support.url` | CLI only |

The table is a summary; check the reference before acting, because coverage changes.

## Versions and session types

Some keys need a minimum client version. Adding `sandbox` requires CLI 1.0.93, VS Code 1.141.0 or app 1.1.26, and connections from older clients are blocked. `autoTier` and `fusionTier` have their own minimums.

Support can also depend on the session. In VS Code, granular permissions, `strictPluginOnlyCustomization` and `sandbox` apply only to Agent Host sessions. For the cloud agent, `model` applies to sessions started from the GitHub website, CLI and VS Code. The [app changelog](https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/) notes that the cloud agent observes changes on its next task assignment, and bypass controls apply only to interactive clients.

The fetched matrix did not include a row for `strictPluginOnlyCustomization`, so this guide makes no per-client claim for it.

## Worked example: a JetBrains gap

**Hypothetical starting state:** An enterprise adds `permissions.deny` rules for risky shell commands and assumes every developer is covered. A third of developers use JetBrains IDEs.

The administrator checks the matrix: JetBrains supports `disableBypassPermissionsMode` but not the deny, ask and allow rules.

**Outcome:** The rollout note records the JetBrains gap, and the team plans a compensating control for that population instead of claiming universal coverage.

## Practice: build a coverage sheet

**Prerequisites:** Your client inventory (or a hypothetical one) and the reference page. Use an authorized sandbox only; do not change production settings.

1. List the keys you intend to deploy.
2. For each, copy the supported-clients entry and any version footnote.
3. Mark clients in your inventory that are uncovered or below the minimum version.
4. Note session-type limits, such as Agent Host only in VS Code.

**Expected result:** A coverage sheet that names uncovered clients and version gaps before rollout.

<details>
<summary>Model answer</summary>

For `sandbox` and `permissions.deny` with CLI, VS Code and JetBrains users: `sandbox` covers CLI 1.0.93+ and VS Code 1.141.0+ (Agent Host sessions only); older clients are blocked. `permissions.deny` covers CLI and VS Code Agent Host sessions but not JetBrains. Record JetBrains as uncovered for both keys.

</details>
