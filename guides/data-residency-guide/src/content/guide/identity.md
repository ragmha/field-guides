---
title: Manage identity and access
section: Identity and access
order: 5
description: Connect your identity provider, provision managed users and make access decisions before developers arrive.
verified: "2026-11-13"
diagram: identity-sequence
additionalDiagrams:
  - identity-controls
  - developer-endpoints
sources:
  - https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud
  - https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom
---

## What you will learn

- Separate enterprise-managed accounts from personal GitHub accounts.
- Plan identity provisioning, authentication and access controls.
- Test the developer's path from device to the enterprise.

## Identity belongs to your organisation

GHE.com uses [Enterprise Managed Users](https://docs.github.com/en/enterprise-cloud@latest/admin/concepts/identity-and-access-management/enterprise-managed-users). Your identity provider provisions managed accounts using SCIM and controls their access. Those accounts are separate from personal github.com accounts; developers contributing to public projects need a separate account.

GitHub recommends OIDC for Microsoft Entra ID; the supported alternatives and setup requirements are in the [getting-started documentation](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/getting-started-with-data-residency-for-github-enterprise-cloud). Confirm your IdP configuration and provisioning path during the trial.

## Define the boundaries

**Guide advice:** assign enterprise owners sparingly, decide which teams can administer organisations, and apply your IdP's sign-in and conditional-access policies. Test onboarding, access changes, and deprovisioning with representative users. Keep an emergency access procedure with an owner and test it before production.

Review network restrictions and IP allow lists with your network team. GitHub publishes the relevant [hostnames and network details](https://docs.github.com/en/enterprise-cloud@latest/admin/data-residency/network-details-for-ghecom); do not assume the github.com endpoints work unchanged.

## Developer endpoints and tokens

Developers authenticate to `SUBDOMAIN.ghe.com`; API clients use `api.SUBDOMAIN.ghe.com`. Check each IDE, Git client and automation against the enterprise hostname. **Guide advice:** inventory tokens and credentials, store automation secrets in a managed vault, apply least privilege and rotate credentials according to your security policy.

## Worked example: leaving the company

**Hypothetical scenario:** An employee leaves. The identity team removes access in the IdP, then the platform team checks that the managed account can no longer sign in, that ownership has been reassigned, and that automation does not depend on the departing employee's credentials.
