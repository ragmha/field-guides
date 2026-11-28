---
title: Harden setup steps and runners
section: Environment and Secrets
order: 22
description: Limit setup step permissions and choose runners that keep agent sessions isolated.
verified: "2026-11-27"
diagram: setup-steps-hardening
checks:
  - question: Do setup steps in copilot-setup-steps.yml apply to cloud sandbox sessions?
    answer: No. Setup steps apply only to sessions that run on GitHub Actions.
  - question: What must you do with the integrated firewall when the agent uses self-hosted runners?
    answer: Disable it, because it is incompatible with self-hosted runners, and configure your own network controls instead.
sources:
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment
  - https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes
---

## What you will learn

- Describe what the setup steps file controls and when it runs.
- Set minimal permissions for setup steps.
- Choose and enforce a runner type.

## Setup steps run before the agent

The [environment page](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/customize-the-agent-environment) describes `.github/workflows/copilot-setup-steps.yml` with a single job named `copilot-setup-steps`. It must be on the default branch to take effect. Only `steps`, `permissions`, `runs-on`, `services`, `snapshot` and `timeout-minutes` (up to 59) are honored. If a step fails, the remaining steps are skipped and the agent continues. Copilot receives its own token, so set minimal `permissions`, such as `contents: read` for checkout. The [cloud sandbox page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/about-cloud-sandboxes) confirms that setup steps apply only to Actions sessions.

Self-hosted runners should be ephemeral and single-use. The integrated firewall is incompatible with them and must be disabled, so you must supply your own network controls. Only Ubuntu x64 and Windows 64-bit runners are supported, and the firewall is not compatible with Windows.

The [runner page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/configure-runner-for-coding-agent) explains that organization owners can choose a runner type under **Settings > Copilot > Cloud > Runner type**. Clearing **Allow repositories to customize the runner type** enforces it. The [guardrails tutorial](https://docs.github.com/en/copilot/tutorials/cloud-agent/build-guardrails) recommends GitHub-hosted runners, which use a fresh virtual machine each time, and reviewing default `GITHUB_TOKEN` permissions, since setup steps use that token.

**Guide advice:** Put the setup steps file under code owner review. It runs before the agent and outside firewall coverage.

## Worked example: an over-permissioned file

**Hypothetical starting state:** The fictional Granite Peak Software repository has a setup steps file with `permissions: write-all` and a step that downloads a tool from a vendor site.

The platform team reviews it. The agent has its own token, so the job needs only `contents: read`. The download runs in setup steps, outside firewall coverage, so they pin the tool version and verify a checksum. They add a CODEOWNERS entry for the file and merge the change through review.

**Outcome:** Setup steps run with read-only access, and the download is pinned and verified.

## Practice: review a setup steps file

**Prerequisites:** A local note and a fictional file that sets `runs-on: self-hosted`, `timeout-minutes: 120`, `permissions: contents: write` and a `fetch-depth: 0` checkout.

1. List each value that is ignored, capped or risky.
2. Propose corrected values.
3. Note what the team must add if the self-hosted runner stays.
4. Review the file only in an authorized sandbox repository.

**Expected result:** A corrected file outline and a list of runner prerequisites.

<details>
<summary>Model answer</summary>

`timeout-minutes` is capped at 59. `contents: write` exceeds need; use `contents: read`. The `fetch-depth` value is overridden. For self-hosted runners, use ephemeral single-use runners, disable the integrated firewall, and provide network controls. Otherwise, switch to a GitHub-hosted runner.

</details>
