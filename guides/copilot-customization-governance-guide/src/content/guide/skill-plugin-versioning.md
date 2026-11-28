---
title: Pin skills and plugin versions
section: Versioning & Release
order: 11
description: Install skills at a tag or commit, update them deliberately, and track plugin versions.
verified: "2026-11-27"
diagram: skill-plugin-versioning
checks:
  - question: How does gh skill update know where an installed skill came from?
    answer: It reads provenance metadata, such as the source repository, ref and tree SHA, written into the skill's frontmatter at install time.
  - question: Does GitHub verify skills you install from other repositories?
    answer: No. Skills are not verified and can contain prompt injection, so preview them before installing.
  - question: What does gh skill update do with a pinned skill?
    answer: It skips it, so pinned skills change only when you reinstall them deliberately.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills
  - https://docs.github.com/en/copilot/concepts/customizations/plugins
  - https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference
---

## What you will learn

- Use `gh skill` install, update and publish options to control skill versions.
- Distinguish Git-history versioning from marketplace plugin versions.

## Skills from other repositories

[Adding agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills) documents `gh skill`, which is in **public preview** and requires GitHub CLI 2.90.0 or later.

- `gh skill preview` shows a skill before installation. GitHub states that skills are not verified and may contain prompt injection, so preview them first.
- `gh skill install` accepts a tag or commit (`@TAG` or `@SHA`) or `--pin`; these options are mutually exclusive.
- Install writes provenance into the skill's frontmatter: source repository, ref and tree SHA. `gh skill update` uses it and skips pinned skills.
- `gh skill publish --dry-run` validates against the open skills specification and checks tag protection, secret scanning and code scanning.

The same page warns not to pre-approve shell or bash in `allowed-tools` unless the skill is reviewed and trusted.

## Plugins carry their own versions

[Plugins for GitHub Copilot](https://docs.github.com/en/copilot/concepts/customizations/plugins) contrasts manual configuration, versioned by Git history, with plugins, which are versioned by their marketplace. The [plugin and marketplace reference](https://docs.github.com/en/copilot/reference/plugin-and-marketplace-reference) shows that each `marketplace.json` entry can carry a version and source, and that plugin identifiers take the form `PLUGIN-NAME@MARKETPLACE-NAME`, so renaming a marketplace changes every identifier.

Recommended: pin third-party skills to a reviewed tag or SHA, and keep marketplace and plugin names stable.

## Worked example: an unpinned update

**Hypothetical starting state:** The fictional Tidewater Games team installed a community `release-notes` skill without a pin. A routine `gh skill update` pulls a new version that adds a shell step.

The team previews the change, sees the new step, and reinstalls the earlier tag with `--pin` after review. It adds a rule that third-party skills require a pinned install and a recorded tree SHA.

**Outcome:** Updates become a reviewed decision instead of a side effect, and the inventory shows the exact skill version in use.

## Practice: pin a sandbox skill

**Prerequisites:** GitHub CLI 2.90.0 or later in an authorized sandbox, and a sandbox repository you may modify.

1. Run `gh skill preview` on a skill from a public repository and read every file.
2. Install it into the sandbox repository at a specific tag or SHA.
3. Open the installed `SKILL.md` and record the provenance fields.
4. Run `gh skill update` and confirm the pinned skill is skipped.
5. Remove the skill if you do not intend to keep it.

**Expected result:** A recorded source, ref and tree SHA for the sandbox skill and confirmation that updates do not change it silently.

<details>
<summary>Model answer</summary>

The inventory row should list the skill name, source repository, ref and tree SHA, the reviewer and whether `allowed-tools` grants shell access. Because the command is in public preview, record the CLI version used.

</details>
