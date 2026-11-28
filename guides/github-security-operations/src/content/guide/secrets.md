---
title: Respond to a leaked secret
section: Secret scanning response
order: 5
description: Treat a committed credential as compromised, close the alert deliberately and govern push protection bypasses.
verified: "2026-11-27"
diagram: secret-response
sources:
  - https://docs.github.com/en/code-security/how-tos/manage-security-alerts/manage-secret-scanning-alerts/resolving-alerts
  - https://docs.github.com/en/code-security/concepts/secret-security/validity-checks
  - https://docs.github.com/en/code-security/concepts/secret-security/push-protection
  - https://docs.github.com/en/code-security/concepts/secret-security/delegated-bypass
  - https://docs.github.com/en/rest/secret-scanning/secret-scanning
---

## What you will learn

- Follow a revoke-first response for detected credentials.
- Explain why deleting a secret from code does not close the alert or the risk.
- Govern push protection bypasses so they do not become silent exceptions.

## Assume compromise

GitHub's guidance is direct: once a secret has been committed, consider it compromised. Anyone with read access to the repository, its forks or its history may have copied it. The response is about the credential, not the file.

1. **Revoke or rotate** the credential with the issuing provider.
2. **Update** dependent systems with the new credential through your secret store.
3. **Investigate use** of the old credential through the provider's logs and your incident process.
4. **Close the alert** with the reason that matches what happened, and add a comment that links to the evidence.

Never paste the secret value into tickets, chat or reports.

## Removing the secret does not close the alert

Secret scanning does not automatically close an alert when the token is removed from the repository. You must close it manually. Removing the string from the latest commit, or even rewriting history, does not invalidate the credential. Treat history rewriting as optional clean-up after rotation, never as the fix.

The REST API's resolution values include `revoked`, `false_positive`, `used_in_tests` and `wont_fix`. Prefer `revoked` once rotation is confirmed. Reserve the others for cases supported by evidence, and route `wont_fix` through your exception process.

## Use validity checks as an input

Where supported, validity checks report whether a detected secret is `active`, `inactive` or of unknown validity, and some secrets support an on-demand check. Validity depends on provider support and on licensing for private and internal repositories. An `inactive` result helps prioritize, but rotation is still the safe default when there is doubt.

## Govern push protection bypasses

Push protection blocks supported secrets before they reach the repository. By default, anyone with write access can bypass a block by choosing a reason:

| Bypass reason | Resulting alert |
| --- | --- |
| It's used in tests | Closed, resolved as used in tests |
| It's a false positive | Closed, resolved as false positive |
| I'll fix it later | Open |

Bypasses are recorded in the audit log and trigger email to organization owners, security managers and watching repository administrators. Review them as part of the weekly cadence: a "false positive" bypass that was actually a live credential is an incident.

Delegated bypass lets you limit who can bypass and require a review for everyone else. Requests that are not reviewed expire. Use it for repositories that handle production credentials, and agree who reviews requests and how fast.
