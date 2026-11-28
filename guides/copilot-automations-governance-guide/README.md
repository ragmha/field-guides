# Copilot Automations Governance

An independent, source-backed deep dive for administrators and the security,
finance and engineering partners who govern Copilot agent work that starts
without a person at the keyboard: scheduled and event-driven agent
automations, agent tasks and issue assignment through the REST API, and the
Copilot CLI in GitHub Actions. Six parts cover triggers and entry points,
identity and ownership, permissions and scope, cost and rate limits, review
gates and kill switches, and audit and change control. It goes deeper than the
[Copilot Governance](../copilot-governance-guide/) overview course. Several
features covered here are public preview and are labeled as such. Examples are
hypothetical. Review the content and current official sources before applying
changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-automations-governance-guide/>.
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

Diagrams are hand-authored light HTML in the house style, one per lesson, in
`public/diagrams/<slug>.light.html`. The dark HTML and the light and dark SVG
exports are generated from it. After editing a light source, regenerate from
this directory:

```sh
node ../../scripts/diagram.mjs <slug>
```

Keep titles and descriptions aligned with `src/diagrams.json`. Each figure
retains its 704px canvas inside a horizontal scroll region so the labels do
not shrink on narrow screens. Status text and shape carry meaning
independently of color, and the single green element marks the lesson focus,
not an approval or safety rating. A diagram is not evidence that a setting is
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
`../../dist/copilot-automations-governance-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) is retained.
The [diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) is also retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.
