---
title: Host settings on GitHub
section: Server-Managed Deployment
order: 5
description: Use a `.github-private` repository as the reviewed source of managed settings.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
---

## What you will learn

Server-managed deployment stores `copilot/managed-settings.json` in a `.github-private` repository in a designated organization. It is the default for most enterprises because changes go through commits and review, it reaches all supported clients including Copilot cloud agent, and it is the only method that supports enterprise team overrides.
