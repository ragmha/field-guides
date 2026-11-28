---
kind: lesson
title: Exercise the skill
description: Test discovery and compare the skill's output with known inputs.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-skills
---

## Steps

1. In a supported client, start a fresh task and ask it to check a synthetic draft against a short, synthetic change list.
2. Include one deliberately unsupported claim and one omitted change. Ask the agent to use the `release-note-check` skill if your client supports explicit selection.
3. Inspect any visible indication that the skill was used, then compare the response with both known differences.
4. If discovery or behavior fails, check the location, filename, frontmatter, client support, and task description. Revise and retry.

## Human verification

Skill discovery is not a guarantee of correct execution. Verify the claims against the inputs yourself and inspect any requested tool use.
