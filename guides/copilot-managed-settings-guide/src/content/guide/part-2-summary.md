---
title: Server-managed summary
section: Server-Managed Deployment
order: 8
description: Repository source, validation and team overrides.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/create-github-private-repo
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/override-settings-for-teams
---

## Key Takeaways

- Server-managed settings live in `copilot/managed-settings.json` on the default branch of `.github-private`.
- They apply to users licensed by the enterprise or its organizations, even without repository access.
- Check **Copilot settings validation** under **AI controls > Agents** after each change.
- Team overrides need `overridable` keys, `team-mappings.json` and files under `copilot/teams/`.
- Multiple team files combine least restrictive for most keys, beneath enterprise settings.
