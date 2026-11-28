---
title: Write an effective-policy record
section: Effective-Policy Records
order: 22
description: Capture the inputs, rule and result of a policy decision so that another administrator can repeat it.
verified: "2026-11-27"
diagram: effective-policy-records
checks:
  - question: Why record whether a value is explicit or inherited from a default?
    answer: An inherited value can change when a default changes, without anyone editing that policy.
  - question: What should a record say when the result has not been observed on the surface?
    answer: That it is a prediction, with the surface and date still to be confirmed.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
---

## What you will learn

- List the fields an effective-policy record needs.
- Separate predicted and observed results.
- Cite the documentation version a decision relied on.

## A record mirrors the trace

The earlier parts produce a fixed set of inputs. Guide advice: write one record per policy decision, or per user for an escalated ticket, with these fields:

1. **Policy and date:** the policy name as displayed, and the review date.
2. **Enterprise state:** fixed, selected organizations, or delegated; and whether it is explicit or follows the [default policy](https://docs.github.com/en/copilot/concepts/enterprise/default-availability).
3. **Seat sources:** each organization or enterprise that grants a license, including the enterprise-assigned default where it applies. Policies generally follow the license source. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).
4. **Conflict rule:** least restrictive, most restrictive, or the multi-enterprise rule, cited from [the conflicts reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/policy-conflicts).
5. **Resource controls:** repository or organization controls that apply regardless of the user.
6. **Surface:** the surface and environment, checked against the [supported surfaces reference](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies).
7. **Result:** predicted or observed, with the evidence for an observed result.
8. **Owner and approval:** who can change the deciding input, and who approved the current state.

Keep the record free of personal data beyond what your process requires; a role or ticket reference is usually enough.

Guide advice: link the record to the documentation pages you used, because the lists of least- and most-restrictive policies and supported surfaces can change.

## Worked example: recording a public code decision

**Hypothetical starting state:** The enterprise delegates **Suggestions matching public code**. The web organization allows; the compliance organization blocks. Several developers are seated by both.

The administrator fills in the record: delegated and explicit; two seat sources; most-restrictive rule; no resource controls; IDE surface, which is covered; predicted blocked for dual-seat users; owner is the web organization for web-only users and either organization for dual-seat users.

**Outcome:** The record explains why dual-seat developers see the block, and why a web-only change will not alter it. A follow-up observation in an IDE turns the prediction into an observed result.

## Practice: complete a record from a ticket

**Prerequisites:** The hypothetical ticket from the feature visibility triage lesson, with developer B seated only by data, and the record fields above. No settings need to be changed.

1. Fill in each of the eight fields.
2. Mark the result as predicted or observed.
3. Name the owner who could change the deciding input.
4. In an authorized sandbox, attach a screenshot of the features page as evidence. Without a sandbox, compare with the model answer.

**Expected result:** A complete record in which the seat source is the deciding input.

<details>
<summary>Model answer</summary>

Policy: Copilot in the cloud. Enterprise: delegated, explicit. Seat sources: data only. Rule: least restrictive, but only one input. Resource controls: none relevant. Surface: github.com, cloud sandbox. Result: observed disabled on the features page. Owner: data organization owner, or the seat assignment process.

</details>
