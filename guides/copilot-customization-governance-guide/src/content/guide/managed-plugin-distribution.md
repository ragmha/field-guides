---
title: Distribute plugins through marketplaces
section: Distribution
order: 15
description: Separate available, installed and enabled plugins, and know when repository defaults or managed settings apply.
verified: "2026-11-27"
diagram: managed-plugin-distribution
checks:
  - question: Does adding a marketplace install its plugins?
    answer: No. It makes plugins available to browse; installing adds a plugin and enabling makes its components available in sessions.
  - question: Can contributors override plugin defaults declared in .github/copilot/settings.json?
    answer: Yes, locally on supported surfaces; Copilot in the cloud uses the repository settings without a local override.
  - question: Does an approved marketplace guarantee that its plugins are safe?
    answer: No. GitHub describes it as a distribution control, not a safety guarantee.
sources:
  - https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
---

## What you will learn

- Distinguish the available, installed and enabled plugin states.
- Decide whether a repository default or an enterprise requirement is the right distribution control.

## Three states and three configuration sources

The [plugin and marketplace reference](https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference) separates three states: adding a marketplace makes its plugins available to browse, installing adds a plugin to a surface, and enabling makes its components available in sessions.

[Creating and sharing a plugin marketplace](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces) describes the catalog file `.github/plugin/marketplace.json`, asks maintainers to update CODEOWNERS and templates, and says to review plugin changes as shared agent infrastructure. People need read access to the marketplace repository; organization membership alone does not guarantee access to a private one. It lists three sharing routes:

- Personal: add the marketplace in a client.
- Repository: declare defaults in `.github/copilot/settings.json`. Contributors can override locally on supported surfaces; Copilot in the cloud uses the repository settings.
- Enterprise: use managed settings to make marketplaces available and require or block plugins.

[Managing plugin marketplaces and plugins](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins) adds that an approved marketplace is a distribution control, not a guarantee that its plugins are safe. Managed settings keys and deployment are covered by the sibling managed settings and MCP governance courses.

Guide advice: use repository defaults for convenience and managed settings only for genuine requirements or blocks, because members cannot opt out of managed choices.

## Worked example: a default mistaken for a control

**Hypothetical starting state:** The fictional Fernhill Insurance security team declares a required review plugin in `.github/copilot/settings.json` and reports it as mandatory.

A developer shows the plugin can be disabled locally. The team reclassifies the repository default as a convenience, and raises a request with enterprise administrators to evaluate a managed requirement.

**Outcome:** Reports now distinguish recommended defaults from enforced settings, and the plugin's marketplace has a CODEOWNERS entry.

## Practice: classify plugin distribution

**Prerequisites:** Read access to an authorized sandbox repository and a plugin-capable client such as Copilot CLI or VS Code in a sandbox profile.

1. Add a test marketplace in the sandbox client and confirm its plugins are listed as available but not installed.
2. Install one plugin and confirm it is installed; enable it and confirm it is active in a new session.
3. Read the sandbox repository's `.github/copilot/settings.json`, if present, and list any declared defaults.
4. For each plugin in your inventory, record whether it is personal, a repository default or an enterprise requirement.
5. Uninstall the test plugin and remove the test marketplace.

**Expected result:** A table that shows each plugin's state and configuration source, with the sandbox client restored.

<details>
<summary>Model answer</summary>

Most plugins are personal or repository defaults. Only enterprise managed settings can require or block a plugin. Any report that calls a repository default mandatory should be corrected.

</details>
