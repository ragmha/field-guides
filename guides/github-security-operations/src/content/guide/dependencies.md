---
title: Keep dependency risk moving
section: Dependency response
order: 7
description: Use Dependabot alerts, security updates, auto-triage rules and dependency review as one flow.
verified: "2026-11-27"
diagram: dependency-paths
sources:
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/viewing-and-updating-dependabot-alerts
  - https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates
  - https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-auto-triage-rules
  - https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review
  - https://docs.github.com/en/rest/dependabot/alerts
---

## What you will learn

- Distinguish Dependabot alerts from Dependabot security updates.
- Reduce noise with auto-triage rules without hiding real risk.
- Prevent new vulnerable dependencies with dependency review.

## Alerts and updates are different things

A **Dependabot alert** reports that a repository depends on a package with a known vulnerability. A **Dependabot security update** is a pull request that upgrades the dependency to a patched version when one exists. Security updates require the dependency graph and Dependabot alerts to be enabled. Merging the update closes the related alert.

Grouped security updates combine updates for an ecosystem into a single pull request, which reduces review overhead for repositories with many dependencies.

## A practical response flow

1. **Patch available and tests pass.** Merge the security update through the normal change process and confirm the alert closes.
2. **Patch available but breaks the build.** Assign an owner and due date for the upgrade work; do not dismiss the alert.
3. **No patch available.** Assess exposure, consider mitigations or alternative packages, and record the decision.
4. **Vulnerable code not used.** Dismiss with an accurate reason and comment.

The REST API's dismissal reasons are `fix_started`, `inaccurate`, `no_bandwidth`, `not_used` and `tolerable_risk`. Treat `no_bandwidth` and `tolerable_risk` as risk decisions that need an owner and review date, not as routine closures.

## Reduce noise with auto-triage rules

Auto-triage rules act on alerts automatically, and they run before notifications are sent:

- A GitHub preset dismisses low-impact alerts for development-scoped npm dependencies. It is on by default for public repositories and opt-in for private repositories.
- Custom rules can dismiss, reopen or snooze alerts that match criteria, and can control which alerts get security update pull requests. Their availability depends on repository visibility and licensing.

Auto-dismissed alerts carry a distinct close reason (`resolution:auto-dismiss`) and can be reopened. Review custom rules like code: who approved each rule, what it matches and when it was last checked.

## Prevent new vulnerable dependencies

Dependency review shows dependency changes and known vulnerabilities in a pull request. The dependency review action fails the check by default when a vulnerable package is introduced, but it blocks merging only when the check is required. Organization owners can require it across repositories with a ruleset. Pair prevention with the backlog flow above so new risk stops arriving while existing risk is reduced.
