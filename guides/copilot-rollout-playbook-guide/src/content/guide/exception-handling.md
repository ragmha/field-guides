---
title: Handle policy exceptions
section: Baseline Policies
order: 11
description: Grant exceptions to the baseline narrowly, with an owner, an expiry and an audit trail.
verified: "2026-11-27"
diagram: exception-handling
checks:
  - question: Which audit log search finds Copilot-related events?
    answer: action:copilot. Use actor:Copilot to find activity performed by Copilot agents.
  - question: Which budget type supports an optional expiration date?
    answer: Individual user-level budgets, which can be used for temporary overrides.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Run an exception through request, assessment, a scoped grant and an expiry review.
- Use the audit log and budget features to support the process.

## Exceptions as a lifecycle

Guide advice: a baseline only stays credible if exceptions have an end. Treat each one as a lifecycle. A team requests a change with a reason and duration. The accountable owner from your RACI assesses it. The grant is scoped as narrowly as the product allows, such as one organization rather than the enterprise. At expiry the owner either renews it after a fresh assessment or closes it by reverting the setting.

GitHub's features support parts of this. The [policies overview](https://docs.github.com/en/copilot/concepts/enterprise/policies) explains that policies are set at enterprise level and can be delegated to organizations, so a scoped grant is often an organization-level setting. The [audit log how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs) shows how to search with `action:copilot` to confirm when a setting changed, and notes that the audit log keeps events for 180 days, so streaming to a SIEM helps if your exception reviews look further back. The [budgets concept page](https://docs.github.com/en/copilot/concepts/billing-and-usage/organizations-and-enterprises/budgets) notes that individual user-level budgets support an optional expiration, useful for a temporary spending override.

Guide advice: keep an exception register with the requester, approver, scope, reason, start date, expiry and closing evidence.

## Worked example: a temporary feature request

**Hypothetical starting state:** The ledger organization asks for an agentic feature for two weeks to evaluate a migration. The baseline disables it there.

Security and legal, accountable for exceptions, approve it for the ledger organization for two weeks only, on the condition that only the evaluating team uses it. AI managers enable it for the ledger organization, record the change and confirm it in the audit log. At expiry they find the evaluation complete, revert the setting and confirm the revert with `action:copilot`.

**Outcome:** The exception had an owner, a scope and an end, and the register links to audit evidence for both changes. The scenario is hypothetical.

## Practice: design an exception register

**Prerequisites:** Your baseline table and RACI. Use hypothetical requests. No settings need to be changed.

1. Define the register's fields.
2. Write two hypothetical requests and assess each against the baseline.
3. For the approved request, set the narrowest scope and an expiry date.
4. Describe how you will confirm the grant and the revert in the audit log.

**Expected result:** A register with one approved, one declined request and the evidence plan.

<details>
<summary>Model answer</summary>

Fields: ID, requester, approver, setting, scope, reason, start, expiry, renewal decision and evidence link. The approved request is scoped to one organization with a two-week expiry; the declined one records why. Evidence is an `action:copilot` search for both the change and the revert, exported before the 180-day retention window passes.

</details>
