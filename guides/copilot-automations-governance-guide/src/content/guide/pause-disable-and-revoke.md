---
title: Pause, disable and revoke
section: Review Gates & Kill Switches
order: 3
description: Know which switch stops one run, one automation, one repository or a whole enterprise.
verified: "2026-11-27"
diagram: pause-disable-and-revoke
checks:
  - question: What happens to commits already pushed when you stop a cloud agent session?
    answer: They are preserved. Stopping ends the session and its Actions run but does not remove pushed commits.
  - question: Which organization setting stops automations without turning off Copilot in the cloud?
    answer: The separate Allow automations setting under the organization Copilot cloud settings.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Match each kill switch to the scope it stops.
- Plan an incident sequence that stops current runs and prevents new ones.

## Switches by scope

| Scope | Switch | Source |
| --- | --- | --- |
| One run | **Stop session** in the session log view | [Manage and track agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents) |
| One automation | Disable it in the UI, or set `enabled` to false | [Create automations](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations), [REST](https://docs.github.com/en/rest/agent-automations/agent-automations) |
| One automation, permanently | Delete it in the UI or with the REST delete endpoint | Same pages |
| Organization repositories | **Allow automations**, and repository access for Copilot in the cloud set to selected or none | [Organization settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) |
| Enterprise | The Copilot in the cloud policy, enabled for all, selected or no organizations | [Enterprise settings](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) |

Stopping a session ends its Actions run and keeps commits already pushed. A per-run credit limit also stops a run, and periodic limits block new ones. Organizations cannot override an enterprise policy that disables the feature. For runs started by scripts, also revoke the token or GitHub App installation that starts them.

The documentation reviewed does not say what happens to runs already in progress when a policy is turned off. Guide advice: after changing a policy, stop running sessions explicitly and confirm in the session list that none remain.

## Worked example: a runaway automation

**Hypothetical starting state:** A shared automation is opening near-duplicate pull requests every hour in one repository.

The responder first disables the automation so no new runs start, then stops the two running sessions. Pushed commits remain, so the responder closes the duplicate pull requests and deletes their `copilot/` branches. The automation stays disabled, not deleted, so its revision history is available for review.

**Outcome:** New runs stop within minutes, and evidence is kept. This order is guide advice, not a GitHub procedure.

## Practice: write a stop runbook

**Prerequisites:** An authorized sandbox repository with one disabled test automation.

1. List the switch for each scope in the table above and who holds it.
2. Order the steps for stopping one automation during an incident.
3. Add a verification step for each switch.

**Expected result:** A runbook that names the owner, the order and the check for each switch.

<details>
<summary>Model answer</summary>

1. Repository writer disables the automation and checks it shows as disabled.
2. Writer stops each running session and confirms the session list is empty.
3. Writer closes stray pull requests and branches.
4. If scope widens, organization owner turns off **Allow automations** and checks the setting.
5. Token owner revokes any script token that started runs.

</details>
