---
title: Detect drift and keep change evidence
section: Effective-Policy Records
order: 23
description: Use access reviews and the audit log to notice policy and seat changes that invalidate an effective-policy record.
verified: "2026-11-27"
diagram: drift-and-change-evidence
checks:
  - question: Which audit log filter narrows results to Copilot events?
    answer: "action:copilot"
  - question: How long are Copilot audit log events retained, and what can extend that?
    answer: 180 days. Streaming the audit log to a SIEM keeps events longer.
  - question: Which enterprise custom role permission lets someone manage AI controls without being an enterprise owner?
    answer: Manage enterprise AI controls. Enterprise custom roles are in public preview.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
---

## What you will learn

- Identify who can change the inputs to an effective-policy record.
- Use audit log filters to find Copilot policy and seat changes.
- Set a review cycle that revalidates records.

## Drift comes from people and defaults

GitHub's guidance on preventing policy drift is to review who has access to change policies and to use the audit log. At the enterprise level, enterprise owners and anyone with the **Manage enterprise AI controls** custom role permission can change policies; at the organization level, organization owners and anyone with granular custom permissions can. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

Enterprise custom roles are in **public preview**. Useful permissions include **Manage enterprise AI controls**, **Read enterprise audit logs** and **View Enterprise Copilot Metrics**. AI managers cannot access Copilot access management, billing or metrics unless granted extra permissions. See [Establishing AI managers](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers).

The audit log provides change evidence. Filter with `action:copilot`, or a specific event such as `action:copilot.cfb_seat_assignment_created`; `actor:Copilot` shows agent activity. Events are retained for 180 days, so stream them to a SIEM for longer retention. Viewing requires enterprise owner access or the **Read enterprise audit logs** permission. See [Reviewing audit logs for Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs).

Defaults also cause drift. A record that relies on an inherited value can change when a default changes or when a new GA feature arrives Unconfigured.

Guide advice: revalidate records on a fixed cycle, and whenever the audit log shows a policy or seat change affecting an input. Querying and retaining audit data in depth belongs to audit and telemetry practice; this lesson uses it only as change evidence.

## Worked example: a seat change breaks a record

**Hypothetical starting state:** A record says dual-seat developers in web and compliance are blocked from public code suggestions. During a monthly review, the audit log shows seat removals in the compliance organization for several of those developers.

The administrator reopens the record. Those developers now have one seat source, web, which allows the policy.

**Outcome:** Their effective state changes to allowed. The record is updated with the audit event as evidence, and the compliance owner is told that the removal changed the result.

## Practice: design a review cycle

**Prerequisites:** Three hypothetical records and read access to an audit log in an authorized sandbox, or the model answer. No settings need to be changed.

1. List who can change each record's inputs.
2. Write the audit log filters you would run.
3. Choose a review interval shorter than your retention.
4. In an authorized sandbox, run `action:copilot` for the last week. Without a sandbox, compare with the model answer.

**Expected result:** A list of owners, filters and a review interval.

<details>
<summary>Model answer</summary>

Owners: enterprise owners, holders of Manage enterprise AI controls, and organization owners or granular role holders. Filters: `action:copilot`, plus seat events. Interval: monthly, well inside 180 days, with SIEM streaming for history.

</details>
