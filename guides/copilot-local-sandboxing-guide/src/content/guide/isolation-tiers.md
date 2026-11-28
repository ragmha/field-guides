---
title: Pick an isolation tier
section: Isolation and Response
order: 22
description: Compare local sandboxing, dev containers, codespaces and cloud sandboxes for agent work.
verified: "2026-11-27"
diagram: isolation-tiers
checks:
  - question: Do local sandbox settings apply to a Copilot cloud sandbox session?
    answer: No. They are separate technologies; settings, policies and commands for one do not apply to the other.
  - question: What isolation does each codespace get?
    answer: Its own newly built virtual machine and isolated virtual network, with outbound internet allowed.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
  - https://docs.github.com/en/codespaces/reference/security-in-github-codespaces
  - https://code.visualstudio.com/docs/agents/run/agent-sandboxing
---

## What you will learn

- Compare what each isolation option separates from your machine.
- Choose a tier that matches the trust level of the repository and task.

## Four tiers, different boundaries

The [Copilot CLI documentation](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) suggests a local or cloud sandbox, or a virtual machine, container or dedicated system with tightly controlled permissions and network, to reduce risk.

- **Local sandbox:** operating system restrictions on your machine. It runs as you and is not a virtual machine.
- **Dev container:** the agent runs inside a container. To run the VS Code [agent sandbox](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) inside a Dev Container, VS Code documents Docker options, such as unconfined seccomp and AppArmor, that relax some container isolation. Sandbox dependencies must be installed in that environment.
- **Codespace:** [Security in GitHub Codespaces](https://docs.github.com/en/codespaces/reference/security-in-github-codespaces) says each codespace gets its own newly built virtual machine and isolated network, with outbound internet allowed. Its GitHub token is scoped to the repository and expires automatically. A repository's `devcontainer.json` can run arbitrary code, such as a `postCreateCommand`. For untrusted repositories, open the codespace in the browser and keep Settings Sync off.
- **Cloud sandbox:** [About cloud sandboxes](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) describes a GitHub-hosted Linux environment that runs the whole session off your machine. Start one from Copilot CLI with `copilot --cloud`. Local sandbox settings do not apply to it, and cloud agent security is a separate course.

## Worked example: an untrusted repository

**Hypothetical starting state:** A security engineer must ask an agent to triage a public repository reported as malicious. Their laptop holds production credentials, and the team's default is local sandboxing.

As advice, they rule out the laptop, because the sandbox still runs as them and approved bypasses would expose their secrets. They compare a codespace and a cloud sandbox. The codespace gives a separate virtual machine but runs `devcontainer.json` commands, so they review that file first, open the codespace in the browser and add no secrets. For a hands-off triage run, a cloud sandbox keeps the session off their machine entirely.

**Outcome:** The work runs in a disposable remote environment with no production credentials. The choice is recorded with its residual risk: outbound internet remains available.

## Practice: map tasks to tiers

**Prerequisites:** A list of three agent tasks from your team, and the sources above.

1. Rate each repository as trusted, partly trusted or untrusted.
2. Note which credentials and networks each task needs.
3. Choose local sandbox, dev container, codespace or cloud sandbox for each task.
4. Write one residual risk for each choice.

**Expected result:** A table of task, trust level, tier and residual risk, with no untrusted repository run directly on a credentialed laptop.

<details>
<summary>Model answer</summary>

Internal service fix: local sandbox, residual risk is shared user identity. Contractor repository: dev container with no host credential mounts, residual risk is relaxed container options. Untrusted public repository: codespace in the browser or a cloud sandbox, residual risk is outbound internet and any token in the environment.

</details>
