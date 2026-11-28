---
title: Set up license requests
section: Enablement and Training
order: 15
description: Let developers request Copilot access through a built-in request flow or an API-backed internal process.
verified: "2026-11-27"
diagram: license-request-flow
checks:
  - question: Where does an organization owner review Copilot access requests from members?
    answer: On the "Requests from members" page; GitHub recommends reviewing requests regularly.
  - question: Which plan does the built-in "Request access" flow apply to in GitHub's tutorial?
    answer: Copilot Business, where members click "Ask admin for access" and an organization owner approves.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/set-up-self-serve-licenses
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption
---

## What you will learn

- Compare the built-in request flow with an API-backed internal process.
- Pair the request flow with clear expectations about inactive licenses.

## Two self-serve patterns

GitHub's [self-serve licenses tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/set-up-self-serve-licenses) describes two approaches. With the built-in flow for Copilot Business, a member clicks **Ask admin for access** in their Copilot settings and an organization owner approves the request on the **Requests from members** page. The tutorial recommends reviewing requests regularly so developers are not left waiting.

The second approach uses your own request channel, such as an issue form or internal portal, and calls the REST API to assign a seat, either through the organization endpoint or the enterprise endpoint for direct assignment. Because assignment is automated, access can be granted almost immediately, and you can add checks such as team membership first.

The [adoption tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption) recommends communicating expectations clearly, for example that inactive users' licenses may be revoked, and following up with inactive users during ongoing review.

Guide advice: choose the built-in flow when request volume is low and owners can commit to a review cadence; choose the API flow when volume is high or you already run an internal portal. Either way, publish the inactivity policy in the launch announcement.

## Worked example: moving from manual to automated

**Hypothetical starting state:** During the pilot, two organization owners approved requests weekly. Expansion will add several hundred developers.

The rollout owner keeps the built-in flow for the pilot, then proposes an issue form that triggers a workflow. The workflow checks team membership and calls the organization seat-assignment endpoint. The announcement states that licenses unused for a stated period may be revoked and how to request them again.

**Outcome:** Requests are handled quickly at scale with a membership check, and developers know the inactivity rule. The workflow is a design, not a tested implementation.

## Practice: choose a request flow

**Prerequisites:** Expected request volume, who can approve, and the [self-serve tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/assign-licenses/set-up-self-serve-licenses). No settings need to be changed.

1. Estimate weekly requests during the pilot and after expansion.
2. Choose the built-in or API flow for each phase and explain why.
3. Define the review cadence or automated checks.
4. Draft the inactivity sentence for the announcement.
5. Test any automation only in an authorized sandbox organization.

**Expected result:** A request flow per phase with a cadence or check and a published inactivity policy.

<details>
<summary>Model answer</summary>

Pilot: built-in Request access flow with owners reviewing on a fixed weekly cadence. Expansion: internal form plus API assignment with a team-membership check, tested in a sandbox first. Announcement: licenses inactive for the stated period may be revoked; request again through the same form.

</details>
