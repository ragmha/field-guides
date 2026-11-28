---
title: Evaluate allowlists and deny precedence
section: Allowlists and Registries
order: 6
description: Walk through how supported clients decide whether a server runs, and why a deny always wins.
verified: "2026-11-27"
diagram: allowlist-evaluation
checks:
  - question: A server matches both allowedMcpServers and deniedMcpServers. Does it run?
    answer: No. Deny rules always take precedence over allow rules, so the server is blocked.
  - question: What happens if the managed-settings JSON is malformed?
    answer: It is treated as an empty allowlist, so every server is blocked except built-in defaults.
  - question: Two managed sources each define an allowlist. Which servers can run?
    answer: Only servers permitted by every source. The effective allowlist is the intersection, while denylists combine as a union.
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings
---

## What you will learn

- Apply the four-step evaluation order to a server.
- Predict the result when several managed sources disagree.
- Recognize failure behavior for malformed or unavailable settings.

## The evaluation order

The [allowlist how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-enterprise-allowlist) documents the order supported clients use:

1. **Built-in defaults are allowed**, such as the GitHub MCP server.
2. **Any deny match blocks** the server.
3. **If an allowlist exists**, a server with no match is blocked.
4. **An unresolved variable** such as `${VARIABLE}` in the URL or command blocks the server.

The [managed settings reference](https://docs.github.com/en/copilot/reference/enterprise-administrators/enterprise-managed-settings) adds detail. Omitting `allowedMcpServers` allows all servers subject to denies; an empty array blocks everything except built-ins. `deniedMcpServers` blocks a server even when it is allowlisted. When several sources define these keys, allowlists **intersect** and denylists form a **union**. First-party Copilot servers are exempt from deny rules, although in Copilot CLI the account MCP policy can still stop the built-in GitHub server.

Per the reference, the two keys are supported in Copilot CLI, VS Code, the Copilot app, Copilot in the cloud (sandbox) and JetBrains IDEs, but not in Copilot in the cloud running on GitHub Actions.

**Failure behavior.** Malformed JSON is treated as an empty allowlist. If a client cannot retrieve policy, it keeps the previously enforced policy, which can become more restrictive but not less. The [deployment how-to](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/use-managed-settings/deploy-managed-settings) notes that server-managed settings reach clients within about an hour, and that MDM or file-based delivery suits restrictions that must hold without a server response.

## Worked example: a surprise block

**Hypothetical starting state:** The Cedar tooling team allowlists `https://mcp.example.com/*` in server-managed settings. A security group separately deploys a file-based allowlist that lists only `serverCommand` entries. Developers report the remote server is blocked.

Because allowlists intersect, the remote URL must match **both** sources. The file-based list has no URL entry, so step 3 blocks it.

**Outcome:** The teams agree on one owner for allowlist content and add the URL entry to the file-based source, recording the intersection rule in their runbook.

## Practice: trace three servers

**Prerequisites:** A text editor and an authorized sandbox; no deployment needed.

1. Draft a `managed-settings.json` with one `serverUrl` allow entry and one `serverCommand` deny entry.
2. Trace a remote server that matches the allow entry.
3. Trace a local server that matches the deny entry and also an allow entry.
4. Trace a remote server whose URL contains `${TOKEN_HOST}` that is never set.

**Expected result:** Allowed, blocked at step 2, and blocked at step 4.

<details>

<summary>Model answer</summary>

The first server passes steps 2 and 3. The second is blocked at step 2 because deny wins over allow. The third is blocked at step 4 because the variable is unresolved, even if a wildcard allow entry would otherwise match.

</details>
