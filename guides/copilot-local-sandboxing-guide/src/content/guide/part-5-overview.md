---
title: Which credentials can a command use?
section: Credential Exposure
order: 17
description: Keep real secrets away from agent commands and keep the tokens on developer machines narrow.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli
---

## What you will learn

Credentials turn a command's reach into real actions on external services. Learn how local sandboxing replaces tokens with placeholders and injects real values only for approved hosts. Then review which tokens Copilot CLI and other tools pick up on a developer machine, and how to keep them least-privileged.
