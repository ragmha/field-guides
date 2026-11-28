---
title: Triggers and entry points summary
section: Triggers & Entry Points
order: 4
description: Keep a complete, classified register of everything that can start agent work.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
---

## Key Takeaways

- Automations start from schedules, repository events, other automation runs or the API. They are limited to private and internal repositories.
- Scheduled runs have no event actor and can change any resource in the repository, whatever the trigger write scope says.
- By default, event triggers ignore users without write access. Record any automation that opts out.
- API, issue assignment and Actions routes each have a distinct credential, identity and billing owner. Personal tokens tie the routine to one person.
- Several programmatic surfaces are in **public preview**. Track them as dependencies that may change.
