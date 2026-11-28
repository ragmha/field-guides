---
title: Testing and change evidence summary
section: Testing & Change Evidence
order: 16
description: Review propagation, testing and change review.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/exclude-content-from-copilot
  - https://docs.github.com/en/copilot/how-tos/configure-content-exclusion/review-changes
  - https://docs.github.com/en/rest/copilot/copilot-content-exclusion-management
---

## Key Takeaways

- Changes can take up to 30 minutes to reach IDEs with loaded settings; reload to test sooner.
- Test with a control file, the excluded file and the documented chat prompt.
- The audit log action `copilot.content_exclusion_changed` and its `excluded_paths` value show who changed what.
- The organization REST API is in public preview, drops comments and keeps only the last duplicate key.
