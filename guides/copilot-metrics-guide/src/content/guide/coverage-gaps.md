---
title: Find and explain coverage gaps
section: Latency, Coverage & Limits
order: 15
description: Identify activity the metrics miss because of client versions, telemetry settings, network controls or surfaces.
verified: "2026-11-27"
diagram: coverage-gaps
checks:
  - question: What does client_telemetry_present set to false indicate for a user on a day?
    answer: Their activity was seen only through server-side telemetry, so client-side breakdowns such as IDE and feature totals are missing.
  - question: Name two common reasons a known Copilot user is missing from IDE metrics.
    answer: Any two of telemetry disabled in the IDE, a proxy or firewall blocking the telemetry endpoint, or an unsupported or outdated client.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/usage-metrics-coverage
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics
  - https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics
---

## What you will learn

- Name the layers that decide whether activity reaches the metrics.
- Use report fields to size the gap before explaining it.

## Where activity goes missing

The [coverage reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/usage-metrics-coverage) lists minimum versions for IDE metrics:

| IDE | Minimum IDE version | Minimum chat extension |
| --- | --- | --- |
| Eclipse | 4.31 | 0.9.3.202507240902 |
| JetBrains | 2024.2.6 | 1.5.52-241 |
| Visual Studio | 17.14.13 | 18.0.471.29466 |
| VS Code | 1.107.1 | 0.35.3 |
| Xcode | 14.3.1 | 0.40.0 |

IDE metrics exclude Copilot Chat on github.com and GitHub Mobile, although `totals_by_client` includes web and mobile clients. License and seat data are not part of the reports. The same page documents an agent attribution issue in some client versions whose missing data cannot be backfilled; billing was unaffected.

The [reconciliation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/reconciling-usage-metrics) lists the usual causes when a user is missing: telemetry disabled in the client, for example through the VS Code `telemetry.telemetryLevel` setting; a proxy or firewall blocking the telemetry endpoint; or an unsupported client. It also explains that `Unknown` values appear in the API but not the dashboard, and that active user totals can exceed the sum of breakdowns because of server-side-only users.

The [metrics reference](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/copilot-usage-metrics) gives you fields to size the gap: `client_telemetry_present` per user, `usage_metrics_requirements` with met, unmet or unknown status, and the daily `missing_client_telemetry_user_count` and `below_usage_metrics_minimum_user_count` in aggregated reports. The [interpretation guide](https://docs.github.com/en/copilot/reference/copilot-usage-metrics/interpret-copilot-metrics) notes that customization fields come from client telemetry and can undercount.

Guide advice: publish a coverage line alongside every adoption chart, and fix gaps with your endpoint and network owners before drawing conclusions.

## Worked example: the quiet JetBrains group

**Hypothetical starting state:** The fictional Proseware data team uses JetBrains IDEs. Their acceptance activity is near zero, yet they say they use completions daily.

The analyst checks the per-user report: most of the team shows `client_telemetry_present` as false and unmet usage metrics requirements. Their plugin version is below the minimum, and the corporate proxy blocks the telemetry endpoint.

**Outcome:** The platform team schedules a plugin update and an allowlist review. Until both land, the data team's figures carry a coverage warning.

## Practice: size your coverage gap

**Prerequisites:** One aggregated and one per-user daily report from an authorized sandbox.

1. Record daily active users and `missing_client_telemetry_user_count` for the day.
2. Record `below_usage_metrics_minimum_user_count`.
3. Count per-user rows with unmet or unknown requirements.
4. Write a coverage note for that day.

**Expected result:** A coverage note stating how many active users have incomplete client data and why.

<details>
<summary>Model answer</summary>

"On the report day, 18 of 240 active users had no client telemetry and 11 were below minimum client versions. IDE and feature breakdowns undercount these users. Owners: endpoint team for upgrades, network team for the telemetry endpoint." Daily counts are not summed across days.
</details>
