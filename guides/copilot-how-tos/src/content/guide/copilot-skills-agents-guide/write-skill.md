---
kind: lesson
title: Write a skill file
description: Add a discoverable SKILL.md with a precise description and procedure.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-skills
---

## Steps

1. In a practice repository, create `.github/skills/release-note-check/SKILL.md`.
2. Add the following example:

   ```markdown
   ---
   name: release-note-check
   description: Check a draft release note against a supplied change list before publication.
   ---
   Compare each draft claim with the supplied change list.
   List unsupported claims and missing changes with their evidence.
   Do not invent details; ask for missing information.
   ```

3. Review the filename, frontmatter, and content. Adapt the instructions to your actual workflow.
4. Review any additional files or scripts before including them. Do not pre-approve tools merely to suppress prompts.

## Expected result

The skill has the required name and description and a small procedure. Discovery and invocation depend on the client; check its current documentation.
