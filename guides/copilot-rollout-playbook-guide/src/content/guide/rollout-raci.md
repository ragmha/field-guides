---
title: Map rollout responsibilities
section: Stakeholders and Ownership
order: 2
description: Turn the teams that must sign off on Copilot into a RACI with one accountable owner per decision.
verified: "2026-11-27"
diagram: rollout-raci
checks:
  - question: Which teams do GitHub's approval resources say you will likely need signoff from?
    answer: Legal, compliance and cybersecurity teams, depending on your industry and location.
  - question: Is a RACI a GitHub product control?
    answer: No. It is guide advice for organizational accountability; it does not grant or restrict any permission.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/resources-for-approval
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption
---

## What you will learn

- Identify the stakeholders GitHub's rollout tutorials expect you to involve.
- Assign responsible, accountable, consulted and informed roles to each rollout decision.

## Stakeholders and the questions they ask

GitHub's [resources for getting approval](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/resources-for-approval) group the common questions by team. Legal and privacy teams need the terms that govern the purchase and the data protection agreement, which covers generally available features and listed previews. Compliance teams need attestations and an overview of administrative controls such as policies, audit logs and content exclusion. Cybersecurity and IT teams need the network allowlist, proxy options, the clients developers will use and the supported IDE versions.

The [governance posture tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/govern-for-adoption) adds a further point: policy decisions work best when informed by people with practical AI experience, which is why it recommends delegating AI administration to subject matter experts.

Guide advice: record these stakeholders in a RACI. **R**esponsible does the work, **A**ccountable makes the final decision, **C**onsulted gives input before the decision and **I**nformed hears the result. Give each row exactly one A. Two accountable owners usually means nobody can close the decision. A RACI is an agreement between people; it does not grant, restrict or prove any GitHub permission.

## Worked example: the platform team's matrix

**Hypothetical starting state:** A platform team will run the rollout. A security and legal group, a finance partner, a small AI manager team and engineering leads are involved. Nobody has written down who decides when the pilot ends.

The rollout owner drafts six rows: terms and compliance signoff, baseline policies, the pilot budget, enablement and training, the go/no-go decision and policy exceptions. Security and legal are accountable for signoff and exceptions. Finance is accountable for the budget, while the rollout owner configures it. Engineering leads are responsible for training their teams. The rollout owner is accountable for the go/no-go decision, with AI managers preparing the evidence.

**Outcome:** Every row has one accountable owner, and each stakeholder knows when they will be consulted. The matrix is a hypothetical agreement; it confirms no one's actual permissions.

## Practice: draft your RACI

**Prerequisites:** The list of stakeholders in your organization and the [approval resources](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/resources-for-approval). No settings need to be changed.

1. List the six decisions from the worked example, plus any your organization adds.
2. For each decision, mark one A, at least one R and the C and I roles.
3. For each consulted team, note which GitHub resource answers its likely question.
4. Check that each person named as R can obtain the permission the work requires; record gaps instead of assuming access.

**Expected result:** A matrix with one accountable owner per row, the resource each reviewer needs and a list of permission gaps.

<details>
<summary>Model answer</summary>

Signoff: security and legal A/R, rollout owner and finance C. Baseline policies: rollout owner A, AI managers R. Pilot budget: finance A, rollout owner R. Enablement: rollout owner A, engineering leads R. Go/no-go: rollout owner A, AI managers R, others C. Exceptions: security and legal A, AI managers R. Legal receives the terms and data protection agreement; compliance the trust center and control overview; IT the allowlist and network settings. Any R without the needed role is a recorded gap.

</details>
