---
title: Export formats and their risks
section: Sharing and Export
order: 15
description: Choose between links, gists, files and chat exports, knowing which copies leave GitHub's controls.
verified: "2026-11-27"
diagram: export-formats
checks:
  - question: Where does /share file write by default?
    answer: A copilot-session-SESSIONID.md file in the current directory.
  - question: Who cannot use /share gist?
    answer: Enterprise Managed Users and users on GHE.com data residency.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle
  - https://code.visualstudio.com/docs/agents/run/sessions/session-history
---

## What you will learn

- Compare the CLI share and export targets with VS Code export and copy options.
- Decide which outputs need separate handling because GitHub can no longer revoke them.

## Share and export targets

In Copilot CLI, `/export` is an alias of `/share`. The [CLI session data how-to](https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle) documents these targets:

| Command | Result | Revocable through GitHub? |
| --- | --- | --- |
| `/share link` | Link to the session on GitHub.com | Yes, with `/share off` |
| `/share gist` | Private gist | Delete the gist |
| `/share file [PATH]` | `copilot-session-SESSIONID.md`, current directory by default | No, it is a local file |
| `/share html [PATH]` | `copilot-session-SESSIONID.html` | No, it is a local file |

Gists are not available for Enterprise Managed Users or for GHE.com data residency.

VS Code documents two more options on its [session history page](https://code.visualstudio.com/docs/agents/run/sessions/session-history). **Chat: Export Chat...** saves all prompts and responses of a session as a JSON file. Right-clicking in the Chat view offers **Copy**, **Copy All** and **Copy Final Response**, which copy Markdown that can include thinking steps and tool calls. VS Code notes that exporting and copying create standalone records separate from sync, and warns that they can contain sensitive prompts, responses or tool output.

## Copies have their own lifecycle

Deleting or unsharing a session does not reach a file you exported, a message you pasted elsewhere or, unless you delete it, a gist. Guide advice: treat every export as a new document with its own owner, storage location and retention, and review it for secrets before sending it anywhere.

## Worked example: an incident write-up

**Hypothetical starting state:** The platform team wants an incident write-up to include a CLI session transcript. The repository is private. The team's accounts are Enterprise Managed Users.

`/share gist` is unavailable for Enterprise Managed Users. A `/share link` would show the full session to anyone with repository access, which matches the audience. The write-up itself needs a static copy, so the developer uses `/share file` to create Markdown, reviews and redacts it, and attaches the reviewed file.

**Outcome:** Readers with repository access use the link; the write-up holds a reviewed static copy. The team records that the Markdown file follows the write-up's retention, not the session's.

## Practice: pick an export

**Prerequisites:** The table above. An authorized sandbox account if you want to try commands.

1. For each audience, choose a target: (a) a teammate with repository access, (b) a document stored outside GitHub, (c) a VS Code session you want to keep as a file.
2. For each choice, state how it would be revoked or deleted.
3. In a sandbox, try only `/share` with no arguments and confirm that it opens a menu. Without a sandbox, compare with the model answer.

**Expected result:** Three choices, each with a matching revocation or deletion step.

<details>
<summary>Model answer</summary>

(a) `/share link`, revoked with `/share off`. (b) `/share file` or `/share html`, reviewed first; delete it according to the document's retention. (c) **Chat: Export Chat...** JSON or **Copy All**; the copy must be deleted wherever it was stored.

</details>
