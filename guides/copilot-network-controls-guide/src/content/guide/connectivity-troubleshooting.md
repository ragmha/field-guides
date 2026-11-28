---
title: Troubleshoot connectivity
section: Runners & Diagnosis
order: 23
description: Test endpoints, read error signatures and collect logs before changing network rules.
verified: "2026-11-27"
diagram: connectivity-troubleshooting
checks:
  - question: What does a successful ping of copilot-proxy.githubusercontent.com return?
    answer: An HTTP 200 response.
  - question: Which errors usually point to a proxy problem rather than a certificate problem?
    answer: Errors such as read ETIMEDOUT or read ECONNRESET; certificate problems show messages like unable to verify the first certificate.
sources:
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/view-logs
  - https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting
---

## What you will learn

- Test Copilot endpoints with and without a proxy.
- Classify errors as proxy, certificate or WebSocket problems.
- Collect logs and diagnostics safely.

## A repeatable triage

The [network troubleshooting article](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors) gives two tests. `curl --verbose https://copilot-proxy.githubusercontent.com/_ping` should return HTTP 200; `https://api.githubcopilot.com/_ping` checks the Chat path. Through a proxy, add `-x http://YOUR-PROXY-URL:PORT -i -L`. If the request succeeds only with `--insecure`, the problem is certificate trust.

Error signatures help sort the cause:

- "read ETIMEDOUT" or "read ECONNRESET": usually the proxy or firewall. Copilot uses its own proxy code, so a proxy that works for the editor may still fail for Copilot.
- "unable to verify the first certificate" or "certificate signature failure": certificate trust, sometimes caused by security software that needs an exception.
- A browser cloud session that connects but does not stream: WebSocket handling for the Web PubSub host.

[View logs](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/view-logs) explains where evidence lives. In VS Code, open **View > Output** and choose the GitHub Copilot channel, set trace logging temporarily with **Developer: Set Log Level**, and run **Developer: Chat Diagnostics**, then read its **Reachability** section. JetBrains IDEs offer diagnostics and certificate logging under **Tools > GitHub Copilot**; Visual Studio shows a GitHub Copilot pane in **Output**. The [VS Code troubleshooting guide](https://code.visualstudio.com/docs/agents/agent-troubleshooting/troubleshooting) also suggests checking firewall, proxy and VPN settings when Copilot cannot connect or sign in.

Recommended: return the log level to its normal setting afterward, and remove tokens, cookies, query strings and internal host names that are not needed before sharing evidence.

## Worked example: works at home, fails in the office

**Hypothetical starting state:** A Lighthouse Row developer's suggestions work at home and fail in the office with "read ECONNRESET".

The administrator runs the ping test directly from the office network; it times out. Through the proxy it returns 200. The device has only `http_proxy` set, pointing to a decommissioned host, so Copilot uses that value for all traffic. Chat Diagnostics shows Reachability failing for the Copilot hosts.

**Outcome:** The stale variable is removed through device management. Retesting returns 200, Reachability passes and no firewall rule changes.

## Practice: run the triage

**Prerequisites:** curl, a test device in an authorized sandbox network and the proxy address. No production settings need to be changed.

1. Run the ping test directly and through the proxy; record the status codes.
2. If either fails, repeat with `--insecure` only to classify the problem, never as a fix.
3. Collect Chat Diagnostics or the editor's equivalent and redact it.
4. Without a sandbox, classify the worked example's evidence and compare with the model answer.

**Expected result:** Two status codes, a classification and redacted diagnostics.

<details>
<summary>Model answer</summary>

Direct: timeout; proxy: 200. Classification: client proxy configuration, not certificates, because no `--insecure` difference appears. Evidence: redacted Reachability output and the variable values. Fix: correct the variable, then retest.

</details>
