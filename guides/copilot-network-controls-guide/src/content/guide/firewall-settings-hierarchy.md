---
title: Layer firewall settings
section: Agent Firewall
order: 18
description: Combine organization defaults, locked settings and repository rules for the agent firewall.
verified: "2026-11-27"
diagram: firewall-settings-hierarchy
checks:
  - question: Does a domain rule for packages.contoso.corp allow prod.packages.contoso.corp?
    answer: Yes. A domain rule also allows its subdomains, but not a sibling such as artifacts.contoso.corp.
  - question: Can a repository administrator delete an organization custom allowlist entry?
    answer: No. Organization entries apply to all repositories and combine with any repository rules.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
---

## What you will learn

- Explain the organization and repository firewall settings.
- Write domain and URL allowlist rules with the intended scope.

## Settings and inheritance

The [firewall how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) places settings on an **Internet access** tab, with separate sections for **Copilot in the cloud** and **Copilot code review**. The firewall is enabled by default, always allows GitHub hosts and turns on a recommended allowlist by default. That list covers common needs such as container registries, certificate authority hosts and language package registries.

At organization level, under **Settings > Copilot > Internet access**, owners choose:

- **Enable firewall**: Enabled, Disabled or Let repositories decide (the default).
- **Recommended allowlist**: Enabled, Disabled or Let repositories decide.
- **Allow repository custom rules**: Enabled (the default) or Disabled.
- **Organization custom allowlist**: entries that apply to every repository and cannot be removed at repository level. They combine with repository rules.

Repository administrators see the same settings; those the organization has decided are locked. Earlier configurations stored as Actions variables are preserved. [Cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) follow the same firewall settings.

Rules come in two forms. A domain rule such as `packages.contoso.corp` also allows its subdomains, so `prod.packages.contoso.corp` is allowed while `artifacts.contoso.corp` is not. A URL rule is limited to its scheme, host and path, plus descendant paths.

Recommended: enforce the firewall and the recommended allowlist at organization level, keep shared internal hosts in the organization list and allow repository rules only where teams have a reviewed need.

## Worked example: one internal registry

**Hypothetical starting state:** The Pilot House organization leaves every setting at Let repositories decide. Three repositories have each added `registry.pilothouse.corp` with different scopes, and one has disabled the firewall.

Organization owners set the firewall and recommended allowlist to Enabled, add `registry.pilothouse.corp` to the organization custom allowlist and keep repository custom rules enabled for now. The repository that disabled the firewall can no longer do so.

**Outcome:** Every repository gets the same registry access and the firewall cannot be turned off locally. Repository rules remain for project-specific hosts and are reviewed quarterly.

## Practice: write scoped rules

**Prerequisites:** The rule syntax above. No settings need to be changed.

1. Write a rule that allows `docs.contoso.corp` and its subdomains.
2. Write a rule that allows only `https://files.contoso.corp/builds/` and paths beneath it.
3. Choose organization settings that stop repositories disabling the firewall.
4. In an authorized sandbox organization, apply the settings and confirm the repository view shows them locked. Without a sandbox, compare with the model answer.

**Expected result:** One domain rule, one URL rule and an organization setting that locks the firewall on.

<details>
<summary>Model answer</summary>

Domain rule: `docs.contoso.corp`. URL rule: `https://files.contoso.corp/builds/`, which does not allow other paths on that host. Organization: **Enable firewall** set to Enabled, not Let repositories decide.

</details>
