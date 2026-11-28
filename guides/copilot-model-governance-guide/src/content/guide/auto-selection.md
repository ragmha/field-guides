---
title: Govern Auto model selection
section: Automatic Routing
order: 14
description: Explain which models Auto can choose, how tiers work and how usage is billed.
verified: "2026-11-27"
diagram: auto-selection
checks:
  - question: Can Auto route a request to a model that an administrator has disabled?
    answer: No. Auto excludes models disabled by administrator policy, along with several other categories.
  - question: Does choosing the Efficiency tier change which model is billed?
    answer: Usage is always billed at the rate of the model Auto selects; the tier only changes routing preference.
sources:
  - https://docs.github.com/en/copilot/concepts/models/auto-model-selection
  - https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models
  - https://docs.github.com/en/copilot/reference/ai-models/supported-models
  - https://code.visualstudio.com/docs/agent-customization/language-models
---

## What you will learn

- List the models Auto will never select.
- Describe the three Auto tiers and their billing effect.
- Plan how Auto behaves under a restrictive baseline.

## How Auto chooses

The [Auto model selection page](https://docs.github.com/en/copilot/concepts/models/auto-model-selection) explains that Auto combines real-time system health with an estimate of task complexity to route each request. Users pick **Auto** in the model picker; on surfaces where **Copilot Fusion** appears instead, Fusion applies (next lesson). The page lists supported surfaces, including Copilot Chat and cloud agent on GitHub.com, GitHub Mobile, Visual Studio, Eclipse and Xcode.

Auto offers three tiers. **Efficiency** prioritizes cost, **Balance** weighs cost, quality and latency, and **Intelligence** prioritizes quality. The same models remain eligible in every tier; only the preference changes. Usage is charged at the rate of the model Auto selects, and users on paid plans receive a documented 10% discount on model costs when using Auto in Copilot Chat or cloud agent. In VS Code, the [language models documentation](https://code.visualstudio.com/docs/agent-customization/language-models) notes that an organization can set a starting tier for new chats, which users can still change.

Auto will not include:

- models not available in the user's plan;
- models excluded by administrator policies;
- models excluded by data residency or FedRAMP restrictions;
- evaluation models excluded by policy;
- models installed on a local machine or network.

On plans for individuals, Auto may serve evaluation models unless the user disables that option, as the [supported models reference](https://docs.github.com/en/copilot/reference/ai-models/supported-models) describes. For Copilot Business and Copilot Enterprise, the [base and LTS models page](https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models) states that Auto falls back to the long-term support model if no other models are available.

## Worked example: a narrow baseline

**Hypothetical starting state:** Woodgrove Analytics enables only two Versatile models and disables all Powerful models. Developers report that Auto "never picks the strongest model".

The administrator explains that Auto chooses only among enabled models, so Powerful models cannot be selected. The team records this as an intended effect of the baseline and adds a note to the developer FAQ.

**Outcome:** The routing behavior is understood as a consequence of policy, not a defect, and any request for stronger models goes through the review process.

## Practice: predict the Auto pool

**Prerequisites:** Use the exclusion list above.

1. Write a hypothetical baseline with five models: two enabled, one disabled, one evaluation model and one locally installed model.
2. Mark which models Auto could select for a Copilot Business user.
3. Note which model would be billed if Auto chose each eligible model.
4. If an authorized sandbox is available, send a harmless prompt with Auto and hover over the response to see the selected model, without changing settings.

**Expected result:** A pool of two eligible models, assuming evaluation models are restricted, with billing tied to whichever one Auto selects.

<details>
<summary>Model answer</summary>

Only the two enabled models are eligible. The disabled model is excluded by policy, the evaluation model is excluded when a policy restricts evaluation models (verify its current status rather than assuming), and the local model is never selected by Auto. Each request is billed at the rate of the eligible model Auto chose, less the documented Auto discount where it applies.

</details>
