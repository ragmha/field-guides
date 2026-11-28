---
title: Keep secrets out with push protection
section: Complementary Controls
order: 23
description: Use repository and user push protection, understand bypass outcomes and track the preview secret checks.
verified: "2026-11-27"
diagram: secret-push-protection
checks:
  - question: What happens when a contributor bypasses push protection with the reason "I'll fix it later"?
    answer: The push proceeds and an open secret scanning alert is created; the bypass is also recorded in the audit log.
  - question: Does user push protection create alerts?
    answer: No. User push protection is on by default for public repositories and does not create alerts.
  - question: What release status does Copilot code review secret detection have?
    answer: Public preview.
sources:
  - https://docs.github.com/en/code-security/concepts/secret-security/push-protection
  - https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning
  - https://github.blog/changelog/2026-11-17-copilot-code-review-adaptive-effort-secret-detection-and-more
---

## What you will learn

- Distinguish repository and user push protection.
- Predict the alert outcome of each bypass reason.
- Position secret scanning beside content exclusion.

## Push protection

[About push protection](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) explains that push protection blocks pushes containing supported secrets, including partner, generic and custom patterns, and AI-detected secrets in **public preview**. It covers pushes from the command line, commits in the GitHub UI, file uploads, REST API requests and interactions with the GitHub MCP server (public repositories only); AI-detected secrets are not covered for REST API or MCP server interactions.

There are two kinds:

- **Repository push protection** requires GitHub Secret Protection. It is off by default and can be enabled by a repository administrator, organization owner, security manager or enterprise owner. Bypasses create alerts.
- **User push protection** is enabled by default, covers pushes to public repositories and does not create alerts.

By default, anyone with write access can bypass a block by giving a reason. "It's used in tests" and "It's a false positive" create a closed alert; "I'll fix it later" creates an open alert. Bypasses are also recorded in the audit log and trigger email notifications. Delegated bypass lets you designate contributors who can bypass and approve bypass requests for others, or exempt actors from push protection entirely.

[About secret scanning](https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning) adds that secret scanning covers the full Git history on all branches as well as issues, pull requests, discussions, wikis and secret gists.

A [November 2026 changelog](https://github.blog/changelog/2026-11-17-copilot-code-review-adaptive-effort-secret-detection-and-more) announced secret detection in Copilot code review in **public preview**, enabled from repository or organization **Settings → Copilot → Code review**.

Guide advice: exclusion keeps an existing secrets file away from Copilot; push protection keeps new secrets out of history. Use both, and do not rely on either to replace secret rotation.

## Worked example: a token in a fixture

**Hypothetical starting state:** The fictional `octo-payments` repository has repository push protection enabled. A developer commits a real partner token in `tests/fixtures/client.json` and pushes.

The push is blocked. The developer chooses "It's used in tests" and pushes again, which creates a closed alert and an audit log entry. The security reviewer sees the bypass, confirms the token is real, rotates it and asks the team to use a placeholder value. The fixture path is also added to the repository's exclusion list.

**Outcome:** The token is rotated, the bypass is traceable, and Copilot does not use the fixture file.

## Practice: plan a bypass policy

**Prerequisites:** Read access to code security settings in an authorized sandbox organization.

1. Record whether repository push protection is enabled and whether GitHub Secret Protection is available.
2. List who can bypass today.
3. Decide whether to use delegated bypass.
4. Note any preview features you will not rely on yet.

**Expected result:** A short policy record covering enablement, bypass rights, a delegated bypass decision and preview items.

<details>
<summary>Model answer</summary>

Enabled: yes, with GitHub Secret Protection. Bypass: anyone with write access. Decision: use delegated bypass so the security team reviews requests. Preview items not relied on: AI-detected secrets in push protection and Copilot code review secret detection.

</details>
