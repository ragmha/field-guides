---
title: Configure a supported proxy
section: Proxies & Certificates
order: 10
description: Predict which proxy Copilot uses and choose a supported authentication method.
verified: "2026-11-27"
diagram: proxy-configuration
checks:
  - question: If both HTTPS_PROXY and http_proxy are set, which one does Copilot use for HTTPS traffic?
    answer: HTTPS_PROXY. Copilot uses the highest-priority variable for both HTTP and HTTPS traffic.
  - question: Can a proxy URL start with https:// for Copilot?
    answer: No. Copilot supports basic HTTP proxies; proxy URLs beginning with https:// are not supported.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings
  - https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings
---

## What you will learn

- Predict which proxy variable Copilot applies.
- Choose between basic and Kerberos proxy authentication.
- Locate the proxy setting for each editor.

## How Copilot chooses a proxy

By default Copilot connects directly over HTTPS. The [network settings concept](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/network-settings) states that Copilot supports basic HTTP proxies with basic or Kerberos authentication, and that proxy URLs starting with `https://` are not supported.

When proxy environment variables are set, Copilot checks them in this order: `HTTPS_PROXY`, `https_proxy`, `HTTP_PROXY`, `http_proxy`. It uses the first one it finds for both HTTP and HTTPS traffic. That differs from tools that use one variable per scheme, so a value intended only for HTTP can end up carrying all traffic.

Kerberos authentication needs the krb5 library and a valid ticket, which you can obtain with `kinit` and check with `klist`. The service principal name defaults to `HTTP/` followed by the proxy host. The [configuration how-to](https://docs.github.com/en/copilot/how-tos/copilot-in-your-ide/set-up-copilot/configure-network-settings) shows how to override it in VS Code with `http.proxyKerberosServicePrincipal` and in JetBrains under **Tools > GitHub Copilot > Network**; Visual Studio does not support an override. The `AGENT_KERBEROS_SERVICE_PRINCIPAL` environment variable can also set it.

Editors differ. VS Code reads **Settings > Application > Proxy**. JetBrains uses its HTTP Proxy settings and stores basic credentials in plaintext. Visual Studio reads Windows proxy settings but not their credentials; set `COPILOT_USE_DEFAULTPROXY=true` or include credentials in the proxy URL.

Recommended: prefer Kerberos where your proxy supports it, so passwords are not stored in settings files or URLs.

## Worked example: the wrong variable wins

**Hypothetical starting state:** On the Signal Station team's build images, `HTTP_PROXY` points to an old proxy and `https_proxy` points to the current one. Developers report intermittent timeouts.

The administrator applies the documented order. `HTTPS_PROXY` is unset, so `https_proxy` is the highest-priority variable present and Copilot uses it for all traffic. The timeouts therefore are not caused by the old proxy. The administrator checks the current proxy's Kerberos ticket handling instead and finds expired tickets on long-running machines.

**Outcome:** The team removes the stale `HTTP_PROXY` value to avoid confusion and documents ticket renewal. No change is made to certificate validation.

## Practice: predict the proxy

**Prerequisites:** The order above. No device settings need to be changed.

1. For each set, name the proxy Copilot uses: (a) only `http_proxy`; (b) `HTTP_PROXY` and `https_proxy`; (c) `HTTPS_PROXY` set to an `https://` URL.
2. Name one editor where the Kerberos principal cannot be overridden in the editor.
3. In an authorized sandbox device, set one variable and observe the proxy log. Without a sandbox, compare your answers with the model answer.

**Expected result:** Three predictions and the editor name, with the unsupported case identified.

<details>
<summary>Model answer</summary>

(a) `http_proxy`, used for both schemes. (b) `https_proxy`, because it outranks `HTTP_PROXY`. (c) Unsupported: Copilot does not support proxy URLs that begin with `https://`. Visual Studio does not support overriding the Kerberos principal.

</details>
