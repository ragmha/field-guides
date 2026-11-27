---
title: Complementary controls summary
section: Complementary Controls
order: 24
description: Review repository access and push protection beside content exclusion.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization
  - https://docs.github.com/en/code-security/concepts/secret-security/push-protection
---

## Key Takeaways

- Repository roles, base permissions and deploy key reviews decide who can reach content; exclusion only decides what Copilot uses.
- Repository push protection needs GitHub Secret Protection, is off by default and creates alerts on bypass; user push protection is on by default and creates none.
- Bypass reasons determine whether the alert is closed or open, and every bypass is audited.
- Push protection for AI-detected secrets and Copilot code review secret detection are in public preview.
