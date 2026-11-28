---
title: Prevent custom agent name collisions
section: Layer Conflicts
order: 19
description: Predict which agent profile wins when repository, organization and enterprise agents share a name.
verified: "2026-11-27"
diagram: agent-name-collisions
checks:
  - question: If a repository and an enterprise both define an agent with the same filename, which one is used in that repository?
    answer: The repository agent, because the lowest level wins and profiles are deduplicated by filename.
  - question: What happens to unrecognized tool names in an agent profile's tools list?
    answer: They are ignored.
  - question: Are repository instructions automatically included for a custom subagent in Copilot CLI?
    answer: No, not by default.
sources:
  - https://docs.github.com/en/copilot/reference/custom-agents-configuration
  - https://docs.github.com/en/copilot/concepts/customizations/custom-agents
---

## What you will learn

- Predict which agent profile applies when names collide across levels.
- Design naming conventions that make overrides intentional.

## The lowest level wins

The [custom agents configuration reference](https://docs.github.com/en/copilot/reference/custom-agents-configuration) states that when agents at different levels share a name, the lowest level wins: repository over organization, and organization over enterprise. Profiles are deduplicated by filename. A repository can therefore replace an enterprise agent simply by adding a file with the same name.

The same reference documents the `tools` field: omitted means all tools, an empty list means none, and a list enables only those tools; unrecognized tool names are ignored. An override can silently widen or narrow tools compared with the enterprise version.

[About custom agents](https://docs.github.com/en/copilot/concepts/customizations/custom-agents) adds a related boundary: in Copilot CLI, repository instructions are not included for a custom subagent by default, so an agent's prompt cannot assume repository instructions are present.

Guide advice: decide whether shadowing is allowed. If it is, document the shared filename as an extension point. If it is not, use a reserved prefix for enterprise agents and check repositories for matching filenames.

## Worked example: an accidental override

**Hypothetical starting state:** The fictional Kestrel Energy enterprise publishes `security-review.agent.md` with a restricted `tools` list. A product repository adds its own `security-review.agent.md` without a `tools` field.

In that repository, the repository profile wins. Because `tools` is omitted, the agent has all tools. The platform team finds the collision during an inventory check, renames the enterprise agent with a reserved prefix, and asks the repository team to rename or remove its copy.

**Outcome:** Overrides become visible decisions, and a recurring inventory query lists any repository file that shares a name with an organization or enterprise agent.

## Practice: detect collisions

**Prerequisites:** Read access to an authorized sandbox organization's governance repository and two sandbox repositories.

1. List the filenames in the governance repository's `agents/` directory.
2. List the filenames in `.github/agents/` in each sandbox repository.
3. Match filenames across levels and record each collision.
4. For each collision, compare `tools` and `model` fields between the profiles.
5. Draft a naming convention and a remediation note for each collision.

**Expected result:** A collision report that shows which profile wins in each repository and how its tools differ.

<details>
<summary>Model answer</summary>

Every collision resolves to the repository profile in that repository. The report should flag collisions that widen tools, such as an omitted `tools` field overriding a restricted list, as highest priority.

</details>
