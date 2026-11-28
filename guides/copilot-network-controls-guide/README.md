# Copilot Network Controls

An independent, source-backed course for network, security and desktop teams
that run GitHub Copilot behind corporate controls. Six parts cover the network
paths Copilot uses, client endpoint allowlists, proxies and certificates,
plan-based routing, the cloud agent firewall, private runner networking and
connectivity troubleshooting. Examples are hypothetical. Review the content
and current official sources before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-network-controls-guide/>. The
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

Diagrams are hand-authored light HTML in the house style, kept in
`public/diagrams/<slug>.light.html`. They follow the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) conventions.
After editing a light source, regenerate its dark variant and both SVG exports
from the guide directory:

```sh
node ../../scripts/diagram.mjs subscription-routing
```

Keep titles and descriptions aligned with `src/diagrams.json`. Dark variants use
the same geometry and substitute theme colors. Each figure retains its 704px
canvas inside a horizontal scroll region so the labels do not shrink on narrow
screens.

Figures use layered bands for traffic paths, trust sources and firewall
settings; matrices for ownership, plan endpoints and firewall coverage;
flowcharts for allowlist building, proxy lookup and runner choice; a swimlane
for WebSocket streaming; a timeline for a routing change; and a lifecycle loop
for troubleshooting. Text and shape carry meaning independently of color, and
each figure has a single green lesson-focus element. A diagram is not evidence
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

Minimum role contrasts across paper, node surface and accent surface are
14.22:1/15.25:1 for text, 5.50:1/5.70:1 for secondary text and connectors,
and 4.57:1/6.54:1 for the accent, light/dark respectively. Decorative rules
are not used as essential boundaries. No diagram-only colors were needed.

## Deployment

The guide's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-network-controls-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.