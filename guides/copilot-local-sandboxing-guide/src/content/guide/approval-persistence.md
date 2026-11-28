---
title: Track how long approvals last
section: Approval Modes
order: 7
description: Follow an approval from a single action to sessions, resumed sessions and future sessions.
verified: "2026-11-27"
diagram: approval-persistence
checks:
  - question: In Copilot CLI, if you approve the rm tool for the rest of the session, what else can run without asking?
    answer: Other rm commands, such as rm -rf ./*, for the rest of that session.
  - question: Does resetting tool approvals in VS Code revoke credentials an agent already used?
    answer: No. Resetting approvals changes future prompts; credentials must be rotated separately.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
  - https://code.visualstudio.com/docs/agents/run/approvals
  - https://code.visualstudio.com/docs/agents/run/security
---

## What you will learn

- Identify the scope of each approval choice in Copilot CLI and VS Code.
- Remove standing approvals that are broader than intended.

## Approvals have lifetimes

The [Copilot CLI documentation](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) offers three answers to a tool request. **Yes** allows that one action. **Yes, and approve this tool for the rest of the running session** allows the tool until the session ends. It is restored when you resume the session, but directory approvals and approvals granted by the safety review or a policy are not. **No** declines and lets you tell Copilot what to do instead. The documentation's example: approving `rm` for the session also allows `rm -rf ./*`. [Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) adds a **don't ask again** choice that can persist for the repository or directory in future sessions.

VS Code [approvals](https://code.visualstudio.com/docs/agents/run/approvals) offer **Allow Once**, **In this Session** and **Always Allow**. **Chat: Manage Tool Approval** reviews approvals, and **Reset Tool Confirmations** clears them. Reset does not delete rules saved in User settings. A global auto-approve setting applies across workspaces, and the documentation cautions against it. The [security guidance](https://code.visualstudio.com/docs/agents/run/security) adds that resetting approvals does not revoke credentials an agent has already used.

## Worked example: a session-wide rm

**Hypothetical starting state:** During a cleanup task, a developer chooses the session-wide option for `rm` to stop repeated prompts. Later in the same session, they ask Copilot to restructure a directory, and Copilot runs a broad delete.

The reviewer traces the approval. The `rm` approval lasted the whole session and covered every argument, so the broad delete needed no prompt. Resuming the session would restore it. The reviewer recovers the files from Git, then, as advice, prefers one-time approvals for destructive commands and a narrower allow rule for safe, repeated ones.

**Outcome:** The incident came from approval scope, not a new permission. The remediation narrows lifetimes and leaves sandboxing to limit what any approved command can reach.

## Practice: review standing approvals

**Prerequisites:** A test CLI session and a test VS Code workspace with a few approvals granted. Do not reset approvals on a shared machine without agreement.

1. In VS Code, open **Chat: Manage Tool Approval** and list each standing approval and its scope.
2. In Copilot CLI, note which tools you approved for the session and whether any persist for the directory.
3. Mark approvals that cover destructive or publishing commands.
4. Reset or narrow the marked approvals, then check that User settings rules are unchanged.

**Expected result:** A list of approvals with their scope, the risky ones narrowed or reset, and a note that User settings rules were reviewed separately.

<details>
<summary>Model answer</summary>

Session approvals for `rm` and `git` are reset. An **Always Allow** for a formatter is kept. A User settings rule that auto-approves `npm` is flagged for the auto-approval review in Part 3, because Reset Tool Confirmations does not remove it. No credentials are assumed revoked by the reset.

</details>
