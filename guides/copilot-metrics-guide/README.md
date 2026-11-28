# Copilot Metrics & Adoption

An independent, source-backed deep dive for enterprise administrators, platform
teams and engineering leaders who read and report on GitHub Copilot usage. Six
parts cover the metric surfaces and who can access them, metric definitions and
adoption phases, organization attribution and deduplication, team-level joins,
data latency and coverage gaps, adoption KPIs designed without individual
surveillance, and pairing metrics with qualitative evidence in impact reports.
It builds on the overview in [Copilot Governance](../copilot-governance-guide/)
and leaves credit budgeting to [AI Credits](../ai-credits-guide/).
Examples are hypothetical. Review the content and current official sources
before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-metrics-guide/>. The project base is
intentional and matches the configured GitHub Pages path.

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

Diagrams are hand-authored light HTML sources in `public/diagrams/`, written in
the shared house style adapted from the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
After editing `<slug>.light.html`, regenerate the dark HTML and both SVG
exports from this directory:

```sh
node ../../scripts/diagram.mjs <slug>
```

Do not edit the dark HTML or SVG files by hand. Keep titles and descriptions
aligned with `src/diagrams.json`. Each figure keeps its 704px canvas inside a
horizontal scroll region so the labels do not shrink on narrow screens.

Figures use matrices for surfaces and KPI sheets, decision flowcharts for
access and adoption phases, timelines for counting windows and data latency,
a swimlane for organization attribution, a layer stack for coverage gaps, a
responsibility map for privacy-safe reporting and lifecycle loops for
qualitative evidence and impact reports. Shape and text carry meaning
independently of color, and the single green element marks the lesson focus,
not approval. A diagram is not evidence that a setting is configured or that a
metric is complete.

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
`../../dist/copilot-metrics-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.
