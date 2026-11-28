---
title: Writing path rules summary
section: Writing Path Rules
order: 8
description: Review pattern forms and repository references.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
---

## Key Takeaways

- Repository rules are one `- "/PATH"` entry per line; patterns use fnmatch and are case insensitive.
- A leading slash anchors a pattern to the root; a bare file name matches anywhere.
- Organization and enterprise rules key paths by repository name, URL or wildcard, or by `"*"` for all locations.
- Matching ignores clone protocol, `user@` and port, so one entry covers each repository.
