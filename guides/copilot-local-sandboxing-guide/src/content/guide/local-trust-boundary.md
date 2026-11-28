---
title: Map the local trust boundary
section: Local Risk Model
order: 2
description: Inventory what a command run by a local Copilot agent can read, change, reach and authenticate as.
verified: "2026-11-27"
diagram: local-trust-boundary
checks:
  - question: Without local sandboxing, what access do shell commands run by Copilot have?
    answer: The same access as your user account, including files, network and credentials.
  - question: Does a Git worktree isolate an agent from the rest of your machine?
    answer: No. A worktree separates files for the task; it does not limit machine access.
  - question: Are remote MCP servers covered by local sandboxing?
    answer: No. Local sandboxing applies to local processes; remote MCP servers are never sandboxed.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://code.visualstudio.com/docs/agents/run/security
---

## What you will learn

- Describe the four kinds of reach a local agent inherits from your account.
- Separate controls that limit the agent from controls that only organize its work.

## The agent runs as you

Copilot CLI and agent sessions in Visual Studio Code can read files, edit them and run shell commands on the machine where they run. The [Copilot CLI documentation](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) warns that allowing all tools gives Copilot the same access as you to files and shell commands. [About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) states that local sandboxing is off by default and that, without it, shell commands run with your full user access: your files, your network and your credentials.

A practical inventory has four rows:

- **Files:** the repository, plus your home directory, SSH keys, cloud CLI profiles and `.env` files that your account can read.
- **Network:** the public internet and any private or local network your machine can reach.
- **Credentials:** tokens in environment variables, credential helpers and configuration files.
- **Processes:** child processes, local MCP servers and language servers started for the session.

Some controls organize work without containing it. The [VS Code security guidance](https://code.visualstudio.com/docs/agents/run/security) notes that a worktree separates files but not machine access. Local sandboxing itself is lighter-weight operating system containment, not a virtual machine or container. It covers shell commands, file search and, by default, local MCP and language servers. Built-in file tools check policy on a best-effort basis, and remote MCP servers are never sandboxed.

## Worked example: a reach inventory

**Hypothetical starting state:** A developer runs Copilot CLI in a service repository with local sandboxing off. Their shell exports a deployment token, `~/.aws` holds a cloud profile, and the laptop is on a VPN with access to an internal package mirror.

The reviewer writes one row per kind of reach. Files: the repository and everything the account can open, including `~/.aws`. Network: the internet and the VPN-reachable mirror. Credentials: the exported token and the cloud profile. Processes: anything the agent starts, plus local servers launched for the session.

**Outcome:** The inventory shows that the repository is only a small part of the reachable surface. The reviewer notes which rows later controls must narrow: approvals for commands, the sandbox for files and network, and credential masking for tokens.

## Practice: inventory one developer machine

**Prerequisites:** A test machine or account you are allowed to inspect, and the two GitHub sources above. Do not print secret values.

1. List the directories outside the repository that hold credentials or sensitive data, by path only.
2. List environment variable names that hold tokens, without their values.
3. Note which private or local networks the machine can reach.
4. Mark which rows a worktree, an approval prompt or a sandbox would change.

**Expected result:** A four-row inventory naming paths, variable names and networks, with the control that would narrow each row.

<details>
<summary>Model answer</summary>

Files: repository, `~/.ssh`, `~/.aws`, project `.env` files. Credentials: `GH_TOKEN`, a deployment token, a cloud profile. Network: internet, VPN mirror. Processes: shell children and local servers. A worktree changes none of these rows. Approvals gate individual actions, while a sandbox restricts files, network and, with masking, credentials for sandboxed processes.

</details>
