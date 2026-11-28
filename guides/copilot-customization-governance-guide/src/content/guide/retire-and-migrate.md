---
title: Retire and migrate customizations safely
section: Retirement
order: 23
description: Deprecate, migrate, remove and verify customizations, including prompt files moving to skills.
verified: "2026-11-27"
diagram: retire-and-migrate
checks:
  - question: Why does Visual Studio Code recommend converting prompt files to skills?
    answer: Prompt files run only in the Local harness, which is deprecated and scheduled for removal by February 2027.
  - question: Do original and migrated customizations synchronize after migration in VS Code?
    answer: No. They do not synchronize, so retire the original after verifying the migrated copy.
  - question: How do you retire an organization or enterprise custom agent?
    answer: Remove its profile from the agents directory of the governance repository in a reviewed pull request merged to the default branch.
sources:
  - https://code.visualstudio.com/docs/agent-customization/prompt-files
  - https://code.visualstudio.com/docs/agent-customization/migrate-customizations
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions
---

## What you will learn

- Follow a retirement sequence: announce, replace, remove and verify.
- Apply the documented prompt-file-to-skill migration in Visual Studio Code.

## Retirement is a change like any other

File-based customizations retire through a reviewed pull request that removes the file. Agent availability follows the default branch: [Testing and releasing custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents) shows that the `agents` directory of the governance repository controls organization or enterprise release, so removing the profile there and merging retires it. Organization instructions are a setting that stays active until changed or removed; see [Adding organization custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-organization-instructions).

## A documented migration: prompt files to skills

The [VS Code prompt files documentation](https://code.visualstudio.com/docs/agent-customization/prompt-files) states that prompt files run only in the Local harness, which is deprecated and will be removed by February 2027, and recommends converting them to skills. [Migrate customizations to the Copilot harness](https://code.visualstudio.com/docs/agent-customization/migrate-customizations) gives a migration list. It advises committing or backing up files first, choosing a representative task with a recorded expected result, and noting that original and migrated copies do not synchronize. The user customization migration feature is labeled **experimental**.

Recommended sequence:

1. Announce the deprecation in the inventory and to consumers, with a date.
2. Provide the replacement, such as a skill, and verify it with the representative task.
3. Remove the original in a reviewed pull request.
4. Verify discovery lists and references no longer show it, then close the inventory row.

## Worked example: retiring a prompt library

**Hypothetical starting state:** The fictional Orchard Robotics repository has 14 files in `.github/prompts/`. Nine are still used.

The team marks all 14 as deprecated in the inventory, converts the nine used prompts to skills under `.github/skills/`, tests each with a recorded task in a new session, and removes all 14 prompt files in one reviewed pull request.

**Outcome:** The repository has nine owned skills that work with the Copilot harness, five retired workflows, and no duplicate active copies.

## Practice: plan a retirement

**Prerequisites:** An authorized sandbox repository that contains at least one prompt file or obsolete instruction file, and VS Code in a sandbox profile.

1. Choose one customization and record a representative task and expected result.
2. Mark the row deprecated in your inventory with a target removal date.
3. Create the replacement, such as a skill, on a sandbox branch.
4. Run the representative task in a new session and compare results.
5. Open a draft pull request that removes the original, and list verification steps in its description.

**Expected result:** A tested replacement and a draft removal pull request, with the sandbox default branch unchanged.

<details>
<summary>Model answer</summary>

The pull request should name the owner, the replacement path, the representative task and result, and the post-merge verification: the old file no longer appears in discovery or references. Leave unused workflows retired rather than migrating them.

</details>
