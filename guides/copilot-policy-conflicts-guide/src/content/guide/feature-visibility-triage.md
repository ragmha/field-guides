---
title: Feature visibility triage
section: Troubleshooting Visibility
order: 18
description: Work through account, client, seat, policy, conflict and resource checks in order when a user does or does not see a feature.
verified: "2026-11-27"
diagram: feature-visibility-triage
checks:
  - question: Where can a user check whether Copilot cloud agent is enabled for them?
    answer: On their Copilot features settings page at github.com/settings/copilot/features.
  - question: Why check the signed-in account before reading any policy?
    answer: If the editor is signed in with an account that does not hold the license, no policy trace will explain the behavior.
  - question: How long can content exclusion changes take to reach an IDE?
    answer: Up to 30 minutes.
sources:
  - https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues
  - https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent
  - https://docs.github.com/en/copilot/concepts/enterprise/policies
---

## What you will learn

- Apply a fixed triage order to a visibility report.
- Rule out account, client and propagation causes before tracing policy.
- Use the user's own features page as evidence.

## Cheap checks first

Many reports are not policy conflicts. GitHub's troubleshooting guide lists several causes worth ruling out first. See [Troubleshooting common issues with GitHub Copilot](https://docs.github.com/en/copilot/how-tos/troubleshoot-copilot/troubleshoot-common-issues):

- **Account:** confirm the account signed in to the editor is the one that holds the Copilot license.
- **Client version:** older client versions may be unable to communicate with Copilot's servers, and the latest Copilot Chat release generally requires the latest VS Code.
- **Plan or token:** "Could not connect to server" can mean the user has no plan or there is a token problem.
- **Propagation:** content exclusion changes can take up to 30 minutes to reach IDEs. An excluded file shows the Copilot status icon with a diagonal line, and its tooltip shows which settings applied.

Next, read the user's own view. Users can check github.com/settings/copilot/features to see whether Copilot cloud agent is enabled for them. Cloud agent is not available in personal repositories owned by managed user accounts, and a sandbox session needs the Copilot in the cloud policy enabled. See [Troubleshooting Copilot cloud agent](https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/troubleshoot-cloud-agent).

Then trace the policy: enterprise state, seat sources, conflict rule, resource controls, and surface coverage. Guide advice: write down the step that explained the report and stop there, but note any later step you could not rule out.

## Worked example: a feature that appears for one teammate only

**Hypothetical starting state:** Two developers on the same team report different results for Copilot in the cloud. Both are members of the platform and data organizations. Developer A sees it; developer B does not.

The administrator confirms both are signed in with licensed accounts on current clients. Developer B's features page shows the cloud agent as disabled. The policy is delegated. Developer A is seated by platform, which enables it; developer B is seated only by data, which disables it. The least-restrictive rule does not help B because B has one seat source.

**Outcome:** The difference is the seat source, not the client. The fix options are seating B through platform or enabling the feature in data, after the owners agree.

## Practice: triage a "missing feature" ticket

**Prerequisites:** A hypothetical ticket: "Copilot CLI disappeared after I switched laptops." No settings need to be changed.

1. List the account, client and plan checks.
2. List the policy checks in order.
3. Mark which checks the user can perform and which need an administrator.
4. In an authorized sandbox, run the user-side checks. Without a sandbox, compare with the model answer.

**Expected result:** A short ordered list in which the account check comes first.

<details>
<summary>Model answer</summary>

User: confirm the signed-in account on the new laptop holds the license; update the client; check the features page. Administrator: enterprise state for Copilot CLI, seat sources, conflict rule, then surface coverage. A new laptop most often points to the account or client.

</details>
