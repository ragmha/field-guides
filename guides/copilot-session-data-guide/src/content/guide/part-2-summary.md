---
title: Local storage summary
section: Local Storage
order: 8
description: Treat the full session record and the searchable store as different artifacts.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference
---

## Key Takeaways

- `session-state/` holds each session's complete record; `session-store.db` is a rebuildable index.
- Logs are safe to delete; session state and the store need caution because history and resume depend on them.
- Local cleanup does not touch synced copies, and a reindex repairs the store after manual changes.
