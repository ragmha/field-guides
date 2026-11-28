---
title: Versioning and release summary
section: Versioning & Release
order: 12
description: Review staged agent releases, commit-based versions and pinned skills.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills
---

## Key Takeaways

- [Test custom agents](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/test-custom-agents) in `.github/agents` of the `.github-private` repository, then release by moving the profile to `agents/` (public preview).
- Agent versions are commit SHAs; a task uses the latest version when assigned and its pull request keeps that version.
- `gh skill` (public preview) supports pinned installs, provenance metadata and validated publishing; see [Adding agent skills](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills).
- Guide advice: keep a changelog of release SHAs and pin third-party skills.

## Questions to discuss

- Which shared agents were released without a test step?
- Which third-party skills in your estate are unpinned?
