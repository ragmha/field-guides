---
title: Propagate and test a rule
section: Testing & Change Evidence
order: 14
description: Account for propagation time, reload clients and run the documented inline and chat tests.
verified: "2026-11-27"
diagram: propagation-and-testing
checks:
  - question: How long can an exclusion change take to reach IDEs that already loaded settings?
    answer: Up to 30 minutes, according to GitHub's documentation.
  - question: How do you load new exclusion settings immediately in VS Code?
    answer: 'Run "Developer: Reload Window" from the Command Palette.'
  - question: What should happen in the documented chat test?
    answer: Copilot should not use the excluded file to answer "explain this file" and should not list it as a reference.
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Plan for propagation delay after a change.
- Reload each IDE family to pick up new settings.
- Run a control-and-subject test for inline suggestions and chat.

## Propagation and reload

[Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) states that a change can take up to 30 minutes to take effect in IDEs where settings are already loaded. To load it sooner:

- **JetBrains IDEs and Visual Studio:** close and reopen the application.
- **VS Code:** run **Developer: Reload Window** from the Command Palette.
- **Vim/Neovim:** exclusions are fetched each time you open a file.

## The documented test

1. Open a file that is not excluded and confirm that inline suggestions appear. This is your control.
2. Open an excluded file and type. No inline suggestions should appear.
3. For chat, open the excluded file, close other files, attach the excluded file as context and ask `explain this file`. Copilot should not use the file to answer and should not list it as a reference.

Guide advice: always run the control step. Without it, "no suggestion" could mean the client is signed out, rate limited or offline rather than that the rule works.

## Worked example: a quick false pass

**Hypothetical starting state:** The fictional `ledger-service` team excludes `/fixtures/accounts.json`, saves the rule and immediately opens the file in VS Code. No suggestion appears, and the engineer marks the test as passed.

A reviewer asks for the control result. The engineer opens `src/report.ts` and also gets no suggestion: the extension is signed out. After signing in and running **Developer: Reload Window**, the control file shows suggestions, the excluded file shows none, and the chat test returns an answer that does not reference the fixture.

**Outcome:** The test record now has a passing control, a passing subject, a chat result and the reload method used.

## Practice: run the test in a sandbox

**Prerequisites:** An authorized sandbox repository on a Copilot Business or Copilot Enterprise plan, a fictional non-sensitive file excluded by rule, and VS Code or a JetBrains IDE.

1. Reload the IDE using the documented method.
2. Run the control step in a non-excluded file.
3. Run the inline test in the excluded file.
4. Run the chat test and record whether the file appears as a reference.

**Expected result:** A four-line test record showing reload method, control suggestion, no subject suggestion and no chat reference.

<details>
<summary>Model answer</summary>

Reload: Developer: Reload Window. Control: suggestion shown in `src/app.ts`. Subject: no suggestion in `/sandbox/excluded.txt`. Chat: "explain this file" answered without using or referencing `/sandbox/excluded.txt`. Result: pass, recorded with date and tester.

</details>
