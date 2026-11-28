---
title: Map owners to layers
section: The Control Map
order: 3
description: Assign an accountable owner, a configuring role and an evidence source to every control layer.
verified: "2026-11-27"
diagram: control-owner-map
checks:
  - question: Can an AI manager with only the Manage enterprise AI controls permission change billing budgets?
    answer: No. GitHub documents that AI managers cannot access Copilot access management, Billing or Metrics unless they are granted those permissions separately.
  - question: Who can configure content exclusion?
    answer: Repository administrators, organization owners and enterprise owners, each with a different scope of affected users.
  - question: Why record a configuring role separately from an accountable owner?
    answer: The person who clicks the setting is often not the person who decides the requirement or answers for the risk.
sources:
  - https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
---

## What you will learn

- Distinguish the accountable owner, the configuring role and the evidence owner for a layer.
- Use GitHub's AI manager permissions to delegate without handing over billing or access.
- Spot layers owned outside GitHub administration.

## Three roles per layer

Every layer in the stack needs three names. The **accountable owner** decides the requirement and accepts the risk. The **configuring role** has the permission to change the setting. The **evidence owner** can show that the setting is in place and has not drifted. They are often different teams.

GitHub supports delegation inside the platform. The [AI managers tutorial](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/establish-ai-managers) uses enterprise custom roles (public preview) with permissions such as "Manage enterprise AI controls", "Read enterprise audit logs" and "View Enterprise Copilot Metrics". AI managers cannot reach Copilot access management, Billing or Metrics unless those permissions are granted, so seat and budget layers can stay with a different owner. The [policies concept page](https://docs.github.com/en/copilot/concepts/enterprise/policies) recommends reviewing who holds enterprise owner, the custom role permission and organization-level granular permissions as part of preventing drift.

Some layers sit partly outside GitHub. Network routing depends on the corporate proxy or firewall. Machine-level managed settings depend on device management. Content exclusion is spread across repository administrators, organization owners and enterprise owners, and the [content exclusion concept page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) shows that each scope affects a different set of users.

Recommended: give each layer exactly one accountable owner, even if several roles can configure it.

## Worked example: an owner map for one enterprise

**Hypothetical starting state:** Fictional Larkspur Freight has three enterprise owners who change everything, a network team that runs the proxy, an endpoint team that manages laptops and a finance partner who reviews the monthly invoice.

The governance lead builds a map. Policies and model settings: accountable owner is the AI governance lead, configured by two AI managers through a custom role, evidence from the enterprise audit log. Network routing: accountable owner is the network lead, configured on the proxy, evidence from proxy logs. Machine-level managed settings: endpoint lead, configured through device management. Budgets: finance partner accountable, enterprise owner configures, evidence from billing reports. Enterprise owner count drops from three daily users to one break-glass role.

**Outcome:** Each layer has one accountable owner, and the audit log permission is granted to the people who must prove the layer holds.

## Practice: fill in an owner row

**Prerequisites:** A list of your Copilot control layers and an organization chart (a fictional one is fine).

1. Pick the content exclusion layer.
2. Write the accountable owner, the configuring roles at each scope and the evidence source.
3. Note one scope where the configuring role may not know the accountable owner exists.

**Expected result:** One row with three named roles and a coordination risk.

<details>
<summary>Model answer</summary>

Accountable owner: the security lead for source protection. Configuring roles: repository administrators for repository-scoped rules, organization owners for organization-wide rules, enterprise owners for enterprise-wide rules. Evidence: the audit log action for content exclusion changes. Risk: repository administrators can add or change rules without the security lead knowing.

</details>
