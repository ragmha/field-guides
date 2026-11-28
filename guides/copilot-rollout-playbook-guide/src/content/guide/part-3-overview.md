---
title: Set the baseline before enabling
section: Baseline Policies
order: 9
description: Configure policies, code guardrails and an exception path before any developer gets access.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards
---

## What you will learn

GitHub's [governance posture tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) warns that restrictive policies can push developers toward unmanaged third-party tools, while the [codebase standards tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/maintain-codebase-standards) shows how review and scanning guardrails protect code whoever writes it. This part combines both into a baseline, then adds a way to handle the requests that do not fit it.

- Order the pre-enable steps and choose a permissive-by-default baseline.
- Run exceptions as scoped, expiring grants with an audit trail.

For how enterprise and organization settings interact, see the [policy conflicts deep dive](/field-guides/copilot-policy-conflicts-guide/) and the [control map](/field-guides/copilot-control-map-guide/).
