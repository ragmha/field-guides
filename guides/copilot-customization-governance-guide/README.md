# Copilot Customization Governance

An independent, source-backed course for platform owners, organization
administrators and repository maintainers who govern GitHub Copilot
customizations: custom instructions, prompt files, custom agents, agent skills
and plugins. Six parts cover the customization estate, ownership and review,
versioning and release, distribution, conflicts between layers, and retiring
stale customizations.

Examples use fictional companies. Review the content and current official
sources before applying changes to your organization. Policies, managed
settings keys, MCP allowlists, sandboxing, network and content controls,
session data, audit analysis, metrics and model governance are covered by
sibling courses in this repository.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-customization-governance-guide/>.
The project base is intentional and matches the configured GitHub Pages path.

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

Diagrams are hand-authored light HTML files in `public/diagrams/`, written in
the house style derived from the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
Edit only the `*.light.html` source, then regenerate the dark HTML and both
SVG exports from this directory:

```sh
node ../../scripts/diagram.mjs customization-layers
```

Keep titles and descriptions aligned with `src/diagrams.json`. Dark variants use
the same geometry and substitute theme colors. Each figure retains its 704px
canvas inside a horizontal scroll region so the labels do not shrink on narrow
screens.

Figures use layered maps for customization scopes and channels, matrices for
surface support and staleness review, a swimlane for ownership, flowcharts for
change review, agent name collisions and plugin distribution, a timeline for
agent release, and lifecycles for skill versioning and retirement. Status text
and shape carry meaning independently of color. Keep decisions and limitations
traceable to lesson prose; a diagram is not evidence that a customization is
configured, read by a surface or enforced.

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

Minimum role contrasts across paper, node surface and accent surface are
14.22:1/15.25:1 for text, 5.50:1/5.70:1 for secondary text and connectors,
and 4.57:1/6.54:1 for the accent, light/dark respectively. Decorative rules
are not used as essential boundaries. No diagram-only colors were needed.

## Deployment

The guide's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-customization-governance-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) is retained.
The [diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) is also retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.
