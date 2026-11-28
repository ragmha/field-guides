---
kind: lesson
title: Set up Copilot in VS Code
description: Sign in with the intended GitHub account and check the client and workspace settings that shape access.
reviewed: 2026-11-23
sources:
  - https://code.visualstudio.com/docs/setup/copilot
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues
checks:
  - question: What is the first setup action in the current VS Code Copilot walkthrough?
    answer: Use the Copilot Status Bar menu’s Use AI Features action and follow the sign-in flow.
  - question: What should you check if the signed-in account is not the one with Copilot access?
    answer: Sign out of the wrong account and sign in with the account assigned the subscription or seat.
---

VS Code’s current setup flow can install its required Copilot extensions automatically. Rin will use the Copilot control in the Status Bar, authenticate to the account prepared in the previous lesson, and check that the project’s policies allow the intended work.

## Prerequisites

- Complete the **Check access and prepare a safe workspace** lesson.
- Install or update VS Code from its official download page.
- Have browser access to complete GitHub authorization.

## Acceptance criteria

- VS Code reports Copilot as ready for the intended GitHub account.
- The practice project is open in the correct window.
- You know where to look for client or organization restrictions if a feature is missing.

## Numbered steps

1. **Update VS Code.** Use the current stable release. Copilot Chat is closely integrated with VS Code releases, so an older editor can have compatibility problems.
2. **Open the practice folder** prepared earlier. Keep this exercise in that window so it is clear which workspace is active.
3. **Start Copilot setup.** Hover over the Copilot icon in the Status Bar and select **Use AI Features**. Follow the prompts to continue with GitHub.
4. **Authorize the intended account.** Complete the browser sign-in and authorization steps using the account that has Copilot access. Read the authorization prompt before accepting it.
5. **Check the active identity and status.** Open the VS Code Accounts menu and Copilot Status Bar menu. Confirm that the expected account is signed in and that Copilot is available.
6. **Review the relevant settings and rules.** Check your organization’s Copilot policy before sharing work code. If needed, use the Copilot settings to understand usage or suggestion-related options; do not change managed settings to bypass policy.
7. **Try the chat entry point.** Open Copilot Chat from the title bar or use `Ctrl+Alt+I` on Windows/Linux or `Control+Command+I` on macOS. If the view is missing, first check whether Chat is enabled for your account and organization.

## Expected result

The Copilot Chat view is available in the VS Code workspace, with the intended GitHub account signed in. Your workspace remains the small practice project.

## Human verification

Check the account shown in the Accounts menu, not just the presence of a Copilot icon. If you use separate work and personal accounts, verify the account preference for this workspace and profile before prompting.

## Limitations and recovery

The names and placement of controls can change between VS Code releases. If setup is unavailable, update VS Code and consult the current setup guide. If Copilot is signed in but unavailable, check account access, organization policies, network/service status, and the troubleshooting guide. For authentication problems, sign out, reload the VS Code window, and sign in again with the correct account. Do not copy another user’s credentials or weaken organization controls.

### Self-check

- **Does the absence of a separate extension-install step mean setup failed?** No. In the current VS Code setup, required extensions are installed automatically.
- **What should you verify before typing a work-related prompt?** The active account, workspace, applicable data-handling policy, and whether the content may be shared.
