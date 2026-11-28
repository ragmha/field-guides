---
title: Govern API and assignment entry points
section: Triggers & Entry Points
order: 3
description: Map each programmatic route to agent work to the credential it uses, the identity it acts as and who pays.
verified: "2026-11-27"
diagram: api-and-assignment-entry-points
checks:
  - question: Can a GitHub App installation token start a task through the agent tasks API?
    answer: No. That API accepts user-to-server tokens only, such as personal access tokens, OAuth tokens and GitHub App user tokens.
  - question: Can a GitHub App installation token run a shared automation?
    answer: Yes, if the installation belongs to the repository owner and has write permission for Agent tasks. Personal automations require a user token.
  - question: Who pays when Copilot CLI runs in an organization workflow with GITHUB_TOKEN?
    answer: Usage is metered to the organization, which requires the policy that allows Copilot CLI billed to the organization.
sources:
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-via-the-api
  - https://docs.github.com/en/rest/agent-tasks/agent-tasks
  - https://docs.github.com/en/rest/agent-automations/agent-automations
  - https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-in-actions
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions
---

## What you will learn

- Distinguish the programmatic entry points that start agent work.
- Record the credential, acting identity and billing owner of each.

## Each route carries its own credential

Agent sessions can [start from many places](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions), including the REST API, Copilot CLI, MCP and third-party integrations. Four routes matter most for unattended work:

- **Run an automation.** The [agent automations API](https://docs.github.com/en/rest/agent-automations/agent-automations) (**public preview**) accepts a `manual` event with up to 10,000 characters of extra context. An installation token from a GitHub App owned by the repository owner can run shared automations if it has write permission for Agent tasks. Personal automations require a user token. A success response does not confirm that a task was created.
- **Start an agent task.** The [agent tasks API](https://docs.github.com/en/rest/agent-tasks/agent-tasks) (**public preview**) starts a cloud agent task from a prompt. It accepts [user-to-server tokens only](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/use-cloud-agent-via-the-api); installation tokens are not supported. The reference says starting a task is for Copilot Business and Enterprise.
- **Assign an issue to Copilot.** Assignment through REST or GraphQL is in **public preview**. A fine-grained personal access token needs read access to metadata and read and write access to actions, contents, issues and pull requests. A classic token needs `repo`.
- **Copilot CLI in GitHub Actions.** With a personal access token, the workflow [acts as that user](https://docs.github.com/en/copilot/concepts/agent-capabilities/agent-powered-workflows-and-operations/copilot-cli-in-github-actions) and uses that user's Copilot entitlements. GitHub notes that this creates operational and security risks at scale. With `GITHUB_TOKEN` in an organization repository, usage is metered to the organization. This needs the **Allow use of Copilot CLI billed to the organization** policy and the `copilot-requests: write` workflow permission. GitHub [recommends GitHub Agentic Workflows](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-in-actions) over calling the CLI directly in workflow steps.

## Worked example: a nightly assignment script

**Hypothetical starting state:** A release team runs a nightly script that uses one engineer's classic personal access token to assign labeled issues to Copilot.

The reviewer maps the script. The credential is a long-lived user token with `repo` scope, and every task is requested as that engineer. The routine stops working when the engineer leaves or the token expires. The reviewer does not guess how the assigned tasks are billed and leaves that as an open question for the plan's billing documentation. The team considers a shared automation with an `issue_labeled` trigger instead. It needs no script, acts as Copilot and is billed to the repository owner.

**Outcome:** The team proposes a shared automation and plans to revoke the token after a sandbox trial. They do not claim the API route is unsafe, only that it ties cost and identity to one person.

## Practice: map your entry points

**Prerequisites:** A list of scripts, workflows and integrations that start Copilot work, or the hypothetical above.

1. For each route, record the credential type, who the work acts as and who is billed.
2. Mark any route that uses a personal token or a **public preview** endpoint.
3. In an authorized sandbox, check whether a shared automation or `GITHUB_TOKEN` workflow could replace each personal-token route. Change nothing in production.

**Expected result:** A table that shows which routes depend on one person.

<details>
<summary>Model answer</summary>

| Route | Credential | Requested as | Billed to |
| --- | --- | --- | --- |
| Nightly script | Classic PAT | Engineer | Open question; check billing docs |
| Shared automation run | App installation token | Copilot | Repository owner |
| CLI workflow | `GITHUB_TOKEN` | Installation | Organization |

Flag the PAT route for replacement, and flag every preview API dependency for change monitoring.

</details>
