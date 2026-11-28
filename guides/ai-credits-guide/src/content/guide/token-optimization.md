---
title: Spend fewer credits without losing quality
section: Day-two operations
order: 3045
description: Reduce unnecessary agent work, then measure credit usage and task outcomes together.
verified: "2026-11-27"
checks:
  - question: A smaller model uses fewer credits but misses a required test. Is the change an efficiency improvement?
    answer: Not yet. Compare equivalent tasks against the same acceptance criteria, including tests and review. Restore the required quality before calling the change an improvement.
  - question: A token dashboard shows fewer input tokens after a tool is removed. Does that prove billed spending fell?
    answer: No. Token counts are diagnostic signals, not an invoice. Compare comparable work and token categories with the paying account's billing data, model rates, run frequency and outcome quality.
  - question: Can a workflow replace its permission controls with a CLI command to save tokens?
    answer: No. Keep the approved identity, least-privilege permissions, secret isolation and review gates. Only change the data-fetching method when it remains authorized and produces equivalent evidence.
sources:
  - https://docs.github.com/en/copilot/tutorials/optimize-ai-usage
  - https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing
  - https://docs.github.com/en/copilot/reference/custom-instructions-support
  - https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/
  - https://learn.github.com/product-guides/github-copilot/accelerate-usage/improve-agent-quality-and-token-optimization
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit
---

## What you will learn

- Give an agent enough context to finish a task without carrying unrelated material.
- Choose models, instructions and tools for the work while preserving security and quality.
- Compare usage and outcomes before deciding whether a change really saves credits.

## Optimize for completed work, not the shortest prompt

A request can include instructions, tool definitions, conversation history and retrieved material as well as the words you type. Which material is sent depends on the client and configuration. Give the agent enough detail to do the job; cutting a useful requirement can create retries and cost more than it saves.

**Guide advice:** Define the task, relevant files or evidence, constraints and a stopping condition. Start with a narrow scope, then widen it when the evidence requires it. For a complex change, separate research, planning and implementation; carry forward the decisions and evidence the next phase needs rather than the whole conversation.

For example, instead of asking an agent to investigate an entire repository, begin with a failing test, the relevant module and the expected behavior. Ask it to inspect dependencies as needed and run the relevant checks. Do not prohibit broader investigation when the cause is outside those files.

```text
Task: Fix the failing retry test without changing the public API.
Context: retry.test.ts and retry.ts; inspect related files if needed.
Constraints: Preserve the existing backoff and security checks.
Done: The focused tests pass and the behavior is explained.
```

In Copilot CLI, `/context` helps inspect context and `/compact` summarizes a long session. Start a fresh conversation when switching to an unrelated problem. Commands and context behavior vary by surface; verify them in your client.

## Match capability and context to the task

| Decision | Practical starting point | Check before adopting |
| --- | --- | --- |
| Model and reasoning | Use the capability needed for the task; consider a lighter model for a bounded, well-specified change and stronger reasoning for difficult diagnosis or planning. Auto or Fusion can select an execution pattern where available. | Run the same acceptance checks and review the result. A cheaper model that requires repeated correction may not be cheaper per completed task. |
| Instructions | Keep repository-wide guidance concise and stable; place relevant path-specific guidance or on-demand recipes in supported customization surfaces. | Verify support for the client and feature. Loading behavior differs; do not assume every instruction or tool schema appears on every request. |
| Tools and subagents | Enable only the tools needed for the task where configuration permits. Use focused subagents when their separate work justifies the extra calls and context. | Preserve required access and approvals. Subagents have their own usage; they are not free. |
| Cache | Keep reusable context and the chosen model stable within a session when practical. | Cache behavior, expiry and pricing vary by model and client. A necessary model or tool change may still be worth the cost. |

[Model governance](https://ragmha.github.io/field-guides/copilot-model-governance-guide/) covers model approval and availability. [GitHub's pricing reference](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing) distinguishes input, cached input, cache writes where applicable, and output; do not treat all tokens as equally priced or assume a fixed cache discount.

## Make recurring workflows do less unnecessary work

Scheduled and event-triggered automations multiply small inefficiencies by their run frequency. Start with a high-frequency or high-usage workflow and inspect actual runs before changing it:

1. **Find the waste.** Compare configured MCP tools with observed calls; inspect large responses, retries, repeated reads and blocked commands. A tool unused in a small sample may still be needed for an infrequent path.
2. **Move predictable work outside the agent where appropriate.** A setup step can fetch a known diff or changed-file list with `gh` before the agent starts. For runtime-dependent reads, use the authorized tool or CLI path that fits the workflow; do not assume CLI is always cheaper or a drop-in replacement.
3. **Keep the controls.** Use the approved identity and least privilege, protect credentials and untrusted input, and keep human review and required checks. Do not expose a token to the agent or weaken isolation to reduce costs.
4. **Compare outcomes.** Check representative runs and difficult cases before removing tools or changing models. Restore a capability if task coverage or quality regresses.

GitHub's [workflow case study](https://github.blog/ai-and-ml/github-copilot/improving-token-efficiency-in-github-agentic-workflows/) describes its own instrumentation, tool pruning and pre-agent data fetching. Its results are specific to those workloads, not a promised saving. Automated audits and optimizer suggestions also consume resources; introduce them only when their value and review process justify the overhead.

## Measure the effect, not just the tokens

**Guide advice:** Choose representative tasks and record a baseline before changing one lever at a time. Compare similar scope, complexity, model configuration and run frequency over a meaningful sample. Include successful completion, test and review outcomes, retries and human correction alongside usage.

| Evidence | What it can tell you | What it cannot prove alone |
| --- | --- | --- |
| Client or workflow telemetry, where available | Input, output, cached input or cache writes, calls, retries and time per run | Billed spend, complete coverage or correctness |
| GitHub billing data for the paying account | Credits consumed and metered charges in the reported scope and period | Whether a particular result was useful or correct |
| Tests, review and task outcomes | Whether the work met the same acceptance criteria | Exact token or credit cost |

Use the [reporting lesson](/reporting/) for ownership and reconciliation, and [the visualisation overview](/part-4/1-overview/) to select the right evidence. Token counts can move with workload size; model rates and cache categories can change the credit cost even when token totals do not. Include workflow frequency when estimating total impact. Avoid collecting prompts, code or identifiable usage beyond what policy permits, and do not use consumption as an individual performance score.

**Hypothetical comparison:** A team tests a narrower toolset on comparable pull requests. Credits per completed review fall, but a required finding is missed. The change fails the quality check despite lower usage. The team restores the necessary capability, repeats the comparison and records both the outcome and the billing period. No saving is assumed until the evidence supports it.

CLI AI-credit session limits — <span class="status caution">public preview - use with caution</span> — can help bound an experiment, but are soft limits: an in-progress response may exceed the setting. They do not replace user or enterprise budgets. Follow the [session-limit documentation](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/set-session-limit) and your organization's preview policy.
