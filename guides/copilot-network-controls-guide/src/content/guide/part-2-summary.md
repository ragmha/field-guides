---
title: Client allowlists summary
section: Client Allowlists
order: 8
description: Generate, tag and test the client allowlist.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
---

## Key Takeaways

- Start from the meta API, then add the apex host and documented gaps.
- Allow only the documented Web PubSub host pattern and test WebSockets separately.
- Keep GHE.com lists separate; subscription routing is not supported there.
