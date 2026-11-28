---
title: Content exclusion layer
section: Data and Cost Layers
order: 14
description: Record where content exclusion is set, which clients honor it and what it does not protect.
verified: "2026-11-27"
diagram: content-exclusion-scope
checks:
  - question: Is content exclusion a file system security boundary?
    answer: No. GitHub states it is not a security boundary; agents check identifiable paths but may miss indirect access, and third-party MCP servers and clients are not guaranteed to honor it.
  - question: Which audit log action records a content exclusion change?
    answer: copilot.content_exclusion_changed, with the excluded paths in its details.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes
---

## What you will learn

- Map each content exclusion scope to the users it affects.
- Record client support gaps for each rule set.
- Pair the control with its audit evidence.

## Scope, effect and limits

Content exclusion can be configured by repository administrators, organization owners and enterprise owners. A repository rule affects every user in the enterprise who works in that repository; an organization rule affects users seated through that organization. Enterprise owners can also configure rules; record their scope from the how-to rather than assuming it. When a file is excluded, Copilot does not offer inline suggestions in it, does not use it as context and does not review it in code review. See [content exclusion](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion) and the [configuration how-to](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot).

The concept page lists limits that belong in the "cannot see" column:

- Client support differs. Xcode and Eclipse lack support in chat and agent features, and Azure Data Studio is not supported; Copilot CLI, the Copilot app, Copilot in the cloud and code review are supported.
- It is not a file system security boundary. Agents check identifiable paths but may miss indirect access.
- Third-party MCP servers and clients are not guaranteed to honor it.
- IDE semantic information may still reveal details of excluded files, and rules do not apply to symbolic links or remote file systems.

Evidence comes from the audit log. The [review changes how-to](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes) shows the `copilot.content_exclusion_changed` action, with excluded paths in its details. The [content controls deep dive](https://ragmha.github.io/field-guides/copilot-content-controls-guide/) covers rule syntax and testing.

Guide advice: for secrets and regulated data, pair content exclusion with access controls and secret scanning, and record content exclusion as a reduction in exposure, not a guarantee.

## Worked example: a secrets folder

**Hypothetical starting state:** Fictional Larkspur Freight keeps deployment keys in a `/secrets/` folder in one repository and asks for "Copilot must never see these".

The governance lead records a repository-level rule (owner: repository administrator, accountable: security lead) and notes that Eclipse users are not covered in chat and that a third-party MCP server could still read the folder. The security lead adds a separate requirement to move keys to a secrets manager.

**Outcome:** Content exclusion is recorded as one layer, with two gaps and a stronger control assigned to a different owner.

## Practice: write the limits column

**Prerequisites:** The list of limits above.

1. Write a content exclusion row for an organization-wide rule on `**/*.pem`.
2. Fill in scope, affected users, supported clients and limits.

**Expected result:** A row that does not claim the files are unreadable.

<details>
<summary>Model answer</summary>

Scope: organization. Affected: users seated through that organization. Clients: supported in IDE inline suggestions, CLI, app, cloud and code review; limited in Xcode and Eclipse chat and agent features. Limits: not a security boundary, not guaranteed for third-party MCP servers, no effect on symbolic links. Evidence: content exclusion change events in the audit log.

</details>
