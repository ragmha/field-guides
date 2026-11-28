---
title: Respond to a local agent incident
section: Isolation and Response
order: 23
description: Stop, inspect, review access, recover and rotate after an unexpected local agent action.
verified: "2026-11-27"
diagram: local-incident-response
checks:
  - question: After an incident, is resetting tool approvals enough to contain exposed credentials?
    answer: No. Resetting approvals affects future prompts; exposed credentials must be rotated.
  - question: Which Copilot CLI commands help reconstruct whether a command ran sandboxed?
    answer: /sandbox status and /sandbox policy, plus the session's approval and bypass history.
sources:
  - https://code.visualstudio.com/docs/agents/run/security
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
---

## What you will learn

- Follow a response sequence for an unexpected local agent action.
- Separate resetting approvals from revoking access.

## Stop first, then reconstruct

The [VS Code security guidance](https://code.visualstudio.com/docs/agents/run/security) lists a response sequence: stop the session; inspect the changes and commands; review the access you granted, such as approvals, path permissions and sandbox bypasses; recover files; then follow your incident process and rotate credentials. It stresses that resetting approvals does not revoke credentials.

For Copilot CLI, [Using local sandboxing](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing) gives a troubleshooting order: check status, check the policy, check the configuration, check administrator settings, then retry. The same commands help reconstruct an incident. `/sandbox status` shows whether the sandbox was on, and `/sandbox policy` shows what a command could reach. The most important question is whether a bypass was approved. [Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) explains that a bypass removes Copilot's limits but still runs as you, and an approved bypass also skips credential masking.

## Worked example: a bypassed upload

**Hypothetical starting state:** During a debugging session, a developer approved a sandbox bypass for one command. The agent then ran a command that read a project `.env` file and sent its contents to an unfamiliar URL.

The responder stops the session and saves the transcript. They inspect the Git diff and command history and confirm that the upload ran under the bypass, so the real secrets were present. They review standing approvals and trusted folders and remove the session approvals. They restore changed files from Git. Finally, they report through the incident process and rotate every credential in the `.env` file and the shell environment.

**Outcome:** The timeline shows the bypass as the decisive grant. Credentials are rotated rather than assumed safe after the approvals were reset.

## Practice: tabletop the sequence

**Prerequisites:** The hypothetical above, and your organization's incident contact. Do not rotate real credentials as part of this exercise.

1. Write the five response steps in order, with an owner for each.
2. List the evidence to keep: transcript, diff, command history and sandbox status.
3. List every credential the command could have reached.
4. Mark which credentials need rotation, and why.

**Expected result:** A one-page runbook with ordered steps, owners, evidence to keep and a rotation list.

<details>
<summary>Model answer</summary>

Stop (developer), inspect (developer and security), review access (security), recover (developer), report and rotate (security and service owners). Keep the transcript, `git diff`, shell history and `/sandbox status` output. Rotate everything in `.env` and the exported shell tokens, because the bypass exposed real values. Resetting approvals is recorded but not treated as revocation.

</details>
