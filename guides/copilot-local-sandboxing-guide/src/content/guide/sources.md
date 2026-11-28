---
title: Sources and release status
section: Appendix
order: 25
description: Primary sources reviewed for this course and material release-status boundaries.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
---

## What you will learn

The links below are the primary documentation consulted for this draft. Review dates record source inspection, not product approval or a guarantee that a setting applies to your environment. Revisit sources before acting; more than 30 days since review warrants renewed review.

| Topic | Source | Reviewed |
| --- | --- | --- |
| CLI capabilities and approvals | [About Copilot CLI](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) | 2026-11-27 |
| CLI trust, paths and URLs | [Configure Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) | 2026-11-27 |
| CLI authentication | [Authenticate Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli) | 2026-11-27 |
| Permission modes | [Allowing safe commands](https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands) | 2026-11-27 |
| Local sandboxing concepts | [About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) | 2026-11-27 |
| Sandbox filesystem policy | [Understanding local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing) | 2026-11-27 |
| Sandbox settings | [Configure local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) | 2026-11-27 |
| Sandbox usage and troubleshooting | [Use local sandboxing](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing) | 2026-11-27 |
| Cloud sandboxes | [About cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) | 2026-11-27 |
| Managed setting keys (reference only) | [Enterprise managed settings](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) | 2026-11-27 |
| Codespaces isolation | [Security in GitHub Codespaces](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces) | 2026-11-27 |
| VS Code agent sandbox | [Agent sandboxing](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) | 2026-11-27 |
| VS Code approvals | [Tool and command approvals](https://code.visualstudio.com/docs/agents/run/approvals) | 2026-11-27 |
| VS Code security baseline | [Agent security](https://code.visualstudio.com/docs/agents/run/security) | 2026-11-27 |
| Workspace Trust | [Workspace Trust](https://code.visualstudio.com/docs/editing/workspaces/workspace-trust) | 2026-11-27 |

## Release status and scope

- VS Code agent sandboxing on Windows: **experimental - use with caution**. macOS 15+ and glibc-based Linux or WSL2 are supported; musl-based distributions and WSL1 are not.
- VS Code enterprise-managed sandboxing: **preview - use with caution**.
- Microsoft Entra sign-in for Copilot CLI: **public preview - use with caution**.
- Copilot CLI browser use and Microsoft 365 Copilot models: **public preview**; this course does not cover them.
- Local sandboxing requires specific OS versions and packages, and Windows network restrictions depend on programs honoring proxy settings. Absence of a preview tag here is not a guarantee of availability or approval.
- Out of scope, covered by sibling courses: authoring managed settings, MCP server governance, cloud agent security, organization network controls and policy conflicts.

## Attribution

The diagram HTML is based on [diagram-design](https://github.com/cathrynlavery/diagram-design) templates; its [MIT notice](/licenses/diagram-design-MIT.txt) is retained.

The figures use a layered reach map, decision flowcharts, a permission-mode matrix, an approval-lifetime timeline, a credential swimlane, an isolation-tier matrix and an incident lifecycle. Their hypothetical inputs and limitations come from the corresponding lessons, not additional product claims. Diagram outcomes are explanations, not evidence of live configuration or enforcement.

This independent guide is not affiliated with or endorsed by GitHub or Microsoft.
