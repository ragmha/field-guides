---
title: Write CLI tool and path rules
section: Auto-Approval Rules
order: 10
description: Combine Copilot CLI tool, path and URL permissions so routine work runs and risky actions stop.
verified: "2026-11-27"
diagram: cli-tool-rules
checks:
  - question: If a Copilot CLI tool matches both --allow-tool and --deny-tool, which wins?
    answer: The deny rule. Denials take precedence over allows, including over --allow-all-tools.
  - question: Which paths can Copilot CLI access without approval by default?
    answer: The current working directory, its subdirectories and the system temporary directory.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli
---

## What you will learn

- Write `--allow-tool` and `--deny-tool` rules using the documented patterns.
- Explain the default path and URL permissions and their limits.

## Three permission layers

The [Copilot CLI documentation](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-cli) describes tool approval flags. `--allow-tool` and `--deny-tool` take patterns: `shell(COMMAND)` for shell commands, `write` for file changes, and `MCP_SERVER_NAME(tool)` for one MCP tool. For `git` and `gh`, a pattern can name a first-level subcommand, such as `shell(git push)`. Deny rules take precedence over allow rules, even with `--allow-all-tools`. The documented example allows everything except `rm` and `git push`:

```bash
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

[Configuring Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/configure-copilot-cli) adds two more layers. **Paths:** by default Copilot can use the current working directory, its subdirectories and the system temporary directory. Path detection is heuristic; complex shell constructs, limited environment-variable expansion and symlinks can defeat it. `--allow-all-paths` widens access and `--disallow-temp-dir` narrows it. **URLs:** every URL needs approval by default. This covers web fetches and shell commands such as `curl` and `wget`, and `http` and `https` are treated separately. Use `--allow-url` and `--deny-url` for specific hosts. `--available-tools` removes tools from the session entirely.

## Worked example: a scripted lint fix

**Hypothetical starting state:** A developer wants a programmatic run, `copilot -p "fix lint errors"`, to edit files and run the linter. It must not push, delete files or call arbitrary URLs. They first try `--allow-all`.

The reviewer, as advice, replaces `--allow-all` because it also approves all paths and URLs. The new command allows `write` and `shell(npm)`, and denies `shell(rm)` and `shell(git push)`. It keeps default path and URL permissions. Because subcommand patterns are documented only for `git` and `gh`, the reviewer treats `shell(npm)` as covering every `npm` subcommand, including publishing. They add local sandboxing to limit what any approved command can reach.

**Outcome:** The run can edit and lint. Pushes and deletes are denied, and URLs and paths outside the working directory still need approval, so a non-interactive run denies them.

## Practice: draft a rule set

**Prerequisites:** Copilot CLI on a test repository. Use a branch you can discard.

1. Write the task and list the tools it genuinely needs.
2. Build a command with `--allow-tool` entries for those tools and `--deny-tool` entries for destructive or publishing commands.
3. Decide whether any extra paths or URLs are needed, and add only those.
4. Run the command with a harmless prompt and note any denied request.

**Expected result:** A command that completes the task, with each allow and deny rule justified and no `--allow-all` flags.

<details>
<summary>Model answer</summary>

`copilot -p "fix lint errors" --allow-tool='write' --allow-tool='shell(npm)' --deny-tool='shell(rm)' --deny-tool='shell(git push)' --sandbox`. No extra paths or URLs are allowed. The notes record that `shell(npm)` is treated as covering all npm subcommands and that path detection is heuristic, which is why sandboxing is on.

</details>
