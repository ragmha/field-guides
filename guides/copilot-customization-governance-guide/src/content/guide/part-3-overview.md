---
title: How are customizations versioned and released?
section: Versioning & Release
order: 9
description: Use Git history, staged agent releases, pinned skills and marketplace versions.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/custom-agents-configuration
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills
---

## What you will learn

Most customizations are files in Git, so their version is a commit. That is useful for audit and rollback, but it also means a merge to the default branch is a release. This part makes the release step deliberate.

The first lesson follows the documented path for testing a custom agent privately before releasing it to an organization or enterprise, and explains how agent versions are pinned per task. The second lesson covers skills installed from other repositories with `gh skill`, which is in **public preview**, and plugin versions declared in marketplaces.
