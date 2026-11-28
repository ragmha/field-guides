---
title: What happens when layers disagree?
section: Layer Conflicts
order: 17
description: Understand how instruction layers combine and how custom agent name collisions resolve.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
  - https://docs.github.com/en/copilot/reference/custom-agents-configuration
---

## What you will learn

Customizations at different scopes can contradict each other. GitHub documents two different conflict behaviors, and governance has to handle both.

The first lesson covers instructions: on most clients they are combined without a general precedence order, while Copilot Chat on GitHub.com documents a priority order but still provides every relevant set. The second lesson covers custom agents, where name collisions resolve deterministically by level. Policy conflicts between organizations and enterprises are a separate topic covered in a sibling course.
