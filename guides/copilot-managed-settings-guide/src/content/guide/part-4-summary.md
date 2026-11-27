---
title: Precedence summary
section: Precedence and Composition
order: 16
description: Override order and restrictive exceptions.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
---

## Key Takeaways

- Default order: MDM > server-managed > file-based > user settings.
- `sandbox`, `permissions.deny/ask/allow` and `strictPluginOnlyCustomization` compose in the most restrictive direction.
- MCP allowlists intersect across sources; denylists are a union.
- The highest-precedence source that supplies `telemetry` owns the whole object.
- In VS Code, an enterprise-managed setting beats an overlapping VS Code device policy; values are not merged.
