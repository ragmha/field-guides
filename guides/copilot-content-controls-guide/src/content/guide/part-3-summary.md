---
title: Surfaces and limitations summary
section: Surfaces & Limitations
order: 12
description: Review where exclusion applies and where it needs help.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/content-exclusion
  - https://docs.github.com/en/copilot/reference/supported-surfaces-for-policies
---

## Key Takeaways

- Major IDEs, the Copilot app, CLI, cloud surfaces and code review support exclusion; Xcode and Eclipse chat and Azure Data Studio inline suggestions do not.
- Exclusion is a guardrail for GitHub-controlled tools, not a filesystem security boundary.
- Indirect IDE information, agent indirect access, symlinks and remote filesystems are documented gaps.
- Use repository and operating-system permissions where a file must never be read.
