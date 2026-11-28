---
title: Plan a routing change
section: Plan-Based Routing
order: 15
description: Sequence version checks, endpoint rules and billing transitions so no one loses access.
verified: "2026-11-27"
diagram: routing-change-plan
checks:
  - question: What must you allow before moving from Copilot Business to the Copilot access billing model?
    answer: The *.enterprise.githubcopilot.com pattern, because the allowlist reference says the enterprise endpoints also serve that billing model.
  - question: Why check client versions before blocking personal endpoints?
    answer: Routing needs minimum client versions; older clients may not use the plan-specific endpoints as expected.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
---

## What you will learn

- Order the steps of a routing change.
- Protect access during a billing model transition.

## Sequence matters

A routing change combines endpoint rules with client and billing facts. The [routing how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/manage-network-access) lists minimum client versions and warns that, before an organization on Copilot Business moves to the Copilot access billing model, the network must allow `*.enterprise.githubcopilot.com`. The [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) explains why: the enterprise endpoints also serve that billing model. A network that allows only the business pattern would block users the moment billing changes.

Recommended order:

1. Inventory plans, planned billing changes and client versions.
2. Add the allow rules for every plan pattern you will need, including the enterprise pattern before any billing move.
3. Pilot the block rule for the individual pattern in a small network segment.
4. Remove the broad `*.githubcopilot.com` entry and widen the block after the pilot.
5. Review after each plan, billing or client change.

This order is guide advice; the facts it relies on come from the linked documents.

## Worked example: a billing move next quarter

**Hypothetical starting state:** The Quayside organization uses Copilot Business today and plans to move to the Copilot access billing model next quarter. Its network allows only `*.business.githubcopilot.com` and blocks the individual pattern.

The network lead reads the warning and adds `*.enterprise.githubcopilot.com` to the allowlist now, well before the billing move. Change notes record why the rule exists, so a later cleanup does not remove it as unused.

**Outcome:** When billing changes, requests move to the enterprise endpoints and continue to work. The business rule remains until the organization confirms no users still depend on it.

## Practice: build a change calendar

**Prerequisites:** Your plan and billing roadmap and a client version report. No firewall rules need to be changed.

1. Place the five steps above on a calendar with owners.
2. Mark the date by which the enterprise pattern must be allowed.
3. Add a rollback step for the pilot block.
4. In an authorized sandbox network, rehearse the pilot with test accounts. Without a sandbox, compare your calendar with the model answer.

**Expected result:** A dated plan in which the enterprise pattern is allowed before any billing change and the block is piloted before it is widened.

<details>
<summary>Model answer</summary>

Week 1: inventory and version report. Week 2: allow business and enterprise patterns. Week 3: pilot the individual block with rollback. Week 4: remove the broad entry and widen the block. Billing move: after week 2. Review: at every plan, billing or client version change.

</details>
