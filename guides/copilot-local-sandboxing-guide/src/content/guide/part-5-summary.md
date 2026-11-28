---
title: Credential exposure summary
section: Credential Exposure
order: 20
description: Mask the secrets commands need and remove the ones they do not.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
---

## Key Takeaways

- Masked credentials reach only their listed hosts, and only while the sandbox is on.
- An approved bypass exposes real secrets, so keep bypass rare and narrow.
- Environment tokens override stored OAuth; keep broad tokens out of everyday shells.
