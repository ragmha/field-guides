---
title: Compare permission modes
section: Approval Modes
order: 6
description: Match manual, assisted and allow-all permission modes to the work and the environment.
verified: "2026-11-27"
diagram: permission-modes
checks:
  - question: Does allow-all permission mode in VS Code turn off the agent sandbox?
    answer: No. Allow all changes approvals; sandbox restrictions still apply when sandboxing is on.
  - question: What happens to a request that still needs approval in a non-interactive or autopilot run?
    answer: It is denied, because no person is available to approve it.
  - question: Is assisted mode a substitute for sandboxing?
    answer: No. It is an AI review of requests, consumes AI credits and does not review sandbox bypass requests.
sources:
  - https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
  - https://code.visualstudio.com/docs/agents/run/approvals
---

## What you will learn

- Describe manual, assisted and allow-all permission modes.
- Pick a default mode for a type of work and explain its limits.

## Three ways to answer a request

[Allowing safe commands](https://docs.github.com/en/copilot/concepts/customizations/allowing-safe-commands) describes three modes. **Manual** asks you before tools that need approval. **Assisted** sends each request to an AI safety review that can approve low-risk actions and escalate the rest to you. **Unconditional** (allow-all) approves everything. In Copilot CLI, use `/permissions manual`, `/permissions assisted` or `/permissions allow-all` (also `/yolo`). [Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) explains that `--allow-all` or `--yolo` allows all tools, paths and URLs at once, and that an enterprise can block it.

VS Code [approvals](https://code.visualstudio.com/docs/agents/run/approvals) use the same three levels: Manual (the default, where not every command prompts), Assisted and Allow all. Autopilot is a separate agent mode, not a permission level. Allow all does not turn off the sandbox.

Assisted mode has limits. Each review consumes AI credits. It can satisfy enterprise `ask` rules for shell, read, write and URL requests, but it does not review requests to bypass the sandbox. In autopilot or non-interactive runs, any request that still needs approval is denied. GitHub states that assisted mode is not a substitute for sandboxing. A default mode can be set with `defaultPermissionMode` in `~/.copilot/settings.json`; managed settings can override it or disable modes, which the managed-settings course covers.

## Worked example: two kinds of work

**Hypothetical starting state:** A team uses Copilot CLI for two jobs: exploring unfamiliar code that changes often, and routine dependency updates in a well-understood service. Some developers use `--yolo` for both.

The lead, as advice, sets manual mode as the default for exploration, because a person should see each new command. For dependency updates they allow assisted mode, with local sandboxing on, so reviews cover routine actions while the sandbox limits files and network. They drop `--yolo`, because allow-all removes prompts for tools, paths and URLs together.

**Outcome:** Each kind of work has a stated mode and a reason. Neither choice treats an approval mode as containment; the sandbox does that job.

## Practice: write a mode decision table

**Prerequisites:** Copilot CLI or VS Code on a test machine, and the sources above. Do not run destructive commands.

1. List three kinds of agent work your team does.
2. For each, choose manual, assisted or allow-all, and write one sentence of reasoning.
3. Note whether local sandboxing is required for that work.
4. Run `/permissions` in a test CLI session to confirm the active mode.

**Expected result:** A table of work type, mode, sandbox requirement and reason, plus a confirmed active mode in a test session.

<details>
<summary>Model answer</summary>

Exploration: manual, sandbox on, because commands are novel. Routine updates: assisted, sandbox on, because the AI review handles routine actions and the sandbox contains mistakes. Disposable cloud or container experiments: allow-all only in an environment you can discard. No row relies on the approval mode alone for containment.

</details>
