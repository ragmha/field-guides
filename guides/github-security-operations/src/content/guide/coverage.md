---
title: Prove coverage before reading findings
section: Coverage before findings
order: 3
description: Use security configurations and security overview to confirm what is scanned before interpreting the queue.
verified: "2026-11-27"
diagram: coverage-layers
sources:
  - https://docs.github.com/en/code-security/concepts/security-at-scale/about-security-configurations
  - https://docs.github.com/en/code-security/how-tos/secure-at-scale/configure-organization-security/establish-complete-coverage/apply-custom-configuration
  - https://docs.github.com/en/code-security/reference/security-at-scale/configuration-enforcement
  - https://docs.github.com/en/code-security/concepts/security-at-scale/security-overview
  - https://docs.github.com/en/code-security/reference/permissions/security-overview
---

## What you will learn

- Explain why an empty alert view is not evidence of security.
- Use security configurations to apply and enforce features consistently.
- Check who can see security overview data before trusting a report.

## An empty queue can mean four things

When a repository shows no alerts, it could be clean. It could also mean the feature is not enabled, the results are stale, or the viewer lacks permission to see them. GitHub's security overview documentation notes that a repository with no alerts may simply not have the feature enabled. Always report coverage gaps separately from zero findings.

Check four layers in order:

1. **Scope.** Is the repository in the agreed population for this alert class?
2. **Enablement.** Is the relevant feature enabled and configured?
3. **Freshness.** Has a scan or update run recently on the default branch?
4. **Visibility.** Can the person reading the report see this repository's alerts?

## Apply features with security configurations

Security configurations apply a set of repository-level security features across many repositories. A repository attached to a configuration has a managed relationship with it, which can change: a repository administrator can override settings that are not enforced, an administrator can detach the configuration, or the initial attachment can fail. Track configuration status, not just intent.

Plan for these behaviors:

- **Defaults affect new repositories.** An organization's default configuration applies to new repositories. Existing repositories and repositories transferred into the organization need a configuration applied.
- **Enforcement limits overrides.** Enforcing a configuration prevents repository owners from changing features it enables or disables. Settings left "not set" are not enforced.
- **Enforcement has edge cases.** A REST API change to an enforced feature can appear to succeed without changing enablement. Enforcement can also be interrupted, for example if required GitHub Actions are unavailable. Recheck coverage rather than assuming it.
- **Licensing.** Paid features in a configuration consume licenses. The apply flow shows the license impact; agree who approves it.

## Read coverage in security overview

Security overview includes views for coverage and enablement as well as alerts. Use the coverage view to list repositories where an expected feature is off, and treat each gap as an owned task.

Visibility depends on role. Organization owners and security managers can see all repositories. Other members see only repositories their access allows, and the alert types they see depend on their repository role. A report produced by someone without full visibility silently under-counts. State who produced each report and under which role.

## Coverage is a measure, not a project

Coverage drifts as repositories are created, transferred, archived or reconfigured. Review coverage at the start of every operating review, before discussing alert counts.
