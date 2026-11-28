---
title: Govern Copilot work that starts on its own
section: Course index
order: 0
description: Make scheduled and event-driven Copilot agent work traceable, bounded, affordable and stoppable.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
---

This independent deep dive is for organization owners, repository administrators, platform engineers and security reviewers who are responsible for Copilot agent work that starts without a person at the keyboard. It covers Copilot automations, which run Copilot cloud agent on a schedule, in response to repository events or through the API, as well as related API, assignment and GitHub Actions entry points. Six parts cover triggers, identity, permissions, cost and rate limits, review gates and kill switches, and audit and change control. For the broader governance picture, start with the [Copilot governance course](/field-guides/copilot-governance-guide/).

Each part's summary has a scored quiz. Answer every question correctly to unlock the next part; you can retry without penalty. Progress is stored in this browser, not in an account. JavaScript and browser storage are required for progression. The quiz is a learning aid, not a certification or tamper-proof assessment.

The examples do not change production settings. Confirm current documentation, your plan, permissions and your organization's approval process before acting. Advice is labeled as such; product behavior is linked to GitHub's sources. Several API surfaces covered here are in **public preview** and may change.

All teams, repositories and incidents in this course are hypothetical. See the [sources and status register](/sources/) for the documents reviewed and release-status boundaries.
