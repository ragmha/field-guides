---
title: Which source wins?
section: Precedence and Composition
order: 13
description: Predict the effective value when several sources set the same key.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://code.visualstudio.com/docs/enterprise/manage-ai-settings
---

## What you will learn

When settings arrive from more than one source, clients apply a fixed order: MDM, then server-managed, then file-based, then user settings. A small set of keys does not follow simple override; they combine in the most restrictive direction. This part shows how to predict an effective value before you test it.
