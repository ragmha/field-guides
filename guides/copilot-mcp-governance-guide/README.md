# MCP Server Governance

An independent, source-backed course for enterprise administrators, security
reviewers and platform engineers who govern Model Context Protocol (MCP)
servers for GitHub Copilot. Six parts cover the MCP policy, allowlists and
registries, local and remote servers, credentials and secrets, cloud agent MCP
configuration, and onboarding through offboarding.

Examples are hypothetical. Review the content and current official sources
before applying changes to your organization.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+.

```sh
bun install --frozen-lockfile
bun run dev
```

Open <http://127.0.0.1:4321/field-guides/copilot-mcp-governance-guide/>. The
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

Diagrams live in `public/diagrams/`. Each light HTML source is hand-authored in
the house style; the dark HTML and both SVG exports are generated from it.
After editing a light source, regenerate its variants from the guide directory:

```sh
node ../../scripts/diagram.mjs <slug>
```

Keep titles and descriptions aligned with `src/diagrams.json`. Never edit the
dark files by hand. Each figure keeps its 704px canvas inside a horizontal
scroll region so the labels do not shrink on narrow screens. Shape and text
carry meaning independently of color; green marks the lesson focus, not
approval or a safety rating. A diagram is not evidence that a setting is
configured or enforced.

### Diagram color roles

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
`../../dist/copilot-mcp-governance-guide/`. Deployment is managed by the
[root Pages workflow](../../.github/workflows/pages.yml); see the
[root README](../../README.md) before publication.

The [Octicons MIT notice](public/licenses/octicons-MIT.txt) and the
[diagram-design MIT notice](public/licenses/diagram-design-MIT.txt) are retained.
GitHub and Copilot are trademarks of GitHub, Inc. This guide is not affiliated
with or endorsed by GitHub.