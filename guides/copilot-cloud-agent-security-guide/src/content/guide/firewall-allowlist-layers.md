---
title: Layer organization and repository allowlists
section: Agent Firewall
order: 19
description: Decide which firewall settings the organization locks and how custom allowlists combine.
verified: "2026-11-27"
diagram: firewall-allowlist-layers
checks:
  - question: When can a repository change its own firewall setting?
    answer: Only when the organization sets that option to "Let repositories decide," which is the default. Enabled or Disabled at the organization level locks the repository setting.
  - question: Does a domain entry in the custom allowlist include subdomains?
    answer: Yes. A domain entry allows the domain and its subdomains. A URL entry matches the scheme, host and path, plus paths beneath it.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Read the organization firewall settings and their defaults.
- Predict when a repository setting is locked.
- Choose between domain and URL entries for a custom allowlist.

## Organization settings come first

The [enterprise management page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) notes that organization owners configure the firewall. The [firewall page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-the-firewall) describes an organization **Internet access** page with separate sections for "Copilot in the cloud" and "Copilot code review." The cloud section has these settings:

- **Enable firewall:** Enabled, Disabled, or Let repositories decide (default).
- **Recommended allowlist:** the same three options.
- **Allow repository custom rules:** Enabled (default) or Disabled.
- **Organization custom allowlist:** entries that apply to every repository, cannot be deleted at the repository level, and combine with repository rules.

A repository setting is locked unless the organization chooses "Let repositories decide." Repository custom rules work only while the organization allows them. A domain entry includes its subdomains. A URL entry matches the scheme, host and path, and anything beneath that path.

**Recommended:** Prefer URL entries when a package source has a stable path. Domain entries are broader and include every subdomain.

## Worked example: locking the firewall on

**Hypothetical starting state:** The fictional Tidewater Logistics organization leaves every setting at its default. One repository admin disabled the firewall during a test and never restored it.

The security team sets **Enable firewall** to Enabled at the organization level, which locks the repository setting. They keep the recommended allowlist on and add an internal package mirror to the organization allowlist as a URL entry. They leave repository custom rules enabled so teams can add narrow entries with a review.

**Outcome:** No repository can turn the firewall off. The mirror is allowed everywhere, and repository rules add to the organization list rather than replacing it.

## Practice: predict effective settings

**Prerequisites:** A local note and fictional organization settings: Enable firewall is "Let repositories decide"; recommended allowlist is Enabled; repository custom rules are Disabled; the organization allowlist contains `https://pkgs.example.com/npm/`.

1. A repository admin disables the firewall. Is it disabled for that repository?
2. The admin adds `cdn.example.net` as a repository rule. Does it apply?
3. Does `https://pkgs.example.com/npm/left-pad` match the organization entry? Does `https://pkgs.example.com/pypi/`?
4. Work on paper or in an authorized sandbox organization only.

**Expected result:** An answer to each question, tied to the setting that decides it.

<details>
<summary>Model answer</summary>

1. Yes, because the organization lets repositories decide on the firewall. 2. No, because repository custom rules are disabled. 3. The `npm/left-pad` URL matches because it is beneath the entry's path; the `pypi/` URL does not. Recheck the settings page, because defaults and names can change.

</details>
