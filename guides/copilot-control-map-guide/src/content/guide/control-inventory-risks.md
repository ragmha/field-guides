---
title: Build the inventory and map risks
section: Operating the Map
order: 22
description: Keep a control inventory with consistent fields, map controls to risks and read gaps and missing owners from the matrix.
verified: "2026-11-27"
diagram: risk-control-matrix
checks:
  - question: What does an empty row in a risk-to-control matrix tell you?
    answer: The risk has no control at any layer, so it needs a new control or an explicit risk acceptance by an owner.
  - question: Why is a single control covering many risks worth checking?
    answer: It is a concentration point; if it drifts or has a documented gap, several risks are exposed at once.
  - question: What does GitHub recommend for preventing policy drift?
    answer: Review who holds enterprise owner and AI control permissions, and monitor changes with the audit log.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/governance-controls
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/administer-copilot-cli-for-your-enterprise
---

## What you will learn

- Define the fields every inventory row needs.
- Build a risk-to-control matrix across layers.
- Read gaps, concentration points and missing owners from the matrix.

## Inventory fields

Recommended: one row per control, with these fields.

| Field | Example |
| --- | --- |
| Control | Disable bypass permissions mode |
| Layer | Client managed settings |
| Level and source | Enterprise server file; device management on laptops |
| Reach | Licensed users in supported clients; anyone on managed devices |
| Accountable owner / configuring role | AI governance lead / AI manager, endpoint team |
| Evidence | Audit log for file changes; OpenTelemetry if approved |
| Known gaps | Unmanaged devices; key support varies by client |
| Release status and review date | Generally available; next review in 90 days |

The "known gaps" field matters most. GitHub's documentation lists many: policies do not reach every surface, the server file reaches only licensed users, content exclusion is not a security boundary, and the audit log omits local sessions. The [CLI administration how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/administer-copilot-cli-for-your-enterprise) adds another: users can provide their own LLM keys locally in Copilot CLI, and enterprise policies do not control this.

## From inventory to risk matrix

List risks as rows and layers as columns, then place each control in a cell. Read the matrix three ways:

1. **Empty rows** are risks with no control. Add a control or record an owner's risk acceptance.
2. **Crowded columns** show concentration. If one layer carries several risks, its gaps matter more.
3. **Cells without an owner** are controls nobody maintains.

Drift is the slow version of a gap. The [policies concept page](https://docs.github.com/en/copilot/concepts/enterprise/policies) recommends reviewing who holds enterprise owner and AI control permissions, and monitoring with the audit log. The [governance controls overview](https://docs.github.com/en/copilot/concepts/enterprise/governance-controls) ends its sequence with the same step.

## Worked example: a five-risk matrix

**Hypothetical starting state:** Fictional Larkspur Freight lists five risks: personal accounts, secrets in context, uncontrolled spending, agent merges and unreviewed MCP servers.

Personal accounts maps to network routing and device settings. Secrets maps to content exclusion with a gap note. Spending maps to user-level budgets. Agent merges maps to rulesets. MCP servers maps to the managed settings allowlist. The "secrets" row has only one control with a documented gap, so the security lead adds secret scanning push protection as a second control.

**Outcome:** No empty rows, one strengthened row, and every cell has an owner.

## Practice: find the gap

**Prerequisites:** The five-risk example.

1. Add a sixth risk: "local prompts cannot be reviewed after an incident".
2. Find which layer could address it and what the gap is.

**Expected result:** A row that names a layer and its owner, or an explicit acceptance.

<details>
<summary>Model answer</summary>

The audit log does not include local client session data. The managed settings `telemetry` key can export client data to an OpenTelemetry backend, with content capture off by default. The row lists OpenTelemetry export as a candidate control, owned by security operations, pending a privacy review; until then the risk is accepted by the security lead.

</details>
