---
title: Keep approval independent
section: Required Reviews
order: 10
description: Understand why the requester's approval does not count and when an extra approval applies.
verified: "2026-11-27"
diagram: review-independence
checks:
  - question: Does the approval of the person who asked Copilot for the change count toward required approvals?
    answer: No. Another reviewer with the required access must approve the pull request.
  - question: When does the additional approval for unattributed Copilot pull requests take effect in a ruleset?
    answer: When Copilot opens a pull request under its own app identity and the ruleset already requires at least one approval. The setting is in public preview and on by default.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output
  - https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets
---

## What you will learn

- Explain the requester restriction on approving agent pull requests.
- Identify when unattributed Copilot pull requests need one more approval.
- Size review rules so independent approval is possible.

## Two people still matter

The [review guide](https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/review-copilot-output) states that if you asked Copilot to create a pull request, your approval does not count toward required approvals. Another reviewer must approve. The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) describes the same restriction, which keeps a requester from steering the agent and then approving its output alone.

Some pull requests are not attributed to a person, for example when Copilot is prompted from a shared group thread or channel. The [available rules page](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets) describes **Require an additional approval for unattributed Copilot pull requests**, which is **public preview** and subject to change. It is on by default for new and existing rulesets. A ruleset that requires one approval then requires two approvals from people with write access. It has no effect when a ruleset requires zero approvals. The risks page notes that the extra approval always applies under branch protection rules.

**Recommended:** Require at least one approval on branches that receive agent work. Without a required approval, these independence controls have nothing to strengthen.

## Worked example: a channel request

**Hypothetical starting state:** The fictional Ridgeway Health platform team prompts Copilot from a shared team channel. Copilot opens a pull request under its app identity. The ruleset requires one approval and keeps the additional approval setting at its default.

The team checks the documented behavior. The pull request is unattributed, so the ruleset requires two approvals from people with write access. One engineer approves, and the merge stays blocked until a second engineer approves.

**Outcome:** Two people reviewed a change that no single person requested. The team records that the setting is in public preview and plans to recheck it before relying on it.

## Practice: count required approvals

**Prerequisites:** A local note and three fictional pull requests in an authorized sandbox repository with a ruleset requiring one approval and the additional approval setting on: (a) a human pull request; (b) an agent pull request requested by Avery; (c) an unattributed agent pull request from a channel.

1. For each pull request, state how many approvals are needed.
2. State whether Avery's approval counts on (b).
3. Repeat for a ruleset requiring zero approvals.

**Expected result:** A table of approval counts under both rulesets.

<details>
<summary>Model answer</summary>

With one required approval: (a) needs one; (b) needs one from someone other than Avery, because Avery's approval does not count; (c) needs two. With zero required approvals, the additional approval setting has no effect, so (a) and (c) need none. For (b), Avery's approval still does not count toward required approvals, but none are required. Confirm the preview behavior before relying on it.

</details>
