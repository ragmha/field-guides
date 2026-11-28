---
title: Metric definitions summary
section: Metric Definitions
order: 8
description: State the rule, window and scope of every count you report.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
---

## Key Takeaways

- An active user has at least one user-initiated interaction; weekly and monthly report counts use trailing 7-day and 28-day windows.
- The dashboard's total active users covers licensed users active in the current calendar month, which differs from the trailing 28-day report count.
- Never sum daily active users to estimate a distinct count over a longer window.
- Acceptance rate is code acceptance activity divided by code generation activity.
- Adoption phases describe breadth of feature use on at least two distinct days in a trailing 28-day window, not volume or skill.
- Phases are recalculated daily, so cohort shifts can occur without any change in behavior.
