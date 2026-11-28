---
title: Retirement summary
section: Retirement
order: 24
description: Review staleness signals and the retirement sequence.
verified: "2026-11-27"
sources:
  - https://code.visualstudio.com/docs/agent-customization/migrate-customizations
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins
---

## Key Takeaways

- Staleness signals include references, CLI discovery lists, `actor:Copilot` audit log entries and skill invocation counts; [`totals_by_plugin` counts skill invocations only](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/manage-plugin-marketplaces-and-plugins).
- No signal proves disuse on its own; pair signals with owner review and content checks.
- Retire through announce, replace, remove and verify. In VS Code, [migrate prompt files to skills](https://code.visualstudio.com/docs/agent-customization/migrate-customizations) before the Local harness is removed by February 2027.
- Guide advice: review on a fixed cadence and after major tooling changes.

## Questions to discuss

- Which customizations reference tools or paths that no longer exist?
- Who approves retirement of a customization whose owner has left?
