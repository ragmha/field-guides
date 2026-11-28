---
title: Sources and verification
section: Appendix
order: 12
description: Primary GitHub documentation behind the course and the boundaries of this independent guidance.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview
  - https://docs.github.com/en/code-security/concepts/security-at-scale/audit-security-alerts
  - https://learn.microsoft.com/en-us/training/paths/github-advanced-security/
---

## What you will learn

- Find the primary product documentation behind each chapter.
- Distinguish product behavior from the operating recommendations in this course.
- Review the source set when GitHub updates its documentation.

### Coverage and visibility

- [Security overview](https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview) — views, scope and coverage.
- [About security configurations](https://docs.github.com/en/code-security/concepts/security-at-scale/about-security-configurations) — applying features at scale.
- [Apply a custom security configuration](https://docs.github.com/en/code-security/how-tos/secure-at-scale/configure-organization-security/establish-complete-coverage/apply-custom-configuration) — defaults, existing repositories and license impact.
- [Configuration enforcement](https://docs.github.com/en/code-security/reference/security-at-scale/configuration-enforcement) — enforcement behavior and edge cases.
- [Security overview permissions](https://docs.github.com/en/code-security/reference/permissions/security-overview) — who can see which data.
- [Security overview filters](https://docs.github.com/en/code-security/reference/security-at-scale/overview-dashboard-filters) — team, property and assignee filters.
- [Security overview metrics](https://docs.github.com/en/code-security/reference/security-at-scale/overview-dashboard-metrics) — dashboard metric definitions.
- [Export security overview data](https://docs.github.com/en/code-security/how-tos/view-and-interpret-data/analyze-organization-data/export-data) — CSV exports.

### Code scanning

- [Code scanning alerts](https://docs.github.com/en/code-security/concepts/code-scanning/code-scanning-alerts) — severity and security severity.
- [Manage code scanning alerts](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts) — reviewing, assigning and triaging.
- [Triage alerts in pull requests](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/triage-alerts-in-pull-requests) — check failure thresholds.
- [Resolve code scanning alerts](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-code-scanning-alerts/resolve-alerts) — fixes, Copilot Autofix and dismissal.
- [Code scanning REST API](https://docs.github.com/en/rest/code-scanning/code-scanning) — dismissal reasons and comments.
- [About security campaigns](https://docs.github.com/en/code-security/concepts/security-at-scale/about-security-campaigns) — time-boxed remediation.
- [Merge protection](https://docs.github.com/en/code-security/concepts/code-scanning/merge-protection) — blocking merges with rulesets.

### Secret scanning

- [Resolve secret scanning alerts](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/resolving-alerts) — compromise guidance and manual closure.
- [Monitor secret scanning alerts](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/monitoring-alerts) — notification recipients.
- [Secret scanning REST API](https://docs.github.com/en/rest/secret-scanning/secret-scanning) — resolution values.
- [Validity checks](https://docs.github.com/en/code-security/concepts/secret-security/validity-checks) — active and inactive secrets.
- [Push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) — bypass reasons and resulting alerts.
- [Delegated bypass](https://docs.github.com/en/code-security/concepts/secret-security/delegated-bypass) — reviewed bypass requests.

### Dependencies

- [View and update Dependabot alerts](https://docs.github.com/en/code-security/how-tos/manage-security-alerts/viewing-and-updating-dependabot-alerts) — reviewing and dismissing.
- [Dependabot alerts REST API](https://docs.github.com/en/rest/dependabot/alerts) — dismissal reasons.
- [Dependabot security updates](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates) — update pull requests and grouping.
- [Dependabot auto-triage rules](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-auto-triage-rules) — presets and custom rules.
- [Dependabot alert filters](https://docs.github.com/en/code-security/reference/supply-chain-security/dependabot-alerts-filters) — EPSS and other filters.
- [Configure Dependabot notifications](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/manage-your-dependency-security/configure-dependabot-notifications) — default recipients.
- [Dependency review](https://docs.github.com/en/code-security/concepts/supply-chain-security/dependency-review) — preventing vulnerable additions.

### Governance and evidence

- [Delegated alert dismissal](https://docs.github.com/en/code-security/concepts/security-at-scale/delegated-alert-dismissal) — requesting and reviewing dismissals.
- [Audit security alerts](https://docs.github.com/en/code-security/concepts/security-at-scale/audit-security-alerts) — audit-log coverage, timelines and webhooks.

### Microsoft Learn

- [GitHub Advanced Security](https://learn.microsoft.com/en-us/training/paths/github-advanced-security/)
- [GitHub Advanced Security (part 2)](https://learn.microsoft.com/en-us/training/paths/github-advanced-security-2/)

## Scope and review

This independent course adds cross-team operating practices to product-focused learning. It is not legal advice, an incident-response plan or a claim that a feature is enabled. Feature availability depends on plan, license, repository visibility and GitHub version; confirm it against current official documentation and your organization's approved policies. Sources were checked on **27 November 2026**; review them again before relying on this material.
