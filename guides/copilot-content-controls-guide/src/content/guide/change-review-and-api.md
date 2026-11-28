---
title: Review changes and use the API carefully
section: Testing & Change Evidence
order: 15
description: Trace exclusion changes through the audit log and understand the preview REST API's behavior.
verified: "2026-11-27"
diagram: change-review-and-api
checks:
  - question: Which audit log action records content exclusion changes?
    answer: copilot.content_exclusion_changed.
  - question: What happens to comments in exclusion rules when you update them through the REST API?
    answer: The API does not support comments; GET omits them and PUT deletes existing comments.
  - question: What release status does the content exclusion REST API have?
    answer: Public preview, so it is subject to change.
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes
  - https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Find who last changed exclusions and when.
- Read the `excluded_paths` value in an audit entry.
- Recognize the REST API's preview status and comment behavior.

## Reviewing changes

[Reviewing changes to content exclusions](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes) explains that the bottom of the repository Copilot settings page, or the organization Content exclusion page, shows who last changed the settings and when. Selecting the time opens the organization audit log filtered to the `copilot.content_exclusion_changed` action. The organization view includes both repository and organization changes. Open an entry's details to see `excluded_paths`, which shows the settings after the change; hover if the value is truncated.

## The REST API

[REST API endpoints for Copilot content exclusion management](https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management) is **in public preview and subject to change**. It documents organization endpoints:

- `GET /orgs/{org}/copilot/content_exclusion`
- `PUT /orgs/{org}/copilot/content_exclusion`, with a body such as `{"octo-repo":["/src/some-dir/kernel.rs"]}`

The API does not support comments: GET omits them and PUT deletes any that exist. If a key is duplicated, only the last occurrence is kept. Fine-grained tokens need the organization "Copilot content exclusion" permission (read for GET, write for PUT).

Recommended: because PUT replaces the rule set and removes comments, keep the authoritative rules, including their comments, in a reviewed file and compare the audit entry's `excluded_paths` with that file after every change.

## Worked example: a lost comment

**Hypothetical starting state:** The fictional `octo-data` organization documents each exclusion with a `#` comment naming the owner. An engineer adds a path with a PUT request.

The next reviewer opens the organization Content exclusion page and sees that every owner comment has gone. The audit log shows a `copilot.content_exclusion_changed` entry by the engineer, and `excluded_paths` contains the new and old paths. The team restores the comments in the UI and moves owner notes into a reviewed file in a governance repository.

**Outcome:** Paths are intact, comments are restored, and the team's process now treats the reviewed file as the source of owner notes.

## Practice: trace a change

**Prerequisites:** An authorized sandbox organization where you are an owner, with at least one past exclusion change.

1. Open the organization Content exclusion page and note the last change time and actor.
2. Select the time to open the filtered audit log.
3. Open an entry's details and copy `excluded_paths`.
4. Compare it with your recorded intended rules.

**Expected result:** A record with actor, time, `excluded_paths` and a match or mismatch note.

<details>
<summary>Model answer</summary>

Actor: `sandbox-admin`; time: the displayed timestamp; action: `copilot.content_exclusion_changed`; `excluded_paths` lists the saved rule set. Matches the reviewed file: yes. If not, raise a change review before editing again.

</details>
