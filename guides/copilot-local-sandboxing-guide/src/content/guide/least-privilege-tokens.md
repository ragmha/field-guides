---
title: Keep developer tokens least-privileged
section: Credential Exposure
order: 19
description: Find the tokens local agents can use and replace broad, long-lived ones with narrow choices.
verified: "2026-11-27"
diagram: least-privilege-tokens
checks:
  - question: If GH_TOKEN is set and you also signed in with copilot login, which token does Copilot CLI use?
    answer: GH_TOKEN. Environment variables silently override the stored OAuth token.
  - question: Which permission must a fine-grained personal access token have for Copilot CLI?
    answer: The Copilot Requests account permission, on a token owned by your personal account.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing
  - https://code.visualstudio.com/docs/agents/run/security
---

## What you will learn

- Trace which token Copilot CLI uses and which tokens commands can see.
- Replace broad or plaintext tokens with narrower options.

## Know which token is in play

[Authenticating Copilot CLI](https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli) lists the order Copilot CLI checks: `COPILOT_GITHUB_TOKEN`, `GH_TOKEN`, `GITHUB_TOKEN`, the OAuth token in the system keychain, then the GitHub CLI token. An environment variable silently overrides a stored OAuth token, so a `GH_TOKEN` set for another tool takes over. OAuth through `copilot login` is the recommended interactive method and is stored in the keychain. If no keychain is available, the CLI offers to store the token in plaintext in `~/.copilot/config.json`. Fine-grained personal access tokens must be owned by your personal account and have the **Copilot Requests** permission. Classic personal access tokens are not supported.

The tokens Copilot uses are only part of the picture. Any variable in the shell is visible to unsandboxed commands. [Understanding local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/understanding-local-sandboxing) notes that developer tool access can include configuration files that hold registry credentials. The [VS Code security guidance](https://code.visualstudio.com/docs/agents/run/security) recommends limiting the tools and credentials available to a session.

## Worked example: a borrowed GH_TOKEN

**Hypothetical starting state:** A developer's shell profile exports `GH_TOKEN`, a broad, long-lived token created for release scripts. They also signed in with `copilot login`. A headless Linux test box stores another token in plaintext in `~/.copilot/config.json`.

The reviewer traces the order: `GH_TOKEN` wins, so Copilot CLI uses the release token, and every unsandboxed command can read it. As advice, they remove the export from the profile, load it only in the release script, and rely on keychain OAuth for interactive use. For the headless box, they install a keychain backend or use a short-lived fine-grained token with only **Copilot Requests**, supplied per run.

**Outcome:** Interactive sessions use the OAuth token, the release token is no longer in every shell, and no plaintext broad token remains on disk.

## Practice: trace your token chain

**Prerequisites:** A test account and shell. List variable names and token prefixes only; never print full values.

1. Check whether `COPILOT_GITHUB_TOKEN`, `GH_TOKEN` or `GITHUB_TOKEN` is set, and where it is exported.
2. Check whether `~/.copilot/config.json` holds a stored token.
3. Predict which token Copilot CLI will use.
4. Write one change that narrows or removes each broad token.

**Expected result:** A short table of token sources in precedence order, the predicted winner, and a narrowing action for each.

<details>
<summary>Model answer</summary>

`GH_TOKEN` is exported in `.bashrc` (prefix `github_pat_`), and the keychain holds an OAuth token (`gho_`). The CLI uses `GH_TOKEN`. Action: move `GH_TOKEN` into the script that needs it and use keychain OAuth interactively. No plaintext token was found. Remaining broad tokens are masked or excluded in sandboxed sessions.

</details>
