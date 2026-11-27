# Enterprise enablement

Independent, source-backed guidance for GitHub Enterprise, Copilot and AI
adoption, starting with five guides. One monorepo, one site: <https://ragmha.github.io/field-guides/>.

| Guide | Source | Site path |
| --- | --- | --- |
| AI Credits | Astro | `/field-guides/ai-credits-guide/` |
| EU Data Residency | Astro | `/field-guides/data-residency-guide/` |
| Copilot Governance | Astro | `/field-guides/copilot-governance-guide/` |
| Champions at Scale | Static HTML | `/field-guides/champions-at-scale/` |
| GitHub Enterprise | Static HTML | `/field-guides/github-enterprise-field-guide/` |

Each guide lives in `guides/<name>/`, with its original Git history and license
notices retained. Original repositories remain unchanged. The private
agent-engineering course is not included.

`hub/` contains the single-page collection. It imports the AI Credits guide's
CSS and uses its Octicons brand mark, system fonts and theme selector.
The hub and all five guides share the `theme` localStorage preference.
`guides.mjs` is the collection list; descriptions come from the source
repositories. Each guide's start page opens with a shared landing: a hero
with the guide's pen-and-ink illustration and a Parts grid. The Astro guides
render `shared/Landing.astro`; the two static guides carry the same markup
and CSS in their own files. Astro landings retain introductory notes and sources
without repeating chapter sidebars or course indexes. Every topic has a visible
return to the collection on mobile. Chapter-page layouts and the static topics'
substantive content are retained.

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
to capture the hub and every guide landing in light/dark at desktop and
mobile widths.
It starts and stops its own preview on port 4173; set `PORT` to use another
port if a manual preview is already running.
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
   `` `${process.env.SITE_BASE ?? '/field-guides'}/<name>` `` so translated
   builds can move it under `/field-guides/<locale>/`. Update content, tests and preview URLs that use
   the old project path. Keep static asset references relative.
4. Remove imported `.github/` workflows and per-guide lockfiles. Add the
   guide's existing checks to root scripts; run `bun install` at the root.
5. Run the root checks and inspect the built guide before publication.

## Translations

Finnish lives in `i18n/fi/`, which mirrors source paths (for example
`i18n/fi/shared/Landing.astro`). `bun run build` copies the sources to the
ignored `.i18n-build/fi/`, overlays the translations and builds
`dist/fi/` at `/field-guides/fi/`. Files without a translation fall back to
English. Pages with a counterpart get `hreflang` links and a language switch.
The EN/FI switch appears in page headers; without JavaScript it remains a link.
Guide-card availability is tracked in `shared/translation-status.mjs`. Add a
guide as `partial` when Finnish content is available, and mark it `complete`
only after reviewing its content and interface. Mark it `partial` again if
subsequent source changes need translation.
Add another locale by creating `i18n/<two-letter code>/`.

`.github/workflows/translate-fi.md` is a
[GitHub Agentic Workflow](https://github.github.com/gh-aw/). On pushes to
`main` that touch guide sources or the Finnish overlay, and on manual dispatch,
it translates up to 15 new or changed files and opens a draft `[translate-fi]`
pull request for review, including reader-visible text in rendered diagrams.
Merging one batch starts the next until caught up.
It needs a `COPILOT_GITHUB_TOKEN` repository secret. After editing the
workflow, run `gh aw compile translate-fi` and commit the `.lock.yml`.

## Deployment and maintenance

`.github/workflows/pages.yml` checks pull requests and builds the site,
including the `/fi/` translation overlay, into one Pages artifact. On `main`,
it deploys with `actions/deploy-pages`
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
