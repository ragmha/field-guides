---
title: Build security evidence
section: Security and assurance
order: 6
description: Combine enterprise controls, audit evidence and an explicit assessment of residual risk.
verified: "2026-11-13"
diagram: security-layers
additionalDiagrams:
  - audit-flow
  - assurance-evidence
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency
  - https://github.com/customer-terms/github-data-protection-agreement
---

## What you will learn

- Obtain assurance evidence and verify its scope.
- Stream audit events to a destination you control.
- Identify controls that need validation on GHE.com.

## Evidence is more than a badge

Enterprise owners can access [compliance reports](https://docs.github.com/en/enterprise-cloud@latest/admin/overview/accessing-compliance-reports-for-your-enterprise). **Guide advice:** retain the report and its scope, review exceptions, and document who accepted any remaining risk. The [DPA](https://github.com/customer-terms/github-data-protection-agreement) describes audit and information rights; your signed agreement governs.

## Observe activity

Plan [audit log streaming](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) before migration. The destination is your choice and part of your data perimeter. Test delivery, retention, access and alert ownership; verify that your chosen destination and authentication method are supported in the current [feature overview](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/feature-overview-for-github-enterprise-cloud-with-data-residency).

## Layer controls

**Guide advice:** combine IdP policies, least-privilege access, repository rules, secret protection, code scanning, review of integrations, and an incident response runbook. Availability can differ between deployments; check the feature overview and test each control on representative repositories. Avoid treating an individual feature or certification as proof that the complete system is secure.

## Worked example: an audit request

**Hypothetical scenario:** A security reviewer asks for evidence that privileged changes are visible. The platform team supplies the applicable report's scope, an audit event from a test policy change, evidence that the event reached its chosen log destination, and the owner of the alert.
