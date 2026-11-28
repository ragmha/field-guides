# Copilot Policy Conflicts

An independent, source-backed course for enterprise owners, organization
owners, AI managers and support engineers who need to explain the effective
Copilot policy for a specific person. Six parts cover policy layers, seat
sources, conflict rules, users and resources, troubleshooting visibility and
effective-policy records.

It goes deeper on policy precedence than the
[Copilot Governance](../copilot-governance-guide/) overview course and shares
its visual and technical scaffold. Examples are hypothetical. Review the
content and current official sources before applying changes to your
organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-policy-conflicts-guide/>. The
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

Diagrams are hand-authored light HTML sources in `public/diagrams/`, written in
the house style based on the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
Edit only the `<slug>.light.html` source, then regenerate the dark HTML and
both SVG exports from this directory:

```sh
node ../../scripts/diagram.mjs <slug>
```

Never hand-edit the generated dark HTML or SVG files. Keep titles and
descriptions aligned with `src/diagrams.json`. Dark variants use the same
geometry and substitute theme colors. Each figure retains its 704px canvas
inside a horizontal scroll region so the labels do not shrink on narrow
screens.

Figures use decision-state and conflict matrices, decision flowcharts for
delegation, seat paths and triage, a seat-source trace, layered rule tiers, a
user and resource swimlane, a surface coverage matrix, a record layout and a
review cycle. Status text and shape carry meaning independently of color. Keep
decisions and limitations traceable to lesson prose; a diagram is not evidence
that a setting is configured or enforced.

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

The course's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-policy-conflicts-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub and Copilot are trademarks of GitHub, Inc. This course is not affiliated
with or endorsed by GitHub.
