---
title: Know the four documented effects
section: Exclusion Foundations
order: 2
description: State precisely what an exclusion changes for Copilot and what it leaves unchanged.
verified: "2026-11-27"
diagram: what-exclusion-does
checks:
  - question: Does an excluded file still inform inline suggestions in other files?
    answer: No. GitHub documents that excluded content does not inform inline suggestions in other files or Copilot's responses.
  - question: Does an exclusion stop a person with repository read access from opening the file?
    answer: No. It changes what Copilot uses on supported surfaces; repository and operating-system permissions are separate.
  - question: What does a client send to GitHub once exclusions are configured?
    answer: The current repository URL, so the server can return the correct policy. GitHub states these URLs are not logged.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
---

## What you will learn

- List the four documented effects of excluding a file.
- Identify the plans and roles that can use content exclusion.
- Separate the Copilot effect from human and filesystem access.

## Four effects, one scope

According to [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion), when you exclude content:

- Inline suggestions are not available in the affected files.
- The content of affected files does not inform inline suggestions in other files.
- The content of affected files does not inform Copilot's responses.
- Affected files are not reviewed in a Copilot code review.

Content exclusion is supported for the Copilot Business and Copilot Enterprise plans. Repository administrators, organization owners and enterprise owners can configure it. Each effect applies only where the surface supports exclusion; Part 3 covers that matrix and the documented limitations.

Once exclusions are configured, a client such as the VS Code extension sends the current repository URL to GitHub so that the server can return the correct policy. GitHub states that these URLs are not logged.

Two things do not change. A person with access to the repository can still read, edit and commit the file. A tool that is not controlled by GitHub may not respect the rule. Treat exclusion as a Copilot guardrail, not as an access decision.

## Worked example: an internal rate table

**Hypothetical starting state:** The platform team maintains a fictional repository, `billing-engine`, on a Copilot Business plan. It contains `/data/partner-rates.csv`, which the team does not want Copilot to use as context. Developers still need to edit the file by hand.

The team writes down each documented effect for that file: no inline suggestions while editing it; its rows will not shape suggestions in `rates.py`; chat answers will not draw on it; and Copilot code review will skip it in pull requests. It then records what is unchanged: every developer with read access can still open the file, and the change is limited to supported surfaces.

**Outcome:** The team has a four-line effect statement and a two-line "not covered" statement. It has not yet saved or tested a rule; the statement is a design artifact.

## Practice: write an effect statement

**Prerequisites:** The concept page above and a fictional file path of your choice. Use no real sensitive data.

1. Name the fictional file and the reason it should not inform Copilot.
2. For each of the four documented effects, write one sentence describing what a developer would notice.
3. Add at least two sentences describing what an exclusion does not change.
4. Note which plan and role would be needed to configure it.

**Expected result:** A short statement with four effects, at least two non-effects and the required plan and role.

<details>
<summary>Model answer</summary>

File: `/data/partner-rates.csv`. Effects: no inline suggestions in the file; it does not inform suggestions elsewhere; it does not inform responses; code review skips it. Not changed: human read and write access; access by tools GitHub does not control. Requires Copilot Business or Copilot Enterprise and a repository administrator, organization owner or enterprise owner.

</details>
