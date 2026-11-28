---
title: Model availability triage
section: Troubleshooting Visibility
order: 19
description: Explain why a model is or is not available by reading its status, the released-model default and enterprise teams mode.
verified: "2026-11-27"
diagram: model-availability-triage
checks:
  - question: A model's status is Unconfigured. Does it follow the default availability for released models?
    answer: No. Unconfigured models, such as models in preview, do not follow the default policy.
  - question: In enterprise teams mode, can a team enable a model the enterprise disabled?
    answer: No. Teams mode is additive below the enterprise baseline, so an enterprise-disabled model cannot be enabled for a team.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/default-availability
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Read a model's availability status.
- Explain when the released-model default applies.
- Recognize how enterprise teams mode changes the trace.

This lesson covers precedence only. Model selection and approval are outside this course.

## Statuses decide whether defaults apply

Models use the **Default availability for released models** policy, not the default for new features. A model's status decides whether that default applies. See [About default availability](https://docs.github.com/en/copilot/concepts/enterprise/default-availability):

- **Enabled** or **Disabled**: explicit, and not affected by the default.
- **Delegate to default policy**: follows the default.
- **Unconfigured**: does not follow the default, for example while a model is in preview.
- **Delegate to organizations** or **Delegate to Enterprise Teams/Apps**: follows the organization-level default for organizations that do not configure the model.

Pre-GA models, open-weight models, and models not covered by the data retention agreement are out of scope for the default and stay disabled by default.

Enterprise owners can set a baseline that enables or disables a model for everyone, delegate it to organizations, or add targeted rules for specific organizations. Enterprise teams mode is an opt-in **preview**. It deactivates organization-level model settings and is additive: a model disabled at the enterprise cannot be enabled for a team, and a model enabled for any of a user's teams is available to them. Models previously delegated to organizations become unavailable until enabled for teams, and the change can be rolled back. **Let organizations decide** is not available in that mode. See [Managing availability of default models](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models).

On the GitHub Team plan, model access is determined by the organization paying for usage, shown under "Usage billed to" on the user's features page. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

## Worked example: a released model missing in one organization

**Hypothetical starting state:** A newly released model has status Delegate to organizations. The design organization has not configured it and its released-model default is disabled. A designer seated only by design cannot select the model.

The administrator reads the status, confirms the delegation, and follows the design organization's default.

**Outcome:** Predicted unavailable, matching the report. The design owner can enable the model explicitly, after approval.

## Practice: trace three model reports

**Prerequisites:** Three hypothetical models: one Unconfigured preview model, one Delegate to default policy with an enabled default, and one disabled at the enterprise while teams mode is on. No settings need to be changed.

1. Record each status.
2. Decide whether a default applies.
3. Predict availability.
4. In an authorized sandbox, compare with the model picker. Without a sandbox, compare with the model answer.

**Expected result:** Not by default, available, and unavailable.

<details>
<summary>Model answer</summary>

Preview model: Unconfigured does not follow the default, so it needs an explicit decision. Delegate to default policy with an enabled default: available. Enterprise-disabled in teams mode: unavailable; no team can enable it.

</details>
