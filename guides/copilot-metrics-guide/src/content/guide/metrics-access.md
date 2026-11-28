---
title: Grant access to metrics deliberately
section: Metric Surfaces & Access
order: 3
description: Trace the policy, roles, permissions and token scopes that decide who can read Copilot metrics.
verified: "2026-11-27"
diagram: metrics-access
checks:
  - question: What must be true before the report endpoints return Copilot usage data?
    answer: The Copilot usage metrics policy must be enabled for the enterprise, and the caller must hold a role or fine-grained permission that allows viewing the metrics.
  - question: How can a person view one organization's metrics without becoming an organization owner?
    answer: Assign a custom organization role that includes the View organization Copilot metrics permission.
  - question: Which classic token scope does the organization report endpoint require?
    answer: The read:org scope.
sources:
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/view-usage-and-adoption
  - https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/permissions-of-custom-organization-roles
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies
---

## What you will learn

- Identify the policy that turns usage metrics on.
- Choose between owner roles, fine-grained permissions and tokens for each reader.

## Three gates in sequence

Access to Copilot metrics passes through three gates.

1. **Policy.** The Copilot usage metrics policy controls whether dashboards and report endpoints are available. The [REST reference](https://docs.github.com/en/rest/copilot/copilot-usage-metrics) requires it to be enabled for the enterprise. Enterprise owners set or delegate Copilot policies under **AI controls** ([manage enterprise policies](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-enterprise-policies)).
2. **Role or permission.** Enterprise reports are available to enterprise owners, billing managers and people with the fine-grained "View Enterprise Copilot Metrics" permission. Organization reports are available to organization owners and people with the "View organization Copilot metrics" permission, which can be assigned through a [custom organization role](https://docs.github.com/en/enterprise-cloud@latest/organizations/managing-peoples-access-to-your-organization-with-roles/permissions-of-custom-organization-roles). The [dashboard how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/view-usage-and-adoption) describes the same custom role for single-organization visibility.
3. **Token.** Automated jobs call the endpoints with the `X-GitHub-Api-Version: 2026-03-10` header. Classic tokens need `manage_billing:copilot` or `read:enterprise` for enterprise reports, and `read:org` for organization reports.

The endpoints return signed download links with a limited expiry. Anyone who holds a link before it expires can download the file, so the link deserves the same care as the data.

Guide advice: give analysts a custom role scoped to the organizations they report on, and run scheduled downloads under a dedicated service identity rather than an owner's personal token.

## Worked example: separating readers

**Hypothetical starting state:** At the fictional company Fabrikam Tools, five organization owners and two analysts share one owner's classic token to pull reports. The token also carries administrative scopes.

The team creates a custom organization role with only the metrics permission and assigns it to the analysts. It moves the download job to a dedicated identity with the minimum scope and stops writing signed links into chat channels.

**Outcome:** Analysts see metrics without owner rights, the job no longer depends on one person, and the shared token is retired.

## Practice: draw your access path

**Prerequisites:** An authorized sandbox organization where you can view, but do not need to change, roles and policies.

1. Record whether the usage metrics policy is enabled and at which level it is set.
2. List everyone who can read metrics today and note their role or permission.
3. List every token or app that downloads reports, with its scopes.
4. Propose the narrowest role or scope for each reader and job.

**Expected result:** An access table that shows each reader, how access is granted and a proposed reduction.

<details>
<summary>Model answer</summary>

A sound table shows the policy state first, then readers grouped by role. Owners keep access through their role; analysts move to a custom role with the metrics permission; the scheduled job uses a dedicated identity with `read:org` for organization reports. Personal owner tokens used for reporting are flagged for removal.
</details>
