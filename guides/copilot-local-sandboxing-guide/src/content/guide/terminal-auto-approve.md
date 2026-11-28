---
title: Tune VS Code terminal auto-approval
section: Auto-Approval Rules
order: 11
description: Write terminal auto-approval rules that run routine commands and still stop risky ones.
verified: "2026-11-27"
diagram: terminal-auto-approve
checks:
  - question: In chat.tools.terminal.autoApprove, what does a rule set to false do?
    answer: It makes the matching command ask for approval; it does not block the command.
  - question: How is a chained command such as npm run lint && curl handled?
    answer: It prompts if any part of the chain requires approval.
  - question: Does an approved rule npm run build also approve npm run deploy?
    answer: No. Prefix matching allows added arguments to npm run build, not a different script.
sources:
  - https://code.visualstudio.com/docs/agents/run/approvals
  - https://code.visualstudio.com/docs/agents/run/agent-sandboxing
---

## What you will learn

- Write string and regular-expression rules for terminal auto-approval.
- Predict how VS Code evaluates conflicting and chained commands.

## How terminal rules match

VS Code [approvals](https://code.visualstudio.com/docs/agents/run/approvals) let you configure `chat.tools.terminal.autoApprove` in User settings. Each key is a command or a regular expression in slashes, such as `"/^npm run lint$/"`. A value of `true` runs the command without a prompt; `false` makes it ask, but does not block it. String rules match by prefix, so `npm run build` approves `npm run build --watch` but not `npm run deploy`. A rule can also set `matchCommandLine` to match against the full command line.

When rules conflict, an explicit ask wins over an allow. A chained command, such as one joined with `&&` or a pipe, prompts if any part requires approval. `chat.tools.terminal.enableAutoApprove` turns the feature on or off, and an experimental setting ignores the built-in default rules. URLs have a separate list, `chat.tools.urls.autoApprove`.

The documentation calls matching best effort and recommends the [agent sandbox](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) to restrict what commands can do. A request to **Allow Outside Sandbox** is a different approval from a terminal rule.

## Worked example: lint and test without prompts

**Hypothetical starting state:** A team wants agents to run lint and tests without prompting. A developer added `"npm": true`, which approves every npm command, and has no rules for deletes.

The reviewer, as advice, replaces the broad key with an anchored pattern and adds explicit asks:

```json
{
  "chat.tools.terminal.autoApprove": {
    "/^npm run (lint|test)$/": true,
    "rm": false,
    "git push": false
  }
}
```

They test three commands. `npm run lint` runs without a prompt. `npm publish` prompts, because no rule allows it. `npm run test && curl https://example.com` prompts, because `curl` has no allow rule.

**Outcome:** Routine commands run, publishing and chained network calls prompt, and deletes and pushes always ask. The sandbox still limits what an approved command can reach.

## Practice: test a rule set

**Prerequisites:** VS Code with an agent session on a test workspace, and User settings you can edit. Use harmless commands.

1. Write two anchored allow rules for your routine commands.
2. Add `false` rules for deletes and pushes.
3. Ask the agent to run an allowed command, an unlisted command and a chain that mixes both.
4. Record which commands prompted and why.

**Expected result:** The allowed command runs without a prompt; the unlisted command and the mixed chain both prompt.

<details>
<summary>Model answer</summary>

`"/^npm run (lint|test)$/": true`, `"rm": false` and `"git push": false`. `npm run lint` runs. `npm install left-pad` prompts, because no rule matches it. `npm run test && rm -rf build` prompts, because one part has an explicit ask. The notes state that rules are best-effort and the sandbox remains on.

</details>
