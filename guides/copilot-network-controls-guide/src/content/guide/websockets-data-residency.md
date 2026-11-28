---
title: Allow cloud sessions and GHE.com
section: Client Allowlists
order: 7
description: Support WebSocket streaming for cloud sessions and adapt the list for data residency.
verified: "2026-11-27"
diagram: websockets-data-residency
checks:
  - question: Should you allow all of *.webpubsub.azure.com to make cloud sessions work?
    answer: No. The reference says to allow only the specific production Copilot host pattern, not the whole Web PubSub domain.
  - question: How can a GHE.com administrator find the enterprise's specific Web PubSub host?
    answer: By inspecting a cloud session in browser developer tools or by contacting GitHub Support.
  - question: Is subscription-based network routing available on GHE.com?
    answer: No. GitHub documents that it is not supported for GHE.com.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors
---

## What you will learn

- Allow WebSocket traffic for cloud sessions without over-broad rules.
- Adjust the client allowlist for GHE.com.

## WebSockets need their own test

Cloud sessions viewed in a browser stream through WebSocket connections to `wss://production-copilot-host*.webpubsub.azure.com` hosts on TCP port 443, according to the [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference). The proxy must support bidirectional WebSocket traffic; a page that loads over HTTPS does not prove the stream works. The reference recommends against allowing all of `*.webpubsub.azure.com`.

The [network troubleshooting article](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors) adds that an HTTP 101 response only confirms the protocol upgrade, so retry the session to confirm messages flow. When collecting evidence from browser developer tools, do not share tokens, cookies or query strings.

## GHE.com differences

For GitHub Enterprise Cloud with data residency, the reference lists `SUBDOMAIN.ghe.com` and `*.SUBDOMAIN.ghe.com` in place of many GitHub.com hosts. Add `origin-tracker.githubusercontent.com` only if you use public code detection, and add the enterprise's specific Web PubSub host, found with developer tools or through GitHub Support. Experimentation is disabled on GHE.com, and subscription-based network routing is not supported there.

Guide advice: keep separate lists for GitHub.com and GHE.com tenants. Mixing them makes it hard to prove that a data residency tenant only reaches its own subdomain.

## Worked example: a stream that never arrives

**Hypothetical starting state:** The Channel Markers team on GitHub.com can start a cloud session from the browser, but the session view never shows progress. The corporate proxy allows HTTPS to GitHub hosts and inspects all TLS traffic.

The administrator opens browser developer tools, finds the request to the Web PubSub host and sees that the upgrade succeeds but no further messages arrive. The proxy's WebSocket handling is the suspect. The team proposes a narrow rule for the documented host pattern on port 443 and an inspection exception limited to that host.

**Outcome:** After review, the rule is tested in a sandbox network and the session streams. No wildcard for the whole Web PubSub domain is added, and certificate validation stays on.

## Practice: plan a WebSocket rule

**Prerequisites:** Browser developer tools and a test account allowed to start cloud sessions. No production rules need to be changed.

1. In an authorized sandbox, start a cloud session and locate the `.webpubsub.azure.com` request.
2. Record the host and response status without copying tokens, cookies or query strings.
3. Draft a rule for the documented host pattern on TCP 443 that permits bidirectional traffic.
4. Without a sandbox, compare your draft with the model answer.

**Expected result:** A redacted host record and a rule limited to the documented pattern.

<details>
<summary>Model answer</summary>

The rule allows `production-copilot-host*.webpubsub.azure.com` on TCP 443 with WebSocket support, not `*.webpubsub.azure.com`. Evidence records the host and status only. A 101 response is followed by a retry to confirm the stream. On GHE.com, the rule names the enterprise's specific host instead.

</details>
