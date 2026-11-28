---
title: Mask credentials in the sandbox
section: Credential Exposure
order: 18
description: Give sandboxed commands placeholders instead of secrets, with real values sent only to approved hosts.
verified: "2026-11-27"
diagram: credential-masking
checks:
  - question: Where does a sandboxed gh command's real GitHub token get sent?
    answer: Only to github.com, api.github.com and uploads.github.com; the command sees a placeholder.
  - question: What happens to credential masking when a command is approved to bypass the sandbox?
    answer: Masking and the proxy are skipped, so the command receives real secrets.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings
  - https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing
  - https://code.visualstudio.com/docs/agents/run/agent-sandboxing
---

## What you will learn

- Explain how placeholders and the local proxy protect credentials.
- Configure a masked environment variable and recognize when masking stops.

## Placeholders and a local proxy

[About local sandboxing](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-and-local-sandboxes) describes the credential control. Sandboxed processes receive placeholders, and a local proxy swaps in real credentials only for HTTPS requests to approved destinations.

[Configuring local sandbox settings](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/configuring-local-sandbox-settings) lists the CLI options. **Authenticate git** and **Authenticate gh** are on by default. For `gh`, the command sees a placeholder `GH_TOKEN`, and the real token goes only to `github.com`, `api.github.com` and `uploads.github.com`. To mask another variable, add `sandbox.credentials.envVars.<NAME>.injectHosts` to `~/.copilot/settings.json`. Masking works only while the sandbox is on. Do not also list a masked variable in `--secret-env-vars`, because that removes the variable instead. On Windows, masking needs local network access. macOS keychain access is off by default.

[Using local sandboxing](https://docs.github.com/en/copilot/how-tos/cloud-and-local-sandboxes/using-local-sandboxing) warns that an approved sandbox bypass skips masking and the proxy, so the command gets real secrets. The VS Code [agent sandbox](https://code.visualstudio.com/docs/agents/run/agent-sandboxing) offers `chat.agent.sandbox.credentials.envVars` with the same `injectHosts` idea. It also notes that authenticated commands act with your account's permissions, so turn off Git or `gh` credentials a task does not need.

## Worked example: an API token for one host

**Hypothetical starting state:** A developer exports `API_TOKEN` for a staging API at `api.staging.example.com`. Sandboxing is on, but the variable is not masked, so sandboxed commands can read its real value.

The reviewer adds this to `~/.copilot/settings.json`:

```json
{
  "sandbox": {
    "credentials": {
      "envVars": {
        "API_TOKEN": { "injectHosts": ["api.staging.example.com"] }
      }
    }
  }
}
```

After restarting the session, `echo $API_TOKEN` in a sandboxed command shows a placeholder. A `curl` to the staging API succeeds, because the proxy injects the real value. The reviewer also turns off **Authenticate gh**, because this task does not use GitHub.

**Outcome:** The token is usable only for its intended host. The reviewer notes that any approved bypass would expose the real value, so bypass is not offered for this task.

## Practice: mask one variable

**Prerequisites:** A sandboxed Copilot CLI test session, and a harmless test variable such as `DEMO_TOKEN=not-a-secret`.

1. Add `DEMO_TOKEN` to `sandbox.credentials.envVars` with one inject host.
2. Restart the session and confirm the sandbox is on with `/sandbox status`.
3. Ask the agent to print the variable inside the sandbox.
4. Record what it shows, and what would change if a bypass were approved.

**Expected result:** The sandboxed command shows a placeholder, and your notes explain that a bypass would expose the real value.

<details>
<summary>Model answer</summary>

The output is a placeholder rather than `not-a-secret`. The real value would reach only the listed host over HTTPS. Turning the sandbox off or approving a bypass returns the real value. The variable is not listed in `--secret-env-vars`.

</details>
