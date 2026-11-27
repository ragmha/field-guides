---
title: Audit evidence map summary
section: Audit Evidence Map
order: 4
description: Know which source can answer a question, and which access method exposes it.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/accessing-the-audit-log-for-your-enterprise
---

## Key Takeaways

- The audit log covers Copilot plan, policy and license changes plus agent activity on GitHub; it does not include local client prompts.
- `action:copilot` finds plan and policy events; `actor:Copilot` finds agent activity.
- The web interface, exports and API cover 180 days; streams are retained by your destination.
- API request events are available only through streaming, and Git events are kept for seven days.
- A missing record can mean a coverage gap, not proof that nothing happened.
