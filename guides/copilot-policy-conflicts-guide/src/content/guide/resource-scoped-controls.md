---
title: Resource-scoped controls
section: Users and Resources
order: 14
description: Recognize controls that apply to everyone working in a repository or enterprise resource, regardless of who licenses them.
verified: "2026-11-27"
diagram: resource-scoped-controls
checks:
  - question: A repository administrator excludes a path from Copilot. Who is affected?
    answer: Any Copilot user in the enterprise who works in that repository, regardless of which organization seats them.
  - question: How do you know whether a policy governs a setting for everyone rather than only licensed users?
    answer: GitHub highlights it in the policy description. Read the description rather than inferring from the name.
sources:
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud
---

## What you will learn

- Distinguish user-scoped policies from resource-scoped controls.
- Explain why content exclusion can be both, depending on who sets it.
- Add repository-level controls to a visibility trace.

## Two kinds of scope

Most policies govern the users you license. A small number govern a setting for everyone; the overview's example is blocking Copilot in the cloud for all users in the enterprise's repositories. When a policy works this way, it is highlighted in the policy description. See [GitHub Copilot policies](https://docs.github.com/en/copilot/concepts/enterprise/policies).

Content exclusion shows both scopes. Repository administrators can exclude content for their repositories, which affects any Copilot users in the enterprise working in those repositories. Organization owners can exclude content for users who are assigned a seat through their organization. Content exclusion is not a security boundary for the file system. See [Content exclusion for GitHub Copilot](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion).

Copilot in the cloud adds another resource control. Organization owners can use **Settings → Copilot → Cloud → Repository access** to block the agent in some or all repositories. Once the agent is enabled for a repository, any user with Copilot access and write permission can delegate tasks there. See [Managing Copilot in the cloud in your organization](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud).

The practical consequence is that conflict rules from Part 3 decide what a user may do, while resource controls decide what can happen in a given repository. A user can hold an enabled policy and still be blocked in a repository.

Guide advice: add a resource column to every trace: the repository, its owning organization, and any repository-level or organization-repository controls.

## Worked example: enabled user, blocked repository

**Hypothetical starting state:** A developer seated by the web organization has Copilot in the cloud enabled. They cannot delegate a task in a repository owned by the finance organization. Finance has blocked the agent for that repository under **Repository access**.

The administrator confirms the user's policy is enabled, then checks the resource. The repository block applies regardless of who seats the developer.

**Outcome:** The user policy is enabled but the action is blocked by the resource control. No user policy change helps. Any exception is the finance organization's decision.

## Practice: split a trace into user and resource

**Prerequisites:** A hypothetical report that a file gets no suggestions in one repository. The user's organization has no exclusions; the repository administrator has excluded a folder. No settings need to be changed.

1. Record the user's seat source and organization exclusions.
2. Record the repository and its repository-level exclusions.
3. Decide which scope explains the report.
4. In an authorized sandbox, check the file's Copilot status icon and tooltip. Without a sandbox, compare with the model answer.

**Expected result:** The repository-level exclusion explains the report, whatever the user's seat source.

<details>
<summary>Model answer</summary>

User scope: no exclusions from the seating organization. Resource scope: the repository excludes the folder, which applies to any Copilot user in the enterprise. The repository administrator owns any change.

</details>
