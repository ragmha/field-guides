---
title: Turn severity into priority
section: Triage and priority
order: 4
description: Combine product severity with exposure and service context to set an agreed priority.
verified: "2026-11-27"
diagram: triage-steps
sources:
  - https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning-alerts
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests
  - https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-alerts-filters
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts
---

## What you will learn

- Read the severity signals GitHub provides for each alert type.
- Apply four triage questions in a consistent order.
- Define response targets that teams can actually meet.

## Know what the labels mean

Severity labels are useful inputs, but they differ by alert type:

- **Code scanning** alerts have a severity of `Error`, `Warning` or `Note`. Security alerts from CodeQL also have a **security severity** of `Critical`, `High`, `Medium` or `Low`, derived from CVSS. When an alert has a security severity, GitHub displays and uses it in preference to the general severity.
- **Pull request checks** for code scanning fail by default for `error`, `critical` or `high` findings and succeed with lower severities shown as warnings or notes. Default setup lets you change which severities cause failure.
- **Dependabot** alerts carry the advisory's severity. Alert filters also support the EPSS score, an estimate of the probability of exploitation in the next 30 days, which can help order work within the same severity.

None of these labels knows whether the code is deployed, reachable or exposed in your environment. That is the triage owner's job.

## Four questions, in order

1. **Confirm.** Is the finding real and in scope? Inspect the evidence in the alert, the affected path and whether it is on the default branch.
2. **Assess exposure.** Is the code deployed? Is it reachable from untrusted input? Is the service public, and does it handle sensitive data?
3. **Set priority.** Map severity and exposure to an agreed priority and its response target.
4. **Record the decision.** Name the owner, the next action, the due date and the evidence that will close it.

Do not skip to step 3 because the label says `Critical`. A critical finding in unreachable test code and a medium finding in a public login path deserve different treatment.

## Agree response targets

Publish a small priority table and keep it stable. For example:

| Priority | Typical condition | Example target |
| --- | --- | --- |
| P0 | Credible active exposure or a usable leaked credential | Incident process, immediately |
| P1 | High severity and reachable in production | Days |
| P2 | High severity but limited exposure, or medium and reachable | Weeks |
| P3 | Low severity or not reachable | Next planned maintenance |

These targets are illustrative. Set your own with service owners, and record who may change a priority and why.

## Triage in pull requests

The cheapest time to fix a finding is before it merges. Encourage teams to resolve code scanning results in pull requests, and reserve backlog triage for findings that already exist on the default branch.
