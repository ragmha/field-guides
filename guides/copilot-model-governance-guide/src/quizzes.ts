interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: 'Which factors decide whether a listed model appears for a given user?', options: ['Plan, surface, administrator policy and time', 'Only the model provider and its release date', 'Only the client version the user installed'], answer: 0, explanation: 'The models overview names plan, surface, policies and time as availability factors.' },
    { prompt: 'How can an administrator turn off utility models that write commit messages?', options: ['Disable them in the model settings list', 'Exclude them through the Auto tier setting', 'Only by disabling Copilot for those users'], answer: 2, explanation: 'Utility models are not in the picker and cannot be disabled except by disabling Copilot.' },
    { prompt: 'Which models can Copilot Free and Student users choose?', options: ['Any GA model in the supported list', 'Auto model selection only', 'Models their school enables for them'], answer: 1, explanation: 'The access documentation states that Free and Student plans get Auto only.' },
    { prompt: 'What is true of evaluation models according to the supported models reference?', options: ['They are covered by default enablement', 'They can be added or removed without notice', 'They are available only through BYOK keys'], answer: 1, explanation: 'Evaluation models may use codenames and can change without notice.' },
    { prompt: 'How does a public preview model behave under an Enabled GA default?', options: ['It stays unconfigured until explicitly set', 'It becomes enabled for every organization', 'It is enabled only for enterprise owners'], answer: 0, explanation: 'Preview models do not follow the default availability policy for released models.' },
  ],
  [
    { prompt: 'Which model status follows the default availability policy?', options: ['Explicitly Enabled by the enterprise', 'Delegate to default policy', 'Unconfigured preview model status'], answer: 1, explanation: 'Delegate to default policy follows the default; explicit and unconfigured states do not.' },
    { prompt: 'An open-weight model is GA and the default policy is Enabled. What is its state?', options: ['Disabled until someone enables it', 'Enabled for all licensed users now', 'Enabled only inside enterprise teams'], answer: 0, explanation: 'Open-weight models are excluded from default enablement.' },
    { prompt: 'What does the default availability policy not control?', options: ['Newly released GA models left unset', 'Models delegated to the default policy', 'The default model chosen in a session'], answer: 2, explanation: 'GitHub documents default availability and the session default model as unrelated.' },
    { prompt: 'In enterprise teams mode, a model is disabled at the enterprise. Can a team enable it?', options: ['Yes, if the team owner requests it', 'Yes, for users in more than one team', 'No, team access is additive within limits'], answer: 2, explanation: 'An enterprise-disabled model cannot be enabled for a team.' },
    { prompt: 'Which tool scopes one model to two pilot organizations only?', options: ['A targeted model access rule', 'The default availability policy', 'A utility model exception'], answer: 0, explanation: 'Access rules target selected organizations with an allowed model list.' },
  ],
  [
    { prompt: 'What does GitHub state about training on Copilot Business customer data?', options: ['It is used only for open-weight models', 'GitHub does not use it to train models', 'It is used after a 24-hour cache period'], answer: 1, explanation: 'The model hosting reference states GitHub does not train on Business or Enterprise customer data.' },
    { prompt: 'Where are prompts to GitHub-hosted open-weight models sent?', options: ['To the hosting provider, not the developer', 'To the original developer for evaluation', 'To the user’s own provider account'], answer: 0, explanation: 'They are served by a host under zero data retention and not sent to the original developer.' },
    { prompt: 'Which hosting case may not use the same safety filters?', options: ['A model served on Google Cloud', 'A model hosted by OpenAI', 'A model hosted on the user’s own machine'], answer: 2, explanation: 'The reference notes a locally hosted model may not use the same safety filters.' },
    { prompt: 'A retention exemption for a non-covered model is approved. What remains?', options: ['Nothing, the model is enabled already', 'An administrator must still enable it', 'Users must add their own provider key'], answer: 1, explanation: 'Approval does not enable the model; an administrator must enable it.' },
    { prompt: 'With BYOK, whose retention terms may apply to prompts and responses?', options: ['Only GitHub’s retention agreement', 'Only the IDE vendor’s privacy policy', 'The selected provider’s policies'], answer: 2, explanation: 'The Chat responsible use page says BYOK traffic may be subject to the provider’s policies.' },
  ],
  [
    { prompt: 'Which model can Auto select for a Copilot Business user?', options: ['A model the enterprise enabled for them', 'A model installed on the local machine', 'A model the organization has disabled'], answer: 0, explanation: 'Auto excludes disabled, out-of-plan, restricted and locally installed models.' },
    { prompt: 'How is usage billed when Auto routes a request in the Efficiency tier?', options: ['At a flat Auto rate for every tier', 'At the rate of the model Auto selected', 'At the lowest rate in the whole catalog'], answer: 1, explanation: 'Usage is charged at the selected model’s rate, with the documented Auto discount where it applies.' },
    { prompt: 'What does Auto fall back to for Business when no other models are available?', options: ['The long-term support model', 'Any evaluation model available', 'The model last used by the user'], answer: 0, explanation: 'The base and LTS page states Auto falls back to the LTS model.' },
    { prompt: 'In the Cascade pattern, what decides whether a draft is escalated?', options: ['The user approves each draft by hand', 'A policy sets a fixed escalation rate', 'A judge inspects the draft and decides'], answer: 2, explanation: 'Cascade drafts with an efficient model and a judge accepts or escalates.' },
    { prompt: 'Fusion Max disappeared after a cost review. What is a likely cause?', options: ['Fusion requires a separate license', 'Models Fusion Max needs were disabled', 'Fusion is limited to individual plans'], answer: 1, explanation: 'Disabling required models, such as frontier models, can make Fusion Max unavailable.' },
  ],
  [
    { prompt: 'Which pricing component exists only for some models?', options: ['Input tokens sent to the model', 'Output tokens the model returns', 'A long-context tier above a threshold'], answer: 2, explanation: 'Some models add a long-context tier at higher rates above a token threshold.' },
    { prompt: 'What happens to AI credit use under the FedRAMP model restriction?', options: ['Requests cost 10% more AI credits', 'Requests are billed at Auto rates', 'Requests stop using AI credits'], answer: 0, explanation: 'The FedRAMP page documents a 10% uplift under enforcement.' },
    { prompt: 'Where should a model review send budget design?', options: ['Into each model intake record', 'To the provider’s billing console', 'To the AI credits budget process'], answer: 2, explanation: 'Record cost signals, then hand budgets to the AI credits process instead of repeating it.' },
    { prompt: 'How do user-configured BYOK requests reach the model?', options: ['Through GitHub’s Copilot API', 'Through the enterprise key vault', 'Directly from client to provider'], answer: 2, explanation: 'The client uses the user’s credentials to call the provider directly.' },
    { prompt: 'Why does GitHub recommend enterprise custom models as the default?', options: ['Central keys and full usage reporting', 'They avoid any provider data terms', 'They are generally available today'], answer: 0, explanation: 'Keys stay central and usage is reported in metrics; the feature is a public preview.' },
  ],
  [
    { prompt: 'When should model policies for a pilot organization be configured?', options: ['After the pilot results are in', 'Before access is enabled', 'Only when a cost alert fires'], answer: 1, explanation: 'The pilot tutorial says to configure policies first so users are governed from the start.' },
    { prompt: 'How long does GitHub suggest a pilot should run?', options: ['A single sprint of two weeks', 'Until the first user reports value', 'At least one full billing cycle'], answer: 2, explanation: 'Budgets and pooled credits reset each cycle, so plan four to six weeks.' },
    { prompt: 'What does GitHub recommend before using an open-weight model?', options: ['Review the card and run evaluations', 'Request a retention exemption first', 'Enable it for all organizations'], answer: 0, explanation: 'The hosting reference recommends reviewing the model card and running your own evaluations.' },
    { prompt: 'A new base model is designated. What happens without action?', options: ['Nothing until an owner enables it', 'Only Auto can route requests to it', 'It is enabled within 60 days'], answer: 2, explanation: 'Base models are automatically enabled for Business and Enterprise within 60 days.' },
    { prompt: 'How long is a long-term support model supported?', options: ['One year from designation', 'Until the next base model', 'For 60 days after release'], answer: 0, explanation: 'The LTS page commits to one year from the designation date.' },
  ],
];

export const quizReviewLessons: string[][] = [
  ['model-inventory', 'model-inventory', 'model-inventory', 'release-stages', 'release-stages'],
  ['availability-baseline', 'availability-baseline', 'availability-baseline', 'delegation-modes', 'delegation-modes'],
  ['provider-hosting', 'provider-hosting', 'provider-hosting', 'retention-exceptions', 'retention-exceptions'],
  ['auto-selection', 'auto-selection', 'auto-selection', 'fusion-routing', 'fusion-routing'],
  ['model-cost-signals', 'model-cost-signals', 'model-cost-signals', 'bring-your-own-key', 'bring-your-own-key'],
  ['model-review-intake', 'model-review-intake', 'model-review-intake', 'model-lifecycle-review', 'model-lifecycle-review'],
];
