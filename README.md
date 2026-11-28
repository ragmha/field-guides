# Enterprise enablement

Independent, source-backed guidance for GitHub Enterprise, Copilot and AI
adoption across 27 guides. One monorepo, one site: <https://ragmha.github.io/field-guides/>.

**[Read the guides](https://ragmha.github.io/field-guides/)**

| Guide | Source | Site path |
| --- | --- | --- |
| AI Credits | Astro | `/field-guides/ai-credits-guide/` |
| EU Data Residency | Astro | `/field-guides/data-residency-guide/` |
| Copilot Governance | Astro | `/field-guides/copilot-governance-guide/` |
| Copilot in your IDE | Shared Astro how-to workspace | `/field-guides/copilot-ide-guide/` |
| Better prompts and context | Shared Astro how-to workspace | `/field-guides/copilot-prompting-guide/` |
| Copilot CLI workflows | Shared Astro how-to workspace | `/field-guides/copilot-cli-guide/` |
| Agent mode in your IDE | Shared Astro how-to workspace | `/field-guides/copilot-agent-mode-guide/` |
| Repository instructions | Shared Astro how-to workspace | `/field-guides/copilot-instructions-guide/` |
| Agent skills and custom agents | Shared Astro how-to workspace | `/field-guides/copilot-skills-agents-guide/` |
| Copilot Control Map | Astro | `/field-guides/copilot-control-map-guide/` |
| Copilot Policy Conflicts | Astro | `/field-guides/copilot-policy-conflicts-guide/` |
| Copilot Managed Settings | Astro | `/field-guides/copilot-managed-settings-guide/` |
| MCP Server Governance | Astro | `/field-guides/copilot-mcp-governance-guide/` |
| Copilot Customization Governance | Astro | `/field-guides/copilot-customization-governance-guide/` |
| Copilot Local Sandboxing | Astro | `/field-guides/copilot-local-sandboxing-guide/` |
| Copilot Cloud Agent Security | Astro | `/field-guides/copilot-cloud-agent-security-guide/` |
| Copilot Automations Governance | Astro | `/field-guides/copilot-automations-governance-guide/` |
| Copilot Network Controls | Astro | `/field-guides/copilot-network-controls-guide/` |
| Copilot Content Controls | Astro | `/field-guides/copilot-content-controls-guide/` |
| Copilot Session Data | Astro | `/field-guides/copilot-session-data-guide/` |
| Copilot Audit & Telemetry | Astro | `/field-guides/copilot-audit-telemetry-guide/` |
| Copilot Metrics & Adoption | Astro | `/field-guides/copilot-metrics-guide/` |
| Copilot Model Governance | Astro | `/field-guides/copilot-model-governance-guide/` |
| Copilot Governance Rollout | Astro | `/field-guides/copilot-rollout-playbook-guide/` |
| Champions at Scale | Static HTML | `/field-guides/champions-at-scale/` |
| GitHub Enterprise | Static HTML | `/field-guides/github-enterprise-field-guide/` |
| Agentic Engineering | Static HTML | `/field-guides/agentic-engineering-guide/` |

The [GitHub and Azure AI reference](https://ragmha.github.io/field-guides/platform-references/)
is a searchable map of products, services and learning resources.

`hub/` contains the single-page collection. It imports the AI Credits guide's
CSS and uses its Octicons brand mark, system fonts and theme selector.
The hub and all 27 guides share the `theme` localStorage preference.
`guides.mjs` is the collection list; descriptions come from the source
repositories. Each guide's start page opens with a shared landing: a hero
with the guide's pen-and-ink illustration and a Parts grid. The Astro guides
render `shared/Landing.astro`; the two static guides carry the same markup
and CSS in their own files. Astro landings retain introductory notes and sources
without repeating chapter sidebars or course indexes. Astro guides share
`shared/GuideHeader.astro`, with a breadcrumb linking back to **All guides**
and the guide overview, and identifying the current page.
Every topic has a visible return to the collection on mobile.
Chapter-page layouts and the static topics'
substantive content are retained.
## How it works

```text
  +-----------------------------+
  | hub/ + guides/ + guides.mjs |
  +--------------+--------------+
                 |
                 v
  +-----------------------------+
  | GitHub Actions: checks and  |
  | builds Astro + static files |
  +--------------+--------------+
                 |
                 v
          dist/ (one site)
                 |
          push to main
                 v
          GitHub Pages
```

## Keeping the guides current

The [freshness check](.github/workflows/freshness-status.yml) reports missing,
invalid or more-than-30-day-old review dates separately from the site build:

```sh
bun run check:freshness
```

The Astro guides track dates and sources per page. Static HTML pages need an
initial review; their external links are candidates, not a verified source
list. Add `<!-- freshness-verified: YYYY-MM-DD -->` to a static page
only after checking its claims against their sources. A recent date alone does
not prove a page is accurate.

The weekly local source-review automation is enabled and prepares private
changes for review; it does not publish. Local schedules require the Copilot
app and computer to be available.
Unavailable or conflicting sources need human attention; don't advance their
review dates. Review exact changes and the public destination before opening a
PR. GitHub auto-merge is enabled, and `main` requires the site `build` check.
After review, queue a PR for auto-merge; no PR is merged automatically without
that step.

The separate [Knowledge Base sync](.github/workflows/knowledge-base.yml)
maintains repository knowledge, not guide freshness.

## Run locally

Requires Bun 1.3.5+ and Node.js 22.12+. From the repository root:

```sh
bun install --frozen-lockfile
bun run build
bun run preview
```

Open <http://127.0.0.1:4173/field-guides/>.
Edit content in `guides/<name>/`. The [Pages workflow](.github/workflows/pages.yml)
checks PRs and builds the site; updates to `main` deploy to GitHub Pages.

The IDE and prompting how-tos share the
[`guides/copilot-how-tos/`](guides/copilot-how-tos/README.md) Astro workspace,
which builds all six guide routes and their shared assets.

For individual Astro development:

```sh
bun run --cwd guides/ai-credits-guide dev
```

## Checks

```sh
bun run check          # Astro/TypeScript checks across all Astro workspaces
bun run test           # Existing content tests in all Astro guides
bun run build
bun run test:browser   # Existing browser suites, Champions checks, site checks
bun run test:diagrams  # AI Credits native Excalidraw export checks (local only)
```

`test:diagrams` re-measures diagram text with installed system fonts, so the
committed SVGs only match on macOS where they were exported. CI skips it; run
it locally after editing a diagram.

Browser checks use installed Google Chrome by default. Alternatively:

```sh
bunx playwright install chromium
BROWSER_CHANNEL=chromium bun run test:browser
```

`bun run test:site` checks generated HTML routes and local linked assets,
theme persistence across all guides, system theme changes, keyboard access
and narrow-screen containment. It also requires Python (`python` on Windows,
`python3` elsewhere). Set `SCREENSHOT_DIR` to an artifact directory
to capture the hub and every guide landing in light/dark at desktop and
mobile widths.
It starts and stops its own preview on port 4173. Set `PORT` to use a
different port if a preview is already running.
Existing guide screenshot output stays in ignored `test-results/`.

## Add a guide

1. Import its history into `guides/<name>/`:
   `git subtree add --prefix=guides/<name> <repository-url> <branch>`.
   If Git lacks `subtree`, fetch the branch, merge `FETCH_HEAD` with
   `-s ours --no-commit --allow-unrelated-histories`, then run
   `git read-tree --prefix=guides/<name>/ -u FETCH_HEAD` and commit.
2. Add its name, title, source repository description, part count and
   `astro` or `static` type to `guides.mjs`. Astro packages need a unique
   workspace name. Give its start page the landing (`shared/Landing.astro`
   for Astro, copied markup for static) with one card per part.
3. For Astro, set `site` to `https://ragmha.github.io` and `base` to
   `/field-guides/<name>/`. Update content, tests and preview URLs that use
   the old project path. Keep static asset references relative.
4. Remove imported `.github/` workflows and per-guide lockfiles. Add the
   guide's existing checks to root scripts; run `bun install` at the root.
5. Run the root checks and inspect the built guide before publication.

GitHub and Copilot are GitHub, Inc. trademarks. These independent guides are
not affiliated with or endorsed by GitHub. Original license notices are
retained, including the [Octicons MIT notice](guides/ai-credits-guide/public/licenses/octicons-MIT.txt).
