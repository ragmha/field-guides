---
kind: lesson
title: Check access and prepare a safe workspace
description: Confirm Copilot access, editor prerequisites, and a low-risk project before sending context.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/get-started/plans
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension
  - https://code.visualstudio.com/docs/setup/copilot
checks:
  - question: What should you do if your employer manages your Copilot access?
    answer: Check the organization’s policies and ask its administrator about your seat and enabled features.
  - question: Is a folder with no secrets automatically safe to send to Copilot?
    answer: Not necessarily; check ownership, confidentiality, and your organization’s data-handling rules first.
---

Rin wants to try Copilot on a reading-list helper, not on the company’s live service. Before opening the editor, Rin checks that the account, editor, and project are suitable for the exercise.

## Prerequisites

- A GitHub account with Copilot access, either through an eligible individual plan or an organization-provided seat.
- A current VS Code installation.
- A small local project you own or are authorized to use, with no secrets or sensitive data.
- A way to inspect and undo local edits, such as the project’s version-control history.

## Acceptance criteria

- You know which GitHub account should provide Copilot access.
- You have confirmed that Copilot is available to that account, or identified who can grant access.
- You have a safe, bounded practice project and know its existing changes.

## Numbered steps

1. **Identify the account.** If Copilot is provided by work or school, use the account associated with that assignment. Do not assume a personal account has the same seat, policy, or model availability.
2. **Check the current plan and policies.** Review the [Copilot plans](https://docs.github.com/en/copilot/get-started/plans) page for current access and usage details. For managed access, ask the administrator whether the feature you need is enabled. Plan names, allowances, and features can change.
3. **Prepare a practice folder.** Choose a toy project, sample, or non-sensitive utility. Do not use production credentials, private keys, customer records, unpublished sensitive code, or data you are not permitted to share.
4. **Record the starting state.** If the project uses version control, inspect its status before editing. Set aside or save any work that is already in progress so you can distinguish it from this exercise.
5. **Open the project in VS Code.** Use a folder you trust and are authorized to modify. If you are not sure whether the code may be shared with an AI service, stop and check the applicable policy before continuing.

## Expected result

You have a suitable account, a local project with a known starting state, and a clear boundary for what context is safe to use.

## Human verification

Confirm the signed-in GitHub identity is the intended one and that the practice folder contains no sensitive information. A visible Copilot feature is not proof that your organization permits every use case; check its policy when in doubt.

## Limitations and recovery

Access, usage allowances, model choices, and feature availability depend on the plan and administrator settings. If access is missing, verify the account and ask the seat administrator rather than trying another person’s credentials. If the project is not safe to share, choose a synthetic example instead.

### Self-check

- **Can a feature be unavailable even when the account has a Copilot plan?** Yes. Organization policy, plan eligibility, or usage limits may affect availability.
- **What is the safe next step if you are unsure whether code can be sent?** Do not include it; check the relevant policy or use fictional input.
