---
title: Verify on the endpoint
section: Verification and Drift
order: 18
description: Combine GitHub validation, client diagnostics and behavior tests before calling a setting enforced.
verified: "2026-11-27"
diagram: endpoint-verification
checks:
  - question: Which VS Code command shows effective policy values and their sources?
    answer: "**Developer: Policy Diagnostics**."
  - question: A user does not receive server-managed settings. Which two account checks does GitHub suggest?
    answer: Confirm they get Copilot through your enterprise or one of its organizations, and that "Usage billed to" selects your enterprise if they have several billing entities.
  - question: Does a correct value in a diagnostics report prove the restriction is enforced?
    answer: No. Test one permitted and one blocked operation in an approved environment.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://code.visualstudio.com/docs/enterprise/policies
  - https://code.visualstudio.com/docs/enterprise/troubleshooting
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
---

## What you will learn

- Order verification checks from repository to behavior.
- Use client diagnostics without treating them as proof of enforcement.

## Four layers of evidence

1. **Source is valid.** For server-managed settings, **Copilot settings validation** under **AI controls > Agents** lists issues by file and JSON path ([Getting started](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started)).
2. **The user is in scope.** Server-managed settings reach users licensed by your enterprise. If several billing entities license a user, their "Usage billed to" selection in personal Copilot settings must be your enterprise.
3. **The client received it.** Allow about an hour for server-managed changes, or restart or sign in. MDM is checked hourly; a file needs a restart. In VS Code, **Developer: Policy Diagnostics** reports effective values and sources, and the **Non-applied Policy** table helps catch misspelled keys or unread files ([VS Code policies](https://code.visualstudio.com/docs/enterprise/policies)).
4. **Behavior matches.** The [VS Code troubleshooting page](https://code.visualstudio.com/docs/enterprise/troubleshooting) says the report does not prove a restriction applies to every workflow or harness. Exercise one permitted and one harmless blocked operation in an approved test environment.

Diagnostics reports can contain account identifiers and session details. Redact them before sharing.

## Client limits to remember

For `sandbox`, the GitHub Copilot app displays the user's repository settings, not the complete effective managed policy, and does not show per-setting managed locks, so do not read that view as evidence. Check client version too: VS Code shows a blocking notice when the managed-settings service requires a newer version. A starting default such as `model` will not block a different selection; test it as a default.

## Worked example: right value, wrong harness

**Hypothetical starting state:** Diagnostics in VS Code show the expected managed `permissions.deny` value, but a developer reports the command still ran without a prompt.

The administrator checks the session type. The reference limits granular permissions in VS Code to Agent Host sessions; the developer used a different harness.

**Outcome:** The value was delivered; the gap was enforcement scope. The rollout note now names the supported session type, and the team does not loosen any control while investigating.

## Practice: run an evidence checklist

**Prerequisites:** An authorized sandbox device and test account in scope of a sandbox managed setting, such as `permissions.disableBypassPermissionsMode: "disable"`. Do not change production settings.

1. Confirm no validation issues are shown for the sandbox source.
2. Confirm the test account's license source and "Usage billed to" selection.
3. Restart the client, then run **Developer: Policy Diagnostics** in VS Code and record value and source.
4. Try a bypass option and a normal approved action.

**Expected result:** A four-line record: valid source, user in scope, delivered value with source, observed behavior.

<details>
<summary>Model answer</summary>

Validation shows no issues; the account is licensed by the sandbox enterprise; diagnostics show the value from the server-managed source; the bypass attempt is blocked while the approved action proceeds. If any layer fails, stop at that layer rather than changing the configuration.

</details>
