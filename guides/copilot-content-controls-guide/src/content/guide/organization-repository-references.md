---
title: Reference repositories in organization rules
section: Writing Path Rules
order: 7
description: Target repositories by name, URL or wildcard and apply paths to every repository with the star key.
verified: "2026-11-27"
diagram: organization-repository-references
checks:
  - question: What does the "*" key mean in an organization or enterprise rule?
    answer: The paths under it apply to all repositories and other file locations.
  - question: Does a rule written with an HTTPS URL also match a clone made over SSH?
    answer: Yes. GitHub documents that matching works regardless of the protocol used to clone, and that user@ and port are ignored.
  - question: Can an organization rule target files that are not in Git?
    answer: Yes. Organization rules can exclude files in Git repositories or anywhere not under Git control.
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Write organization rules that target one repository or all of them.
- Use the documented repository reference formats.
- Explain how protocol differences are handled.

## Repository references

On the organization page, under "Repositories and paths to exclude", each entry is a repository reference followed by a list of paths. [Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) documents these reference forms:

- A repository name, such as `octo-repo`.
- `http[s]://host.xz[:port]/path/to/repo.git/`
- `git://host.xz[:port]/path/to/repo.git/`
- `[user@]host.xz:path/to/repo.git/`
- `ssh://[user@]host.xz[:port]/path/to/repo.git/`

Matching works regardless of the protocol used to clone, and the `user@` and `:port` parts are ignored. Both old and new Azure DevOps host formats match. Wildcards are allowed, for example `git@github.com:*/copilot`.

The special key `"*"` applies its paths to all repositories and to files not under Git control:

```yaml
"*":
  - "**/.env"
octo-repo:
  - "/src/some-dir/kernel.rs"
"git@github.com:*/copilot":
  - "/__tests__/**"
```

Enterprise rules use the same syntax on the enterprise Content exclusion page.

## Worked example: one directory, many hosts

**Hypothetical starting state:** The fictional `octo-data` organization keeps `/models/weights/` in a repository called `forecasting`, hosted on GitHub. Some developers clone it over HTTPS and others over SSH.

The owner writes a single entry keyed `forecasting` with `- "/models/weights/**"`. Because matching ignores protocol, user and port, there is no need for separate HTTPS and SSH entries. A second entry under `"*"` adds `- "**/.env"` so environment files are excluded everywhere for that organization's seat holders.

**Outcome:** Two short entries cover the directory for all clone methods and environment files across repositories.

## Practice: draft an organization rule

**Prerequisites:** An authorized sandbox organization with a fictional repository `payments-api` and permission to view, not save, the Content exclusion page.

1. Write an entry that excludes `/certs/**` in `payments-api`.
2. Write a `"*"` entry that excludes any file named `credentials.json`.
3. Note which users the rule will reach.
4. Record whether you need separate HTTPS and SSH entries, and why.

**Expected result:** A two-entry draft, an audience statement and a protocol note.

<details>
<summary>Model answer</summary>

```yaml
payments-api:
  - "/certs/**"
"*":
  - "**/credentials.json"
```

It reaches users assigned a Copilot seat by the sandbox organization. No separate entries are needed; matching ignores the clone protocol, `user@` and port.

</details>
