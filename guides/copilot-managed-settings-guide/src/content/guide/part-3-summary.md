---
title: Device deployment summary
section: Device Deployment
order: 12
description: Native MDM values and administrator-deployed files.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
---

## Key Takeaways

- Windows MDM uses `REG_SZ` values under `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot`.
- macOS MDM uses forced managed preferences in the `com.github.copilot` domain; Linux has no native MDM.
- Native MDM values are strings with dot-separated keys; booleans, arrays and objects are JSON text.
- Managed files live at fixed per-OS paths; the CLI on macOS and Linux needs a root-owned, non-writable regular file.
- MDM changes are picked up hourly; file changes need a client restart.
