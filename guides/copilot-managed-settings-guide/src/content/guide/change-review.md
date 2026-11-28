---
title: Review and stage changes
section: Change Management and Rollback
order: 22
description: Run managed-settings changes through protected pull requests, validation and a team pilot.
verified: "2026-11-27"
diagram: change-review
checks:
  - question: Which repository controls can restrict who changes server-managed settings?
    answer: Repository rulesets and code owners on the `.github-private` repository, with others proposing changes by pull request.
  - question: Why pilot a change through an enterprise team before changing the enterprise default?
    answer: Team overrides let a mapped group receive the new value first, so you can verify a member and a non-member before widening scope.
  - question: What should a plugin-standards change require of developers before it takes effect for them?
    answer: Upgrading to a supported client; plugin standards are version-controlled settings that need supported clients.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
  - https://docs.github.com/en/copilot/concepts/enterprise/plugin-standards
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
  - https://code.visualstudio.com/docs/enterprise/policies
---

## What you will learn

- Protect the settings source with review controls.
- Stage a change through a team pilot before enterprise-wide rollout.

## Treat settings as code

The [repository setup page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo) notes that a repository-based approach lets users propose improvements by pull request, and lets you restrict changes with code owners and rulesets that target the `.github-private` branches and files. The [plugin standards concept](https://docs.github.com/en/copilot/concepts/enterprise/plugin-standards) likewise treats settings as version-controlled and reviewed through pull requests.

**Recommended:** A change request should state the key, the intended clients from the support matrix, the composition rule if any, the propagation time and the verification you will run.

## Stage before you widen

Server-managed team overrides offer a built-in pilot. Mark the key `overridable` with the current value as the default, map a pilot team to a file with the new value, and verify with one member and one non-member, as the [team overrides page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams) demonstrates. Then change the default.

For device delivery, the equivalent is an MDM assignment to a test device group. The [VS Code policies page](https://code.visualstudio.com/docs/enterprise/policies) recommends testing with a small group before broad deployment.

For plugin and marketplace changes, the [plugin management how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) advises verifying per client and session type, and migrating before retiring old controls. An approved marketplace is not a safety guarantee.

## Worked example: tightening the default model tier

**Hypothetical starting state:** The AI platform team wants `autoTier` locked to `"balance"` for everyone. Some teams rely on `"intelligence"`.

They open a pull request that maps a pilot team to a file containing `"autoTier": "balance"` (team files may set more restrictive `autoTier` values) and lists CLI and VS Code as the supported clients. A code owner approves; validation shows no issues.

**Outcome:** After a week of pilot evidence, a second pull request changes the default. Clients older than the `autoTier` minimum are flagged for upgrade first.

## Practice: write a change request

**Prerequisites:** The sandbox `.github-private` source and a sandbox team. Do not change production settings.

1. Draft a pull request that wraps the current `permissions.deny` rules in `overridable` and maps a pilot team to a file containing those rules plus one new rule.
2. List the supported clients and any client gaps.
3. Define the verification: member and non-member, one blocked and one permitted action.
4. Merge in the sandbox and record validation output.

**Expected result:** A reviewed pull request with a scoped pilot and a written verification plan.

<details>
<summary>Model answer</summary>

The request names the key, keeps every existing rule in the team file because a team value replaces the whole default, notes that `permissions.deny` is not supported in JetBrains or cloud Actions sessions, and lists the member/non-member tests. Validation shows no issues before the pilot starts.

</details>
