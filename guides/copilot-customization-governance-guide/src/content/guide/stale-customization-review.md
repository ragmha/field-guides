---
title: Review customizations for staleness
section: Retirement
order: 22
description: Combine documented usage signals with owner review to find stale customizations.
verified: "2026-11-27"
diagram: stale-customization-review
checks:
  - question: What does the totals_by_plugin usage metric count?
    answer: Skill invocations only, so it does not measure use of other plugin components.
  - question: How can you see which custom agents are being used in an organization?
    answer: Filter the organization audit log by actor:Copilot, as suggested in the custom agent testing documentation.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions
  - https://code.visualstudio.com/docs/agent-customization/custom-instructions
---

## What you will learn

- Use documented signals to find customizations that may be stale.
- Pair signals with an owner review, because no single signal proves staleness.

## Signals and their limits

GitHub and Visual Studio Code document several signals:

- **References.** Chat responses list the instruction files used, and VS Code shows a References section where available; see the [VS Code custom instructions documentation](https://code.visualstudio.com/docs/agent-customization/custom-instructions), which also advises updating rules when commands, architecture or dependencies change.
- **Discovery lists.** Copilot CLI's `/instructions` command shows which instruction files were discovered for a session and lets you disable individual files; see [Adding custom instructions for Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions).
- **Audit log.** [Testing and releasing custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents) suggests filtering the organization audit log by `actor:Copilot` to monitor custom agent usage.
- **Usage metrics.** [Managing plugin marketplaces and plugins](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) notes that `totals_by_plugin` counts skill invocations only.

Each signal has gaps. Instructions are applied automatically and leave no invocation count. Personal customizations are invisible to administrators. Detailed audit and metrics analysis is covered by sibling courses.

Guide advice: run a review on a fixed cadence, such as each quarter, and on triggers such as a framework migration or a renamed directory. Ask each owner to confirm, update or retire every row.

## Worked example: the quarterly sweep

**Hypothetical starting state:** The fictional Saltmarsh Media inventory has 180 rows. Nobody knows which still matter.

The platform team sorts rows into a two-by-two grid: recent usage signal or not, and recent edit or not. Rows with neither are sent to owners first. One `AGENTS.md` still refers to a build tool the team replaced last year; one organization agent shows no `actor:Copilot` activity for two quarters.

**Outcome:** Owners retire 23 rows and update 11. Rows without an owner are escalated rather than deleted.

## Practice: run a staleness review

**Prerequisites:** Your inventory, read access to an authorized sandbox organization's audit log, and Copilot CLI in a sandbox environment.

1. Add Last edited and Last signal columns to the inventory.
2. Fill Last edited from Git history for each file.
3. Fill Last signal from audit log entries, references or `/instructions` output, as applicable.
4. Place each row in the four-quadrant grid of signal versus edit recency.
5. Draft owner review requests for rows with no recent signal and no recent edit.

**Expected result:** A prioritized list of candidates for owner review, without any deletion.

<details>
<summary>Model answer</summary>

Old rows without signals go to owners first, but the absence of a signal is not proof of disuse, especially for instructions. Content checks, such as referenced commands or paths that no longer exist, are the strongest staleness evidence.

</details>
