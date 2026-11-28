---
kind: lesson
title: Prepare a trusted workspace
description: Establish the starting state and boundaries before launching the CLI.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli
---

## Prerequisites

Install and authenticate Copilot CLI using the [official instructions](https://docs.github.com/copilot/how-tos/use-copilot-agents/use-copilot-cli). Choose an authorized, non-sensitive practice repository with a known test command.

## Steps

1. Open a terminal in the practice repository, not a parent directory containing unrelated projects.
2. Run `git status --short` and record existing changes. Do not overwrite another person's work.
3. Inspect the repository's instructions and scripts before trusting them. Copilot may read, modify, and execute files in the chosen location.
4. Choose a reversible task: add a case-insensitive title filter and a test. Decide which files and commands are in scope.

## Verify and recover

Confirm the current directory and account are intended, and that your project can be sent to Copilot under applicable rules. If trust or authorization is uncertain, stop and use a synthetic project instead. Preserve existing changes separately before proceeding.
