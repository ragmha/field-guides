---
title: Bound tools and write scope
section: Permissions & Scope
order: 2
description: Select the fewest tools, restrict event-triggered writes and recognize what those controls do not cover.
verified: "2026-11-27"
diagram: tool-and-write-scope
checks:
  - question: Does choosing Only this issue limit what an automation's MCP tools can change?
    answer: No. The write-scope option does not limit MCP tools, which can reach whatever their server configuration and credentials allow.
  - question: What is the main documented way to control what an automation can do?
    answer: Selecting its tools. GitHub tools act only in the automation's repository.
sources:
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
---

## What you will learn

- Separate repository tools, MCP tools and inherited configuration.
- Apply write scope where it works and compensate where it does not.

## Four layers of reach

**Tools.** Selecting tools is the [primary control](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/about-automations) over what an automation can do. GitHub tools act only in the automation's repository. MCP server tools come from the repository's MCP settings. They can reach whatever the server's configuration and credentials allow, including other repositories and external systems. The [October 2026 update](https://github.blog/changelog/2026-10-28-new-tools-triggers-and-cost-controls-for-copilot-automations/) added 20 tools, including tools that merge pull requests and retry workflow runs. A **Suggest tools** option proposes a set for the prompt.

**Write scope.** For issue and pull request triggers, [**Configured tools can change**](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/create-automations) offers **Anything in this repository** or **Only this issue**. The option does not limit MCP tools. Repository configuration can make **Anything in this repository** unavailable. The [REST reference](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) says organization or repository policy may restrict event triggers to trigger-scoped writes. It also says the setting has no effect on scheduled runs.

**Inherited configuration.** Automations inherit the repository's custom instructions, agent skills, firewall rules, and secrets and variables. The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) notes that ordinary Actions secrets are not available to Copilot; agent sessions use their own secrets and variables. It also recommends CODEOWNERS review for Copilot and MCP configuration files.

**Prompt.** Do not put secrets in the prompt; use repository secrets instead.

Guide advice: treat merge and MCP tools as high-reach and add them only with a written reason. Prefer event triggers with **Only this issue** over schedules for work that changes one record.

## Worked example: a labeling routine

**Hypothetical starting state:** The support team drafts a shared automation that labels new issues. **Suggest tools** proposes labeling, commenting and an MCP connector to the team's ticket system. The trigger can change anything in the repository.

The reviewer keeps only the labeling tool and switches the trigger to **Only this issue**. The MCP connector is out of scope for a labeling task and could reach systems beyond the repository. The reviewer also checks that the repository's custom instructions don't ask the agent to do unrelated work.

**Outcome:** The run can only label the issue that triggered it. A later request to add the merge tool needs a separate review.

## Practice: minimize a tool set

**Prerequisites:** An automation design with a trigger, prompt and proposed tools, in an authorized sandbox or on paper.

1. List each tool and mark it as a GitHub tool or an MCP tool.
2. Remove every tool that the prompt does not need. Choose the narrowest write scope the trigger offers.
3. Record which reach remains uncontrolled by write scope: MCP tools and any schedule trigger.

**Expected result:** A minimal tool list and a note of reach that needs another control.

<details>
<summary>Model answer</summary>

Keep only the labeling tool and set **Only this issue**. Note that neither control would limit an MCP connector. If the routine later moves to a schedule, the write scope stops applying, and tool selection becomes the only limit on what the run changes.

</details>
