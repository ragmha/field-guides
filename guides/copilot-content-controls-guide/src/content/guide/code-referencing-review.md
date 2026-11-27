---
title: Review code references
section: Public Code Matching
order: 19
description: Find match details in editor logs and chat, and decide whether to use, attribute or remove the code.
verified: "2026-11-27"
diagram: code-referencing-review
checks:
  - question: Which inline suggestions are logged with code references?
    answer: Only suggestions that are accepted and left unchanged.
  - question: Where do you find code references in VS Code?
    answer: In the Output panel, under "GitHub Copilot Log (Code References)".
  - question: Does the public code index include private repositories?
    answer: No. It excludes private repositories and code outside GitHub, and it may miss new code or point to moved or deleted code.
sources:
  - https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-in-ides
  - https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code
---

## What you will learn

- Explain when references are generated.
- Find references in VS Code, JetBrains IDEs and chat.
- Decide what to do with a matched suggestion.

## How references work

[Copilot in IDEs](https://docs.github.com/en/copilot/concepts/copilot-surfaces/copilot-in-ides) explains that matches are checked against an index of public code on GitHub. The index does not include private repositories or code outside GitHub, and because it is refreshed periodically it may miss new code or point to code that has moved or been deleted. For inline suggestions, about 150 characters of surrounding code are checked, and only suggestions that are accepted unchanged are logged with file URLs and detected licenses. GitHub states that matches occur in less than 1% of inline suggestions. The references are intended to help you decide whether to use, attribute or remove the code.

[Finding public code that matches GitHub Copilot suggestions](https://docs.github.com/en/copilot/how-tos/get-code-suggestions/find-matching-code) notes that references are only generated when matches are allowed or the product does not support Block. It shows where to look:

- **VS Code:** Output panel, **GitHub Copilot Log (Code References)**. Entries show the time, the file, a "Similar code at" location, a code extract, the license (or unknown) and a URL.
- **JetBrains IDEs:** **Help → Show Log**, then search for `[Public Code References]`. The license may show `NOASSERTION`.
- **Chat:** a notice such as "Similar code found with n license types - View matches".

## Worked example: a matched helper

**Hypothetical starting state:** On the fictional `octo-tools` team, matches are allowed. A developer accepts a date-parsing helper unchanged in VS Code.

The Code References log shows a "Similar code at" entry with a license and a URL. The developer opens the URL and the team's review note records the license. Because the license requires attribution, the developer adds the attribution the team's open source policy specifies. A second match with license "unknown" is removed and rewritten.

**Outcome:** One suggestion is kept with attribution, one is replaced, and both decisions are in the pull request description.

## Practice: find a reference

**Prerequisites:** An authorized sandbox account where suggestions matching public code are allowed, and VS Code or a JetBrains IDE.

1. Create `fizz-buzz.js` and type `function fizzBuzz()`.
2. Accept the suggestion without editing it.
3. Open the code references log for your IDE.
4. Record the license and URL, and choose use, attribute or remove.

**Expected result:** A log entry, if a match occurred, and a recorded decision. No entry is also a valid result, because matches are uncommon.

<details>
<summary>Model answer</summary>

VS Code log entry: "Similar code at" a public repository URL with license MIT. Decision: attribute according to team policy, or rewrite. If no entry appears, record "no match logged" and confirm the policy is Allow.

</details>
