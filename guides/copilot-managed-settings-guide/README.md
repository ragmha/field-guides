# Copilot Managed Settings

An independent, source-backed course for enterprise administrators, endpoint
management teams and platform engineers. Six parts cover what enterprise-managed
settings control, server-managed deployment from `.github-private`, MDM and
file-based delivery, precedence and restrictive composition, endpoint
verification and drift, and change management with rollback.

Examples are hypothetical. Review the content and current official sources
before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-managed-settings-guide/>. The project base is
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

Editable light HTML sources live in `public/diagrams/`. They use the
MIT-licensed [diagram-design](https://github.com/cathrynlavery/diagram-design)
templates. After editing a light source, regenerate its dark variant and SVG
exports from this directory:

```sh
node ../../scripts/diagram.mjs deployment-precedence
```

Do not hand-edit dark HTML or SVG files. Keep titles and descriptions aligned
with `src/diagrams.json`. Dark variants use the same geometry and substitute
theme colors. Each figure retains its 704px canvas inside a horizontal scroll
region so the labels do not shrink on narrow screens.

Figures use a layered key map, a client support matrix, publishing and
verification flowcharts, a team-override decision, device swimlanes, a
precedence stack, a composition matrix, a drift timeline, a change lifecycle
and a rollback swimlane. Shape and text carry meaning independently of color.
Keep decisions and limitations traceable to lesson prose; a diagram is not
evidence that a setting is configured or enforced.

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
`../../dist/copilot-managed-settings-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.