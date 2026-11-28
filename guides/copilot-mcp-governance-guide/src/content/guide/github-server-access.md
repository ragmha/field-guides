---
title: Extend the GitHub MCP server carefully
section: Credentials and Secrets
order: 15
description: Keep the built-in GitHub MCP server read-only and narrow when the agent needs more access.
verified: "2026-11-27"
diagram: github-server-access
checks:
  - question: What access does the built-in GitHub MCP server have in a cloud agent session by default?
    answer: A specially scoped token with read-only access to the current repository.
  - question: Which credential does GitHub recommend when the agent needs to read other repositories?
    answer: A fine-grained personal access token with read-only permissions, stored as COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN, or a GitHub App token.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers
  - https://docs.github.com/en/copilot/concepts/customizations/mcp
---

## What you will learn

- Describe the default access of the built-in GitHub MCP server.
- Choose a credential when wider access is required.
- Reduce the tools the server exposes.

## Default and widened access

The [repository configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers) says the GitHub and Playwright MCP servers are enabled by default for the cloud agent. The built-in GitHub MCP server uses a specially scoped token with **read-only access to the current repository**.

When a task needs more, such as reading other repositories, you can supply a personal access token in a secret named `COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN`. GitHub recommends a fine-grained token with read-only permissions. A GitHub App token is another option. Use secrets rather than variables so the value is available in the cloud sandbox.

The [MCP concepts page](https://docs.github.com/en/copilot/concepts/customizations/mcp) lists best practices that apply directly: scope credentials, and do not broaden the default token unnecessarily. It also notes that GitHub MCP server **toolsets** can reduce the tools exposed, and that push protection secures GitHub MCP server interactions for public repositories and private repositories covered by GitHub Advanced Security.

Recommended: treat a widened GitHub token as an exception with an owner, a list of repositories, an expiry and a reason. Prefer a token that belongs to a service account or app, because repository MCP configuration is used by everyone with write access.

## Worked example: cross-repository reads

**Hypothetical starting state:** The Aspen platform team wants the cloud agent to read a shared design-system repository while working in a product repository. A developer proposes storing their own classic token with write scopes.

The reviewers reject the classic token. They create a fine-grained, read-only token owned by a service account, limited to the two repositories, with an expiry, and store it as a repository Agents secret named `COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN`. They also limit the server to the toolsets the task needs.

**Outcome:** The agent can read both repositories, cannot write through the token, and the exception has a review date.

## Practice: specify a token exception

**Prerequisites:** An authorized sandbox organization with two test repositories; do not create tokens against production repositories.

1. Write the task that requires access beyond the current repository.
2. List the repositories and the minimum read permissions.
3. Choose a fine-grained token or a GitHub App and name an owner.
4. Choose the secret level and an expiry date.

**Expected result:** A one-paragraph exception record that names scope, owner, storage and expiry.

<details>

<summary>Model answer</summary>

"Task: read the design-system repository. Credential: fine-grained, read-only contents access to two repositories, owned by the platform service account, expires in 90 days. Stored as a repository Agents secret named COPILOT_MCP_GITHUB_PERSONAL_ACCESS_TOKEN. Toolsets limited to repository reading."

</details>
