---
title: Check surface coverage
section: Users and Resources
order: 15
description: Confirm that a policy applies to the surface where a user is working before treating a result as a conflict.
verified: "2026-11-27"
diagram: surface-coverage
checks:
  - question: Does the editor preview features policy apply in Copilot CLI?
    answer: No. The supported surfaces reference lists it for IDEs only.
  - question: Why might a cloud agent task behave differently from an IDE session under the same policy?
    answer: Coverage varies between the cloud sandbox and GitHub Actions environments, and some interfaces run only on GitHub Actions.
sources:
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Read the supported surfaces table for a policy.
- Distinguish cloud sandbox and GitHub Actions coverage.
- Rule out surface gaps before applying conflict rules.

## Policies apply where they are supported

Policies apply on any surface where users authenticate with their GitHub account, but not every policy applies to every surface. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies). The [supported surfaces reference](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) lists coverage across IDEs, Copilot in the cloud (cloud sandbox), Copilot in the cloud (GitHub Actions), Copilot CLI, the GitHub Copilot app, and Copilot code review.

A subset of that table, as reviewed:

- **Editor preview features**: IDEs only.
- **Copilot can search the web**: IDEs and cloud sandbox.
- **Configure custom models**: IDEs, CLI and the Copilot app.
- **Suggestions matching public code**: IDEs, and GitHub Actions in annotate mode only.
- **MCP servers in Copilot** and **Content exclusion**: all six surfaces.
- **Restrict MCP access to registry servers**: IDEs, CLI and the Copilot app.
- **Configure models**: every surface except code review.

The reference notes that coverage varies between the cloud environments. Cloud sandboxes are the default where users can choose, and some interfaces, such as assigning an issue to Copilot or mentioning @Copilot in a pull request, run only on GitHub Actions.

Guide advice: check the reference on the day of the investigation; it changes. Record the surface and environment with each result.

## Worked example: web search in the CLI

**Hypothetical starting state:** The research organization enables **Copilot can search the web**. A developer seated only by research expects the CLI to honor or block web search based on that policy, and reports an inconsistency.

The administrator checks the reference. The policy is listed for IDEs and the cloud sandbox, not the CLI.

**Outcome:** There is no conflict to resolve; the policy does not govern that surface. The record states that the CLI behavior is outside the policy's documented coverage, so any CLI-side control must come from a different mechanism.

## Practice: annotate three reports with surfaces

**Prerequisites:** The [supported surfaces reference](https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies) and three hypothetical reports: editor preview features in the Copilot app, public code matching in an @Copilot pull request task, and content exclusion in code review. No settings need to be changed.

1. Name the surface and, for cloud work, the environment.
2. Look up coverage for each policy.
3. Mark each report as covered, partially covered or not covered.
4. In an authorized sandbox, confirm one covered case. Without a sandbox, compare with the model answer.

**Expected result:** One not covered, one partially covered and one covered.

<details>
<summary>Model answer</summary>

Editor preview features in the Copilot app: not covered. Public code matching in an @Copilot pull request task: runs on GitHub Actions, covered in annotate mode only. Content exclusion in code review: covered.

</details>
