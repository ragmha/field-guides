# Enterprise enablement

Independent, source-backed guidance for GitHub Enterprise, Copilot and AI
adoption.

**[Read the guides](https://ragmha.github.io/field-guides/)**

| Guide | Topic |
| --- | --- |
| [AI Credits](https://ragmha.github.io/field-guides/ai-credits-guide/) | Usage, budgets and reporting |
| [EU Data Residency](https://ragmha.github.io/field-guides/data-residency-guide/) | Data residency choices |
| [Copilot Governance](https://ragmha.github.io/field-guides/copilot-governance-guide/) | Enterprise adoption and controls |
| [Champions at Scale](https://ragmha.github.io/field-guides/champions-at-scale/) | Building a champions programme |
| [GitHub Enterprise](https://ragmha.github.io/field-guides/github-enterprise-field-guide/) | Enterprise enablement |
| [Agentic Engineering](https://ragmha.github.io/field-guides/agentic-engineering-guide/) | Agentic software engineering and operations |

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

GitHub and Copilot are GitHub, Inc. trademarks. These independent guides are
not affiliated with or endorsed by GitHub. Original license notices are
retained, including the [Octicons MIT notice](guides/ai-credits-guide/public/licenses/octicons-MIT.txt).
