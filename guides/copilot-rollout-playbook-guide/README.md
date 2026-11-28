# Copilot Governance Rollout

An independent, source-backed playbook for enterprise administrators and their
security, finance and engineering partners. Six parts cover stakeholders and
ownership, pilot design, baseline policies, enablement and training, staged
expansion, and outcomes with a steady-state review cadence.

Product steps are grounded in GitHub Docs, including the "roll out at scale"
tutorials. Organizational practice is labelled as guide advice. Champion
programs are covered by the [champions-at-scale guide](../champions-at-scale/),
and deeper control, policy, metrics and audit detail by the sibling Copilot
governance guides. Examples are hypothetical. Review the content and current
official sources before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-rollout-playbook-guide/>. The
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
tamper-proof assessment or certification. Review material claims against
current primary sources before updating a page's `verified` date. Each source
also belongs in the register.

The light HTML diagram sources in `public/diagrams/` are hand-authored in the
house style, which adapts the MIT-licensed
[diagram-design](https://github.com/cathrynlavery/diagram-design) templates.
After editing `<slug>.light.html`, regenerate the dark HTML and both SVG
exports with:

```sh
node ../../scripts/diagram.mjs <slug>
```

Do not hand-edit the dark HTML or SVG files. Keep titles and descriptions
aligned with `src/diagrams.json`. Each figure keeps its 704px canvas inside a
horizontal scroll region so labels do not shrink on narrow screens. Shape and
text carry meaning independently of color, and the single green element marks
the lesson focus, not approval or a safety rating.

### Diagram color roles

| Color | Role |
| --- | --- |
| `#f3f5f7` | Paper |
| `#ffffff` | Node |
| `#1f2328` | Text |
| `#59636e` | Secondary text and connectors |
| `#1a7f37` | Accent stroke |
| `#eaf6ed` | Accent fill |
| `#d1d9e0` | Rule |

## Deployment

The guide's static output is `dist/`. The root monorepo build copies it into
`../../dist/copilot-rollout-playbook-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are
retained. GitHub and Copilot are trademarks of GitHub, Inc. This guide is not
affiliated with or endorsed by GitHub.
