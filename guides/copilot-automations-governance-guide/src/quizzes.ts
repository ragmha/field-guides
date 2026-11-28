interface Question {
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}

export const quizzes: Question[][] = [
  [
    { prompt: "Which repositories can automations run in?", options: ["Public, private and internal repositories", "Private and internal repositories", "Only repositories owned by an enterprise"], answer: 1, explanation: "Automations are limited to private and internal repositories." },
    { prompt: "What can a scheduled run change in its repository?", options: ["Any resource, whatever the trigger write scope says", "Only the issue or pull request that triggered it", "Nothing until a person approves the run"], answer: 0, explanation: "Scheduled runs have no event actor, so the write-scope option for event triggers does not limit them." },
    { prompt: "By default, whose events can start an event-triggered automation?", options: ["Any user who can view the repository", "Only organization owners and admins", "Users with write access to the repository"], answer: 2, explanation: "Event triggers ignore users without write access unless the automation opts out." },
    { prompt: "What is the main governance risk of starting tasks with a personal access token?", options: ["The token cannot reach the agent tasks API", "Tasks always bill the organization owner", "The routine is tied to one person"], answer: 2, explanation: "A personal token carries one person's identity, so the routine depends on that account." },
    { prompt: "How should you treat the agent automations and agent tasks REST endpoints?", options: ["As public preview dependencies that may change", "As stable, generally available interfaces", "As internal endpoints that need special access"], answer: 0, explanation: "Both REST surfaces are labeled public preview." },
  ],
  [
    { prompt: "Who pays AI credits for a shared automation?", options: ["The person who created it", "The last person who edited it", "The repository owner"], answer: 2, explanation: "Shared automations act as Copilot and bill the repository owner." },
    { prompt: "Can an automation change from personal to shared after creation?", options: ["Yes, by editing its settings", "No, the type is fixed at creation", "Yes, if an organization owner approves"], answer: 1, explanation: "The automation type is immutable, so moving ownership means recreating it." },
    { prompt: "How can a reviewer find personal automations they cannot list?", options: ["Ask GitHub support for an export", "Look for their visible runs and output", "Read the repository settings page"], answer: 1, explanation: "Personal automations are hidden from others, but their runs and pull requests are visible." },
    { prompt: "What happens to a shared automation when its creator leaves?", options: ["It keeps running and others can edit it", "It is deleted with the account", "It pauses until a new owner is set"], answer: 0, explanation: "Shared automations survive creator departure and anyone with write access can edit them." },
    { prompt: "Before a creator leaves, what should happen to their personal automations?", options: ["Nothing, they transfer automatically", "They are converted to shared ones", "They are disabled or recreated as shared"], answer: 2, explanation: "Ask creators to disable personal automations or hand the routine over by recreating it." },
  ],
  [
    { prompt: "What is the main limit on what an automation run can do?", options: ["The set of tools selected for it", "The cadence of its schedule", "The length of its prompt"], answer: 0, explanation: "Tool selection decides which actions a run can take and what it can reach." },
    { prompt: "What does the Only this issue option limit?", options: ["All writes by MCP tools", "Every write by scheduled runs", "Event-triggered writes by GitHub tools"], answer: 2, explanation: "It does not limit MCP tools or scheduled runs." },
    { prompt: "Can the agent opt itself in to being triggered by Copilot-created events?", options: ["Yes, with a prompt instruction", "No, they are excluded by default", "Yes, after its first successful run"], answer: 1, explanation: "Copilot-created events are excluded by default and only a person can allow them on a trigger." },
    { prompt: "What should you do with a chain where automation A triggers B and B triggers A?", options: ["Add a larger credit limit to both", "Remove the cycle from the design", "Rely on workflow approval to stop it"], answer: 1, explanation: "Draw every chain and remove cycles. Limits and approvals are backstops, not designs." },
    { prompt: "When is opening the write-access actor filter justified?", options: ["When policy and the use case clearly support it", "Whenever the automation is shared", "Whenever the repository is internal"], answer: 0, explanation: "Keeping the filter on stops users without write access from starting runs." },
  ],
  [
    { prompt: "What does a daily credit limit do once it is reached?", options: ["Stops every run in progress", "Prevents new runs until it resets", "Raises an alert but allows runs"], answer: 1, explanation: "Periodic limits block new runs but do not stop runs already in progress." },
    { prompt: "Who pays Actions minutes used by automation runs?", options: ["The creator of the automation", "The person who approved the run", "The repository owner"], answer: 2, explanation: "Actions minutes are billed separately to the repository owner." },
    { prompt: "What is the smallest per-run credit limit you can set?", options: ["30 credits", "100 credits", "1,000 credits"], answer: 0, explanation: "The per-run minimum is 30 credits." },
    { prompt: "A script gets 404 right after asking to run an automation. What should it assume?", options: ["The task may not be created yet", "The run failed and must be retried", "The automation was deleted"], answer: 0, explanation: "Task creation is asynchronous, so poll the task list instead of resubmitting." },
    { prompt: "Is an automation-specific run-rate limit documented?", options: ["Yes, 10 runs per hour per repository", "No, volume is controlled by design", "Yes, 100 runs per day per user"], answer: 1, explanation: "Cadence, filters, serialization and credit limits control volume." },
  ],
  [
    { prompt: "Where can the cloud agent push its changes?", options: ["Directly to the default branch", "To any branch it chooses", "To a copilot branch or its pull request branch"], answer: 2, explanation: "The agent pushes only to one branch, and branch protections and rulesets still apply." },
    { prompt: "When does the extra approval rule for unattributed Copilot pull requests have no effect?", options: ["When zero approvals are required", "When the repository is internal", "When the automation is shared"], answer: 0, explanation: "The rule adds one approval to a configured count above zero." },
    { prompt: "What does Stop session do to commits already pushed?", options: ["Keeps them on the branch", "Reverts them automatically", "Moves them to a new branch"], answer: 0, explanation: "Stopping ends the session and Actions run but keeps pushed commits." },
    { prompt: "Which setting stops an organization's automations without disabling Copilot in the cloud?", options: ["Require approval for workflow runs", "Allow automations", "Validation tools"], answer: 1, explanation: "Allow automations is separate from the Copilot in the cloud policy." },
    { prompt: "What is documented about in-flight runs when a policy is turned off?", options: ["They stop within one minute", "They finish, then the policy applies", "Nothing, so stop sessions explicitly"], answer: 2, explanation: "The behavior is undocumented. Stop running sessions and verify." },
  ],
  [
    { prompt: "Which audit log field links an event to an agent session?", options: ["agent_session_id", "actor_is_agent", "user"], answer: 0, explanation: "agent_session_id joins events to sessions; actor_is_agent flags agent actions." },
    { prompt: "Who can view session logs for runs in a repository?", options: ["Only enterprise owners", "Anyone with read access", "Only the automation creator"], answer: 1, explanation: "Session logs are visible to anyone with read access to the repository." },
    { prompt: "How are changes to an automation definition tracked by default?", options: ["Through a pull request", "Through a required ruleset", "Through revision history"], answer: 2, explanation: "Definitions live outside Git, so revision history is the record of changes." },
    { prompt: "Who decides whether a proposed improvement to an automation is applied?", options: ["The automation that proposed it", "The automation owner", "Any organization member"], answer: 1, explanation: "The owner is notified and can apply or dismiss the proposal." },
    { prompt: "Which option puts agent workflow definitions through pull request review?", options: ["GitHub Agentic Workflows", "Shared automations", "Personal automations"], answer: 0, explanation: "Agentic workflows are files in the repository, so changes go through normal review." },
  ],
];

export const quizReviewLessons: string[][] = [
  ["automation-trigger-inventory", "automation-trigger-inventory", "automation-trigger-inventory", "api-and-assignment-entry-points", "api-and-assignment-entry-points"],
  ["personal-vs-shared-identity", "personal-vs-shared-identity", "personal-vs-shared-identity", "ownership-and-continuity", "ownership-and-continuity"],
  ["tool-and-write-scope", "tool-and-write-scope", "untrusted-input-and-chaining", "untrusted-input-and-chaining", "untrusted-input-and-chaining"],
  ["credit-limits-and-billing", "credit-limits-and-billing", "credit-limits-and-billing", "run-volume-and-rate-control", "run-volume-and-rate-control"],
  ["review-and-workflow-gates", "review-and-workflow-gates", "pause-disable-and-revoke", "pause-disable-and-revoke", "pause-disable-and-revoke"],
  ["run-evidence-and-audit", "run-evidence-and-audit", "automation-change-control", "automation-change-control", "automation-change-control"],
];
