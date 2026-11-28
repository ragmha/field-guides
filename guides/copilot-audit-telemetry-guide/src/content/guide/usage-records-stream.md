---
title: Evaluate the usage records stream
section: Agent Activity Monitoring
order: 11
description: Assess the public preview usage records stream and REST endpoint, their eligibility and their sensitive fields.
verified: "2026-11-27"
diagram: usage-records-stream
checks:
  - question: Which enterprises can use the Copilot usage records stream and REST endpoint?
    answer: Enterprises using Enterprise Managed Users on GitHub.com or GitHub Enterprise Cloud with data residency (GHE.com). Both features are in public preview.
  - question: "What does `truncated: true` on a streamed usage record indicate?"
    answer: The request or response body was trimmed to fit the 1 MB record limit.
  - question: Which policy must be enabled before configuring a stream destination for Copilot agent session events?
    answer: The Copilot Usage Records Streaming policy, under AI controls, Copilot, Billing & usage.
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events
  - https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise
  - https://docs.github.com/en/rest/copilot/copilot-usage-metrics
---

## What you will learn

- Identify the eligibility, policies and destinations for Copilot usage records.
- Recognize that usage record bodies can contain sensitive content.

## What a usage record carries

Streaming Copilot usage records is **public preview - use with caution**. The [agentic audit log events reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/agentic-audit-log-events) limits it to enterprises using Enterprise Managed Users on GitHub.com or GitHub Enterprise Cloud with data residency. Each streamed record has:

- `type`: `request` or `response`.
- `user_id` and `enterprise_id`.
- `endpoint`: the endpoint called.
- `body`: the request or response body as a JSON string.
- `@timestamp`: milliseconds since the epoch.
- `truncated`: whether the body was trimmed to fit a 1 MB limit.
- `event_id` and `github_request_id`.

[Streaming the enterprise audit log](https://docs.github.com/en/enterprise-cloud@latest/admin/monitoring-activity-in-your-enterprise/reviewing-audit-logs-for-your-enterprise/streaming-the-audit-log-for-your-enterprise) explains setup: in **AI controls**, under **Copilot**, open **Billing & usage**, enable the **Copilot Usage Records Streaming** policy, then configure a destination. Microsoft Agent 365 and Microsoft Purview are destinations for Copilot agent session events only.

As a pull alternative, the [Copilot usage records endpoint](https://docs.github.com/en/rest/copilot/copilot-usage-metrics), `GET /enterprises/{enterprise}/copilot/usage-records`, is also **public preview**. It requires the **Copilot Usage Records API** policy, an enterprise owner and the `read:enterprise` scope. It accepts a `phrase` with `type`, `user_id` and `created` qualifiers, up to 25 results per page, and `after` or `before` cursors. Records come from clients used under enterprise-paid licenses, including cloud agent, CLI, VS Code, Visual Studio, JetBrains and Eclipse.

Recommended: treat `body` as sensitive. It can contain prompts, code and responses. Agree retention, access and privacy review before enabling either feature.

## Worked example: an eligibility check

**Hypothetical starting state:** The fictional Tailspin Robotics security lead wants every Copilot request in the SIEM. The enterprise uses personal accounts with SAML, not Enterprise Managed Users.

The analyst checks eligibility and finds that neither the stream nor the endpoint is available to this enterprise type. The lead falls back to the audit log for plan and agent events and opens a separate decision on client telemetry.

**Outcome:** The proposal changes from "stream all requests" to "stream audit events now; revisit usage records if the enterprise type changes".

## Practice: write an enablement brief

**Prerequisites:** The field list above and, in an authorized sandbox, an eligible enterprise or the fictional scenario. Do not enable policies in production.

1. Record whether your enterprise type is eligible.
2. Choose stream or REST and name the policy each requires.
3. List which fields are sensitive and who should read them.

**Expected result:** A one-page brief naming eligibility, policy, destination, sensitive fields and access owners.

<details>
<summary>Model answer</summary>

Eligible: EMU on GitHub.com. Choice: stream to the existing SIEM after enabling Copilot Usage Records Streaming; REST would need Copilot Usage Records API. Sensitive: `body`, and `user_id` as an identifier. Access: incident responders only, with a retention period approved by privacy and legal. Flag both features as public preview.

</details>
