---
title: Plan the enablement timeline
section: Enablement and Training
order: 14
description: Schedule preparation, announcements, training and launch support, and define where developers go for help.
verified: "2026-11-27"
diagram: enablement-timeline
checks:
  - question: In GitHub's example timeline, what happens about 45 days before launch?
    answer: Onboarding preparation, including defining success metrics and training champions.
  - question: Where should developers go first for proxy or firewall problems?
    answer: An internal point of contact who knows your network configuration, escalating to GitHub Support when needed.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/resources-for-approval
---

## What you will learn

- Lay out GitHub's example enablement timeline against your launch date.
- Define a support path that resolves network problems before they become adoption problems.

## Timeline and support path

The [adoption tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption) gives an example timeline. About 45 days before launch, prepare onboarding: define success metrics and train champions. About 14 days before, send announcements and share asynchronous resources. About seven days before, run a workshop. On launch day, open a support channel and publish a wiki and resources. After launch, continue training and shift toward on-demand material. The tutorial recommends starting with a small pilot of interested teams and a self-service model.

Environment setup is the stage most likely to stall. The tutorial points developers behind a proxy or firewall to the allowlist reference and custom certificate guidance, recommends an internal point of contact who knows the network, and suggests escalating to GitHub Support when needed. The [approval resources](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/resources-for-approval) list the same network references for IT teams, which is a reason to complete those checks during preparation rather than on launch day.

Guide advice: add a network check to the preparation window and name the internal contact in the launch announcement. Enablement is also governance: tell developers which features are enabled, which are not and how to request an exception.

## Worked example: a six-week plan

**Hypothetical starting state:** The payments pilot launches on a Monday. Some developers work through a corporate proxy, and the last tool rollout produced many support tickets.

The rollout owner schedules preparation six weeks out: success metrics agreed, champions briefed and the network team checking the allowlist. Two weeks out, an announcement lists enabled features, the support channel and the internal network contact. One week out, engineering leads run a workshop. On launch day, the wiki and channel open. After two weeks, live sessions give way to recorded material.

**Outcome:** Network issues surface in preparation, and developers know where to go. The plan is illustrative.

## Practice: build your timeline

**Prerequisites:** A launch date, your RACI and the [adoption tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/enable-developers/drive-adoption). No settings need to be changed.

1. Place the five timeline stages against your launch date.
2. Assign an owner from your RACI to each stage.
3. Add a network check to preparation and name the internal contact.
4. Write the support path from self-serve docs to GitHub Support.

**Expected result:** A dated timeline with owners and a four-step support path.

<details>
<summary>Model answer</summary>

Day −45: metrics and champions (rollout owner); network check (IT). Day −14: announcement (rollout owner). Day −7: workshop (engineering leads). Launch: support channel and wiki. Ongoing: on-demand training. Support path: developer, self-serve docs, internal contact for proxy and firewall issues, then GitHub Support.

</details>
