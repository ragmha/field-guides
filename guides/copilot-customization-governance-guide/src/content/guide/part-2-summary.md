---
title: Ownership and review summary
section: Ownership & Review
order: 8
description: Review ownership by scope and the activation points that shape change review.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents
  - https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions
---

## Key Takeaways

- Repository customizations are owned by whoever can merge to the default branch; shared agents live in organization or enterprise governance repositories.
- Enterprise owners can [protect agent files using rulesets](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/prepare-for-custom-agents), which restricts edits while still allowing pull requests.
- Instructions take effect when saved; agents appear after merge to the default branch; code review reads the pull request's head branch, as described in [About custom instructions](https://docs.github.com/en/copilot/concepts/prompting-and-context/custom-instructions).
- Guide advice: keep customization edits in their own pull requests with a named team approver.

## Questions to discuss

- Which shared customizations can be changed today without review?
- Who should be your AI managers team, and how will they be named in CODEOWNERS?
