---
kind: lesson
title: Define a custom agent
description: Create a focused agent profile for reviewing documentation.
reviewed: 2026-11-24
sources:
  - https://docs.github.com/copilot/how-tos/use-copilot-agents/coding-agent/create-custom-agents
  - https://docs.github.com/copilot/concepts/agents/coding-agent/about-custom-agents
---

## Steps

1. Create `.github/agents/docs-reviewer.agent.md` in the practice repository.
2. Add a profile with a clear role:

   ```markdown
   ---
   name: docs-reviewer
   description: Review documentation changes for unsupported claims and broken references.
   tools: ["read", "search"]
   ---
   Compare documentation changes with the available source material.
   Report specific unsupported claims and broken references with locations.
   Do not edit files or publish changes.
   ```

3. Check tool names and profile support against the target client's documentation. Tool aliases and capabilities vary by environment.
4. Review the profile and tool access before making it available to others. The prompt is not a substitute for actual tool restrictions.

## Expected result

The profile describes a reviewer and requests only the tools needed for reading and searching. Test availability and behavior in your chosen client.
