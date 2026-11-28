# Copilot Model Governance

An independent, source-backed course for enterprise administrators and their
security, privacy, legal and finance partners. Six parts cover which Copilot
models users can reach, preview and GA release stages, availability policies
and delegation, provider hosting and data terms, Auto and Fusion routing, the
cost signals of model choice, bring your own key, and a model review and
approval process. Budget design is left to the
[AI Credits course](../ai-credits-guide/).

Examples are hypothetical. Model names, prices and availability change often;
review the content and current official sources before applying changes to
your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-model-governance-guide/>. The
project base is intentional and matches the configured GitHub Pages path.

```sh
bun run check
bun run test
bun run build
bun run test:browser
```

The browser checks use installed Google Chrome by default. To use
Playwright Chromium, install it with `bunx playwright install chromium` and set
`BROWSER_CHANNEL=chromium`.

## Content and diagrams

`src/course.ts` defines the reading sequence. Pages live in
`src/content/guide/`; the sources and release-status register is outside the
sequence. Each lesson has a diagram, a worked hypothetical example, an exercise
and self-checks. Each part summary has a five-question quiz; 100% unlocks the
next part. Progress is stored in browser local storage with a quiz version.
JavaScript and storage are required; the gate is a learning aid, not a
tamper-proof assessment or certification. If quiz content changes materially,
increment the progress key and record version in `GuideLayout.astro`.
Review material claims against current primary sources before updating a
page's `verified` date. Each source also belongs in the register.

Diagrams live in `public/diagrams/`. Each `<slug>.light.html` file is
hand-authored in the style of the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
The dark HTML and both SVG exports are generated from it; never edit them by
hand. From this directory, regenerate one figure with:

```sh
node ../../scripts/diagram.mjs model-inventory
```

Keep titles and descriptions aligned with `src/diagrams.json`. Each figure
retains its 704px canvas inside a horizontal scroll region so the labels do not
shrink on narrow screens.

Figures use a layered availability funnel, a release-stage timeline, status and
exception decision flowcharts, delegation and BYOK request-path swimlanes,
provider hosting and cost-signal matrices, an Auto eligibility funnel, a Fusion
pattern map, an intake flowchart and a lifecycle timeline. Shape and text carry
meaning independently of color. A diagram is not evidence that a setting is
configured or enforced.

### Diagram color roles

The diagrams use local course tokens and system fonts; no remote assets.
Swap the following roles together when retheming:

| Role | Light | Dark |
| --- | --- | --- |
| Paper | `#f3f5f7` | `#07090d` |
| Node surface | `#ffffff` | `#0d1117` |
| Text | `#1f2328` | `#f0f6fc` |
| Secondary text and connectors | `#59636e` | `#9198a1` |
| Accent | `#1a7f37` | `#3fb950` |
| Accent surface | `#eaf6ed` | `#102219` |
| Decorative rule | `#d1d9e0` | `#3d444d` |

Decorative rules are not used as essential boundaries. No diagram-only colors
were needed.

## Deployment

The guide's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-model-governance-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) is retained.
The [diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) is also retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.
