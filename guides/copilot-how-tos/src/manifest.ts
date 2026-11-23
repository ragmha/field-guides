export type LessonReference = { id: string };
export type GuideDefinition = {
  slug: 'copilot-ide-guide' | 'copilot-prompting-guide';
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
];

export const guideBySlug = new Map(guides.map(guide => [guide.slug, guide]));
