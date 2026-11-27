---
title: Plan the rollback
section: Change Management and Rollback
order: 23
description: Write a rollback path and timing for each delivery method before you ship a change.
verified: "2026-11-27"
diagram: rollback-plan
checks:
  - question: After reverting a server-managed change, how quickly do clients pick it up?
    answer: Within about an hour; restarting the client or signing in again refreshes immediately. Cloud agent observes it on the next task assignment.
  - question: Does reverting a server-managed `permissions.deny` rule remove the same rule delivered by MDM?
    answer: No. Deny rules from any managed source apply, so each source must be rolled back separately.
  - question: How do you roll back a file-based setting?
    answer: Replace or remove the file through device management and have users restart supported clients.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/
---

## What you will learn

- Choose the rollback action for each delivery method.
- Account for propagation time and restrictive composition when you reverse a change.

## Rollback by delivery method

| Method | Rollback action | When clients see it |
| --- | --- | --- |
| Server-managed | Revert the commit on the default branch of `.github-private` | About an hour; restart or sign-in is immediate; cloud agent on next task |
| Team override | Remove the mapping or restore the team file | Same as server-managed |
| Native MDM | Remove or correct the policy values for the device group | Hourly check; no restart needed |
| File-based | Replace or remove the file | After a client restart |

Sources: [Getting started](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started), [deployment page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) and the [app changelog](https://github.blog/changelog/2026-07-27-enterprise-managed-settings-now-apply-to-the-github-copilot-app/).

## Why a revert may not relax everything

Reverting one source does not undo restrictions another source still supplies. Deny rules, allowlist intersections and `strictPluginOnlyCustomization` compose across sources, and a `"disable"` bypass value from any layer stays in effect. For MCP lists, a client that cannot retrieve a policy layer keeps the previously enforced policy; it can become more restrictive but not less ([allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist)). A relaxing rollback therefore lands only after a successful fetch.

For teams, `"unmanaged"` in a team file removes an overridable control for that team. A team value replaces the whole overridable default, so a rollback file must restore every restriction you meant to keep ([team overrides](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams)).

**Guide advice:** Keep the previous file version and the MDM payload export with each change request, so the rollback is a known artifact rather than a reconstruction.

## Worked example: an allowlist that blocked too much

**Hypothetical starting state:** A server-managed change sets `allowedMcpServers` to `[]`, blocking every non-built-in server. Help desk tickets arrive within the hour.

The administrator reverts the commit, checks validation, and asks affected users to restart. They confirm no MDM or file source also sets an allowlist that would keep the intersection empty.

**Outcome:** Servers return for restarted clients immediately and for others within about an hour. The incident note records the revert commit and the time each verification passed.

## Practice: write a rollback runbook

**Prerequisites:** The sandbox source and sandbox device from earlier lessons. Do not change production settings.

1. For a sandbox change to `permissions.deny`, write the rollback action for server, MDM and file sources.
2. Record the expected propagation time for each.
3. Revert the sandbox server change and time how long a test client takes with and without a restart.
4. Re-run your endpoint verification checklist.

**Expected result:** A runbook with an action, a timing and a verification step for each source.

<details>
<summary>Model answer</summary>

Server: revert, about an hour or immediate on restart. MDM: remove the value, hourly check. File: replace the file, restart. Because deny rules from any source apply, all three must be rolled back if all three carried the rule. Verification repeats the permitted and blocked operation tests.

</details>
