# Field Guides

Independent, source-backed field guides for GitHub Enterprise, Copilot and AI
adoption. One monorepo, one site: <https://ragmha.github.io/field-guides/>.

| Guide | Source | Site path |
| --- | --- | --- |
| AI Credits Learning Guide | Astro | `/field-guides/ai-credits-guide/` |
| EU Data Residency Guide | Astro | `/field-guides/data-residency-guide/` |
| Copilot Governance Guide | Astro | `/field-guides/copilot-governance-guide/` |
| Champions at Scale | Static HTML | `/field-guides/champions-at-scale/` |
| GitHub Enterprise Field Guide | Static HTML | `/field-guides/github-enterprise-field-guide/` |

Each guide lives in `guides/<name>/`, with its original Git history and license
notices retained. Original repositories remain unchanged. The private
agent-engineering course is not included.

`hub/` contains the single-page collection. It imports the AI Credits guide's
CSS and uses its Octicons brand mark, system fonts and theme selector.
The hub and all five guides share the `theme` localStorage preference.
`guides.mjs` is the collection list; descriptions come from the source
repositories. Guide styling is otherwise unchanged.

## Build and preview

Requires Bun 1.3.5+ and Node.js 22.12+.
Run dependency installation from the repository root; Bun workspaces share
one `bun.lock`.

```sh
bun install --frozen-lockfile
bun run build
bun run preview
```

Open <http://127.0.0.1:4173/field-guides/>.
The preview serves the real project prefix, not `/`.
The root `dist/` contains the hub and one subdirectory per guide.
Astro also retains each guide's local `dist/` for its existing preview checks.
Static guides copy only HTML, CSS, JavaScript, assets and license notices.
No credentials or runtime server are needed to host the generated site.

For individual Astro development:

```sh
bun run --cwd guides/ai-credits-guide dev
```

## Checks

```sh
bun run check          # Astro/TypeScript checks across all Astro workspaces
bun run test           # Existing content tests in all three Astro guides
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
and narrow-screen containment. Set `SCREENSHOT_DIR` to an artifact directory
to capture the hub in light/dark at desktop/mobile widths and one guide.
It starts and stops its own preview on port 4173; stop a manual preview first.
Existing guide screenshot output stays in ignored `test-results/`.

## Add a guide

1. Import its history into `guides/<name>/`:
   `git subtree add --prefix=guides/<name> <repository-url> <branch>`.
   If Git lacks `subtree`, fetch the branch, merge `FETCH_HEAD` with
   `-s ours --no-commit --allow-unrelated-histories`, then run
   `git read-tree --prefix=guides/<name>/ -u FETCH_HEAD` and commit.
2. Add its name, title, source repository description and `astro` or `static`
   type to `guides.mjs`. Astro packages need a unique workspace name.
3. For Astro, set `site` to `https://ragmha.github.io` and `base` to
   `/field-guides/<name>/`. Update content, tests and preview URLs that use
   the old project path. Keep static asset references relative.
4. Remove imported `.github/` workflows and per-guide lockfiles. Add the
   guide's existing checks to root scripts; run `bun install` at the root.
5. Run the root checks and inspect the built guide before publication.

## Deployment and maintenance

`.github/workflows/pages.yml` checks pull requests and builds all five guides
into one Pages artifact. On `master`, it deploys with `actions/deploy-pages`
once Pages is configured to use GitHub Actions.
No repository settings are changed by the build.

Only the root workflow runs. Imported deployment and freshness workflows
were removed; no automated source-review service is enabled here.
Older guide-specific setup documents describe their original repositories,
not this monorepo's deployment. Maintain content and reviewed dates in
`guides/`; do not modify or redirect the original repositories as part of
this migration.

The GitHub mark is MIT-licensed Octicons artwork; its notice is retained at
`guides/ai-credits-guide/public/licenses/octicons-MIT.txt` and in the built
AI Credits guide. GitHub and Copilot are GitHub, Inc. trademarks.
These independent guides are not affiliated with or endorsed by GitHub.
