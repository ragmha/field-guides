---
title: Allowlists and registries summary
section: Allowlists and Registries
order: 8
description: Prefer identity-based matching and keep one source of truth.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/enterprise-administrators/mcp-private-registry-enforcement
---

## Key Takeaways

- Built-in defaults are allowed first, then any deny match blocks, then an allowlist blocks anything unmatched.
- Allowlists from several sources intersect and denylists combine, so the strictest result applies.
- Custom registries are public preview, match by name or ID only, and can be bypassed by editing configuration files.
