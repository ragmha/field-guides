---
title: Proxies and certificates summary
section: Proxies & Certificates
order: 12
description: Use supported proxies and keep certificate validation on.
verified: "2026-11-27"
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings
---

## Key Takeaways

- Copilot uses the highest-priority proxy variable for both HTTP and HTTPS.
- Only basic HTTP proxies are supported, with basic or Kerberos authentication.
- Trust the inspection root through the system store or NODE_EXTRA_CA_CERTS; never disable validation.
