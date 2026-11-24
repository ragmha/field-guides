---
kind: lesson
title: Design a focused skill
description: Specify when a reusable workflow applies and how to verify it.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-skills
---

## Steps

1. Pick a narrow repeatable task: checking a draft release note against a provided change list.
2. Define its inputs, output, and stopping condition. Require the agent to identify unsupported claims rather than inventing missing facts.
3. Choose a descriptive lowercase hyphenated name, such as `release-note-check`.
4. Keep the skill self-contained and avoid adding scripts or permissions that the task does not need.

## Expected result

You have a procedure that another person can understand and check. If the procedure depends on private information, do not put that information in the skill.
