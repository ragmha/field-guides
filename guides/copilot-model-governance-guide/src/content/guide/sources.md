---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
---

## What you will learn

Find the primary source behind each lesson, the date it was reviewed, and which capabilities were in public preview at review time. Model names, prices and release phases change often; check the linked pages before acting.

| Topic | Source | Reviewed |
| --- | --- | --- |
| Availability factors | [Models overview](https://docs.github.com/en/copilot/concepts/models/overview) | 2026-11-27 |
| Model catalog, evaluation models and retirements | [Supported AI models](https://docs.github.com/en/copilot/reference/ai-models/supported-models) | 2026-11-27 |
| Credit consumption by model | [Model comparison](https://docs.github.com/en/copilot/reference/ai-models/model-comparison) | 2026-11-27 |
| User access to models | [Configure access to AI models](https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models) | 2026-11-27 |
| Background models | [Utility models](https://docs.github.com/en/copilot/concepts/models/utility-models) | 2026-11-27 |
| Release stages | [Learning about new features and models](https://docs.github.com/en/copilot/concepts/enterprise/learning-about-new-features-and-models) | 2026-11-27 |
| Release announcements | [Copilot changelog](https://github.blog/changelog/label/copilot/) | 2026-11-27 |
| Default availability and model statuses | [Default availability](https://docs.github.com/en/copilot/concepts/enterprise/default-availability) | 2026-11-27 |
| Enterprise model settings, access rules and teams mode | [Manage model availability for an enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-availability-of-default-models) | 2026-11-27 |
| Organization model settings | [Manage model availability for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-default-models) | 2026-11-27 |
| Policy scope and drift | [Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies) | 2026-11-27 |
| Hosting, training and retention statements | [Model hosting](https://docs.github.com/en/copilot/reference/ai-models/model-hosting) | 2026-11-27 |
| BYOK data handling | [Copilot Chat responsible use](https://docs.github.com/en/copilot/responsible-use/chat) | 2026-11-27 |
| Auto model selection | [Auto model selection](https://docs.github.com/en/copilot/concepts/models/auto-model-selection) | 2026-11-27 |
| Managed Auto tier in VS Code | [AI language models in VS Code](https://code.visualstudio.com/docs/agent-customization/language-models) | 2026-11-27 |
| Copilot Fusion | [Copilot Fusion](https://docs.github.com/en/copilot/concepts/models/copilot-fusion) | 2026-11-27 |
| Base and LTS models | [Base and long-term support models](https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models) | 2026-11-27 |
| Token pricing | [Models and pricing](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) | 2026-11-27 |
| FedRAMP restriction and uplift | [FedRAMP models](https://docs.github.com/en/copilot/concepts/enterprise/fedramp-models) | 2026-11-27 |
| Model usage evidence | [Copilot usage metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) | 2026-11-27 |
| BYOK approaches | [Bring your own key](https://docs.github.com/en/copilot/concepts/models/bring-your-own-key) | 2026-11-27 |
| Enterprise custom models | [Enable custom models for an enterprise](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/enable-custom-models) | 2026-11-27 |
| Organization custom models | [Enable custom models for an organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/enable-custom-models) | 2026-11-27 |
| Pilot process | [Pilot a new Copilot feature or model](https://docs.github.com/en/copilot/tutorials/roll-out-at-scale/govern-at-scale/pilot-a-feature-or-model) | 2026-11-27 |

## Release status and scope

- Enterprise teams model access: **public preview - use with caution**. Switching deactivates organization model settings, and enterprise changes made after switching are not preserved on rollback.
- Enterprise and organization custom models (BYOK through GitHub): **public preview - use with caution**. User-configured BYOK in supported clients is a separate capability.
- Copilot Fusion local model routing: **public preview - use with caution**, requiring experimental features. Fusion itself is documented as generally available on listed surfaces.
- Individual models: preview and evaluation models are labeled in the supported models reference and do not follow the default availability policy. This course does not name model versions because the list changes.
- Time-bound items: the retention exemption, Fusion promotional discount and promotional model prices carry end dates in the linked pages; confirm them before relying on them.
- Out of scope: budgets and allowances (see the [AI credits course](/field-guides/ai-credits-guide/)), policy conflicts, session data, audit log analysis and usage metrics dashboards, each covered by a sibling course.
- Other capability support varies by plan, client and surface. Absence of a preview tag here is not a guarantee of availability or approval.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a layered availability funnel, a release-stage timeline, a status decision flowchart, a delegation swimlane, a provider hosting matrix, an exception decision flowchart, an Auto eligibility funnel, a Fusion pattern map, a cost-signal matrix, a BYOK request-path swimlane, an intake flowchart and a lifecycle timeline. Their hypothetical inputs come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub.
