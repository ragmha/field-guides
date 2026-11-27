---
title: Enterprise-assigned users
section: Seat Sources
order: 7
description: Explain which defaults apply to users who receive Copilot directly from the enterprise rather than through an organization.
verified: "2026-11-27"
diagram: enterprise-assigned-users
checks:
  - question: Does "Let organizations decide" cover a user whose seat is assigned directly by the enterprise?
    answer: No. A separate setting, Policies for enterprise-assigned users, decides whether those policies default to enabled or disabled for them.
  - question: What happens to the access of a user removed from an enterprise team that was assigned Copilot?
    answer: They keep access until the end of the current billing cycle.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs
---

## What you will learn

- Identify enterprise-assigned users as a separate seat source.
- Explain which setting decides delegated policies for them.
- Account for team-based assignment timing when tracing access.

## No organization to delegate to

Enterprise owners on Copilot Business, or with Copilot access, can assign seats directly to enterprise members or to enterprise teams. Before doing so, they set **Policies for enterprise-assigned users**. See [Granting access to Copilot for enterprise members](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-access/grant-access).

That setting exists because delegation does not reach these users. The policy overview says that if a user receives a license directly from the enterprise rather than through an organization, policies set to **Let organizations decide** do not apply to them; a separate setting decides whether those policies default to enabled or disabled. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies). Fixed enterprise states still apply, because they apply to everyone the enterprise licenses.

Team-based assignment adds timing. Users gain access when added to an assigned enterprise team; when removed, they keep access until the end of the billing cycle. The enterprise can also enable Copilot for organizations so their owners can assign seats, and on Copilot Business it can disable access for organizations. Guide advice: when a user is seated both directly and through an organization, list both sources and treat the enterprise-assigned default as one input alongside the organization setting.

For evidence, the audit log records seat events such as `copilot.cfb_seat_assignment_created`. For team-based assignments, the actor on `copilot.cfb_seat_added` may not be the account that made the change. See [Reviewing audit logs for Copilot](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/review-audit-logs).

## Worked example: a contractor outside every organization

**Hypothetical starting state:** The enterprise assigns Copilot to the "design-contractors" enterprise team. Policies for enterprise-assigned users default to disabled. Copilot CLI is set to let organizations decide, and every organization has enabled it. A contractor in the team reports that CLI is unavailable.

The administrator confirms the contractor has no organization seat. Organization settings are therefore not inputs. The delegated CLI policy falls back to the enterprise-assigned default, which is disabled.

**Outcome:** The predicted state is disabled for the contractor and enabled for organization-seated users. Options are to change the enterprise-assigned default, or to set CLI explicitly at the enterprise, after approval.

## Practice: trace three seat paths

**Prerequisites:** Three hypothetical users: one seated through an organization, one seated directly, and one seated through an enterprise team and just removed from it. No settings need to be changed.

1. For each user, name the seat source.
2. For a delegated policy, name the setting that decides it.
3. For the removed user, state when access ends.
4. In an authorized sandbox, compare with the enterprise **Access** pages. Without a sandbox, compare with the model answer.

**Expected result:** Organization setting, enterprise-assigned default, and enterprise-assigned default until the billing cycle ends.

<details>
<summary>Model answer</summary>

Organization-seated: the organization's delegated setting. Directly seated: Policies for enterprise-assigned users. Removed team member: still governed by the enterprise-assigned default until the end of the billing cycle, then no access unless another source exists.

</details>
