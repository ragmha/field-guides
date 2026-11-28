---
title: Prove what an endpoint enforces
section: Verification and Drift
order: 17
description: Check delivery, effective values and behavior, then watch for drift.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/get-started
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://code.visualstudio.com/docs/enterprise/troubleshooting
---

## What you will learn

A committed file is not evidence that an endpoint enforces it. This part covers GitHub-side validation, client-side diagnostics and behavior tests, then the ways endpoints drift from intent: stale caches, old clients, license sources and failed refreshes.
