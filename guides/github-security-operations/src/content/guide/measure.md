---
title: Measure what matters
section: Measure and improve
order: 10
description: Use balanced, scoped measures and GitHub's metrics without mistaking activity for security.
verified: "2026-11-27"
diagram: balanced-measures
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview
  - https://docs.github.com/en/code-security/reference/security-at-scale/overview-dashboard-metrics
  - https://docs.github.com/en/code-security/reference/permissions/security-overview
---

## What you will learn

- Pair responsiveness with coverage, backlog health and remediation quality.
- Interpret built-in security overview metrics with their scope in mind.
- Define measures so they can be compared over time.

## Four measures, read together

| Measure | Example question | Guardrail |
| --- | --- | --- |
| Coverage | Which in-scope repositories have each feature enabled and current? | Separate unknown or disabled coverage from zero findings. |
| Responsiveness | How long until a finding has an owner and a disposition? | State the time window; do not compare unlike alert classes. |
| Backlog health | How many findings are unowned or past their target, and how old are they? | Explain scope, severity mix and exclusions. |
| Quality | Are findings reopened, recurring or repeatedly deferred? | Sample evidence; status counts alone do not prove remediation. |

Each measure can be gamed alone. Responsiveness improves if you dismiss quickly; backlog shrinks if coverage drops. Read them together.

## Use the built-in metrics carefully

Security overview includes an overview dashboard with detection, remediation and prevention trends. Examples documented by GitHub include:

- The ratio of secrets blocked by push protection to those bypassed.
- Pull request alerts fixed with Copilot Autofix suggestions.
- Alert age, where metrics exclude alerts closed as false positives.

Know the scope: detection and remediation figures cover the default branch, and what you see depends on your role. Record both with every screenshot or export.

## Define before you compare

For every measure, write down the numerator, denominator, population, time window and collection date. Compare a team with its own history before comparing teams, and adjust for differences in repository count and alert mix.

## Avoid harmful reporting

Do not publish individual performance rankings from alert data. Alert counts reflect codebase age, language and coverage as much as effort. Use measures to improve the system, account for data limitations and follow your organization's privacy and reporting rules. Never present a closure count as proof of overall security.
