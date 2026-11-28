# Copilot Local Sandboxing

An independent, source-backed course for platform, security and developer
experience teams that run agentic Copilot clients, such as Copilot CLI and
agent sessions in Visual Studio Code, on developer machines. Six parts cover
the local risk model, approval modes, auto-approval rules, local sandboxing,
credential exposure, and isolation tiers with incident response.

Examples are hypothetical. Review the content and current official sources
before applying changes to your organization. Managed settings, MCP governance,
cloud agent security and organization network controls are covered by sibling
courses.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-local-sandboxing-guide/>. The
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

Diagrams live in `public/diagrams/`. Only the light HTML source of each figure
is hand-authored, based on the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
Regenerate the dark HTML and both SVG exports with the shared script, for
example:

```sh
node ../../scripts/diagram.mjs sandbox-filesystem
```

Do not edit the dark or SVG outputs by hand. Keep titles and descriptions
aligned with `src/diagrams.json`; dark variants use the same geometry and
substitute theme colors. Each figure retains its 704px canvas inside a
horizontal scroll region so labels do not shrink on narrow screens.

Figures use a layered reach map, decision flowcharts for tool, terminal,
network and token resolution, a permission-mode matrix, an approval-lifetime
timeline, a credential swimlane, an isolation-tier matrix and an incident
lifecycle. Shape and text carry meaning independently of color. Keep decisions
and limitations traceable to lesson prose; a diagram is not evidence that a
setting is configured or enforced.

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

## Deployment

The guide's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-local-sandboxing-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub, Copilot and Visual Studio Code are trademarks of their respective
owners. This guide is not affiliated with or endorsed by GitHub or Microsoft.
