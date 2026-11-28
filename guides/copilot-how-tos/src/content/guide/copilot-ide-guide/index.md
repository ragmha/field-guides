---
kind: landing
title: Copilot in your IDE
description: Set up and use GitHub Copilot in VS Code, with client-specific differences called out.
reviewed: 2026-11-23
sources:
  - https://docs.github.com/en/copilot/get-started/plans
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/install-copilot-extension
  - https://code.visualstudio.com/docs/setup/copilot
  - https://docs.github.com/en/copilot/get-started/quickstart-for-using-github-copilot-in-your-ide
---

This practical guide takes you from checking Copilot access to making and reviewing one small change in Visual Studio Code. It is for developers who want to stay in control of their work while using suggestions and chat as helpful inputs—not as a substitute for understanding, testing, or review.

The examples follow **Rin**, who is practicing on a fictional reading-list utility. They use small, reversible steps and avoid real customer data, credentials, production systems, or changes outside the practice project.

## What you will do

1. Check account access, editor prerequisites, and project safety.
2. Set up Copilot in VS Code and confirm that the right account is active.
3. Try an inline suggestion and an **Ask**-mode explanation.
4. Make a tiny, clearly scoped change.
5. Run the project’s relevant tests and inspect the complete diff.

The six lessons are grouped into three parts: **Get started**, **Work with Copilot**, and **Make and verify a change**. Follow them in order if this is your first time using Copilot in an IDE; otherwise, jump to the skill you need.

## Before you begin

- Have a GitHub account and access to a Copilot plan. An eligible account may use Copilot Free; availability, included usage, and features can change, and organization policies can restrict them. Check the current plan details and ask your administrator if access is managed.
- Install a current version of VS Code and be able to open a local practice folder.
- Use a small project you are allowed to share with the service. Check your organization’s rules before sending work code; never paste credentials, private keys, personal data, or confidential material into a prompt.
- Keep your usual version-control safety net. Start from a clean working tree or know which existing changes are yours.

## How to use this guide safely

Treat every suggestion and explanation as a draft. Read it, compare it with your goal and the surrounding code, then choose whether to use it. Prefer **Ask** when you want an explanation without asking Copilot to change files. For edits, define a narrow outcome, review the changed lines, and run checks yourself.

VS Code is the walkthrough client. Menus, available features, setup steps, and keyboard shortcuts can differ in JetBrains IDEs, Visual Studio, and other supported environments. Use the documentation for your own client rather than assuming a VS Code shortcut transfers.

## Completion check

You are done when you can identify the account and project context Copilot is using, explain the change you kept, run an appropriate check, and account for every line in the diff. If any of those checks fails, discard or undo the change and try again with a smaller request.

### Self-check

- **Why use a practice folder for a first experiment?** It keeps the exercise bounded and makes it easier to recognize and undo your own changes.
- **Does an accepted suggestion count as verified code?** No. Review it against the goal and test it in the project.
