---
title: Correlate audit events with OpenTelemetry
section: Correlating Telemetry
order: 22
description: Read the Copilot OTel span tree and join it to audit evidence without overclaiming a match.
verified: "2026-11-27"
diagram: otel-correlation
checks:
  - question: Where should you read `github.copilot.nano_aiu` to avoid double counting?
    answer: From the root `invoke_agent` span only; the attribute is also stamped on child `chat` spans.
  - question: What happens if the OTLP exporter resolves to an `http://` endpoint?
    answer: Export is disabled rather than sent in cleartext. Startup continues and the only signal is a warning in the process log.
  - question: Is `github.copilot.cost` a monetary amount?
    answer: No. It is a per-request model multiplier used for billing.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/opentelemetry
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/opentelemetry-reference
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity
---

## What you will learn

- Read the Copilot OpenTelemetry span tree and its key attributes.
- Join telemetry to audit evidence using identity and time, and test any identifier join first.

## The span tree

[OpenTelemetry for Copilot](https://docs.github.com/en/copilot/concepts/enterprise/opentelemetry) exports traces, metrics and events. Content capture is off by default, and managed values take precedence over local settings and environment variables. Fine-grained capture classes are supported in Copilot CLI, the Copilot app and the VS Code Agent Host; other harnesses differ.

The [OpenTelemetry reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/opentelemetry-reference) describes a span tree per agent interaction: an `invoke_agent` root with `chat` and `execute_tool` children. Useful attributes include:

- `gen_ai.conversation.id`: the session identifier.
- `enduser.pseudo.id`: a pseudonymous Copilot user identifier, when available.
- `gen_ai.request.model` and `gen_ai.tool.name`.
- `github.copilot.nano_aiu`: AI units; read it from the root span only.
- `github.copilot.cost`: a billing multiplier, **not a monetary value**.

Span events include hook start, end and error, `session.abort`, `session.shutdown` (with lines added and removed and files modified) and `gen_ai.client.operation.exception`. `service.name` defaults to `github-copilot`. An `http://` endpoint silently disables export, with only a process-log warning.

The [agent monitoring guide](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/monitor-agentic-activity) says identity capture adds the Copilot account name, OS account and machine name, and all capture classes default to false.

Guide advice: GitHub does not document that `gen_ai.conversation.id` equals the audit log `agent_session_id`. Test any identifier join in a sandbox before relying on it. Otherwise, join on the person and a narrow time window, and label the result as a probable rather than a confirmed match.

## Worked example: no spans arrived

**Hypothetical starting state:** The fictional Adventure Works platform team rolls out OTel for Copilot CLI to an internal collector at `http://otel.internal:4318`. The collector receives nothing, and no errors appear in the console.

The engineer checks the reference: an `http://` endpoint disables export. The team moves the collector behind HTTPS with a corporate CA and confirms spans arrive. To correlate, they enable identity capture only after privacy review, then match spans to audit events by user and time.

**Outcome:** Telemetry flows, and the correlation method is documented as time-and-identity based.

## Practice: plan a correlation

**Prerequisites:** The attribute list above and, in an authorized sandbox, a test collector, or the fictional scenario.

1. List the audit fields and OTel attributes you would join, and the join type for each (identifier or time window).
2. Note which capture classes are needed and which stay off.
3. Write how you will verify the join before using it in an investigation.

**Expected result:** A correlation plan that names join keys, capture classes and a verification step, and labels untested joins as probable.

<details>
<summary>Model answer</summary>

Join audit `user` with the identity-captured Copilot account and a time window around the audit timestamp. Treat `agent_session_id` to `gen_ai.conversation.id` as unverified until a sandbox session proves it. Enable identity only; keep prompts, responses and tool content off. Verify by running one known sandbox session and checking both records.

</details>
