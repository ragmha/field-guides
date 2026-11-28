---
title: Trust inspection certificates safely
section: Proxies & Certificates
order: 11
description: Install the right root certificate so inspection works without disabling validation.
verified: "2026-11-27"
diagram: tls-inspection-certificates
checks:
  - question: Where does Copilot look for trusted certificates?
    answer: In the operating system's trust store, plus any certificates named by the NODE_EXTRA_CA_CERTS environment variable.
  - question: What does it suggest if a curl test succeeds only with --insecure?
    answer: A certificate problem, typically a missing or untrusted proxy certificate on the device.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors
  - https://code.visualstudio.com/docs/setup/network
---

## What you will learn

- Explain what a proxy can do with and without a custom certificate.
- Distribute trust through the operating system store or `NODE_EXTRA_CA_CERTS`.
- Recognize unsafe shortcuts.

## Trust decides what a proxy can see

The [network settings concept](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings) explains that Copilot reads certificates from the operating system's trust store and from `NODE_EXTRA_CA_CERTS`. Without a custom certificate, a proxy can route or terminate connections but cannot inspect their contents. Transparent proxies are supported.

The [troubleshooting article](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-network-errors) lists the certificate sources Copilot reads: the Windows certificate store, the macOS certificate store and, on Linux, `/etc/ssl/certs/ca-certificates.crt` or `ca-bundle.crt`. Typical failures read "unable to verify the first certificate" or "certificate signature failure". [VS Code's network page](https://code.visualstudio.com/docs/setup/network) adds that on Linux the certificate may also need to be in the NSS store, and calls `--ignore-certificate-errors` dangerous.

The [configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings) warns that installing a custom certificate means trusting its creator, who could then intercept traffic. It also warns against the JetBrains option to accept non-trusted certificates automatically. VS Code exposes a **Proxy Strict SSL** setting alongside its proxy URL.

Recommended: keep **Proxy Strict SSL** on, distribute the inspection root through device management, document who controls it and treat any request to disable validation as a defect to fix, not a workaround.

## Worked example: a certificate on some machines

**Hypothetical starting state:** The Tidewater team's Windows laptops work, but Linux workstations show "unable to verify the first certificate". The proxy inspects TLS with a corporate root.

The administrator runs `curl --verbose https://copilot-proxy.githubusercontent.com/_ping` on a Linux workstation. It fails, then succeeds with `--insecure`, which points to trust. The corporate root is in the Windows store through device management but missing from the Linux bundle.

**Outcome:** The desktop team adds the root to the Linux certificate bundle through its configuration tooling. The failing test then passes without `--insecure`, and no editor setting disables validation.

## Practice: plan certificate distribution

**Prerequisites:** The name of your inspection root and a list of device operating systems. No device settings need to be changed.

1. For each operating system, record where Copilot reads certificates.
2. Choose between the system store and `NODE_EXTRA_CA_CERTS` for each case.
3. List two shortcuts you will prohibit.
4. In an authorized sandbox device, install the root and rerun the curl test. Without a sandbox, compare your plan with the model answer.

**Expected result:** A per-platform plan and two named prohibited shortcuts.

<details>
<summary>Model answer</summary>

Windows: system store. macOS: system certificate store. Linux: the system bundle, plus NSS for VS Code; `NODE_EXTRA_CA_CERTS` where the system store is not managed. Prohibited: accepting non-trusted certificates automatically in JetBrains and turning off Proxy Strict SSL or using `--ignore-certificate-errors` in VS Code.

</details>
