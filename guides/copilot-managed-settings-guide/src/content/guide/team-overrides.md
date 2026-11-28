---
title: Override settings for teams
section: Server-Managed Deployment
order: 7
description: Mark keys overridable, map team files and predict how multiple team memberships combine.
verified: "2026-11-27"
diagram: team-overrides
checks:
  - question: Which file maps team settings files to enterprise team slugs?
    answer: "`copilot/team-mappings.json`. Its keys are file names under `copilot/teams/` and its values are arrays of team slugs."
  - question: Can a team file change a key the enterprise did not mark `overridable`?
    answer: Not in general. Team files supply overridable keys, more restrictive `autoTier` values and additive `enabledPlugins`; other keys stay governed by the enterprise default.
  - question: How do settings combine for a user in two teams with different overrides?
    answer: Least restrictive value for most keys, applied beneath enterprise settings. `strictPluginOnlyCustomization` restrictions are combined, so any team's restriction stays.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
---

## What you will learn

- Configure an overridable default, a team mapping and a team file.
- Predict the effective value for a user in several teams.

## Three files

[Team overrides](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams) work only with server-managed deployment:

1. `copilot/managed-settings.json` marks a key eligible with `{ "overridable": VALUE }`. `VALUE` stays the default for everyone else.
2. `copilot/team-mappings.json` maps a file name to team slugs, such as `{ "no-auto.json": ["special-team"] }`.
3. `copilot/teams/no-auto.json` supplies the replacement, such as `{ "model": "unmanaged" }`. `"unmanaged"` removes the control at this layer.

Overridable keys include `model`, `autoTier`, `fusionTier`, `disableBypassPermissionsMode`, the permission rule lists, the MCP lists, the marketplace keys, `strictPluginOnlyCustomization` and `sandbox`. `enabledPlugins` is additive: teams add plugins on top of the baseline.

A team value replaces the whole overridable default, so include every restriction that should remain. For `sandbox`, the [reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) requires `overridable` to wrap the entire object; sub-properties cannot have their own wrapper.

## Multiple teams

If a user is in several mapped teams, GitHub combines their team files using the least restrictive value for most keys, then applies them beneath the enterprise settings. `strictPluginOnlyCustomization` is the exception: a category restricted by any matching team stays restricted. Device-managed restrictions also remain in effect.

## Worked example: an MCP development team

**Hypothetical starting state:** The enterprise restricts `["mcp", "extensions"]` through `strictPluginOnlyCustomization` for everyone. An MCP developer team needs to test standalone servers.

Following the documented pattern, the administrator makes the default `{ "overridable": ["mcp", "extensions"] }`, maps `mcp-development.json` to `mcp-developers`, and sets that file to `["extensions"]`.

**Outcome:** Team members can use standalone MCP configurations if other policies permit them; non-members cannot; extensions remain blocked for both. A developer also in another team that restricts `mcp` stays restricted.

## Practice: pilot one override

**Prerequisites:** The sandbox `.github-private` source from the previous lesson, a sandbox enterprise team and two test accounts. Do not change production settings.

1. Set `"model": { "overridable": "auto" }` in `managed-settings.json`.
2. Map `no-auto.json` to your test team and set `{ "model": "unmanaged" }` in it.
3. Merge, then check **Copilot settings validation**.
4. On a supported client, start a new conversation with a team member and a non-member.

**Expected result:** The non-member's new conversations start in auto mode; the team member's do not.

<details>
<summary>Model answer</summary>

Validation covers all three files, including team files referenced in the mapping. After about an hour, or a restart, the non-member starts in auto and the member does not. Record both observations; one account alone does not prove the mapping.

</details>
