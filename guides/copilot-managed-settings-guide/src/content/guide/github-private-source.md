---
title: Set up the repository source
section: Server-Managed Deployment
order: 6
description: Host managed-settings.json in a protected .github-private repository and confirm validation.
verified: "2026-11-27"
diagram: github-private-source
checks:
  - question: Where does the server-managed settings file live?
    answer: At `copilot/managed-settings.json` on the default branch of the `.github-private` repository in the designated organization.
  - question: Does a user need read access to `.github-private` to receive its managed settings?
    answer: No. Settings apply to users licensed by the enterprise or its organizations even without repository access.
  - question: What does an empty Copilot settings validation section mean?
    answer: The section is hidden when there are no validation issues.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/copilot-business-only
  - https://github.blog/changelog/2026-07-01-enterprise-managed-settings-json-is-generally-available/
---

## What you will learn

- Configure the `.github-private` source and its access controls.
- Use GitHub-side validation and the configuration summary after a change.

## The repository is the source

[Getting started](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started) describes a server-managed deployment: create a `.github-private` repository in a designated organization, add `copilot/managed-settings.json` and commit it to the default branch. An administrator selects that organization under **AI controls > Agents > Configuration source**, and the **Configuration summary** shows what GitHub read. The [GA changelog](https://github.blog/changelog/2026-07-01-enterprise-managed-settings-json-is-generally-available/) notes the source organization can also be set through the API.

Settings apply to every user licensed by the enterprise or its organizations, whether or not they can read the repository. **Recommended:** use internal visibility and restrict edits to administrators and AI managers. The [repository setup page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo) suggests rulesets for protection, with other users proposing changes through pull requests.

Server-managed settings need an organization. An enterprise with [Copilot Business only and no organizations](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/copilot-business-only) needs an organization and a GitHub Enterprise license, or can use MDM or file delivery instead.

## Validate after every change

Under **AI controls > Agents**, **Copilot settings validation** lists errors and warnings with the file and JSON path. The section is hidden when there are no issues. If validation is unavailable, existing settings still apply. Clients pick up changes within about an hour; restarting or signing in again refreshes immediately.

## Worked example: a silent typo

**Hypothetical starting state:** An administrator commits a file with `"permisions"` misspelled. Clients show no change after an hour.

The administrator opens **Copilot settings validation** and reviews any issue listed with its file and JSON path. Whether or not the validator flags this case, the **Configuration summary** and a test client show the intended key is missing. They fix it in a pull request and check both again.

**Outcome:** The fix lands through review, and the team adds "check validation" to its merge checklist.

## Practice: stand up a sandbox source

**Prerequisites:** An authorized sandbox enterprise or organization where you may create `.github-private`. Do not change production settings.

1. Create `.github-private` with internal visibility and a ruleset requiring pull-request review on the default branch.
2. Add `copilot/managed-settings.json` containing `{ "model": "auto" }` and merge it.
3. Select the organization as the configuration source and open **Configuration summary**.
4. Merge a deliberate typo in the sandbox, then read the validation output and configuration summary. Revert it.

**Expected result:** You can name where the source is configured, where validation appears and how long clients may take to refresh.

<details>
<summary>Model answer</summary>

Configuration source and summary are under **AI controls > Agents**. Any issue the validator reports appears in **Copilot settings validation** with its file and JSON path, and the section is hidden once no issues remain. The configuration summary shows what GitHub read. A test client refreshes within about an hour or immediately after restart or sign-in.

</details>
