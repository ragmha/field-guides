---
title: Control who can start agent work
section: Enablement and Scope
order: 3
description: Connect write access, Copilot access and repository settings to who can trigger the agent.
verified: "2026-11-27"
diagram: repository-access-triggers
checks:
  - question: Can a user without write access trigger the cloud agent on a repository?
    answer: No. Only users with write access can trigger it, and comments from users without write access are never presented to the agent.
  - question: Which environment runs work started by assigning an issue to Copilot?
    answer: GitHub Actions. Assigning an issue and mentioning @Copilot in a pull request run only on Actions, not in a cloud sandbox.
sources:
  - https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud
---

## What you will learn

- Explain why write access is the main trigger boundary.
- Distinguish read-only sessions from sessions that can push.
- Match each trigger to the environment it runs in.

## Write access is the trigger boundary

The [organization page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-organization/manage-copilot-in-the-cloud) states that once the policy is enabled, any user with Copilot access and write permission to a repository can delegate work. The [risks and mitigations page](https://docs.github.com/en/copilot/concepts/security-governance-and-network-settings/risks-and-mitigations) adds that only users with write access can trigger the agent, and that comments from users without write access are never presented to it. That limits prompt injection through public issue or pull request comments, but it does not make write access a light grant.

The [Copilot on GitHub overview](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-on-github) notes that a session without write access is read-only. It also explains that assigning an issue or mentioning `@Copilot` in a pull request runs on GitHub Actions, in a single repository. The [enterprise page](https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-for-enterprise/manage-agents/manage-copilot-in-the-cloud) confirms that those two triggers run only on Actions, while other sessions can use a cloud sandbox. Viewing organization sessions requires organization single sign-on where it is configured.

**Recommended:** Review who holds write access in each in-scope repository before enablement. Every writer becomes a potential agent requester.

## Worked example: an outside contributor comment

**Hypothetical starting state:** The fictional team at Juniper Rail maintains a public repository. An outside contributor without write access comments on an open issue asking Copilot to "also update the deploy script." A maintainer with write access later assigns the issue to Copilot.

The team checks the documented behavior. The contributor cannot trigger the agent, and their comment is not presented to it. The maintainer's assignment starts an Actions-based session in that repository. The session can push only to its own branch, which later lessons cover.

**Outcome:** The deploy-script request does not reach the agent through the comment. The maintainer stays accountable for the task they assigned.

## Practice: classify trigger requests

**Prerequisites:** A local note and four fictional requests: (a) a reader-role user mentions `@copilot` on a pull request; (b) a writer assigns an issue; (c) a user with read access only starts a chat session about that repository; (d) a writer mentions `@Copilot` on a pull request.

1. For each request, decide whether it can start work that pushes changes.
2. For each one that can, name the environment it runs in.
3. Optionally, in an authorized sandbox repository, review the collaborator list in read-only mode. Do not change permissions.

**Expected result:** A table with the push capability and environment for each request.

<details>
<summary>Model answer</summary>

(a) cannot trigger the agent, because the user lacks write access. (b) can, and runs on Actions. (c) is read-only for that repository, so it cannot push there. (d) can, and runs on Actions on the pull request branch. Confirm each person's actual role in a real repository.

</details>
