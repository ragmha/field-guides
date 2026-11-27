---
title: Build a client allowlist
section: Client Allowlists
order: 6
description: Start from the meta API, add documented gaps and test each editor's own requirements.
verified: "2026-11-27"
diagram: build-client-allowlist
checks:
  - question: Does a rule for *.github.com cover the apex github.com host?
    answer: No. The allowlist reference says to allow github.com explicitly because the wildcard does not cover it.
  - question: Is the domain list from the meta API a complete list of everything a client may need?
    answer: No. GitHub notes the list is not comprehensive, and editors have their own requirements, so test real clients.
sources:
  - https://docs.github.com/en/copilot/reference/copilot-allowlist-reference
  - https://docs.github.com/en/get-started/using-github/allowing-access-to-githubs-services-from-a-restricted-network
  - https://code.visualstudio.com/docs/setup/network
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-firewall-settings
---

## What you will learn

- Retrieve current domains from the meta API.
- Add the documented hosts that the API does not cover.
- Account for editor-specific requirements.

## Start from published data

The [Copilot allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference) recommends retrieving domains from the meta API rather than copying a static list. With the GitHub CLI, `gh api meta -q '.domains | .website, .copilot'` returns the website and Copilot domains. The reference adds two caveats: allow the apex `github.com` explicitly, because `*.github.com` does not match it, and remember that the plan-specific hosts `*.individual.githubcopilot.com`, `*.business.githubcopilot.com` and `*.enterprise.githubcopilot.com` are not in the meta API output.

The reference also lists specific hosts for authentication, the Copilot API, telemetry, experimentation and usage report downloads, for example `api.github.com/copilot_internal/*`, `copilot-proxy.githubusercontent.com` and `default.exp-tas.com`. The [restricted network article](https://docs.github.com/en/get-started/using-github/allowing-access-to-githubs-services-from-a-restricted-network) warns that the meta domain list is not comprehensive.

Editors add their own needs. [Visual Studio Code's network page](https://code.visualstudio.com/docs/setup/network) lists hosts such as `marketplace.visualstudio.com` and `update.code.visualstudio.com`, and `vscode.dev` as a sign-in fallback. Copilot features cannot load if the editor itself cannot install or update the extension.

Guide advice: generate the list on a schedule, compare it with the previous version and send differences for review instead of editing rules by hand.

## Worked example: a scripted baseline

**Hypothetical starting state:** The Breakwater Network team maintains a hand-written list copied from an old wiki page. Developers report that sign-in works but suggestions sometimes fail.

The team runs the meta API query, adds the apex `github.com`, adds the specific hosts from the reference and adds the editor hosts for the two editors in use. They compare the result with the wiki list and find that the old list relied on `*.github.com` alone and omitted `copilot-proxy.githubusercontent.com`.

**Outcome:** A reviewed baseline replaces the wiki list, with each entry tagged by source: meta API, Copilot reference or editor documentation. The team tests suggestions and Chat from a managed device before approving.

## Practice: assemble a baseline

**Prerequisites:** The GitHub CLI, read access to the meta API and the [allowlist reference](https://docs.github.com/en/copilot/reference/copilot-allowlist-reference). No firewall rules need to be changed.

1. Run the meta API query and save the output.
2. Add the apex host, the specific hosts from the reference and the hosts for one editor you support.
3. Tag each entry with its source.
4. In an authorized sandbox network, apply the list and test sign-in, suggestions and Chat with a test account. Without a sandbox, compare your list with the model answer.

**Expected result:** A tagged list that includes `github.com`, the meta API domains, the specific Copilot hosts and one editor's hosts.

<details>
<summary>Model answer</summary>

The list contains the meta API website and Copilot domains, `github.com` added explicitly, the Copilot-specific hosts such as `copilot-proxy.githubusercontent.com` and `api.github.com/copilot_internal/*`, and the editor's update and marketplace hosts. Plan-specific hosts are handled separately in Part 4. The list is marked as tested only after a real client succeeds.

</details>
