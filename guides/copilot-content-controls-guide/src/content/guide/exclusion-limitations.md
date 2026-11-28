---
title: Plan around documented limitations
section: Surfaces & Limitations
order: 11
description: Recognize what exclusion cannot guarantee and layer other controls where it matters.
verified: "2026-11-27"
diagram: exclusion-limitations
checks:
  - question: Is content exclusion a filesystem security boundary?
    answer: No. GitHub describes it as a guardrail for GitHub-controlled tools that is not a substitute for operating-system permissions.
  - question: Do exclusions apply to symbolic links?
    answer: No. GitHub documents that content exclusions do not apply to symlinks.
  - question: Can IDE semantic information from an excluded file still reach Copilot?
    answer: Yes. Indirect information such as type information, hover definitions and build configuration may still be used.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
---

## What you will learn

- List the documented limitations of content exclusion.
- Explain how agents handle excluded files.
- Pair each limitation with a complementary control.

## What exclusion cannot promise

[Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) documents these limitations:

- **Not a security boundary.** Exclusion is a guardrail for tools GitHub controls. It is not guaranteed to be respected by third-party MCP servers or clients.
- **Indirect information.** The IDE may still provide semantic information from excluded files, such as type information, hover definitions and build configuration.
- **Agents.** In the IDE, CLI and app, exclusion blocks access through Copilot's own tools and checks identifiable file paths in commands and scripts, but it may not catch indirect access. It is not a substitute for operating-system file permissions.
- **Symlinks and remote filesystems.** Exclusions do not apply to symbolic links or to repositories on remote filesystems.

Guide advice: treat each limitation as a design input. If a file must never be read by any process, use repository permissions, operating-system permissions or removal from the repository, and keep exclusion as an additional Copilot-specific layer.

## Worked example: an agent and a symlink

**Hypothetical starting state:** The fictional `octo-research` repository excludes `/datasets/private/**`. A developer has a symlink at `/notebooks/data` pointing into that directory and uses an agent in the Copilot CLI.

The team reviews the limitations. Because exclusion does not apply to symlinks, files reached through `/notebooks/data` may not be treated as excluded. Because agents may miss indirect access, a script that reads the directory might not be caught. The team removes the symlink, keeps the dataset out of the default checkout and restricts its storage with operating-system permissions.

**Outcome:** The exclusion still covers direct paths, and the operating-system and repository controls cover the cases the documentation says exclusion may miss.

## Practice: pair limitations with controls

**Prerequisites:** The four limitations above and one fictional sensitive path in an authorized sandbox.

1. For each limitation, write whether it affects your path.
2. For each one that does, name a complementary control.
3. Decide whether exclusion alone is acceptable for the path.

**Expected result:** A four-row table with an applicability note, a complementary control and a final decision.

<details>
<summary>Model answer</summary>

Security boundary: applies; use repository permissions. Indirect information: applies if other code imports the path; accept or restructure. Agents: applies; use operating-system permissions on developer machines. Symlinks or remote filesystems: applies only if present; remove them. Decision: exclusion alone is not acceptable for a credential file; it is acceptable for low-risk generated code.

</details>
