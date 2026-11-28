---
title: Write repository path patterns
section: Writing Path Rules
order: 6
description: Use anchored paths, file names and fnmatch wildcards to exclude exactly the intended files.
verified: "2026-11-27"
diagram: repository-path-rules
checks:
  - question: What does "secrets.json" without a leading slash match?
    answer: Files named secrets.json anywhere in the repository.
  - question: Are exclusion patterns case sensitive?
    answer: No. GitHub documents that patterns use fnmatch matching rules and are case insensitive.
  - question: How do you exclude everything under the scripts directory at the repository root?
    answer: Use "/scripts/**".
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## What you will learn

- Write repository rules in the documented list format.
- Choose between anchored paths, file names and wildcards.
- Predict which files a pattern matches.

## Pattern forms

[Excluding content from GitHub Copilot](https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot) shows the repository format: one entry per line, each written as `- "/PATH"`, with `#` comments allowed. Patterns use fnmatch matching rules and are case insensitive. The documented examples are:

```yaml
# Exact file from the repository root
- "/src/some-dir/kernel.rs"
# A file name anywhere in the repository
- "secrets.json"
# Any file whose name begins with "secret"
- "secret*"
# Any file ending in .cfg
- "*.cfg"
# Everything under the root scripts directory
- "/scripts/**"
```

The organization page adds further documented forms, including `"{server,session}*"`, `"*.m[dk]"`, `"**/package?/*"`, `"**/security/**"` and `"/src/**/temp.rb"`.

Guide advice: start every review by asking three questions. Is the rule anchored with a leading slash? Does it name a file, a directory tree or a name pattern? Could a broad wildcard catch files the team still wants Copilot to use?

## Worked example: tightening a broad rule

**Hypothetical starting state:** The fictional `mobile-app` repository contains `config/secret-keys.yml`, `docs/secret-sharing-policy.md` and `tests/fixtures/secret_payload.json`. An administrator proposes `- "secret*"`.

Reviewing the pattern, the team sees that `secret*` matches all three files, including documentation they want Copilot to help maintain. Because the goal is the key file only, they replace it with `- "/config/secret-keys.yml"` and add a comment explaining the owner and reason.

**Outcome:** The anchored rule matches one file. The documentation and test fixture remain available to Copilot, and the comment records intent for the next reviewer.

## Practice: predict matches

**Prerequisites:** A fictional file list in an authorized sandbox repository: `/infra/prod.cfg`, `/app/settings.cfg`, `/scripts/deploy.sh`, `/tools/scripts/lint.sh` and `/keys/secrets.json`.

1. Write which files `"*.cfg"` matches.
2. Write which files `"/scripts/**"` matches.
3. Write which files `"secrets.json"` matches.
4. Write one rule that matches only `/infra/prod.cfg`.

**Expected result:** A match list for each pattern and one anchored rule.

<details>
<summary>Model answer</summary>

`"*.cfg"` matches both `.cfg` files. `"/scripts/**"` matches `/scripts/deploy.sh` but not `/tools/scripts/lint.sh`, because the leading slash anchors it to the root. `"secrets.json"` matches `/keys/secrets.json`. The anchored rule is `- "/infra/prod.cfg"`.

</details>
