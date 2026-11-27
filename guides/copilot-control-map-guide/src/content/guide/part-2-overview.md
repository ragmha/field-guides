---
title: Platform policy layers overview
section: Platform Policy Layers
order: 5
description: Enterprise and organization policies decide availability; repository controls decide what lands.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
---

## What you will learn

The platform layers live in GitHub itself. [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) and model settings are set at the enterprise and organization levels and decide whether a feature or model is available to a seat holder. Repository-level controls, such as rulesets, CODEOWNERS, Actions settings and the cloud agent firewall, decide what an agent can change and how its work is reviewed. The [cloud agent guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) shows how these combine.

- Read the enterprise-to-organization delegation chain and its conflict rules.
- Identify which repository controls apply to Copilot and who can change them.
- Know which sibling deep dives cover conflicts, models and the cloud agent in depth.
