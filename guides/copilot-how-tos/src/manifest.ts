export type LessonReference = { id: string };
export type GuideDefinition = {
  slug: 'copilot-ide-guide' | 'copilot-prompting-guide' | 'copilot-cli-guide' | 'copilot-agent-mode-guide' | 'copilot-instructions-guide' | 'copilot-skills-agents-guide';
  title: string;
  description: string;
  artwork: { src: string; width: number; height: number; alt: string };
  parts: Array<{
    title: string;
    description: string;
    lessons: LessonReference[];
  }>;
};

export const guides: GuideDefinition[] = [
  {
    slug: 'copilot-ide-guide',
    title: 'Copilot in your IDE',
    description: 'Set up and use GitHub Copilot in VS Code, with client-specific differences called out.',
    artwork: {
      src: 'src/assets/copilot-ide-guide.svg',
      width: 720,
      height: 600,
      alt: 'Pen-and-ink illustration of an editor on a desktop monitor, with a suggested code completion, notes and a pencil.',
    },
    parts: [
      {
        title: 'Get started',
        description: 'Check access and prepare your editor.',
        lessons: [{ id: 'access-and-prerequisites' }, { id: 'install-sign-in-configure' }],
      },
      {
        title: 'Work with Copilot',
        description: 'Use suggestions and chat deliberately.',
        lessons: [{ id: 'inline-suggestions' }, { id: 'ask-chat' }],
      },
      {
        title: 'Make and verify a change',
        description: 'Apply a small change, test it and inspect the diff.',
        lessons: [{ id: 'small-safe-change' }, { id: 'run-tests-review-diff' }],
      },
    ],
  },
  {
    slug: 'copilot-prompting-guide',
    title: 'Better prompts and context',
    description: 'Give Copilot useful goals, repository context and constraints, then verify its work.',
    artwork: {
      src: 'src/assets/copilot-prompting-guide.svg',
      width: 1200,
      height: 900,
      alt: 'An engraved illustration of a magnifying glass over an annotated page, with reference sheets, a pen, and a ruler.',
    },
    parts: [
      {
        title: 'Frame the request',
        description: 'Define a concrete goal and provide relevant context.',
        lessons: [{ id: 'goal-and-acceptance-criteria' }, { id: 'repository-context-and-constraints' }],
      },
      {
        title: 'Explore and diagnose',
        description: 'Ask for explanations and investigate reproducible failures.',
        lessons: [{ id: 'ask-for-an-explanation' }, { id: 'investigate-a-reproducible-failure' }],
      },
      {
        title: 'Improve and verify',
        description: 'Request focused tests, iterate and review the result.',
        lessons: [{ id: 'request-focused-tests' }, { id: 'iterate-verify-and-review' }],
      },
    ],
  },
  {
    slug: 'copilot-cli-guide',
    title: 'Copilot CLI workflows',
    description: 'Delegate a bounded terminal task, control permissions, and review the result.',
    artwork: { src: 'src/assets/copilot-cli-guide.svg', width: 720, height: 600, alt: 'Pen-and-ink terminal with a command, permission key and review checklist.' },
    parts: [
      { title: 'Prepare the task', description: 'Choose a safe workspace and start a session.', lessons: [{ id: 'prepare-workspace' }, { id: 'start-task' }] },
      { title: 'Control execution', description: 'Evaluate permissions and steer the work.', lessons: [{ id: 'approve-tools' }, { id: 'steer-session' }] },
      { title: 'Verify the result', description: 'Inspect changes and close out deliberately.', lessons: [{ id: 'review-changes' }, { id: 'finish-safely' }] },
    ],
  },
  {
    slug: 'copilot-agent-mode-guide',
    title: 'Agent mode in your IDE',
    description: 'Supervise an interactive agent through a small change, tool approvals, and review.',
    artwork: { src: 'src/assets/copilot-agent-mode-guide.svg', width: 720, height: 600, alt: 'Pen-and-ink editor, connected task cards and a magnifying glass.' },
    parts: [
      { title: 'Frame the work', description: 'Prepare a bounded task and launch agent mode.', lessons: [{ id: 'choose-task' }, { id: 'start-agent' }] },
      { title: 'Work together', description: 'Inspect tool requests and redirect the agent.', lessons: [{ id: 'review-tool-requests' }, { id: 'steer-agent' }] },
      { title: 'Review and finish', description: 'Check the changes and validate behavior.', lessons: [{ id: 'inspect-edits' }, { id: 'verify-task' }] },
    ],
  },
  {
    slug: 'copilot-instructions-guide',
    title: 'Repository instructions',
    description: 'Write, scope, and check reusable instructions for Copilot in a repository.',
    artwork: { src: 'src/assets/copilot-instructions-guide.svg', width: 720, height: 600, alt: 'Pen-and-ink stack of annotated repository instruction pages with a pencil.' },
    parts: [
      { title: 'Choose instructions', description: 'Identify stable guidance and its scope.', lessons: [{ id: 'choose-guidance' }, { id: 'write-repository-instructions' }] },
      { title: 'Target and test', description: 'Add path-specific rules and try them.', lessons: [{ id: 'scope-instructions' }, { id: 'test-instructions' }] },
      { title: 'Maintain guidance', description: 'Resolve conflicts and keep instructions useful.', lessons: [{ id: 'resolve-conflicts' }, { id: 'maintain-instructions' }] },
    ],
  },
  {
    slug: 'copilot-skills-agents-guide',
    title: 'Agent skills and custom agents',
    description: 'Package a repeatable workflow as a skill and define a focused custom agent.',
    artwork: { src: 'src/assets/copilot-skills-agents-guide.svg', width: 720, height: 600, alt: 'Pen-and-ink field kit with a workflow card, compass and tools.' },
    parts: [
      { title: 'Choose a building block', description: 'Distinguish reusable skills from agent profiles.', lessons: [{ id: 'choose-building-block' }, { id: 'design-skill' }] },
      { title: 'Create a skill', description: 'Write and exercise a focused workflow.', lessons: [{ id: 'write-skill' }, { id: 'try-skill' }] },
      { title: 'Create an agent', description: 'Define a role and review its behavior.', lessons: [{ id: 'write-agent' }, { id: 'evaluate-agent' }] },
    ],
  },
];

export const guideBySlug = new Map(guides.map(guide => [guide.slug, guide]));
